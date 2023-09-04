import React from 'react'
import { useEffect } from 'react'
import { useId } from 'react'

export default function ErrorMsg({children})
{
    const id1 = useId();
    const id2 = useId();

    let id=id1;
    if ('#'+id1==window.location.hash)
        id=id2;

    useEffect(()=>{
        window.location.hash=id
    },[])

    return (
    <h5 className='text-danger' id={id}>
        {children}
    </h5>
    )
}