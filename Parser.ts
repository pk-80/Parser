import { isNull } from "util";
import { LogMethodParams, LogMethodResult, IncreaseByOne } from "./Decorators";


interface IParser
{
    Parse(mathExpression: string): number;
}


class Parser implements IParser
{
    @LogMethodParams
    @LogMethodResult
    Parse(mathExpr: string): any
    {
        let forwardBrIndex = -1;
        let reverceBrIndex = -1;
        let expr: string = mathExpr;

        // Скобки
        while (expr.indexOf("(") >= 0)
        {
            // Извлекаем выражение в скобках
            let brIndexes: [number, number] = GetBrIndexes(expr);
            forwardBrIndex = brIndexes[0];
            reverceBrIndex = brIndexes[1];
            let subExpr = expr.substring(forwardBrIndex + 1, reverceBrIndex);

            // Считаем выражение в скобках
            let subRes = this.Parse(subExpr);

            // Заменяем выражение в скобках на результат
            subExpr = "(" + subExpr + ")";
            expr = expr.replace(subExpr, subRes);
        }

        // Операция
        let op: [number, MathOperation] = GetOperation(expr);
        while (op[0] >= 0)
        {
            if (IsNumber(expr))
                break;

            if (op[0] == 0)
                if (expr[0] == "-") // Отрицательное число
                {
                    op = GetOperation(expr.substring(1));
                    op[0] += 1;
                }
                else
                    throw new Error("Invalid first char");

            // Извлекаем значение слева
            let leftValue: number = GetLastValue(expr.substring(0, op[0]));

            // Извлекаем значение справа
            let rightValue: number = GetFirstValue(expr.substring(op[0] + 1));

            // Выполняем операцию
            let subRes = op[1](leftValue, rightValue);

            // Заменяем выражение в скобках на результат
            let subExpr = leftValue + expr.charAt(op[0]) + rightValue;
            expr = expr.replace(subExpr, subRes.toString());

            // Ищем следующую операцию
            op = GetOperation(expr);
        }

        return Number(expr);
    }


    @IncreaseByOne
    ParseAndIncreaseByOne(value: string): number
    {
        return this.Parse(value);
    }


    @IncreaseByOne
    Add(a: number, b: number): number
    {
        return a + b;
    }
}


type MathOperation = (a: number, b: number) => number;


function Sum(a: number, b: number): number
{
    return a + b;
}


function Sub(a: number, b: number): number
{
    return a - b;
}


function Mult(a: number, b: number): number
{
    return a * b;
}


function Div(a: number, b: number): number
{
    return a / b;
}


function GetMathOperation(expr: string, opIndex: number): MathOperation
{
    if (opIndex < 0 || opIndex >= expr.length)
        return null;

    switch (expr.charAt(opIndex))
    {
        case "*":
            return Mult;

        case "/":
            return Div;

        case "+":
            return Sum;

        case "-":
            return Sub;

        default:
            throw new Error("Invalid operation: TODO: отформатировать сообщение");
    }
}


function GetOperation(expr: string): [number, MathOperation]
{
    let op: MathOperation = null;

    let index = Math.min(
        (expr.indexOf("*") >= 0) ? expr.indexOf("*") : Number.MAX_VALUE,
        (expr.indexOf("/") >= 0) ? expr.indexOf("/") : Number.MAX_VALUE,
    );

    // Знак умножения или деления не найден
    if (index == Number.MAX_VALUE)
    {
        // Пытаемся найти знак сложения или вычитания
        index = Math.min(
            (expr.indexOf("+") >= 0) ? expr.indexOf("+") : Number.MAX_VALUE,
            (expr.indexOf("-") >= 0) ? expr.indexOf("-") : Number.MAX_VALUE,
        );
    }

    // Знак арифметической операции найден
    if (index < Number.MAX_VALUE)
    {
        op = GetMathOperation(expr, index);
        return [index, op];
    }

    // Знаки математических операций не найдены
    return [-1, null];
}


function IsNumber(expr: string): boolean
{
    return !isNaN(Number(expr));
}


function GetFirstValue(expr: string): number
{
    let res: string = "";
    for (var i = 0; i < expr.length; i++)
    {
        let char = expr[i];
        if (IsNumber(char) || ((i == 0) && (char == "-")))
            res = res + char;
        else
            break;
    }
    return Number(res);
}


function GetLastValue(expr: string): number
{
    let res: string = "";
    for (var i = expr.length - 1; i >= 0; i--)
    {
        let char = expr[i];
        if (IsNumber(char) || ((i == 0) && (char == "-")))
            res = char + res;
        else
            break;
    }
    return Number(res);
}


function GetBrIndexes(expr: string): [number, number]
{
    let res: [number, number] = [-1, -1];

    for (var i = expr.indexOf("("); i < expr.length; i++)
    {
        if (expr.charAt(i) == "(")
        {
            res[0] = i;
            continue;
        }

        if (expr.charAt(i) == ")")
        {
            res[1] = i;
            break;
        }
    }

    return res;
}


export { IParser, Parser }