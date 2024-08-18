# TechnoWatches

TechnoWatches is a modern watch shopping application built with React, utilizing the Context API with the `useReducer` hook for state management, and Firebase for authentication and data storage. The application features a dynamic user experience with advanced product browsing and checkout capabilities.

## Features

- **Swiper.js Integration**: Dynamically fetched swiper images for showcasing featured products.
- **Product List Filtering**: Filter products by price, rating, discount, and name.
- **Pagination**: Implemented using React-Pagination for easy navigation through product lists.
- **Image Zoom**: Hover over the main product image to view a zoomed-in version using the `react-medium-image-zoom` library.
- **Image Hover Effects**: Hover over side images to update the main image of the product.
- **Form Validation**: Managed with `yup` and user feedback with `react-toastify` for alerts and validation messages.
- **Dynamic Cart Display**: Cart items are shown in the navbar only when there are items in the cart.
- **Cart Page**: Displays all cart details. Checkout is only possible for logged-in users. Checkout data is stored in Firebase for future use in the admin panel.
- **Scroll-to-Top Button**: Easily navigate back to the top of the page with the scroll-to-top button.
- **Accessibilty**: used alt for images and aria-label for btn for disabled people.

## Technologies Used

- **React**: For building the user interface.
- **Context API**: State management with `useReducer` hook.
- **Firebase**: For authentication (create, login, forget password) and data storage.
- **Swiper.js**: For dynamic image sliders.
- **React-Pagination**: For pagination functionality.
- **react-medium-image-zoom**: For zooming into product images.
- **yup**: For form validation.
- **react-toastify**: For toast notifications and alerts.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/technowatches.git
   cd technowatches



   liveLink : https://technowatches2024.netlify.app/
