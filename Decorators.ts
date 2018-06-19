function LogMethodParams(target: any, propertyKey: string, descriptor: PropertyDescriptor)
{
    let originalMethod = descriptor.value;
    descriptor.value = function (...params)
    {
        console.log(JSON.stringify(params));
        return originalMethod.apply(this, params);
    }
};


function LogMethodResult(target: any, propertyKey: string, descriptor: PropertyDescriptor)
{
    let originalMethod = descriptor.value;
    descriptor.value = function (...params)
    {
        let res = originalMethod.apply(this, params);
        console.log(JSON.stringify(res));
        return res;
    }
};


function IncreaseByOne(target: any, propertyKey: string, descriptor: PropertyDescriptor)
{
    let originalMethod = descriptor.value;
    descriptor.value = function (...params)
    {
        let res = originalMethod.apply(this, params);
        return res + 1;
    }
};


export { LogMethodParams, LogMethodResult, IncreaseByOne }