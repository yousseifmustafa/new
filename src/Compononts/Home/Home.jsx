import React from "react";
import img from "../../assets/images/hero_image.png";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-lvh bg-gradient-to-t from-white to-pink-100 flex   ">
      <div className="w-1/2  flex items-center justify-start ms-12">
        <div className="font-semibold text-4xl">
          <p className="p-6 text-gray-500">
            SHOP
            <i class="fa-brands fa-shopify mx-3"></i>
          </p>

          <p className="p-6  text-gray-600">
            FROM <span className="italic text-main">YOUSSTRADE</span>
          </p>
          <p className="p-6 text-gray-700 flex items-center gap-3 justify-center">
            BEST PRODUCTS EVER
            <i class="fa-solid fa-face-smile-wink text-orange-300"></i>
          </p>

          <button 
          onClick={()=>{navigate("/AllProducts")}}
          className="px-12  m-6 text-lg  py-3 bg-orange-400 rounded-full hover:bg-orange-500">
            <div className="flex items-center justify-center gap-4">
              Shop Now
              <i class="fa-solid fa-arrow-right text-xl"></i>
            </div>
          </button>
        </div>
      </div>

      <div className="w-1/2  flex items-center justify-center">
        <div className="w-1/2">
          <img className="w-full " src={img} alt="" />
        </div>
      </div>
    </div>
  );
}
