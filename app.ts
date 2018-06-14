import { Dims, EngUnit } from "./Dims";
import { ICalculator, Calculator } from "./Parser";


class Utils
{
    static Show(body: any): void
    {
        console.log(body);
    }
}


let calc = new Calculator();

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


Utils.Show(calc.Parse("2+(3-14)"));     // =-9