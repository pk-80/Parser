enum EngUnit { px, percent, kg, unexpected }


class EngUnitHelper
{
    static EngUnitToString(engUnit: EngUnit): string
    {
        switch (engUnit)
        {
            case EngUnit.kg:
                return EngUnit.kg.toString();

            case EngUnit.px:
                return engUnit.toString();

            case EngUnit.percent:
                return "%";

            case EngUnit.unexpected:
                throw new Error("Unexpected eng unit");

            default:
                throw new Error("Invalid eng unit");
        }
    }
}


class Dims
{
    constructor(public value: number, public engUnit: EngUnit) { }


    toString(): string
    {
        return 'TODO';
    }
}


export { EngUnit, Dims };