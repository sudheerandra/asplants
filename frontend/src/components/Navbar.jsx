import { Link, NavLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assests } from "../assets/assests";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    setCartItems,
    token,
    setToken,
  } = useContext(ShopContext);

  //------------- USER LOGOUT -----------------
  const userLogoutHandler = () => {
    setProfileOpen(false);
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  //----------HANDLE PROFLE CLICK-------------
  const toggleProfileList = () => {
    if (token) {
      setProfileOpen(!profileOpen);
    } else {
      setProfileOpen(false);
      navigate("/login");
    }
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 font-medium">
        {/* Logo */}
        <Link to="/">
          <img src={assests.logo} className="w-32 sm:w-36" alt="logo" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex gap-6 text-sm text-gray-700">
          {["/", "/collection", "/about", "/contact"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 hover:text-green-700 transition ${
                  isActive ? "text-green-700 font-semibold" : ""
                }`
              }
            >
              <p>
                {path === "/"
                  ? "HOME"
                  : path.replace("/", "").toUpperCase()}
              </p>
              <hr className="w-2/4 border-none h-[2px] bg-green-700 hidden group-hover:block" />
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <img
            onClick={() => setShowSearch(true)}
            src={assests.search_icon}
            className="w-5 cursor-pointer hover:opacity-70"
            alt="search"
          />

          {/* Profile */}
          <div className="relative">
            <img
              onClick={toggleProfileList}
              src={assests.profile_icon}
              className="w-8 h-8 sm:w-9 sm:h-9 cursor-pointer rounded-full object-cover ring-1 ring-green-300 hover:ring-green-500 transition"
              alt="profile"
            />
            {token && profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg py-2 z-50">
                <p className="px-4 py-2 cursor-pointer hover:bg-green-50">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="px-4 py-2 cursor-pointer hover:bg-green-50"
                >
                  Orders
                </p>
                <p
                  onClick={userLogoutHandler}
                  className="px-4 py-2 cursor-pointer hover:bg-green-50"
                >
                  Logout
                </p>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img
              src={assests.cart_icon}
              className="w-6 hover:scale-110 transition"
              alt="cart"
            />
            <span className="absolute -right-2 -bottom-2 w-5 h-5 flex items-center justify-center text-xs bg-green-700 text-white rounded-full">
              {getCartCount()}
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <img
            onClick={() => setVisible(true)}
            src={assests.menu_icon}
            className="w-6 cursor-pointer sm:hidden hover:opacity-70"
            alt="menu"
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          visible ? "translate-x-0 w-64" : "translate-x-full w-64"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <p className="font-semibold text-lg">Menu</p>
            <button
              onClick={() => setVisible(false)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              ✖
            </button>
          </div>

          {/* Links */}
          <nav className="flex flex-col text-gray-700 mt-4">
            {["/", "/collection", "/about", "/contact"].map((path, i) => (
              <NavLink
                key={i}
                onClick={() => setVisible(false)}
                to={path}
                className={({ isActive }) =>
                  `px-6 py-3 hover:bg-green-50 transition ${
                    isActive ? "text-green-700 font-semibold" : ""
                  }`
                }
              >
                {path === "/" ? "HOME" : path.replace("/", "").toUpperCase()}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
