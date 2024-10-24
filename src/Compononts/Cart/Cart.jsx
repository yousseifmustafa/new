import React, { useContext, useState } from "react";
import { Cartcontext } from "../../Contexts/CartContext";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [openModal, setOpenModal] = useState(true);
  const {
    AddProduct,
    numOfCartItems,
    products,
    price,
    GetCartItems,
    updateCart,
    removeFromCart,
    clearCart,
    clearUi,
  } = useContext(Cartcontext);

  const navigate = useNavigate();

  async function updateHandler(id, count) {
    const res = await updateCart(id, count);
    if (res) {
      toast.success("Updated!", { position: "bottom-center" });
    } else {
      toast.error("Error!", { position: "bottom-center" });
    }
  }

  async function removeHandler(id) {
    const resFlag = await removeFromCart(id);
    if (resFlag) {
      toast.success("Item removed", { position: "bottom-center" });
    } else {
      toast.error("Error removing item", { position: "bottom-center" });
    }
  }

  async function clearHandler() {
    const res = await clearCart();
    clearUi();
    if (res) {
      toast.success("Cart cleared!", { position: "bottom-center" });
    } else {
      toast.error("Error clearing cart", { position: "bottom-center" });
    }
  }

  function checkOutHandler() {
    toast.success("Only one step left!");
    navigate("/CheckOut");
    clearUi();
  }

  const { isLoading, isError } = useQuery({
    queryKey: "getProducts",
    queryFn: GetCartItems,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Cart Table */}
          <div className="w-full lg:w-2/3">
            {price === 0 ? (
              <div className="text-center text-3xl mt-24">
                <i className="fa-solid fa-cart-shopping"></i>
                <h1>Empty Cart</h1>
              </div>
            ) : (
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="px-4 py-3">Image</th>
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3">Qty</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product) => (
                    <tr key={product._id} className="bg-white border-b">
                      <td className="p-4">
                        <img
                          src={product.product.imageCover}
                          className="w-16 h-auto"
                          alt={product.product.title}
                        />
                      </td>
                      <td className="px-4 py-4 font-semibold">
                        {product.product.title}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              updateHandler(product.product._id, product.count - 1)
                            }
                            disabled={product.count === 1}
                            className="px-2 py-1 text-gray-500 border rounded-full"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="w-12 text-center mx-2 border rounded-full "
                            value={product.count}
                            readOnly
                          />
                          <button
                            onClick={() =>
                              updateHandler(product.product._id, product.count + 1)
                            }
                            className="px-2 py-1 text-gray-500 border rounded-full"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 font-semibold">
                        ${product.price}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          onClick={() => removeHandler(product.product._id)}
                          className="text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="w-full lg:w-1/3">
            <div className="sticky top-4 border border-gray-200 p-4 rounded-lg bg-gray-100">
              <h2 className="font-bold text-lg mb-3 text-emerald-950">
                Order Summary
              </h2>

              <form className="max-w-md mx-auto">
                <div className="relative mb-3">
                  <input
                    disabled
                    type="text"
                    className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="Coupon code"
                    required
                  />
                  <button
                    disabled
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-main hover:bg-main font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Apply
                  </button>
                </div>
              </form>

              <div className="flex justify-between mb-3">
                <div>
                  <p className="text-gray-400">
                    Subtotal (<span className="font-bold">{numOfCartItems}</span>{" "}
                    items)
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">
                    EGP <span className="font-bold">{price}</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-between mb-3">
                <div>
                  <p className="text-gray-400">Shipping Fee</p>
                </div>
                <div>
                  <p className="text-emerald-600 font-bold">FREE</p>
                </div>
              </div>

              <hr className="mb-3" />

              <div className="flex justify-between mb-3">
                <div>
                  <p className="text-emerald-950 font-bold text-lg">
                    Total{" "}
                    <span className="text-gray-400 text-sm">(Inclusive of VAT)</span>
                  </p>
                </div>
                <div>
                  <p className="text-emerald-950 font-bold text-lg">EGP {price}</p>
                </div>
              </div>

              <button
                className="w-full bg-main rounded-lg p-3 text-white hover:bg-main mt-4"
                type="button"
                onClick={checkOutHandler}
                disabled={price === 0}
              >
                Check Out
              </button>

              <button
                className="w-full bg-black rounded-lg p-3 text-white hover:bg-gray-950 mt-3"
                type="button"
                onClick={clearHandler}
              >
                Clear All Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
