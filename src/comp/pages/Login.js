import React, { useState, useRef, useEffect } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "", // We'll still keep this for form handling
  });
  const [userName, setUserName] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


    useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
   const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


    const handleLogout = () => {
        setUserName(null);
        setFormData({ email: "", password: "" });
        setDropdownOpen(false)
        console.log('User logged out.');

    };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Login data submitted:", formData);
        try {
      const response = await fetch("http://127.0.0.1:8000/api/users/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const users = await response.json();
      const foundUser = users.find((user) => user.email === formData.email);

      if (foundUser) {
          setUserName(foundUser.full_name)
        console.log("User found:", foundUser.full_name);
      } else {
        setUserName(null)
         console.log("User not found for email:", formData.email);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
    const renderAuthSection = () => {
         if (userName) {
      return (
       <div ref={dropdownRef} className="relative">
                    <button
                        type="button"
                        className="mt-4 text-sm text-center text-[#01411c] font-medium"
                         onClick={toggleDropdown}
                       >

                            {userName}
                        </button>

                     {dropdownOpen && (
                    <div className="absolute right-0 mt-2 py-2 w-32 bg-white rounded-md shadow-xl z-10">
                         <button
                                onClick={handleLogout}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                            Logout
                          </button>
                        </div>
                         )}
        </div>
      )
         }

      return (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#01411c] focus:border-[#01411c] sm:text-sm"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#01411c] focus:border-[#01411c] sm:text-sm"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#01411c] text-white font-bold rounded-md hover:bg-[#005f40] focus:outline-none focus:ring-2 focus:ring-[#005f40] focus:ring-offset-2"
          >
            Log In
          </button>
        </form>
      {/* Sign Up Link */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-[#01411c] hover:underline font-medium"
          >
            Sign Up
          </a>
        </p>
        </>
      )

    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-[#01411c]">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Log in to continue to Agri Shop!
        </p>

         {renderAuthSection()}


      </div>
    </div>
  );
}