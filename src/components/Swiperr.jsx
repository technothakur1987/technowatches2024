import React, { useContext, useEffect, useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {AppContext} from '../store/store'
import '../index.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/mousewheel';

// Import required modules
import { Pagination, Autoplay, Keyboard, Mousewheel } from 'swiper/modules';

const Swiperr = () => {

  let {allProducts, dispatch} = useContext(AppContext)
  const swiperRef = useRef(null);
  
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
    }
  }, []);
  
  return (
    <div className=' pt-[25vh] sm:pt-[15vh] bg-black pb-1' 
    >
      <Swiper
      ref={swiperRef}
        slidesPerView={5}
     loop={true}
       autoplay={{ delay: 1500, disableOnInteraction: false }} // Autoplay configuration
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        keyboard={{
          enabled: true, // Enable keyboard control
        }}
        mousewheel={{
          enabled: true, // Enable mousewheel control
        }}
        modules={[Pagination, Autoplay, Keyboard, Mousewheel]} // Include all required modules
        className="mySwiper bg-black "
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
      >


        {
          allProducts.map((pr)=>{
            return(
              <SwiperSlide key={pr.id}><img src={pr.mainimage} alt={pr.name} className='ob'/></SwiperSlide>
        
            )
          })
        }





      
      </Swiper>
    </div>
  );
}

export default Swiperr;
