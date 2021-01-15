import React, { useState, useEffect, useRef } from 'react';
import {Helmet} from 'react-helmet';
import ReactDOM from 'react-dom';
import {fetchweather} from '../api/fetchweather';
// import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import Swiper from 'react-id-swiper';
import 'swiper/swiper-bundle.css';
import Weatherapp from './Weatherapp';
import Swatch from './Swatch';



const sliderconfig = {
    containerClass: 'swiper-container my-slider',
    parallax: true,
    effect:'slide'
}


   
const Slider = () =>{
    const [parallaxSwiper,setParallaxSwiper] = useState(null);
    const parallaxAmount = parallaxSwiper ? parallaxSwiper.width *0.95 :0;
    
    
 return <Swiper {...sliderconfig} getSwiper={setParallaxSwiper}> 
    <div className="my-slider">
    <div className="slide-image" data-swiper-parallax={parallaxAmount}>
    <Weatherapp/>
    </div>
    </div>

    <div className="my-slider">
    <div className="slide-image" data-swiper-parallax={parallaxAmount}>
    <Swatch/>
    </div>
    </div>

        

 </Swiper>
};

export default Slider;