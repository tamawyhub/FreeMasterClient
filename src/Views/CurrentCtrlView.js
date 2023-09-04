import React, { useEffect, useLayoutEffect, useState } from "react";
import FormField from "../Components/FormField";

var lastState = {
    ts: 6.25e-5,
    fn: 233,
    attn: 1,
    outlim: 90,
}
export default function CurrentCtrlView ({motorParams:{statorRes,statorLd,statorLq}})
{
    const rs = statorRes;
    const ld = statorLd;
    const lq = statorLq;
    const [ts, setTs] = useState(lastState.ts)
    const [fn, setFn] = useState(lastState.fn)
    const [attn, setAttn] = useState(lastState.attn)
    const [outlim, setOutlim] = useState(lastState.outlim)

    const [kpd, setKpd] = useState(0)
    const [kid, setKid] = useState(0)
    const [kpq, setKpq] = useState(0)
    const [kiq, setKiq] = useState(0)

    const pcm = document.getElementById('pcm').data;

    const calculateGains = ()=>{
        setKpd(4*attn*Math.PI*fn*ld-rs)
        setKid(ld*(2*Math.PI*fn)**2)
        setKpq(4*attn*Math.PI*fn*lq-rs)
        setKiq(lq*(2*Math.PI*fn)**2)
    }
    
    useEffect(()=>{
        return ()=>{
            lastState.ts = ts;
            lastState.fn = fn;
            lastState.attn = attn;
            lastState.outlim = outlim;
        };
    },[ts,fn,attn,outlim])
    useLayoutEffect(calculateGains,[]);

    const applyGains = ()=>
    {
        pcm.WriteVariable("KpId",kpd)
            .then(()=>{
                console.log('kpd is updated')
            })
            .catch(()=>{
                console.log('kpd failed to update')
            });
        pcm.WriteVariable("KiId",kid)
            .then(()=>{
                console.log('kid is updated')
            })
            .catch(()=>{
                console.log('kid failed to update')
            });
        pcm.WriteVariable("KpIq",kpq)
            .then(()=>{
                console.log('kpq is updated')
            })
            .catch(()=>{
                console.log('kpq failed to update')
            });
        pcm.WriteVariable("KiIq",kiq)
            .then(()=>{
                console.log('kiq is updated')
            })
            .catch(()=>{
                console.log('kiq failed to update')
            });
    }

    return (
        <div className='bg-light'>
            <form className="row">
                <div className='d-flex col-md-4 pt-3 sticky-md-top align-items-center' >
                    <img className='img-fluid' src='images/FOC.png' />
                </div>
                <div className="d-flex flex-column col-md-3">
                    <h4 className="text-start ms-3 pt-3">Loop Parameters</h4>
                    <FormField value={ts} label={<span>T<sub>s</sub> [sec]</span>} updateFn={setTs}/>
                    <FormField value={fn} label={<span>f<sub>0</sub> [Hz]</span>} updateFn={setFn}/>
                    <FormField value={attn} label='ξ' updateFn={setAttn}/>
                    <FormField value="Parallel" label='Type'/>
                    <h4 className="text-start ms-3">Controller Limits</h4>
                    <FormField value={outlim} label='Output Limit [%]' updateFn={setOutlim}/>
                    <div className="btn btn-primary float-start m-3" onClick={calculateGains}>Calculate Gains</div>
                </div>
                <div className="d-flex flex-column col-md-3">
                    <h4 className="text-start ms-3 pt-3">Output Gains</h4> 
                    <FormField value={kpd} label={<span>K<sub>pd</sub></span>} key={'kpd='+kpd}/>
                    <FormField value={kid} label={<span>K<sub>id</sub></span>} key={'kid='+kid}/>
                    <FormField value={kpq} label={<span>K<sub>pq</sub></span>} key={'kpq='+kpq}/>
                    <FormField value={kiq} label={<span>K<sub>iq</sub></span>} key={'kiq='+kiq}/>
                    <div className="btn btn-primary float-start m-3" onClick={applyGains}>Apply Gains</div>
                </div>
            </form>
        </div>
    )
}