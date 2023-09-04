import './App.css';
import MainView from './Views/MainView';
import ParamView from './Views/ParamView';
import NavBar from './Components/NavBar'
import { BrowserRouter, Routes, Route, HashRouter, MemoryRouter } from 'react-router-dom';
import CurrentCtrlView from './Views/CurrentCtrlView';
import SpeedCtrlView from './Views/SpeedCtrlView';
import AppCtrlStructView from './Views/AppCtrlStructView';
import { useState } from 'react';
import React from 'react';
function App() {
  const [motorParams, setMotorParams]= useState({
    polePairs : 3,
    statorRes : .288,
    statorLd : 4.68e-4,
    statorLq : 6.18e-4,
    ke : .058,
    kt : 4.711e-2,
    driveInertia : 2.5e-5,
    iphNom : 5,
    vphNom : 18,
    nReqMax : 3000,
    hwScales : {
      iMax : 0.04711,
      vDCBMax : 0,
    },
    alignment : {
     alignCurrent : .5,
     alignDuration : 0.00132, 
    }
  })

  return (
    <div className="App vh-100">
      <MemoryRouter>
        <NavBar />
        <Routes>
          <Route index element={<MainView />}/>
          <Route path="parameters" element={<ParamView motorParams={motorParams} setMotorParams={setMotorParams}/>}/>
          <Route path="current-control" element={<CurrentCtrlView motorParams={motorParams}/>}/>
          <Route path="speed-control" element={<SpeedCtrlView motorParams={motorParams}/>}/>
          <Route path="app-control-structure" element={<AppCtrlStructView/>}/>
        </Routes>
      </MemoryRouter>
    </div>
  );
}

export default App;
