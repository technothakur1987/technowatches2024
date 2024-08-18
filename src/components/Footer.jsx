import React from "react";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-[#ffdc00] py-8 font-playfair">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="text-center lg:text-left">
            <img
              src="https://i.ibb.co/1KcTqwG/technowatches-high-resolution-logo-transparent-2.png"
              alt="Techno-Watches Logo"
              className="h-12 mx-auto lg:mx-0 mb-4"
            />
            <h2 className=" text-lg sm:text-base font-bold text-[#ffdc00] uppercase mb-2 ">Techno-Watches</h2>
            <p className=" text-xs sm:text-base mb-4 leading-2">
              Discover our exclusive range of high-quality watches designed for Leaders.
            </p>
            <div className="flex justify-center lg:justify-start space-x-4 text-lg">
              <a href="https://www.facebook.com/technowatches" target="_blank" rel="noopener noreferrer" className="text-[#ffdc00] hover:text-yellow-500 transition-colors">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com/technowatches" target="_blank" rel="noopener noreferrer" className="text-[#ffdc00] hover:text-yellow-500 transition-colors">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/company/technowatches" target="_blank" rel="noopener noreferrer" className="text-[#ffdc00] hover:text-yellow-500 transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="https://www.instagram.com/technowatches" target="_blank" rel="noopener noreferrer" className="text-[#ffdc00] hover:text-yellow-500 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center lg:text-left">
            <h4 className="text-lg sm:text-base font-bold text-[#ffdc00] uppercase mb-4">Contact Us</h4>
            <p className="flex justify-center lg:justify-start items-center  mb-1 sm:mb-3 text-lg sm:text-base">
              <FaMapMarkerAlt className=" mr-1 sm:mr-2" />
              135, New Colony, Indore, M.P., 453441
            </p>
            <p className="flex justify-center lg:justify-start items-center mb-1 sm:mb-3 text-lg sm:text-base">
              <FaEnvelope className="mr-1 sm:mr-2" />
              <a href="mailto:vikrambais09021987@gmail.com" className="hover:text-yellow-500 transition-colors">
                vikrambais09021987@gmail.com
              </a>
            </p>
            <p className="flex justify-center lg:justify-start items-center uppercase text-lg sm:text-base">
              <FaPhone className="mr-1 sm:mr-2" />
              <a href="tel:+918109184732" className="hover:text-yellow-500 transition-colors">
                +91-8109184732
              </a>
            </p>
          </div>

          {/* Additional Information */}
          <div className="text-center lg:text-left">
            <h4 className="text-lg sm:text-base font-bold text-[#ffdc00] uppercase mb-4">About Us</h4>
            <p className="text-xs sm:text-base leading-2">
              Techno-Watches is dedicated to providing premium timepieces that combine elegance with precision. Our watches are designed to meet the highest standards of craftsmanship and style.
            </p>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-[#ffdc00] pt-4 text-center text-xs mt-8 leading-2">
          <p>&copy; {new Date().getFullYear()} Techno-Watches. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
