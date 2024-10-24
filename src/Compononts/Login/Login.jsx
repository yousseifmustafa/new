import React, { useContext, useState } from "react";
import freshcartlogo from "../../assets/images/logo_big.png";
import img from "../../assets/images/hero_image.png";
import axios from "axios";
import { Formik, useFormik, Field, yupToFormErrors } from "formik";
import * as yup from "yup";
import { Navigate, useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { ycontext } from "../../Contexts/Ycontext";
import { useQuery } from "react-query";
import toast from "react-hot-toast";

export default function Login() {
  const { token, setToken, userName, setUserName,setEmail } = useContext(ycontext);

  let [errorMessage, setErrorMessage] = useState(null);
  let [successMessage, setSuccessMessage] = useState(null);
  let [isSubmited, setIsSubmited] = useState(false);

  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/EmailVerification");
  }

  async function login(values) {
    setIsSubmited(true);
    const data = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((x) => {
        localStorage.setItem("token", x.data.token);
        setToken(x.data.token);

        let username = x.data.user.name;
        let email = x.data.user.email;
        setUserName(username);
        setEmail(email);

        toast.success(`WELCOM BACK ${username.toUpperCase()}`);
        setTimeout(() => {
          navigate("/allproducts");
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
    setIsSubmited(false);
  }

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: login,

    validationSchema: yup.object().shape({
      email: yup
        .string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "INVALID EMAIL"
        )
        .required(),
      password: yup
        .string()
        .required()
        .min(8, "Use 8 characters or more for your password"),
    }),
  });

  return (<>

<div className="flex  bg-black h-auto " >

    <div className='w-full '>
      {errorMessage != null ? (
        <div className=" text-red-600  flex  w-full text-xl bg-red-100 my-5 p-3  justify-center items-center">
          <i className="fa-solid fa-circle-exclamation text-2xl mx-3"></i>
          <p>
            {errorMessage}
            {/* acount already exist{" "} */}
          </p>
        </div>
      ) : (
        ""
      )}

      {successMessage != null ? (
        <div className="text-[#FA9A5B]   w-full bg-[#FA9A5B] my-5 p-3 text-xl flex justify-center items-center ">
          <i className="fa-regular fa-circle-check  px-4 "></i>
          <p className=" text-2xl">
            {successMessage}
          </p>
        </div>
      ) : (
        ""
      )}

      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
         




         
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              


            <div className="flex  items-center justify-center gap-3 mb-12">
                <img src={freshcartlogo} className="h-8" alt="fresh cart" />
                <h1 class="text-xl font-bold leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-[#FA9A5B]">
                  Sign in to your account
                </h1>
              </div>




              <form
                class="space-y-4 md:space-y-6"
                onSubmit={loginFormik.handleSubmit}
              >
                {loginFormik.errors.email && loginFormik.touched.email ? (
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className=" ms-1 block mb-2 text-sm font-medium"
                    >
                      {" "}
                      E-mail
                    </label>
                    <input
                      onChange={loginFormik.handleChange}
                      value={loginFormik.values.email}
                      onBlur={loginFormik.handleBlur}
                      type="email"
                      id="email"
                      className=" bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                    />

                    <div className="flex mt-3 items-center	 justify-start al ms-1">
                      <i className="text-red-600  fa-solid fa-circle-exclamation"></i>
                      <p className="text-red-600 font-medium  ms-1">
                        {loginFormik.errors.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-5">
                    <label
                      htmlFor="email"
                      className="block ms-1 mb-2 text-sm font-medium text-gray-900 dark:text-emerald-700"
                    >
                      {" "}
                      E-mail
                    </label>
                    <input
                      onChange={loginFormik.handleChange}
                      value={loginFormik.values.email}
                      onBlur={loginFormik.handleBlur}
                      type="email"
                      id="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-700 dark:focus:border-emerald-700 dark:shadow-sm-light"
                      required
                    />
                  </div>
                )}

                {loginFormik.errors.password && loginFormik.touched.password ? (
                  <div className="mb-5">
                    <label
                      htmlFor="password"
                      className="ms-1 block mb-2 text-sm font-medium"
                    >
                      {" "}
                      password
                    </label>
                    <input
                      onChange={loginFormik.handleChange}
                      value={loginFormik.values.password}
                      onBlur={loginFormik.handleBlur}
                      type="password"
                      id="password"
                      className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                    />

                    <div className="flex mt-3 items-center	 justify-start al ms-1">
                      <i className="text-red-600  fa-solid fa-circle-exclamation"></i>
                      <p className="text-red-600 font-medium  ms-1">
                        {loginFormik.errors.password}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mb-5">
                    <label
                      htmlFor="password"
                      className="ms-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {" "}
                      password
                    </label>
                    <input
                      onChange={loginFormik.handleChange}
                      value={loginFormik.values.password}
                      onBlur={loginFormik.handleBlur}
                      type="password"
                      id="password"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-700 dark:focus:border-emerald-700 dark:shadow-sm-light"
                      required
                    />
                  </div>
                )}

                <div className="flex  font-bold items-center ">
                  {isSubmited ? (
                    <div className="bg-transparent ">
                      <ColorRing
                        visible={true}
                        height="40"
                        width="40"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={[['#FA9A5B']]}
                      />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="text-white w-full ms-1 bg-[#FA9A5B] hover:bg-[#FA9A5B] focus:ring-4 focus:outline-none focus:ring-[#FA9A5B] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#FA9A5B] dark:hover:bg-[#FA9A5B] dark:focus:ring-[#FA9A5B]"
                    >
                      LOGIN
                    </button>
                  )}
                </div>
              </form>

              <div className=" text-blue-700 flex underline cursor-pointer  justify-end">
                <p
                  onClick={() => {
                    handleNavigate();
                  }}
                >
                  {" "}
                  Forgotten password?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
    </>
  );
}
