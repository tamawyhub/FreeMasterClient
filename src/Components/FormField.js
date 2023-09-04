import objectHash from "object-hash";
import React, { useId } from "react";

function formatNumber(number)
{
    if(isNaN(number)){
        return number
    }
    if (Math.abs(number) < 10000 && Math.abs(number) >= .001
        || Math.abs(number) < Number.EPSILON)
    {
        return Number.parseFloat(Number(number).toFixed(3))
    }
    return Number(number).toExponential()
}

export default function FormField (props)
{
    const value = formatNumber(props.value);
    const id = useId()
    const txtIn = <input defaultValue={value}
        type="text" size={10} id={id}
        className="col-5"
        style= { { height : '30px' } }
        onBlur={(event)=>{
            props.updateFn&&props.updateFn(event.target.value)
        }}
        readOnly={props.updateFn?false:true}
        disabled={props.updateFn?false:true}
        key={objectHash(value)}
        />
    const label = <label htmlFor={id} className="text-start col-7">{props.label}</label>
    return(
        <div className="row mt-0 mb-0 ps-5 pe-5">
            {label}
            {txtIn}
        </div>
    )
}
