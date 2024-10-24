import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import {  useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import freshcartlogo from "../../assets/images/logo_big.png";
import toast from "react-hot-toast";

// import img_reg from '../../assets/images/reg_Img.webp '
export default function Register() {
  let [errorMessage, setErrorMessage] = useState(null);
  let [successMessage, setSuccessMessage] = useState(null);
  let [isSubmited, setIsSubmited] = useState(false);
  
  const navigate = useNavigate();
  async function postData(values) {
    setIsSubmited(true);
    const data = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((x) => {
        setSuccessMessage(x.data.message);
        toast.success(x.data.message);
        // console.log(x);
        setTimeout(() => {
          navigate("/Login");
          setSuccessMessage(null);
        }, 2000);
      })
      .catch((error) => {
       
        toast.error(error.response.data.message);
        setErrorMessage(error.response.data.message);
       
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      });
    setIsSubmited(false);
  }

  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    onSubmit: postData,

    validationSchema: yup.object().shape({
      name: yup
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(12, "Name can not exceed characters")
        .required(),
      email: yup
        .string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "INVALID EMAIL"
        )
        .required(),
      phone: yup
        .string()
        .matches(/^01[0125][0-9]{8}$/, "INVALID PHONE NUMBER")
        .required(),
      password: yup
        .string()
        .required()
        .min(8, "Use 8 characters or more for your password"),
      rePassword: yup
        .string()
        .oneOf(
          [yup.ref("password")],
          "Those passwords did not match. Try again."
        ),
    }),
  });

  return (
    <div className="reg">

<div className=" w-1/2 my-12  m-auto 	 ">
<div className=" bg-white   pb-6 rounded-2xl container">
  {/* <div className="flex items-center justify-center mt-3 ">
  <img src={freshcartlogo} alt="freshcartlogo" />
</div> */}
  <div className="flex  items-center justify-center gap-3 mb-3"> 

   <img className="h-14" src={freshcartlogo} alt="" />
  <h3 className="text-center my-6 text-main  text-4xl font-medium">
    Register now
  </h3>


  </div>

  <form
    className=" max-w-sm mx-auto"
    onSubmit={registerFormik.handleSubmit}
  >
    {registerFormik.errors.name && registerFormik.touched.name ? (
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium ms-1"
        >
          {" "}
          Name
        </label>
        <input
          onChange={registerFormik.handleChange}
          value={registerFormik.values.name}
          onBlur={registerFormik.handleBlur}
          type="text"
          id="name"
          className=" bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
        />
        <div className="flex mt-3 items-center	 justify-start al ms-1">
          <i className="text-red-600  fa-solid fa-circle-exclamation"></i>
          <p className="text-red-600 font-medium  ms-1">
            {registerFormik.errors.name}
          </p>
        </div>
      </div>
    ) : (
      <div className="mb-5">
        <label
          htmlFor="text"
          className="ms-1 block mb-2 text-sm font-medium text-gray-900 dark:text-emerald-700"
        >
          {" "}
          Name
        </label>
        <input
          onChange={registerFormik.handleChange}
          value={registerFormik.values.name}
          onBlur={registerFormik.handleBlur}
          type="text"
          id="name"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-700 dark:focus:border-emerald-700 dark:shadow-sm-light"
          required
        />
      </div>
    )}

    {registerFormik.errors.email && registerFormik.touched.email ? (
      <div className="mb-5">
        <label
          htmlFor="email"
          className=" ms-1 block mb-2 text-sm font-medium"
        >
          {" "}
          E-mail
        </label>
        <input
          onChange={registerFormik.handleChange}
          value={registerFormik.values.email}
          onBlur={registerFormik.handleBlur}
          type="email"
          id="email"
          className=" bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
        />

        <div className="flex mt-3 items-center	 justify-start al ms-1">
          <i className="text-red-600  fa-solid fa-circle-exclamation"></i>
          <p className="text-red-600 font-medium  ms-1">
            {registerFormik.errors.email}
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
          onChange={registerFormik.handleChange}
          value={registerFormik.values.email}
          onBlur={registerFormik.handleBlur}
          type="email"
          id="email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-700 dark:focus:border-emerald-700 dark:shadow-sm-light"
          required
        />
      </div>
    )}

    {registerFormik.errors.password &&
    registerFormik.touched.password ? (
      <div className="mb-5">
        <label
          htmlFor="password"
          className="ms-1 block mb-2 text-sm font-medium"
        >
          {" "}
          password
        </label>
        <input
          onChange={registerFormik.handleChange}
          value={registerFormik.values.password}
          onBlur={registerFormik.handleBlur}
          type="password"
          id="password"
          className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
        />

        <div className="flex mt-3 items-center	 justify-start al ms-1">
          <i className="text-red-600  fa-solid fa-circle-exclamation"></i>
          <p className="text-red-600 font-medium  ms-1">
            {registerFormik.errors.password}
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
          onChange={registerFormik.handleChange}
          value={registerFormik.values.password}
          onBlur={registerFormik.handleBlur}
          type="password"
          id="password"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-700 dark:focus:border-emerald-700 dark:shadow-sm-light"
          required
        />
      </div>
    )}

    {registerFormik.errors.rePassword &&
    registerFormik.touched.rePassword ? (
      <div className="mb-5">
        <label
          htmlFor="rePassword"
          className="ms-1 block mb-2 text-sm font-medium"
        >
          {" "}
          Repeat Password
        </label>
        <input
          onChange={registerFormik.handleChange}
          value={registerFormik.values.rePassword}
          onBlur={registerFormik.handleBlur}
          type="password"
          id="rePassword"
          className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
        />

        <div className="flex mt-3 items-center	 justify-start al ms-1">
          <i className="text-red-600  fa-solid fa-circle-exclamation"></i>
          <p className="text-red-600 font-medium  ms-1">
            {registerFormik.errors.rePassword}
          </p>
        </div>
      </div>
    ) : (
      <div className="mb-5">
        <label
          htmlFor="rePassword"
          className="ms-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {" "}
          Repeat Password{" "}
        </label>
        <input
          onChange={registerFormik.handleChange}
          value={registerFormik.values.rePassword}
          onBlur={registerFormik.handleBlur}
          type="password"
          id="rePassword"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-700 dark:focus:border-emerald-700 dark:shadow-sm-light"
          required
        />
      </div>
    )}

    {registerFormik.errors.phone && registerFormik.touched.phone ? (
      <div className="mb-5">
        <label
          htmlFor="tel"
          className="block mb-2 text-sm font-medium ms-1"
        >
          {" "}
          Phone
        </label>
        <input
          onChange={registerFormik.handleChange}
          value={registerFormik.values.phone}
          onBlur={registerFormik.handleBlur}
          type="tel"
          id="phone"
          className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
        />

        <div className="flex mt-3 items-center	 justify-start al ms-1">
          <i className="text-red-600  fa-solid fa-circle-exclamation"></i>
          <p className="text-red-600 font-medium  ms-1">
            {registerFormik.errors.phone}
          </p>
        </div>
      </div>
    ) : (
      <div>
        <label
          htmlFor="tel"
          className="block ms-1 mb-2 text-sm font-medium text-gray-900 dark:text-emerald-700"
        >
          {" "}
          Phone
        </label>
        <div className="mb-5">
          <input
            onChange={registerFormik.handleChange}
            value={registerFormik.values.phone}
            onBlur={registerFormik.handleBlur}
            type="tel"
            id="phone"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-700 dark:focus:border-emerald-700 dark:shadow-sm-light"
            required
          />
        </div>
      </div>
    )}
    <div className="flex items-start mb-5">
      <div className="flex items-center h-5">
        <input
          id="terms"
          type="checkbox"
          value=""
          className="w-4 h-4 border  ms-1  border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-emerald-700 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-emerald-700 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          required
        />
      </div>
      <label
        htmlFor="terms"
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        I agree with the{" "}
        <a
          href="#"
          className="text-emerald-900 hover:underline dark:text-emerald-700"
        >
          terms and conditions
        </a>
      </label>
    </div>

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
            colors={["#fa9a5b"]}
          />
        </div>
      ) : (
        <button
          type="submit"
          className="text-white w-full ms-1 bg-main  focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-700 dark:hover:bg-emerald-700 dark:focus:ring-emerald-700"
        >
          CREATE NEW ACCOUNT
        </button>
      )}
    </div>
  </form>
</div>

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
  <div className="text-emerald-900   w-full bg-emerald-200 my-5 p-3 text-xl flex justify-center items-center ">
    <i className="fa-regular fa-circle-check  px-4 "></i>
    <p className=" text-2xl">
      {successMessage}
      {/* account created{" "} */}
    </p>
  </div>
) : (
  ""
)}
</div>





      </div>
  );
}



