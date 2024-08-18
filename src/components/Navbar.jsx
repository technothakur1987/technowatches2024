import React,{useState, useContext, memo, useEffect} from 'react';
import { FaCartShopping, FaUserCheck } from "react-icons/fa6";
import { AppContext } from '../store/store.jsx';
import { IoLogOut } from "react-icons/io5";






const Navbar = () => {

  let {name, dispatch ,LoginUserDetails,CartDetails} = useContext(AppContext)
 

  

  

  return (
    <div className='z-[9995] bg-black text-[#ffdc00] h-[25vh] sm:h-[15vh] flex flex-col sm:flex-row items-center  justify-evenly sm:justify-between px-6 sm:px-8 font-playfair fixed w-screen shadow-[0_0_5px_4px_#ffdc00]'
    
    >
      <div className='flex items-center mb-0 mt-2 sm:mt-0'>
        <img 
          src='https://i.ibb.co/1KcTqwG/technowatches-high-resolution-logo-transparent-2.png' 
          alt="Logo" 
          className='h-[15vh] sm:h-[10vh] md:h-[12vh] object-contain'
        />
      </div>
      <div className='hidden lg:flex items-center text-center sm:text-left'>
        <h2 className='text-sm sm:text-2xl md:text-2xl uppercase text-center font-semibold'>
          Shop Timeless Styles for Every Moment
        </h2>
      </div>
      <div className='flex items-center mt-4 sm:mt-0 w-full sm:w-auto justify-around mb-4 sm:mb-0'>
        {
          LoginUserDetails.name?(<button 
            className='mr-2 sm:mr-6 text-xl sm:text-base md:text-lg bg-[#ffdc00] text-black px-4 py-1 rounded font-bold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ffdc00]'
            aria-label="Log out"
            onClick={()=>{
              
              dispatch({type:'LOG_OUT'})
              
            }}
            
            
          >
            <IoLogOut className='inline mr-1' />
            Log Out
          </button>):(<button 
            className='mr-2 sm:mr-6 text-xl sm:text-base md:text-lg bg-[#ffdc00] text-black px-4 py-1 rounded font-bold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ffdc00]'
            aria-label="Login"
            onClick={()=>{
              
              dispatch({type:'SHOW_LOGINMODAL'})
              
            }}
            
            
          >
            <FaUserCheck className='inline mr-1' />
            Login
          </button>)
        }
        
        <button 
          className='text-xl sm:text-base md:text-lg bg-[#ffdc00] text-black px-4 py-1 rounded font-bold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ffdc00]'
          aria-label="Cart"

          onClick={()=>{
            
            dispatch({type:'SHOW_CARTMODAL'})
            
          }}
          
        >
          <FaCartShopping className='inline mr-1' /> Cart 
          
          {
            CartDetails.length > 0 && <span className='bg-black h-[1rem] w-[1rem] rounded-full fixed top-[-35%]  end-0  text-[#ffdc00] flex justify-center items-center border border-[#ffdc00] p-3 '>
            <p className='text-base mb-0'>{CartDetails.length}</p>
          </span>
          }
          
        </button>
      </div>

    
     
    
    </div>
  );
}

export default memo(Navbar);
