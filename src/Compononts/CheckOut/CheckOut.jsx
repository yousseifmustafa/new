import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { useContext } from "react";
import { Cartcontext } from "../../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function CheckOut() {
  const { cartId, headers,clearUi } = useContext(Cartcontext);
  const [isOnline, setIsOnline] = useState("");

  const navigate = useNavigate();

  async function CreateOrder(values) {
    const shipping = {
      shippingAddress: {
        details: values?.details,
        phone: values?.phone,
        city: values?.city,
      },
    };

    if (isOnline) {
      onlinePaymentHandler(shipping);
    }
    if (!isOnline) {
      createCashOrder(shipping);
    }
    {
    }
  }

  const paymentFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: CreateOrder,
  });

  async function createCashOrder(shipping) {
    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${localStorage.getItem(
          "id"
        )}`,
        shipping,
        {
          headers,
        }
      )
      .then((res) => {

        clearUi()
        toast.success('Succeful payment',{
            position:"bottom-center",
        })
        console.log(res.data.data);
    })
    .catch((err) => {
          toast.error('Payment  Error',{
            position:"bottom-center"
          })
        console.log("error", err);
      });
  }

  async function onlinePaymentHandler(shipping) {
    

    await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${localStorage.getItem(
          "id"
        )}`,
        shipping,
        {
          headers,
          params: {
            url: "http://localhost:3000",
          },
        }
      )
      .then((res) => {
        window.open(res.data.session.url,'_self')
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  return (
    <div className="my-20">
      <form className=" max-w-sm mx-auto" onSubmit={paymentFormik.handleSubmit}>
        {paymentFormik.errors.phone && paymentFormik.touched.phone ? (
          <div className="mb-5">
            <label
              htmlFor="phone "
              className="block mb-2 text-sm font-medium ms-1"
            >
              {" "}
              Phone
            </label>
            <input
              onChange={paymentFormik.handleChange}
              value={paymentFormik.values.phone}
              onBlur={paymentFormik.handleBlur}
              type="tel"
              id="phone "
              className=" bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            />
            <div className="flex mt-3 items-center	 justify-start al ms-1">
              <i className="text-red-600  fa-solid fa-circle-exclamation"></i>
              <p className="text-red-600 font-medium  ms-1">
                {paymentFormik.errors.phone}
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
              Phone
            </label>
            <input
              onChange={paymentFormik.handleChange}
              value={paymentFormik.values.phone}
              onBlur={paymentFormik.handleBlur}
              type="text"
              id="phone"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-700 dark:focus:border-emerald-700 dark:shadow-sm-light"
              required
            />
          </div>
        )}

        {paymentFormik.errors.details && paymentFormik.touched.details ? (
          <div className="mb-5">
            <label
              htmlFor="details"
              className=" ms-1 block mb-2 text-sm font-medium"
            >
              {" "}
              details
            </label>
            <input
              onChange={paymentFormik.handleChange}
              value={paymentFormik.values.details}
              onBlur={paymentFormik.handleBlur}
              type="text"
              id="details"
              className=" bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            />

            <div className="flex mt-3 items-center	 justify-start al ms-1">
              <i className="text-red-600  fa-solid fa-circle-exclamation"></i>
              <p className="text-red-600 font-medium  ms-1">
                {paymentFormik.errors.details}
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-5">
            <label
              htmlFor="details"
              className="block ms-1 mb-2 text-sm font-medium text-gray-900 dark:text-emerald-700"
            >
              {" "}
              details
            </label>
            <input
              onChange={paymentFormik.handleChange}
              value={paymentFormik.values.details}
              onBlur={paymentFormik.handleBlur}
              type="text"
              id="details"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-700 dark:focus:border-emerald-700 dark:shadow-sm-light"
              required
            />
          </div>
        )}

        {paymentFormik.errors.city && paymentFormik.touched.city ? (
          <div className="mb-5">
            <label
              htmlFor="city"
              className="ms-1 block mb-2 text-sm font-medium"
            >
              {" "}
              city
            </label>
            <input
              onChange={paymentFormik.handleChange}
              value={paymentFormik.values.city}
              onBlur={paymentFormik.handleBlur}
              type="text"
              id="city"
              className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
            />

            <div className="flex mt-3 items-center	 justify-start al ms-1">
              <i className="text-red-600  fa-solid fa-circle-exclamation"></i>
              <p className="text-red-600 font-medium  ms-1">
                {paymentFormik.errors.city}
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-5">
            <label
              htmlFor="city"
              className="ms-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {" "}
              city
            </label>
            <input
              onChange={paymentFormik.handleChange}
              value={paymentFormik.values.city}
              onBlur={paymentFormik.handleBlur}
              type="text"
              id="city"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-700 focus:border-emerald-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-700 dark:focus:border-emerald-700 dark:shadow-sm-light"
              required
            />

            <div className="flex mt-5 items-center justify-center">
              <button
                type="submit"
                onClick={() => {
                  setIsOnline(false);
                }}
                className="text-white w-full ms-1  bg-gray-900 hover:bg-gray-950 p-3 rounded-xl   "
              >
                Pay Cash
              </button>
              <button
                type="submit"
                onClick={() => {
                  setIsOnline(true);
                }}
                className="text-white w-full ms-1 bg-gray-900 hover:bg-gray-950 p-3 rounded-xl    "
              >
                Online Payment
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
