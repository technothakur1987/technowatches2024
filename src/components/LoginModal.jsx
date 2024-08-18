import React, { useContext, useState } from 'react';
import { AppContext } from '../store/store';
import { MdCancel } from "react-icons/md";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getDocs, query, where, collection } from 'firebase/firestore';
import { fireDB, auth } from '../firebase/FirebaseConfig'; // Make sure you export `auth` from FirebaseConfig

const LoginModal = () => {
  const { LoginModal, dispatch } = useContext(AppContext);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    loginEmail: '',
    loginPass: ''
  });

  let userSchema = Yup.object({
    loginEmail: Yup.string()
      .email("Invalid Email")
      .required("Email is required"),
    loginPass: Yup.string()
      .min(8, "Minimum 8 characters required")
      .max(10, "Maximum 10 characters required")
      .matches(/[A-Z]/, "Password must contain one Uppercase character")
      .matches(/[a-z]/, "Password must contain one Lowercase character")
      .matches(/[0-9]/, "Password must contain one Number")
      .matches(
        /[$&+,:;=?@#|'<>.-^*()%!]/,
        "Password must contain one Special Character"
      )
      .required("Password is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Validate form data
      await userSchema.validate(formData, { abortEarly: false });
  
      const { loginEmail, loginPass } = formData;
  
      // Check if email exists in Firestore
      const usersRef = collection(fireDB, "users");
      const q = query(usersRef, where("RegisterEmail", "==", loginEmail));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        toast.error("This email is not registered.");
        return;
      }
  
      // Email exists, now validate password with Firebase Authentication
      try {
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPass);
        const user = userCredential.user;
  
        // Retrieve user details from Firestore
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
  
        // Store user details in local storage
        localStorage.setItem('TechnoWatch-user', JSON.stringify({
          id: userData.userId,
          email: user.email,
          name: userData.RegisterName // Assuming RegisterName is the field for the user’s name
        }));
  
        toast.success("Login successful!");
        setFormData({ loginEmail: "", loginPass: "" });
        dispatch({ type: "HIDE_LOGINMODAL" });
        let loginuserDetail = JSON.parse(localStorage.getItem('TechnoWatch-user')) 
        dispatch({ type: "SET_LOGIN_DETAIL", payload:loginuserDetail });


  
      } catch (authError) {
        toast.error("Invalid credentials..");
      }
  
    } catch (error) {
      console.log(error.inner);
      let newErr = {};
      error.inner.forEach((err) => {
        newErr[err.path] = err.message;
      });
      console.log(newErr);
      setErrors(newErr);
      toast.error("There were errors with your submission.");
    }
  };
  

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    LoginModal && (
      <div className="fixed inset-0 bg-black bg-opacity-[.9] flex items-center justify-center z-[9996] font-playfair">
        <div className="bg-[#ffdc00] p-6 rounded-lg shadow-lg relative modal-slide-in min-w-[90vw] sm:min-w-[40vw] ">
          <button
            className="absolute top-2 right-2 text-black hover:text-gray-700"
            aria-label="Hide Login Modal"
            onClick={() => {
              dispatch({ type: 'HIDE_LOGINMODAL' });
            }}
          >
            <MdCancel className='text-4xl' />
          </button>

          <h2 className='text-center text-2xl font-black mb-2'>Login here</h2>
          <hr className='border border-5 border-black'/>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className='py-2 mt-2'>
              <label htmlFor="loginEmail" className='read-only'>Email :</label>
              <input
                type="email"
                name="loginEmail"
                id="loginEmail"
                className='w-full p-2 rounded'
                placeholder='Enter Registered email here'
                required
                onChange={handleOnChange}
                value={formData.loginEmail}
                autoComplete="off"
              />
              <div className="errors">{errors.loginEmail}</div>
            </div>

            <div className='py-1'>
              <label htmlFor="loginPass" className='read-only'>Password :</label>
              <input
                type="password"
                onChange={handleOnChange}
                value={formData.loginPass}
                name="loginPass"
                id="loginPass"
                className='w-full p-2 rounded'
                placeholder='Enter Password here'
                required
                autoComplete="off"
              />
              <div className="errors">{errors.loginPass}</div>
            </div>

            <button type="submit" className='bg-black text-[#ffdc00] rounded w-full py-2 mt-5 hover:bg-gray-700' aria-label="Login">Login</button>
            <div className='flex items-center justify-between'> 
              <button className='mt-2 text-blue-600 hover:underline text-base'aria-label="reset password" onClick={() => {
                dispatch({ type: 'SHOW_RESETPASSMODAL' });
              }}>Forget Password?</button>
              <button className='mt-2 text-blue-600 hover:underline text-base' aria-label="register button" onClick={() => {
                dispatch({ type: 'SHOW_REGISTER_MODAL' });
              }}>New here? Register</button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default LoginModal;
