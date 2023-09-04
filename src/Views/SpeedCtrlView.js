import React, { useState } from "react";
import FormField from "../Components/FormField";

export default function SpeedCtrlView ({motorParams})
{
    const [ts,setTs] = useState(.001);
    const [fn,setFn] = useState(23);
    const [eta,setEta] = useState(1);

    const [incUp, setIncUp] = useState(2000);
    const [incDn, setIncDn] = useState(2000);

    const [filterPoints, setFilterPoints] = useState(2);

    const [upperLimit, setUpperLimit] = useState(5);
    const [lowerLimit, setLowerLimit] = useState(-5);

    const [upperLimitScaled, setUpperLimitScaled] = useState(.625);
    const [lowerLimitScaled, setLowerLimitScaled] = useState(-.625);

    const [kp, setKp] = useState(1);
    const [ki, setKi] = useState(1);

    const [incUpScaled, setIncUpScaled] = useState(2000);
    const [incDnScaled, setIncDnScaled] = useState(2000);

    const calculateGains = function()
    {
        const kt = motorParams.kt;
        const j = motorParams.driveInertia;
        const b = 0;
        
        setKp((eta*4*Math.PI*fn*j-b)/kt);
        setKi(j*(2*Math.PI*fn)**2/kt);
        console.log(kp,ki)
    }

    const pcm = document.getElementById('pcm').data
    return (
        <div className='bg-light h-100'>
            <form className="row">
                <div className='d-flex col-md-6 pt-3 sticky-md-top align-items-center' >
                    <img className='img-fluid' src='images/speed_ctrl_loop.jpeg' />
                </div>
                <div className="d-flex flex-column col-md-3">
                    <h4 className="text-start ms-3 pt-3">Speed Ramp</h4>
                    <FormField value={incUp} updateFn={setIncUp} label='Inc Up [rpm/sec]' />
                    <FormField value={incDn} updateFn={setIncDn} label='Inc Down [rpm/sec]' />
                    <h4 className="text-start ms-3 pt-3">Loop Parameters</h4>
                    <FormField value={ts} updateFn={setTs} label={<span>T<sub>s</sub> [sec]</span>} />
                    <FormField value={fn} updateFn={setFn} label={<span>f<sub>0</sub> [Hz]</span>} />
                    <FormField value={eta} updateFn={setEta} label='ξ' />
                    <FormField value='Parallel' label='Type' />
                    <div className="btn btn-primary m-3"
                        onClick={calculateGains}>
                        Calculate K<sub>p</sub> and K<sub>i</sub>
                    </div>

                </div>
                <div className="d-flex flex-column col-md-3">
                    <h4 className="text-start ms-3 pt-3">Actual Speed Filter</h4>
                    <FormField value={filterPoints} updateFn={setFilterPoints} label='Filter Points [points#]' />

                    <h4 className="text-start ms-3 pt-3">Controller Limits</h4>
                    <FormField value={upperLimit} updateFn={setUpperLimit} label='Upper Limit [A]' />
                    <FormField value={lowerLimit} updateFn={setLowerLimit} label='Lower Limit [A]' />
                    <h4 className="text-start ms-3 pt-3">Controller Limits Scaled</h4>
                    <FormField value={upperLimitScaled} label='Upper Limit' />
                    <FormField value={lowerLimitScaled} label='Lower Limit' />

                    <h4 className="text-start ms-3 pt-3">Controller Constants</h4>
                    <FormField value={kp} label={<span>K<sub>p</sub></span>} key={'kp='+kp} />
                    <FormField value={ki} label={<span>K<sub>i</sub></span>} key={'ki='+ki}/>
                    <div className="btn btn-primary m-3"
                        onClick={()=>{
                            pcm.WriteVariable("KpSpd",kp)
                                .then(()=>console.log('kp is written'))
                                .catch(()=>console.log('failed to write kp'))
                            pcm.WriteVariable("KiSpd",ki)
                                .then(()=>console.log('ki is written'))
                                .catch(()=>console.log('failed to write ki'))
                        }}>Apply Gains
                    </div>
                </div>
            </form>
        </div>
    )
}
