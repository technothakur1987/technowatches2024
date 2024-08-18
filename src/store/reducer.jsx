// reducer.jsx
//
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_LOGINMODAL":
      
      return {
        ...state,
        LoginModal: true,
        NewRegisterModal: false,
        ResetModal: false,
        CartModal: false,
      };
    case "HIDE_LOGINMODAL":
      return {
        ...state,
        LoginModal: false,
      };

    case "SHOW_REGISTER_MODAL":
      

      return {
        ...state,
        NewRegisterModal: true,
        LoginModal: false,
        ResetModal: false,
        CartModal: false,
      };
    case "HIDE_REGISTER_MODAL":
      return {
        ...state,
        NewRegisterModal: false,
      };

    case "SHOW_CARTMODAL":
      return {
        ...state,
        CartModal: true,
        ResetModal: false,
        LoginModal: false,
        NewRegisterModal: false,
      };

    case "HIDE_CARTMODAL":
      return {
        ...state,
        CartModal: false,
      };

    case "SHOW_RESETPASSMODAL":
      return {
        ...state,
        CartModal: false,
        ResetModal: true,
        LoginModal: false,
        NewRegisterModal: false,
      };

    case "HIDE_RESETPASSMODAL":
      return {
        ...state,
        ResetModal: false,
      };

    case "SET_ALL_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload,
      };

    case "SHOW_PRODUCT":
      return {
        ...state,
        showProduct: action.payload,
      };

    case "SET_PRICE_FILTER":
      return { ...state, priceFilter: action.payload };
    case "SET_RATING_FILTER":
      return { ...state, ratingFilter: action.payload };
    case "SET_DISCOUNT_FILTER":
      return { ...state, discountFilter: action.payload };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };

    case "SET_LOGIN_DETAIL":
      return { ...state, LoginUserDetails: action.payload };

    case "LOG_OUT":
      localStorage.removeItem("TechnoWatch-user");
      return { ...state, LoginUserDetails: [] };

    case "ADD_TO_CART":
      // Store cart details in local storage

      let cart = JSON.parse(localStorage.getItem("TechnoWatch-cart"));

      /*if items is already present just increase the Qty or if not present then add it into cart*/

      const itemIndex = cart.findIndex((item) => {
        return item.id === action.payload.id;
      });

      if (itemIndex >= 0) {
        // If the item is already in the cart, increase its quantity
        cart[itemIndex].quantity += 1;
        toast.success("Item is already added ");
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        cart.push(action.payload);
        toast.success("Item is added to your Cart");
      }

      localStorage.setItem("TechnoWatch-cart", JSON.stringify(cart));

      return {
        ...state,
        CartDetails: JSON.parse(localStorage.getItem("TechnoWatch-cart")),
      };

    case "REMOVE_ITEM":
     let cartt = JSON.parse(localStorage.getItem("TechnoWatch-cart"));
      let updatedCart = cartt.filter((item)=>{
        return item.id !== action.payload
      })
     localStorage.setItem("TechnoWatch-cart", JSON.stringify(updatedCart));

      return {
        ...state,
        CartDetails: JSON.parse(localStorage.getItem("TechnoWatch-cart")),
      };


      case "UPDATE_QUANTITY":
  // Retrieve the current cart from local storage
  const carttt = JSON.parse(localStorage.getItem("TechnoWatch-cart"));

  // Update the cart based on the action payload
  const updatedCarttt = carttt.map(item => {
    if (item.id === action.payload.id) {
      // Adjust the quantity based on the change value
      const newQuantity = item.quantity + action.payload.change;
      // Ensure the quantity is not below 1
      return {
        ...item,
        quantity: Math.max(newQuantity, 1)
      };
    }
    return item;
  });

  // Save the updated cart back to local storage
  localStorage.setItem("TechnoWatch-cart", JSON.stringify(updatedCarttt));

  return {
    ...state,
    CartDetails: updatedCarttt,
  };


  case "CLEAR_CART":
   //clear the cart with TechnoWatch-cart only
   
   localStorage.setItem("TechnoWatch-cart", JSON.stringify([]));

    return {
      ...state,
      CartDetails: JSON.parse(localStorage.getItem("TechnoWatch-cart")),
    };


    default:
      return state;
  }
};

export { reducer };
