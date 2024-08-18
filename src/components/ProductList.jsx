import React, { useState, useEffect, useRef, useContext, memo } from "react";
import ReactPaginate from "react-paginate";
import "../index.css";
import Rating from "react-rating";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { AppContext } from "../store/store.jsx";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css"; // Import styles for zoom
import { toast } from "react-toastify";

const itemsPerPage = 6;

const ProductList = () => {
  const {
    showProduct,
    priceFilter,
    ratingFilter,
    discountFilter,
    searchTerm,
    dispatch,
  } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null); // Track hovered product ID
  const productListRef = useRef(null);

  useEffect(() => {
    if (productListRef.current) {
      const element = productListRef.current;
      
      // Check screen width
      const isSmallScreen = window.innerWidth <= 640;
      const offset = isSmallScreen ? window.innerHeight * 0.25 : window.innerHeight * 0.15;
  
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, [
    currentPage,
    dispatch,
    priceFilter,
    ratingFilter,
    discountFilter,
    searchTerm,
  ]); // Dependency array includes currentPage
  

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  const currentItems = showProduct.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Filter handlers
  const handlePriceFilterChange = (e) => {
    dispatch({ type: "SET_PRICE_FILTER", payload: e.target.value });
  };

  const handleRatingFilterChange = (e) => {
    dispatch({ type: "SET_RATING_FILTER", payload: e.target.value });
  };

  const handleDiscountFilterChange = (e) => {
    dispatch({ type: "SET_DISCOUNT_FILTER", payload: e.target.value });
  };

  const handleSearchTermChange = (e) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: e.target.value });
  };

  return (
    <div
      className="px-2 sm:px-4 font-playfair pt-4"
      id="productList"
      ref={productListRef}
    >
      <h2 className="text-center text-[#ffdc00] font-black  text-xl sm:text-2xl mb-2 uppercase mqheading">
        Browse Our Exclusive Range
      </h2>

      <hr className="border border-t-5  border-[#ffdc00]" />
      <hr className="mt-3 mb-3 border border-t-5 border-[#ffdc00]" />
      {/* Filters */}
     

<div className="mb-3 flex flex-col gap-3 sm:flex-row sm:justify-between">
  <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
    <select
      value={priceFilter}
      onChange={handlePriceFilterChange}
      className="px-2 py-1 text-[#ffdc00] font-bold rounded bg-[#000] w-full sm:w-auto"
    >
      <option value="all">Select by Price</option>
      <option value="low">Under $150</option>
      <option value="high">Above $150</option>
    </select>

    <select
      value={ratingFilter}
      onChange={handleRatingFilterChange}
      className="px-2 py-1 text-[#ffdc00] font-bold rounded bg-[#000] w-full sm:w-auto"
    >
      <option value="all">Select by Rating</option>
      <option value="1">1 & up</option>
      <option value="2">2 & up</option>
      <option value="3">3 & up</option>
      <option value="4">4 & up</option>
      <option value="5">5</option>
    </select>

    <select
      value={discountFilter}
      onChange={handleDiscountFilterChange}
      className="px-2 py-1 text-[#ffdc00] font-bold rounded bg-[#000] w-full sm:w-auto"
    >
      <option value="all">Select by Discount</option>
      <option value="10">10% & up</option>
      <option value="15">15% & up</option>
      <option value="20">20% & up</option>
      <option value="25">25% & up</option>
    </select>
  </div>

  <input
    type="text"
    placeholder="Search by Name"
    value={searchTerm}
    onChange={handleSearchTermChange}
    className="px-2 py-1 text-[#ffdc00] font-bold rounded bg-[#000] w-full sm:w-[25vw] placeholder:text-[#ffdc00] border-none focus:border-none outline-none"
  />
</div>


      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {showProduct.length > 0 ? (
          currentItems.map((product) => {
            const discountedPrice = (
              parseFloat(product.price.replace("$", "")) *
              (1 - product.discount / 100)
            ).toFixed(2);

            const handleMouseEnter = (image) => {
              setHoveredProduct({ id: product.id, image });
            };

            const handleMouseLeave = () => {
              setHoveredProduct(null);
            };

            return (
              <div
                key={product.id}
                className=" mb-5 sm-mb-0 p-0 sm:p-4 rounded-lg bg-black text-white pb-3 "
                onMouseLeave={handleMouseLeave} // Reset hover state when mouse leaves the product
              >
                <Zoom>
                  <img
                    src={
                      hoveredProduct && hoveredProduct.id === product.id
                        ? hoveredProduct.image // Show hovered image
                        : product.mainimage // Show main image
                    }
                    alt={product.name}
                    className=" w-[100%] sm:w-[90%] sm:shadow-[0_0_2px_2px_#ffdc00] mx-auto h-60 object-fill mb-2 rounded transition-transform duration-800 ease-in-out hover:scale-[1.02]  "
                  />
                </Zoom>
                <div className="px-2 sm:px-5">
                  <h2 className="text-xl font-bold text-[#ffdc00] uppercase">
                    {product.name}
                    <span className="ms-2">
                      (
                      <Rating
                        initialRating={product.rating}
                        readonly
                        emptySymbol={
                          <FaRegStar className="text-gray-400 text-sm leading-2" />
                        }
                        fullSymbol={
                          <FaStar className="text-[#ffdc00] text-sm leading-2" />
                        }
                        placeholderSymbol={
                          <FaStarHalfAlt className="text-[#ffdc00] text-sm leading-2" />
                        }
                        fractions={2} // Allows for half-star ratings
                      />
                      )
                    </span>
                  </h2>
                  <p className="leading-2 mb-0">
                    Price:
                    <span className="text-[#ffdc00] font-black text-xl ms-2">
                      ${discountedPrice}/-
                    </span>
                    <span className="line-through ms-4  text-2xl">
                      ${product.price}
                    </span>
                    <span className="text-[#ffdc00] ms-6 text-xl font-bold">
                      {product.discount}% OFF
                    </span>
                  </p>

                  <p className="mb-4 leading-2">{product.description}</p>
                  <div className="flex items-center justify-start">
                    {product.sideimages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Side view ${index + 1}`}
                        className="h-8 w-8 rounded-lg mr-3 border border-1 border-[#ffcd00] cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(image)} // Update hover state on mouse enter
                      />
                    ))}
                  </div>
                  <button
                    className="float-end text-sm sm:text-base md:text-lg bg-[#ffdc00] text-black px-4 py-1 rounded font-bold transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#ffdc00]"
                    aria-label="Cart"
                    onClick={() => {
                      dispatch({
                        type: "ADD_TO_CART",
                        payload: {
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.mainimage,
                          quantity: 1,
                          discount: product.discount,
                        },
                      });
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className=" w-[98vw] py-10">
            <h2 className="text-3xl font-bold  uppercase text-center">
              No Data to Show{" "}
            </h2>
          </div>
        )}
      </div>

      {/* Pagination */}

      {showProduct.length > 0 ? (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(showProduct.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default memo(ProductList);
