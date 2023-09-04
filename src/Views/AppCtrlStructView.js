import React, { useEffect, useLayoutEffect, useState } from "react";
import FormField from "../Components/FormField";
import { PowerBtn } from "../Components/PowerBtn";
import Plot from 'react-plotly.js';
import ReactSpeedometer from "react-d3-speedometer";
import ErrorMsg from "../Components/ErrorMsg";
import objectHash from "object-hash";

const timeStepMs = 100;
const nTimeSteps = 100;
const timeAxis = [...Array(nTimeSteps).keys()].map((val)=>{
    return timeStepMs*val/1000.0;
})

let idAxis = Array(nTimeSteps)
let iqAxis = Array(nTimeSteps)
let sAxis = Array(nTimeSteps)

export default function AppCtrlStructView ()
{
    const [idreq, setIdreq] = useState(0)
    const [iqreq, setIqreq] = useState(0)
    const [sreq, setSreq] = useState(0)

    const [, setIdact] = useState(0)
    const [, setIqact] = useState(0)
    const [sact, setSact] = useState(0)


    const [trqCtrl, setTrqCtrl] = useState(false)
    const [onState, setOnState] = useState(false)
    const [connStat, setConnStat] = useState(true)

    const [intervalId, setIntervalId] = useState(0)

    const [,setTicks] = useState(0)
    const pcm = document.getElementById('pcm').data
    /*const pcm = {
        WriteVariable:(variable,value)=>{return new Promise((onSuccess,onFailure)=>{onSuccess()})},
        ReadVariable:(variable,value)=>{return new Promise((onSuccess,onFailure)=>{onSuccess({data:1})})},
        _socket:{
            OPEN:0,
            readyState:0,
        }
    }*/
    useEffect(()=>{
        if (onState && connStat && !intervalId)
        {
            pcm.ReadVariable('TqCtrlSwitch')
                .then((response)=>{
                    setTrqCtrl(response.data);
                })
                .catch(()=>setConnStat(false));
            setIntervalId(setInterval(()=>{
                console.log('1');
                setTicks((oldTicks)=>oldTicks+1)
                if (pcm._socket.readyState===pcm._socket.OPEN)
                {
                    pcm.ReadVariable('ID')
                        .then((response)=>{
                            const newId=Number(response.data);
                            idAxis.push(newId);
                            idAxis.shift();
                            setIdact(newId);
                        })
                        .catch(()=>setConnStat(false));

                    pcm.ReadVariable('IQ')
                        .then((response)=>{
                            const newIq=Number(response.data);
                            iqAxis.push(newIq);
                            iqAxis.shift();
                            setIqact(newIq);
                        })
                        .catch(()=>setConnStat(false));

                    pcm.ReadVariable('SpeedActRpm')
                        .then((response)=>{
                            const newS=Number(response.data)
                            sAxis.push(newS);
                            sAxis.shift();
                            setSact(newS);
                        })
                        .catch(()=>setConnStat(false));
                }
                else
                {
                    setConnStat(false);
                }
            },timeStepMs))
        }
        else if (!(onState && connStat)&&intervalId!==0)
        {
            clearInterval(intervalId);
            setIntervalId(0);
        }
    },[onState,connStat])
    
    useEffect(()=>{
        return ()=> {
            console.log(intervalId);
            if (intervalId!==0)
            {
                clearInterval(intervalId);
            }
        }
    },[intervalId])

    const currentGraphData = [
        {
            x: timeAxis,
            y: idAxis,
            type: 'scatter',
            mode: 'lines',
            marker: {color: 'red'},
            name:'idAct',
        },
        {
            x: timeAxis,
            y: Array(nTimeSteps).fill(idreq),
            type: 'scatter',
            mode: 'lines',
            line: {
                dash: 'dash',
                color: 'red',
            },
            name:'idRef',
        },
        {
            x: timeAxis,
            y: iqAxis,
            type: 'scatter',
            mode: 'lines',
            marker: {color: 'blue'},
            name:'iqAct',
        },
        {
            x: timeAxis,
            y: Array(nTimeSteps).fill(iqreq),
            type: 'scatter',
            mode: 'lines',
            line: {
                dash: 'dash',
                color: 'blue',
            },
            name:'iqRef',
        },
    ];
    const speedGraphData = [
        {
            x: timeAxis,
            y: sAxis,
            type: 'scatter',
            mode: 'lines',
            marker: {color: 'red'},
            name: "SpdAct",
        },
        {
            x: timeAxis,
            y: Array(nTimeSteps).fill(sreq),
            type: 'scatter',
            mode: 'lines',
            line: {
                dash: 'dash',
                color: 'red',
            },
            name: "SpdRef",
        },
    ];

    return (
        <div className='d-flex flex-column'>
            <div className='row bg-light'>
                <div className="d-flex flex-column col-md-3">
                    <h2 className="text-center ms-3 mb-5 pt-3">State Control</h2>
                    <PowerBtn isToggledOn={onState}
                        onToggleButton={(state)=>setOnState(state)}/>
                    <div className="container container-fluid p-3">
                        <h5>SpdAct [RPM]</h5>
                        <div style={{height:'200px'}}>
                            <ReactSpeedometer value={sact} maxValue={10000}/>
                        </div>
                    </div>
                </div>
                <form className="col-md-4 d-flex flex-column">
                    <h2 className="text-start ms-3 pt-3">Cascade Control Structure</h2>
                    <div className="d-flex flex-column w-100 ps-3">
                        <div className="ps-3 pe-3">
                            <h2 className="text-start pt-3">Current FOC</h2>
                            <FormField
                                value={idreq}
                                label={<span>idRef [A]</span>}
                                updateFn={(value)=>{
                                    setIdreq(value);
                                    pcm.WriteVariable('ID_REF',Number(value));
                                }}
                            />
                            <FormField
                                value={iqreq}
                                label={<span>iqRef [A]</span>}
                                updateFn={(value)=>{
                                    setIqreq(value);
                                    pcm.WriteVariable('IQ_REF',Number(value));
                                }}
                            />
                            <button
                                type='button'
                                className={"btn w-100 " + ((trqCtrl)?'btn-success':'btn-danger')}
                                onClick={()=>{
                                    pcm.WriteVariable('TqCtrlSwitch',trqCtrl?0:1);
                                    setTrqCtrl(trqCtrl?false:true);
                                }}
                                disabled={!onState}>
                                {trqCtrl?"ENABLED":"DISABLED"}
                            </button>
                        </div>
                        <div className="mb-5 ps-3 pe-3 h-100">
                            <h2 className="text-start pt-3">Speed FOC</h2>
                            <FormField
                                value={sreq}
                                label={<span>SpdRef [rpm]</span>}
                                updateFn={(value)=>{
                                    setSreq(Number(value));
                                    pcm.WriteVariable('SPEED_CMD',Number(value));
                                }}
                            />
                            <div className='d-flex flex-row justify-content-center gap-2 mb-3'>
                                <button
                                    type='button'
                                    className='btn btn-success'
                                    disabled={!(trqCtrl===2) || !onState}
                                    onClick={()=>{
                                        let newS=sreq+100;
                                        setSreq(newS);
                                        pcm.WriteVariable("SPEED_CMD",newS)
                                    }}
                                >
                                    Increase
                                </button>
                                <button
                                    type='button'
                                    className='btn btn-danger'
                                    disabled={!(trqCtrl===2) || !onState}
                                    onClick={()=>{
                                        let newS=sreq-100;
                                        setSreq(newS);
                                        pcm.WriteVariable("SPEED_CMD",newS)
                                    }}
                                >
                                    Decrease
                                </button>
                            </div>
                            <button
                                type='button'
                                className={"btn w-100  " + ((!trqCtrl)?'btn-success':'btn-danger')}
                                onClick={()=>{
                                    pcm.WriteVariable('TqCtrlSwitch',trqCtrl?0:1);
                                    setTrqCtrl(trqCtrl?false:true);
                                }}
                                disabled={!onState}>
                                {(!trqCtrl)?"ENABLED":"DISABLED"}
                            </button>
                        </div>
                    </div>
                </form>
                <div className='d-flex flex-column col-md-5'>
                    <Plot
                        data={currentGraphData}
                        layout={{
                            height: 250,
                            margin:{b:70,t:20},
                            xaxis:{
                                title:{
                                    text:'Time [s]'
                                },
                                showticklabels:true,
                            },
                            yaxis:{
                                title:{
                                    text:'Current [A]'
                                }
                            }
                        }}
                        key={objectHash(currentGraphData)}
                    />
                    <Plot
                        data={speedGraphData}
                        layout={{
                            height: 250,
                            margin:{b:70,t:20},
                            xaxis:{
                                title:{
                                    text:'Time [s]'
                                },
                                showticklabels:true,
                            },
                            yaxis:{
                                title:{
                                    text:'Speed [rpm]'
                                }
                            }
                        }}
                        key={objectHash(speedGraphData)}
                    />
                </div>
            </div>
            {(!connStat) && <ErrorMsg>Couldn't retrieve data from kit; check your connection and refresh page.</ErrorMsg>}
        </div>
    )
}