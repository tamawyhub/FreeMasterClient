import React, { useEffect, useId, useState } from "react"
import "./PowerBtn.scss"
export function PowerBtn({isToggledOn, onToggleButton}) {
    const [toggledState, setToggledState] = useState(Boolean(isToggledOn))

    return (
      <div>
        <button className={"power_button " + (toggledState ? 'is-active' : '')}
          onClick={()=>{
            onToggleButton&&onToggleButton(!toggledState)
            setToggledState(!toggledState);
          }}>
          <div className="power_button__icon">
            <span className="power_button__icon__arrow"></span>
          </div>
        </button>
        <p className="power_status">{toggledState ? 'On': 'Off'}</p>
      </div>
    )
  }
  