import React, { useContext } from "react";
import img1 from "../../assets/images/slider-image-2.jpeg";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import Error from "../Error/error";
import Slider from "react-slick";
// import Cartcontext  from "../../Contexts/CartContext";
import { Cartcontext } from "../../Contexts/CartContext";

import toast from "react-hot-toast";
export default function ProductDetails() {
  const [number, setNumber] = useState(1);
  const { id } = useParams();
  const { AddProduct }= useContext(Cartcontext);
  function GetSpecifyProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  
  async function addhandler(id) {
    const res = await AddProduct(id);
    if(res){
      toast.success('Successfully Added !')
      setNumOfCartItems(numOfCartItems+1);  // This line may cause an issue
    }
    else{
      toast.error("This didn't work.");
    }
  }
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: "ProductDetails",
    queryFn: GetSpecifyProduct,
  });
  const object = data?.data.data;




  function inc() {
    setNumber(number + 1);
  }

  function dec() {
    if (number > 0) {
      setNumber(number - 1);
    }
  }

  if (isError) return <Error />;

  if (isLoading || isFetching) return <Loading />;


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0, 
    arrow:false, 
    vertical: true,
  
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };











  return (
    <>
      <div className="container m-auto  my-12 ">
        <div className=" grid grid-cols-2 gap-12   ">
          <div className=" flex  flex-row-reverse  gap-5  items-start  overflow-hidden">
            <div className="w-full  ">
              <img
                className="w-full"
                src={object?.imageCover}
                alt={object?.title}
              />
            </div>
            <br />

            <div className="flex  gap-3 flex-col w-1/3 ">
              <div className="slider-container ">
                <Slider {...settings}>
                  {object?.images.map((image) => {
                    return (
                      <>
                        <div className= " mt-4  " onClick={image}>
                          <img 
                            className="w-full"
                            src={`${image}`}
                            alt={object?.title}
                          />
                        </div>
                      </>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>

          <div >
            <div className="product_desc">
              <h2 className="font-bold text-4xl mb-4">{object?.title}</h2>
              <p className="">{object?.description}</p>
            </div>

            <div className="product_rating border-b-2 pb-6">
              <div class="flex items-start justify-between  pt-3">
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
                    {object?.ratingsAverage}
                  </p>
                </div>
              </div>
            </div>
            <div className="price py-6 border-b-2 ">
              <h2 className="font-bold text-2xl">
                <span className="text-orange-500 me-3">{object?.price} £</span>
                or
                <span className="text-orange-500 mx-3">
                  {Math.floor(object?.price / 6)} £
                </span>
                / month
              </h2>

              <p>suggested payment with 6 months special financing</p>
            </div>

            <div className="buttons">
              <div className="flex justify-start items-center mb-3">
                <div className="number_btn flex gap-7 m-3  rounded-3xl bg-gray-200  text-gray-950 px-3 py-1 justify-center items-center">
                  <i
                    onClick={dec}
                    className="cursor-pointer text-xl fa-solid fa-minus"
                  ></i>
                  <p className=" text-2xl">{number}</p>
                  <i
                    className="fa-solid fa-plus cursor-pointer text-xl"
                    onClick={inc}
                  ></i>
                </div>

                <div className="text-base">
                  only <span className="text-orange-400">{number} Items </span>{" "}
                  left!
                  <br />
                  Dont't miss it
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <button className="text-white rounded-3xl bg-emerald-800 px-16 py-3 hover:bg-emerald-900">
                    Buy now
                  </button>

                  <button onClick={()=>{addhandler(id)}} className="text-emerald-700 rounded-3xl bg-white border-emerald-700 border px-16 py-3 hover:text-emerald-900">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>

            <div className="border-2 p-3 mt-4 ">
              <div className="flex items-center gap-3 text-2xl ">
                <i class="fa-solid fa-truck-fast text-orange-400"></i>
                <p>FREE Delivery</p>
              </div>

              <p className="underline ps-10">
                Enter your postal code for Delivery availability
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
