import React, { useContext } from 'react';
import { AppContext } from '../store/store';
import { MdCancel } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa";
import { fireDB, } from '../firebase/FirebaseConfig'; // Import Firestore utilities
import { collection, addDoc } from 'firebase/firestore';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const CartPage = () => {
  const { CartModal, dispatch, CartDetails, LoginUserDetails } = useContext(AppContext);

  

  const handleQuantityChange = (id, change) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, change } });
  };

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const calculateSubtotal = () => {
    return CartDetails.reduce((acc, item) => {
      const discountedPrice = item.price - (item.price * (item.discount / 100));
      const itemTotal = discountedPrice * item.quantity;
      return acc + itemTotal;
    }, 0).toFixed(2);
  };

  const calculateDiscount = () => {
    return 10; // Example fixed discount
  };

  const calculateTotal = () => {
    return (Number(calculateSubtotal()) - calculateDiscount()).toFixed(2);
  };

  const Checkout = async()=>{

    try {
      // Create a new order object
      const order = {
        user: {
          id: LoginUserDetails.id,
          name: LoginUserDetails.name,
          email: LoginUserDetails.email // Include any other relevant user details
        },
        cartItems: CartDetails,
        subtotal: calculateSubtotal(),
        discount: calculateDiscount(),
        total: Math.round(calculateTotal()),
        createdAt: new Date()
      };
  
      // Add order to Firestore
      const ordersCollection = collection(fireDB, 'orders');
      await addDoc(ordersCollection, order);
  
      // Clear cart and hide modal
      dispatch({ type: 'CLEAR_CART' });
      dispatch({ type: 'HIDE_CARTMODAL' });
  
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('There was an error placing your order. Please try again.');
    }

  }

  return (
    CartModal && (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9997] font-playfair">
        <div className="bg-white p-6 rounded-lg shadow-lg relative modal-slide-in w-[96vw] sm:w-[70vw] lg:w-[50vw] h-[90vh] overflow-auto">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            aria-label="Hide Cart page "
            onClick={() => dispatch({ type: 'HIDE_CARTMODAL' })}
          >
            <MdCancel className='text-3xl' />
          </button>

          <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>

          {CartDetails.length === 0 ? (
            <div className="text-center mt-12">
              <p className="text-lg font-semibold">Your cart is empty!</p>
              <p className="mt-4 text-gray-600">Please proceed to shopping and add some items to your cart.</p>
              <button
                className="mt-6 bg-yellow-500 text-black py-2 px-4 rounded font-bold transition-transform transform hover:scale-105"
                aria-label="Hide Cart page "
                onClick={() => dispatch({ type: 'HIDE_CARTMODAL' })}
              >
                Go Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {CartDetails.map(item => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <img src={item.image} alt={item.name} className="w-10 h-10 sm:w-20 sm:h-20 object-cover rounded-lg" />
                    <div className="flex-1 text-left ml-4">
                      <h3 className=" text-sm sm:text-lg font-semibold capitalize">{item.name}</h3>
                      <p className="text-sm text-gray-600">${(item.price - (item.price * (item.discount / 100))).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="bg-gray-200 text-gray-600 px-2 py-1 rounded-l hover:bg-gray-300"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity <= 1}
                        aria-label="Decrease item Qty in cart"
                      >
                        <FaMinus />
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-12 text-center bg-gray-100 border-t border-b border-gray-300"
                      />
                      <button
                        className="bg-gray-200 text-gray-600 px-2 py-1 rounded-r hover:bg-gray-300"
                        onClick={() => handleQuantityChange(item.id, 1)}
                        disabled={item.quantity >= 10}
                        aria-label="Increase item Qty in cart"
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <button
                      className="text-red-600 hover:text-red-800 ml-4"
                      aria-label="Remove item from cart"
                      onClick={() => removeItem(item.id)}
                    >
                      <MdCancel className="text-2xl" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-bold mb-4">Cart Summary</h3>
                <div className="flex justify-between text-sm sm:text-sm mb-2">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-sm mb-2">
                  <span>Delivery Charges:</span>
                  <span>${(10 / 100 * calculateSubtotal()).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-lg  font-semibold mb-4">
                  <span>Total:</span>
                  <span>${Math.round(calculateTotal())}.00</span>
                </div>
                {LoginUserDetails.name ? (
                  <button
                    className="w-full bg-yellow-500 text-black py-2 rounded font-bold transition-transform transform hover:scale-105"
                    aria-label="Checkout btn"
                    onClick={Checkout}
                  >
                    Checkout
                  </button>
                ) : (
                  <div className="text-center mt-4">
                    <p className="text-lg font-semibold">Please log in to proceed to checkout.</p>
                    <button
                      className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded font-bold transition-transform transform hover:scale-105"
                      aria-label="Log in button"
                      onClick={() => {
                       
                        dispatch({ type: 'SHOW_LOGINMODAL' })
                      }}
                    >
                      Log In
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default CartPage;
