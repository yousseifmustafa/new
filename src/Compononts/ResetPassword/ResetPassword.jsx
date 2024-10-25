import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
export default function ResetPassword() {
  let [isSubmited, setIsSubmited] = useState(false);
  const navigate = useNavigate();
  async function resetHandler(values) {
    await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email: values.email,
        newPassword: values.password,
      })
      .then((res) => {
        navigate("/Login");
        toast.success("Password Changed Succefully");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }

  const resetFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: resetHandler,

    validationSchema: yup.object().shape({
      password: yup
        .string()
        .required()
        .min(8, "Use 8 characters or more for your password"),
    }),
  });

  return (
    <div>
      <div className="w-100 bg-[#F9FAFB] flex justify-center pt-12 pb-24">
        <div className="w-1/3 bg-white  p-5 rounded-2xl">
          <div className="text-2xl font-bold text-center text-emerald-900">
            Reset password
          </div>

          <form
            className=" max-w-sm mx-auto"
            onSubmit={resetFormik.handleSubmit}
          >
            {resetFormik.errors.email && resetFormik.touched.email ? (
              <div className="my-5  ">
                <label
                  htmlFor="email"
                  className=" ms-1 block my-2 text-sm font-medium"
                >
                  {" "}
                </label>
                <input
                  placeholder="Enter Your Email Address"
                  onChange={resetFormik.handleChange}
                  value={resetFormik.values.email}
                  onBlur={resetFormik.handleBlur}
                  type="email"
                  id="email"
                  //   placeholder="Enter Your Email Address "
                  className=" bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                />

                <div className="flex mt-3 items-center	 justify-start al ms-1">
                  <i className="text-red-600  fa-solid fa-circle-exclamation"></i>
                  <p className="text-red-600 font-medium  ms-1">
                    {resetFormik.errors.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="my-5">
                <input
                  placeholder="Enter Your Email Address "
                  onChange={resetFormik.handleChange}
                  value={resetFormik.values.email}
                  onBlur={resetFormik.handleBlur}
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-700 dark:focus:border-emerald-700 dark:shadow-sm-light"
                  required
                />
              </div>
            )}

            {resetFormik.errors.password && resetFormik.touched.password ? (
              <div className="my-5">
                <input
                  placeholder="Enter Your New Password"
                  onChange={resetFormik.handleChange}
                  value={resetFormik.values.password}
                  onBlur={resetFormik.handleBlur}
                  type="password"
                  id="password"
                  className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                />

                <div className="flex mt-3 items-center	 justify-start al ms-1">
                  <i className="text-red-600  fa-solid fa-circle-exclamation"></i>
                  <p className="text-red-600 font-medium  ms-1">
                    {resetFormik.errors.password}
                  </p>
                </div>
              </div>
            ) : (
              <div className="my-5">
                <input
                  placeholder="Enter Your New Password"
                  onChange={resetFormik.handleChange}
                  value={resetFormik.values.password}
                  onBlur={resetFormik.handleBlur}
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
                    colors={["#fa9a5b  "]}
                  />
                </div>
              ) : (
                <button
                  type="submit"
                  className="text-white w-full ms-1 bg-main  focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-emerald-700 dark:hover:bg-emerald-700 dark:focus:ring-emerald-700"
                >
                  Reset Your Password
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
