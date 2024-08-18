// src/App.jsx
import React, { useContext, useEffect } from "react";
import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";
import Product from "./components/ProductList.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";
import Swiperr from "./components/Swiperr.jsx";
import ClockLoader from "./components/ClockLoader.jsx";
import "./index.css";
import LoginModal from "./components/LoginModal.jsx";
import CartModal from "./components/CartModal.jsx";
import { fireDB } from "./firebase/FirebaseConfig.jsx";
import { collection, addDoc } from "firebase/firestore";
import { AppContext } from "./store/store.jsx";
import NewRegisterModal from "./components/NewRegisterModal.jsx";
import { ToastContainer } from 'react-toastify';
import ResetPassModal from "./components/ResetPassModal.jsx";


function App() {
  let { dispatch, allProducts ,LoginUserDetails} = useContext(AppContext);
  

  return (
    <>
    
      <ClockLoader /> 

      <Navbar />
      <Swiperr />
      <Product /> 
      
      <Footer />
      <ScrollToTopButton />
      <LoginModal />
      <CartModal />
      <NewRegisterModal/>
      <ResetPassModal/>
      <ToastContainer />
    </>
  );
}

export default App;
