import { Dims, EngUnit } from "./Dims";
import { IParser, Parser } from "./Parser";


class Utils
{
    static Show(body: any): void
    {
        console.log(body);
    }
}


let calc = new Parser();

// Без скобок
Utils.Show(calc.Parse("1"));         // =1
Utils.Show(calc.Parse("-2"));        // =-2
Utils.Show(calc.Parse("2+3"));       // =5
Utils.Show(calc.Parse("2+3+4"));     // =9
Utils.Show(calc.Parse("2-3"));       // =-1
Utils.Show(calc.Parse("2-3-4"));     // =-5
Utils.Show(calc.Parse("2+3-4+5"));   // =6
Utils.Show(calc.Parse("1*2"));       // =2
Utils.Show(calc.Parse("1*2*3"));     // =6
Utils.Show(calc.Parse("1*2/2"));     // =1
Utils.Show(calc.Parse("2*2/4/1"));   // =1
Utils.Show(calc.Parse("1+2-3*4/6")); // =1

// Со скобками
Utils.Show(calc.Parse("2+(3-14)"));     // =-9

// Декоратор увеличения на единицу
Utils.Show(calc.Add(12, 4));        // =17
Utils.Show(calc.ParseAndIncreaseByOne("12"));    // =13