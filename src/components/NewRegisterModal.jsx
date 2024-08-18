import React, { useContext, useState } from "react";
import { AppContext } from "../store/store";
import { MdCancel } from "react-icons/md";
import * as Yup from "yup";
import { auth, fireDB } from "../firebase/FirebaseConfig"; // Import Firebase auth and Firestore
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NewRegisterModal = () => {
  const { NewRegisterModal, dispatch } = useContext(AppContext);
  const [errors, setErrors] = useState("");
  const [formData, setFormData] = useState({
    RegisterName: "",
    RegisterEmail: "",
    RegisterPass: "",
    RegisterConfPass: "",
  });

  let userSchema = Yup.object({
    RegisterName: Yup.string().required("Name is required"),
    RegisterEmail: Yup.string()
      .email("Invalid Email")
      .required("Email is required"),
    RegisterPass: Yup.string()
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
    RegisterConfPass: Yup.string()
      .min(8, "Minimum 8 characters required")
      .max(10, "Maximum 10 characters required")
      .matches(/[A-Z]/, "Confirm Password must contain one Uppercase character")
      .matches(/[a-z]/, "Confirm Password must contain one Lowercase character")
      .matches(/[0-9]/, "Confirm Password must contain one Number")
      .matches(
        /[$&+,:;=?@#|'<>.-^*()%!]/,
        "Confirm Password must contain one Special Character"
      )
      .required("Confirm Password is required")
      .oneOf([Yup.ref("RegisterPass")], "Passwords must match"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        await userSchema.validate(formData, { abortEarly: false });

        // Normalize the email to lowercase
        const normalizedEmail = formData.RegisterEmail.toLowerCase();

        // Check if the email already exists in Firestore
        const usersRef = collection(fireDB, "users");
        const q = query(usersRef, where("RegisterEmail", "==", normalizedEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          toast.error("This email is already registered.");
            return;
        }

        // If email does not exist, proceed to create user
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            normalizedEmail,
            formData.RegisterPass
        );

        // Save user details in Firestore
        await addDoc(usersRef, {
            userId: userCredential.user.uid,
            RegisterName: formData.RegisterName,
            RegisterEmail: normalizedEmail,
            RegisterPass: formData.RegisterPass, // Not recommended to store passwords in plaintext
        });

        toast.success("Form submitted successfully");

        // Clear form data
        setFormData({
            RegisterName: "",
            RegisterEmail: "",
            RegisterPass: "",
            RegisterConfPass: "",
        });
        dispatch({ type: "SHOW_LOGINMODAL" });
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
    NewRegisterModal && (
      <div className="fixed inset-0 bg-black bg-opacity-[.9] flex items-center justify-center z-[9996] font-playfair">
        <div className="bg-[#ffdc00] p-6 rounded-lg shadow-lg relative modal-slide-in min-w-[90vw] sm:min-w-[40vw]">
          <button
            className="absolute top-2 right-2 text-black hover:text-gray-700"
            aria-label="hide register form"
            onClick={() => {
              dispatch({ type: "HIDE_REGISTER_MODAL" });
            }}
          >
            <MdCancel className="text-4xl" />
          </button>

          <h2 className="text-center text-2xl font-black mb-2">
            Register here
          </h2>
          <hr className="border-2 border-black mb-4" />

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="flex flex-col space-y-4">
              <div>
                <label
                  htmlFor="RegisterName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name:
                </label>
                <input
                  type="text"
                  name="RegisterName"
                  id="RegisterName"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Your Full Name"
                  required
                  autoComplete="off"
                  onChange={handleOnChange}
                  value={formData.RegisterName}
                />
                <div className="errors">{errors.RegisterName}</div>
              </div>

              <div>
                <label
                  htmlFor="RegisterEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="RegisterEmail"
                  id="RegisterEmail"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Your Email"
                  required
                  autoComplete="off"
                  onChange={handleOnChange}
                  value={formData.RegisterEmail}
                />
                <div className="errors">{errors.RegisterEmail}</div>
              </div>

              <div>
                <label
                  htmlFor="RegisterPass"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password:
                </label>
                <input
                  type="password"
                  name="RegisterPass"
                  id="RegisterPass"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter Your Password"
                  required
                  autoComplete="off"
                  onChange={handleOnChange}
                  value={formData.RegisterPass}
                />
                <div className="errors">{errors.RegisterPass}</div>
              </div>

              <div>
                <label
                  htmlFor="RegisterConfPass"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password:
                </label>
                <input
                  type="password"
                  name="RegisterConfPass"
                  id="RegisterConfPass"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Confirm Your Password"
                  required
                  autoComplete="off"
                  onChange={handleOnChange}
                  value={formData.RegisterConfPass}
                />
                <div className="errors">{errors.RegisterConfPass}</div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-black text-[#ffdc00] rounded w-full py-2 mt-5 hover:bg-gray-700"
              aria-label="Register button"
            >
              Register
            </button>
            <div className="flex items-center justify-between mt-4">
              <button
                className="text-blue-600 hover:underline text-base"
                aria-label="Show Login Form"
                onClick={() => {
                  dispatch({ type: "SHOW_LOGINMODAL" });
                }}
              >
                Already Registered? Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default NewRegisterModal;
