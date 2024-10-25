import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function EmailVerification() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("/login");
  }

  async function verifyHandler(values) {
    setIsSubmitted(true);
    await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email: values.email,
      })
      .then((res) => {
        navigate("/CodeVerification");
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setIsSubmitted(false);
      });
  }

  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: verifyHandler,
  });

  return (
    <>
      <div className="w-100 bg-[#F9FAFB] flex justify-center pt-12 pb-24">

      
      <div className="w-1/3 bg-white  p-5 rounded-2xl">
        <h2 className=" pb-3 px-3 border-b-2	border-gray-300 mb-3 font-bold text-lg">
          Forgotten Password
        </h2>

        {/* <p className='text-lg  mb-4'>Please enter your email address or mobile number to search for your account.</p> */}

        <form onSubmit={emailFormik.handleSubmit}>
          <label
            htmlFor="email-address-icon"
            className="block px-3 mb-3 text-sm font-medium text-gray-900 dark:text-white"
            >Please enter your email address to send a verification code to the phone number linked to your account.
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            </div>
            <input
              required
              onBlur={emailFormik.handleBlur}
              onChange={emailFormik.handleChange}
              value={emailFormik.values.email}
              type="email"
              id="email"
              className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Your Email Address "
            />
          </div>

          <div className="flex gap-3 items-center justify-end me-4 border-t-2 py-6 ">
            <button
              className="px-4  py-2 rounded-xl bg-gray-300"
              onClick={cancelHandler}
            >
              {" "}
              Cancel
            </button>

            {isSubmitted ? (
              <div className="bg-transparent ">
                <ColorRing
                  visible={true}
                  height="40"
                  width="40"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["#fa9a5b"]}
                />
              </div>
            ) : (
              <button
                type="submit"
                //   onClick={emailFormik.handleSubmit}
                className="px-4  py-2 rounded-xl bg-main"
              >
                {" "}
                Enter Verification Code
              </button>
            )}
          </div>
        </form>
      </div>
    
      </div>
    </>
  );
}
