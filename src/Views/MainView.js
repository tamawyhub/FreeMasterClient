import React, {useState} from "react";
import { useSpring, animated } from '@react-spring/web'
import FormField from "../Components/FormField";

export default function MainView ()
{
    const [id, setId] = useState(0)
    const [iq, setIq] = useState(0)
    const [s, setS] = useState(0)
    const slideInSpring = useSpring({
        from: {x:"100%"},
        to: {x:"0%"}
    })

    const fadeInSpring = useSpring({
        from: {opacity:0},
        to: {opacity:1}
    })
    return (
        <div className='row'>
            <animated.div style={fadeInSpring} className='col-md-6 d-flex align-items-center justify-content-center'>
                <img className='w-100 d-flex align-items-center justify-content-center' src="images/HOME.png" id="explain"/>
            </animated.div>
            <animated.div className='d-flex flex-column ps-3 pt-3 justify-content-start col-md-6 bg-light z-3'
                style={slideInSpring}>
                <h3 className="text-start">Application concept</h3>
                <h5 className="text-start">
                A position and speed estimation method without position transducer is applied for 
                drives with Permanent Magnet Synchronous Motor (PMSM). By integrating methods, 
                i.e. using a speed reference for zero speed startup and low speed acceleration, and back-EMF for mid-high speed operation, 
                the rotor position can be estimated and controlled over the full speed range. In order to achieve correct operation from zero speed, 
                the two techniques are combined with a crossover function based on the speed reference.
                </h5>
            </animated.div>
        </div>
    );
}