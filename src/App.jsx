import React from "react";
import {fetchweather} from './api/fetchweather';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/swiper-bundle.css';

import './components/DisplayTimer.css'
import Slider from './components/Slider';
import Weatherapp from "./components/Weatherapp";
import Swatch from "./components/Swatch";

const App = () =>{
 return(
       <Slider/>  
    )
};
export default App;