import React, { useContext, useState } from "react";
import freshcartlogo from "../../assets/images/logo_big.png";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import Ycontext, { ycontext } from "../../Contexts/Ycontext";
import { Cartcontext } from "../../Contexts/CartContext";
import { Dropdown } from "flowbite-react";

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { numOfCartItems } = useContext(Cartcontext);
  const { userName, setToken, token ,email} = useContext(ycontext);
  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();
  function signout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <div className="  bg-white">
      <div className=" left-0 right-0 p-4  container m-auto  ">
        <nav className="flex justify-between  ">
          <div className="left_nav flex gap-3 items-center">
            <Link to={'/allproducts'}>
              <div className="flex  items-center justify-center gap-3">
                <img src={freshcartlogo} className="h-8" alt="fresh cart" />
                <p className="font-bold text-2xl text-[#FA9A5B] italic ">
                  YoussTrade
                </p>
              </div>
            </Link>
          </div>

          <div className="right_nav  ">
            <ul className="flex gap-3">
              {localStorage.getItem("token") == null ? (
                <>
                  {" "}
                  {/* <li className="gap-1 flex items-center justify-center    pl-2  border-black ">
                      <NavLink to={"/AllProducts"}>AllProducts</NavLink>
                    </li>

                   */}
                  <li className=" border-l-0  pl-2 text-lg border-black   relative gap-1 lg:flex items-center justify-center group hover:font-bold  hover:transition-all ">
                    <NavLink to={"/Cart"}>
                      <div className=" text-sm rounded-full border-2  px-1 bg-main   absolute left-5 font-bold text-black bottom-3">
                        {numOfCartItems}
                      </div>
                      <i class="fa-solid fa-cart-shopping group-hover:text-orange-500   transition-all  "></i>
                    </NavLink>
                  </li>
                  <div className="relative ms-5">
                    <Dropdown
                      label={
                        <i className="fa-solid fa-list absolute text-2xl text-black top-0 bottom-0 left-0 right-0"></i>
                      }
                    >
                      <Dropdown.Header>
                        <span className="block text-sm"> Please</span>
                        <span className="block truncate text-sm font-medium">
                          Log In Or Create Account
                        </span>
                      </Dropdown.Header>
                      <Dropdown.Item >
                        <li className="text-base gap-1 flex items-center justify-center      border-black ">
                          <NavLink to={"/AllProducts"}>AllProducts</NavLink>
                        </li>
                      </Dropdown.Item>
                      <Dropdown.Item className=" group  ">
                        <li className="relative  w-full  text-base">
                          <NavLink
                            to={"/Cart"}
                            className="flex items-center justify-between"
                          >
                            <div className="group-hover:font-bold">Cart</div>
                            <i class="fa-solid fa-cart-shopping  group-hover:font-bold "></i>
                          </NavLink>
                        </li>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <li className="  hover:font-bold text-base">
                          <NavLink to="/Login">Login</NavLink>
                        </li>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <li className="  text-base  hover:font-bold">
                          <NavLink to="/Register">Register</NavLink>
                        </li>
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </>
              ) : (
                ""
              )}

              {localStorage.getItem("token") != null ? (
                <>
                  <li className=" border-l-0  pl-2 text-lg border-black   relative gap-1 lg:flex items-center justify-center group hover:font-bold  hover:transition-all ">
                    <NavLink to={"/Cart"}>
                      <div className=" text-sm rounded-full border-2  px-1 bg-main   absolute left-5 font-bold text-black bottom-3">
                        {numOfCartItems}
                      </div>
                      <i class="fa-solid fa-cart-shopping group-hover:text-orange-500   transition-all  "></i>
                    </NavLink>
                  </li>

                  <div className="relative ms-5">
                    <Dropdown
                      label={
                        <i className="fa-solid fa-list absolute text-2xl text-black top-0 bottom-0 left-0 right-0"></i>
                      }
                    >
                      <Dropdown.Header>
                        <span className="block text-sm">Welcom {userName}</span>
                        <span className="block truncate text-sm font-medium">
                          {email}
                        </span>
                      </Dropdown.Header>
                      <Dropdown.Item>
                        <li className="gap-1 flex items-center justify-center      border-black ">
                          <NavLink to={"/AllProducts"}>AllProducts</NavLink>
                        </li>
                      </Dropdown.Item>
                      <Dropdown.Item className=" group ">
                        <li className="relative  w-full ">
                          <NavLink
                            to={"/Cart"}
                            className="flex items-center justify-between"
                          >
                            <div className="group-hover:font-bold">Cart</div>
                            <i class="fa-solid fa-cart-shopping  group-hover:font-bold "></i>
                          </NavLink>
                        </li>
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <li>
                          <span
                            className="cursor-pointer  hover:font-bold "
                            onClick={signout}
                          >
                            Sign out
                          </span>
                        </li>
                      </Dropdown.Item>
                    </Dropdown>
                  </div>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
