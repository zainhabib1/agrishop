import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Public Asset/Logo1.png";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const NAV_LINKS = [
  { key: 1, label: 'Home', href: '/' },
  { key: 4, label: 'Products', href: '/product-page' },
  { key: 2, label: 'Biding', href: '/Bidding' },
  { key: 2, label: 'About us', href: '/aboutus' },
  { key: 3, label: 'Services', href: '/services' },
];

const Navbar = ({ userName, handleLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [signUpClicked, setSignUpClicked] = useState(false); // State for double-click


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };
   const handleSignUpDoubleClick = () => {
    setSignUpClicked(true);
  };

  return (
    <>
      <nav className="flex justify-between items-center w-full px-6 py-3 backdrop-blur-lg bg-transparent border-none">
        {/* Logo and Heading */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src={logo} alt="logo" className="w-12 h-12" />
          </Link>
          <Link to="/" className="text-lg font-bold text-gray-800">
            Agri Shop
          </Link>
        </div>

        {/* Conditional Rendering */}
        {isSidebarOpen ? (
          <h1 className="text-xl font-bold text-center w-full">Agri Shop</h1>
        ) : (
          <>
            {/* Navigation links */}
            <ul className="hidden lg:flex gap-6 items-center ml-8">
              {NAV_LINKS.map((link) => (
                <li key={link.key} className="text-gray-800 hover:underline">
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="hidden lg:flex items-center space-x-4 ml-auto">
              <Link
                to="/cart"
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <FaShoppingCart className="text-2xl" />
              </Link>
              {userName ? (
                <div className="relative">
                  <button
                    type="button"
                    className="px-4 py-2 text-white bg-green-700 hover:bg-green-800 rounded-full"
                    onClick={toggleDropdown}
                  >
                    {userName}
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 py-2 w-32 bg-white rounded-md shadow-xl z-10">
                      <button
                        onClick={() => {
                          handleLogout();
                          closeDropdown();
                        }}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                  !signUpClicked ? (
                   <Link
                        to="/signup"
                        className="px-4 py-2 text-white bg-green-700 hover:bg-green-800 rounded-full"
                        onDoubleClick={handleSignUpDoubleClick}
                    >
                      Sign Up
                    </Link>

                  ) :
                      <FaUser className="text-2xl cursor-pointer" />

                 )}
            </div>
          </>
        )}

        {/* Menu button for small screens */}
        <div className="flex lg:hidden items-center space-x-2">
          <button
            className="px-4 py-2 text-white bg-green-700 hover:bg-green-800 rounded-full"
            onClick={toggleSidebar}
          >
            Menu
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r transform transition-transform w-64 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex justify-between items-center">
          <button
            className="text-gray-800 font-bold text-xl"
            onClick={toggleSidebar}
          >
            ×
          </button>
          <span className="font-bold text-xl">Menu</span>
        </div>
        <ul className="mt-6 space-y-4 px-4">
          {NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link to={link.href} className="text-gray-800 hover:underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Sign Up Button in Sidebar */}
        <div className="mt-6 px-4">
          <Link
            to="/cart"
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <FaShoppingCart className="text-2xl" />
          </Link>

          {userName ? (
            <div className="relative">
              <button
                type="button"
                className="w-full px-4 py-2 text-white bg-green-700 hover:bg-green-800 rounded-full block mt-2"
                onClick={toggleDropdown}
              >
                {userName}
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-2 py-2 w-32 bg-white rounded-md shadow-xl z-10">
                  <button
                    onClick={() => {
                      handleLogout();
                      closeDropdown();
                    }}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
               !signUpClicked ?
                    (
                      <Link
                          to="/signup"
                           className="w-full px-4 py-2 text-white bg-green-700 hover:bg-green-800 rounded-full block mt-2"
                             onDoubleClick={handleSignUpDoubleClick}
                        >
                        Sign Up
                      </Link>
                   )
                    : <FaUser className="text-2xl cursor-pointer block mt-2" />


          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;