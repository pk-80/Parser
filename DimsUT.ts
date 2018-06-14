import assert = require('assert');
import { Dims, EngUnit } from "./Dims";


export function Dims_toString_UT()
{
    let tested = new Dims(12, EngUnit.px);
    assert.equal("12px", tested.toString());
};