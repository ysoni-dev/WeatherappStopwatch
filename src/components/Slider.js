import React, { useState, useEffect, useRef } from 'react';
import {Helmet} from 'react-helmet';
import ReactDOM from 'react-dom';
import {fetchweather} from '../api/fetchweather';
// import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import Swiper from 'react-id-swiper';
import 'swiper/swiper-bundle.css';



const sliderconfig = {
    containerClass: 'swiper-container',
    parallax: true,
    effect:'slide'
}


   
const Slider = () =>{
    const [parallaxSwiper,setParallaxSwiper] = useState(null);
    const [query, setQuery] = useState('') ;
    const [weather, setWeather] = useState({});
    const countRef = useRef(null);


    const search = async(e) =>{
            if(e.key === 'Enter'){
                const data = await fetchweather(query);
                setWeather(data);
                setQuery('');
            }
    }
   
    const currenttime = new Date().getHours();
    if(document.body){
        if (7<= currenttime && currenttime < 20) {
            document.body.className ="day";
        }
        else{
            document.body.className ="night";
        }
    }
  

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
                setMinutes(minutes++);
  
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

        

    

    
 return <Swiper {...sliderconfig} getSwiper={setParallaxSwiper}> 

<div className="main-container">
    <Helmet>
    <script src="https://kit.fontawesome.com/a076d05399.js"></script>
    </Helmet>
            <input type="text"className="search"placeholder="Type city name..."value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                 
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                     
                    </div>
                        <div className="more">
                            <span>Pressure: {weather.main.pressure}</span><hr></hr>
                            <span>Humidity: {weather.main.humidity}</span><hr></hr>
                            <span>Wind: {weather.wind.speed}</span><hr></hr>
                            <span>Visibility: {weather.visibility}</span><hr></hr>
                            <span>Timezone: {weather.id}</span>

                            
                        </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}
                        
                        </p>
                    </div>
                </div>  
            )}
        </div>

        {/* 2nd slide */}
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
                 {/* <div className="buttons">
                    <ul>
                {
                    !Active && !Pause ?
                    <li><i className="fas fa-stopwatch" onClick={watchstart}></i></li>
                
                    : (
                    Pause ? <li><i className="fas fa-pause " onClick={watchpause}></i></li> :
                    <li><i className="fas fa-play " onClick={watchresume}></i></li> 
                     )
            }
                      <li><i className="fas fa-stop " onClick={watchreset} disabled={!Active}></i></li>
                  </ul>
                 </div> */}
            
                   
        </div>

 </Swiper>
};

export default Slider;