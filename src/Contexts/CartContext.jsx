import axios, { Axios } from "axios";
import React, { createContext, useState } from "react";

export const Cartcontext = createContext();

export default function CartContext({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [products, setProducts] = useState(null);
  const [price, setPrice] = useState(0);
  let [cartId, setCartId] = useState("");
  const headers = {
    token: localStorage.getItem("token"),
  };

  function clearUi() {
    setNumOfCartItems(0);
    setProducts(null);
    setPrice(0);
    
  }

  async function clearCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((res) => {
        GetCartItems;
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  async function removeFromCart(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers,
      })
      .then((res) => {
        // setCartId(res.data.data._id)
        setNumOfCartItems(res.data.numOfCartItems);
        setPrice(res.data.data.totalCartPrice);
        setProducts(res.data.data.products);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  async function updateCart(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count: count,
        },
        {
          headers,
        }
      )
      .then((res) => {
        setNumOfCartItems(res.data.numOfCartItems);
        setPrice(res.data.data.totalCartPrice);
        setProducts(res.data.data.products);
        console.log(res);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  async function AddProduct(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: id,
        },
        {
          headers,
        }
      )
      .then((res) => {
        // console.log("res",res);
        
        setNumOfCartItems(res.data.numOfCartItems);
        setCartId(res.data.cartId)
        localStorage.setItem("id",res.data.cartId)
        localStorage.setItem('userid',res.data.data.cartOwner)
        
        return true;
      })
      .catch((err) => {
        console.log(err);
        
        return false;
      });
  }

  async function GetCartItems() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((res) => {
        console.log(res);
        
        setNumOfCartItems(res.data.numOfCartItems);
        setPrice(res.data.data.totalCartPrice);

        setProducts(res.data.data.products);
        console.log(cartId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <Cartcontext.Provider
        value={{
          AddProduct,
          numOfCartItems,
          products,
          price,
          GetCartItems,
          updateCart,
          removeFromCart,
          clearCart,
          clearUi,
          headers,
        }}
      >
        {children}
      </Cartcontext.Provider>
      ;
    </>
  );
}
