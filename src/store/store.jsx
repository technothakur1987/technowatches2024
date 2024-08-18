import React, { createContext, useReducer, useEffect } from "react";
import { reducer }from "./reducer";
import { query ,collection,onSnapshot,QuerySnapshot,orderBy } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";

// Create context
let AppContext = createContext();

// Provider
let initialState = {
    name:'technoWatches',
    LoginUserDetails:JSON.parse(localStorage.getItem('TechnoWatch-user')) || {},
    CartDetails:JSON.parse(localStorage.getItem('TechnoWatch-cart')) || [],
    LoginModal:false,
    CartModal:false,
    ResetModal:false,
    NewRegisterModal:false,
    allProducts:[],
    showProduct:[],
    priceFilter: 'all', // Add filter states
    ratingFilter: 'all',
    discountFilter: 'all',
    searchTerm: ''
};

let AppProvider = ({ children }) => {
  let [state, dispatch] = useReducer(reducer, initialState);

  const getAllProductFunction = async () => {
    
    try {
        const q = query(
            collection(fireDB, "products"),
            orderBy('id')
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let productArray = [];
            QuerySnapshot.forEach((doc) => {
                productArray.push({ ...doc.data()});
            });

            
            
            
           
            dispatch({type:'SET_ALL_PRODUCTS', payload:productArray})
            dispatch({type:'SHOW_PRODUCT', payload:productArray})
           
        });
        return () => data;
    } catch (error) {
        console.log(error);
        
    }
}

// Apply filters to products
const applyFilters = (products) => {
  let filteredProducts = [...products];

  // Apply price filter
  if (state.priceFilter === 'low') {
      filteredProducts = filteredProducts.filter(product => parseFloat(product.price.replace("$", "")) < 150);
  } else if (state.priceFilter === 'high') {
      filteredProducts = filteredProducts.filter(product => parseFloat(product.price.replace("$", "")) >= 150);
  }

  // Apply rating filter
  if (state.ratingFilter !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.rating >= parseFloat(state.ratingFilter));
  }

  // Apply discount filter
  if (state.discountFilter !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.discount >= parseInt(state.discountFilter));
  }

  // Apply search filter
  if (state.searchTerm) {
      filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(state.searchTerm.toLowerCase()));
  }

  return filteredProducts;
};

// Update filters and show products
const updateFilters = () => {
  dispatch({ type: 'SHOW_PRODUCT', payload: applyFilters(state.allProducts) });
};

useEffect(()=>{
  getAllProductFunction()

  // Check if 'TechnoWatch-cart' is not set in localStorage
  if (!localStorage.getItem('TechnoWatch-cart')) {
    // If not set, initialize it as an empty array
    localStorage.setItem('TechnoWatch-cart', JSON.stringify([]));
  }
  
  
},[])

useEffect(() => {
  updateFilters();
}, [state.priceFilter, state.ratingFilter, state.discountFilter, state.searchTerm]);



  useEffect(() => {
    console.log("State  in store:", state);
  }, [state]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
