import { data } from "autoprefixer";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";
import Slider from "react-slick";
import { useQuery } from "react-query";
import Error from "../Error/error";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Cartcontext } from "../../Contexts/CartContext";
import toast, { Toaster } from "react-hot-toast";
import img1 from "../../assets/images/banner-4.jpeg";
import img2 from "../../assets/images/banner_women.png";
import img3 from "../../assets/images/banner_mens.png";
import img4 from "../../assets/images/banner_kids.png";

export default function AllProducts() {
  const { AddProduct, setNumOfCartItems, numOfCartItems } =
    useContext(Cartcontext);
  async function addhandler(id) {
    const res = await AddProduct(id);

    if (res) {
      toast.success("Successfully Added !");
      setNumOfCartItems(numOfCartItems + 1);
    } else {
      toast.error("Error Adding");
    }
  }

  function allProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: allProducts,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  var settings = {
    dots: false,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* <div className="container m-auto w-[1920px] h-[500px] mt-3  ">
        <div>
          <h3>
            <img className="w-full" src={img1} alt="" />
          </h3>
        </div>
      </div> */}

      <div className="container m-auto mt-12">
        <Slider {...settings}>
            <div>
            <img className="w-full"  src={img2} alt="banner" />
          </div>
          <div>
            <img className="w-full" src={img3} alt="banner" />
          </div>
          <div>
            <img className="w-full" src={img4} alt="banner" />
          </div>
        </Slider>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 justify-center w-full">
          {data.data.data.map((product) => (
            <div key={product._id}   className="w-full xl:w-1/6 lg:w-1/5 md:w-1/4 sm:w-full mx-12  md:mx-0 overflow-hidden group my-6 bg-transparent shadow-2xl rounded-xl hover:scale-110 transition-transform duration-300">
              <div>
                <div className="relative overflow-hidden ">
                 
                  <div
                    onClick={() => {
                      addhandler(product._id);
                    }}
                    className="absolute bottom-0 m-2 right-1    transition-opacity  rounded-full flex"
                  >
                    <i className=" fa-cart-plus fa-solid p-3 cursor-pointer rounded-full hover:text-orange-700 hover:font-extrabold bg-gray-100"></i>
                  </div>

                  <Link to={`/ProductDetails/${product._id}`}>
                    <img
                      src={product.imageCover}
                      className="w-full bg-[#F5F6F6]"
                      alt={product.title}
                    />
                  </Link>
                </div>

                <div className="flex justify-between pt-3">
                  <div className="mx-4">
                    <p className="text-sm">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </p>
                    <p className="text-xs font-light w-full  mt-2">
                      {product.description.split(" ").slice(0, 4).join(" ")}
                    </p>
                  </div>

                  {product.priceAfterDiscount ? (
                    <div className="flex gap-2 mx-4">
                      <p className="line-through text-red-700">
                        {product.price}
                      </p>
                      <p>{product.priceAfterDiscount}£</p>
                    </div>
                  ) : (
                    <div className="mx-4">
                      <p className="font-bold ">{product.price}£</p>
                    </div>
                  )}
                </div>

                <div>
                  <div class="flex items-start justify-between mx-4 mb-6  pt-3">
                    <div className="flex items-center justify-center">
                      <svg
                        class="w-4 h-4 text-yellow-300 me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                        {product.ratingsAverage}
                      </p>
                    </div>
                    <a
                      href="#"
                      class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white"
                    >
                      {product.ratingsQuantity} reviews
                    </a>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
