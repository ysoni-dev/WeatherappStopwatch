import React, { useState, useEffect, useRef } from 'react';
import './DisplayTimer.css'

function Swatch() {
    const countRef = useRef(null);

    let [seconds, setSeconds] = useState(0);
    let [minutes, setMinutes] =  useState(0);
    let [hours, setHours] = useState(0);
    const [Active, setActive] = useState(false);
    const [Pause, setPause] = useState(false);

    // for starting watch
    const watchstart =() =>{
        setActive (true)
        setPause (true)
        countRef.current = setInterval(() => {
            setSeconds(seconds++);
            if(seconds/60 === 1)
            {
                seconds =0;
                setMinutes(prevState => prevState + 1);
  
                if(minutes/60 === 1){
                    minutes=0;   
                    setHours(prevState => prevState + 1);
                }
            } 
           
          }, 1000);
    }

    // for pause
    const watchpause=()=>{
        setPause(false)
        clearInterval(countRef.current)
    }

    // for resuming time
    const watchresume=()=>{
        setPause(true)
        countRef.current = setInterval(() => {
            setSeconds(seconds++);
            if(seconds/60 === 1)
            {
                seconds =0;
                setMinutes(prevState => prevState + 1);
  
                if(minutes/60 === 1){
                    minutes=0;   
                    setHours(prevState => prevState + 1);
                }
            } 
           
          }, 1000);
        
    } 

    // for resetting time
    const watchreset =() =>{
        setPause(false)
        setActive(false)
        clearInterval(countRef.current)
        setSeconds(0)
        setMinutes(0)
        setHours(0)
    }

    let displayseconds = "0" +seconds.toString();
    if(seconds>9){
        displayseconds = seconds;
    }
    let displayminutes = "0" +minutes.toString();
    if(minutes>9){
        displayminutes = minutes;
    }
    let displayhours = "0" +hours.toString();
    if(hours>9){
        displayhours = hours;
    }

        


    return (
        <>
             <div className="maincontainer">
                
                <div className="cardd">
                <svg className="spinner" width="330px" height="330px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
     <circle className="path" fill="transparent" strokeWidth="1.5" cx="33" cy="33" r="30" stroke="url(#gradient)"/>
       <linearGradient id="gradient">
         <stop offset="50%" stopColor="#0ABDE3" stopOpacity="1"/>
         <stop offset="65%" stopColor="#ffffff" stopOpacity=".5"/>
         <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
       </linearGradient>
    
    <svg className="spinner-dot dot" width="5px" height="5px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg" x="37" y="1.5">
       <circle className="path" fill="#0ABDE3" cx="33" cy="33" r="30"/>
      
    </svg> 
  </svg> 
                <div className="display" contentEditable='true' dangerouslySetInnerHTML={{ __html:displayhours + ":" + displayminutes + ":" + displayseconds }}></div>
                </div>
               {/* buttons */}
                <div className="buttons">
                    
                {
                    !Active && !Pause ?
                    <button className="btn" onClick={watchstart}>START</button>
                
                    : (
                    Pause ? <button className="btn" onClick={watchpause}>PAUSE</button> :
                    <button className="btn" onClick={watchresume}>RESUME</button> 
                     )
            }
                      <button className="btn" onClick={watchreset} disabled={!Active}>RESET</button>
                 
                 </div>
                    
        </div>
        </>
    )
}

export default Swatch
