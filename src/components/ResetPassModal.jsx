import React, { useContext, useState } from 'react';
import { AppContext } from '../store/store';
import { MdCancel } from "react-icons/md";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/FirebaseConfig'; // Make sure you export `auth` from FirebaseConfig

const ResetPassModal = () => {
  const { ResetModal, dispatch } = useContext(AppContext);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    resetEmail: '' // Field for the password reset email
  });

  const userSchema = Yup.object({
    resetEmail: Yup.string()
      .email("Invalid Email")
      .required("Email is required")
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form data
      await userSchema.validate(formData, { abortEarly: false });

      const { resetEmail } = formData;

      // Send password reset email
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent!");

      // Clear form data
      setFormData({ resetEmail: '' });
      dispatch({ type: "HIDE_RESETPASSMODAL" });
      dispatch({ type: "SHOW_LOGINMODAL" });

    } catch (error) {
      console.log(error);
      let newErr = {};
      if (error.message.includes("Firebase")) {
        newErr.resetEmail = "Failed to send password reset email.";
      } else {
        error.inner.forEach((err) => {
          newErr[err.path] = err.message;
        });
      }
      setErrors(newErr);
      toast.error("There were errors with your submission.");
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    ResetModal && (
      <div className="fixed inset-0 bg-black bg-opacity-[.9] flex items-center justify-center z-[9996] font-playfair">
        <div className="bg-[#ffdc00] p-6 rounded-lg shadow-lg relative modal-slide-in min-w-[90vw] sm:min-w-[40vw]">
          <button
            className="absolute top-2 right-2 text-black hover:text-gray-700"
            aria-label="hide reset password"
            onClick={() => {
              dispatch({ type: 'HIDE_RESETPASSMODAL' });
            }}
          >
            <MdCancel className='text-4xl' />
          </button>

          <h2 className='text-center text-2xl font-black mb-2'>Reset Password</h2>
          <hr className='border border-5 border-black' />
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className='py-2 mt-2'>
              <label htmlFor="resetEmail" className='read-only'>Email :</label>
              <input
                type="email"
                name="resetEmail"
                id="resetEmail"
                className='w-full p-2 rounded'
                placeholder='Enter your email here'
                required
                onChange={handleOnChange}
                value={formData.resetEmail}
                autoComplete="off"
              />
              <div className="errors">{errors.resetEmail}</div>
            </div>

            <button type="submit" className='bg-black text-[#ffdc00] rounded w-full py-2 mt-5 hover:bg-gray-700' aria-label="send link for reset password">Send Reset Email</button>
          </form>
        </div>
      </div>
    )
  );
};

export default ResetPassModal;
