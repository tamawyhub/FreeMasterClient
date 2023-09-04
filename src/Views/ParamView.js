import React, { useId, useState } from "react";
import FormField from "../Components/FormField";

export default function MainView (props)
{
    const [motorParams, setMotorParams]=[props.motorParams,props.setMotorParams]

    return (
        <div className='bg-light'>
            <form className="row">
                <div className="col-lg-6 row">
                    <h4 className="text-start ms-3 pt-3">Motor Parameters</h4>
                    <div className='col-lg-6'>
                        <FormField value={motorParams.polePairs}
                            updateFn={(value)=>{
                                setMotorParams({...motorParams, polePairs: value});
                            }}
                            label='Pole Pairs [-]' />
                        <FormField value={motorParams.statorRes}
                            updateFn={(value)=>{
                                setMotorParams({...motorParams, statorRes: value});
                            }}
                            label='Stator Resistance [Ohm]'  />
                        <FormField value={motorParams.statorLd}
                            updateFn={(value)=>{
                                setMotorParams({...motorParams, statorLd: value});
                            }}
                            label='Stator D-axis Inductance [H]' />
                        <FormField value={motorParams.statorLq}
                            updateFn={(value)=>{
                                setMotorParams({...motorParams, statorLq: value});
                            }}
                            label='Stator Q-axis Inductance [H]' />
                        <FormField value={motorParams.ke}
                            updateFn={(value)=>{
                                setMotorParams({...motorParams, ke: value});
                            }}
                            label='ke  [V.sec/rad]' />
                    </div>
                    <div className='col-lg-6'>
                        <FormField value={motorParams.kt}
                            updateFn={(value)=>{
                                setMotorParams({...motorParams, kt:value});
                            }}
                            label='kt  [N.m/A]' />
                        <FormField value={motorParams.driveInertia}
                            updateFn={(value)=>{
                                setMotorParams({...motorParams, driveInertia: value});
                            }}
                            label='Drive Ineria [kg.m^2]' />
                        <FormField value={motorParams.iphNom}
                            updateFn={(value)=>{
                                setMotorParams({...motorParams, iphNom: value});
                            }}
                            label='Iph nom  [A]' />
                        <FormField value={motorParams.vphNom}
                            updateFn={(value)=>{
                                setMotorParams({...motorParams, vphNom: value});
                            }}
                            label='Vph nom  [V]' />
                        <FormField value={motorParams.nReqMax}
                            updateFn={(value)=>{
                                setMotorParams({...motorParams, nReqMax: value});
                            }}
                            label='N Required Max [rpm]' />
                    </div>
                </div>
                <div className="col-lg-3">
                    <h4 className="text-start ms-3 pt-3">Hardware Scales</h4>
                    <FormField value={motorParams.hwScales.iMax}
                        updateFn={(value)=>{
                            setMotorParams({
                                ...motorParams,
                                hwScales: {...motorParams.hwScales,
                                    iMax: value
                                }
                            });
                        }}
                        label='I max [A]' />
                    <FormField value={motorParams.hwScales.vDCBMax}
                        updateFn={(value)=>{
                            setMotorParams({
                                ...motorParams,
                                hwScales: {...motorParams.hwScales,
                                    vDCBMax: value
                                }
                            });
                        }}
                        label='V DCB max [V]' />
                    <h4 className="text-start ms-3 pt-3">Rotor Offset Detection Algorithm</h4> 
                    <FormField value={motorParams.alignment.alignCurrent}
                        updateFn={(value)=>{
                            setMotorParams({
                                ...motorParams,
                                alignment: {...motorParams.alignment,
                                    alignCurrent: value
                                }
                            });
                        }}
                        label='Align Current [A]' />
                    <FormField value={motorParams.alignment.alignDuration}
                        updateFn={(value)=>{
                            setMotorParams({
                                ...motorParams,
                                alignment: {...motorParams.alignment,
                                    alignDuration: value
                                }
                            });
                        }}
                        label='Align Duration  [sec]' />
                </div>
            </form>
        </div>
    );
}
