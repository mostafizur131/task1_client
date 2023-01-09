import React, { useContext } from "react";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      <header className="p-4 bg-gray-800 text-gray-100">
        <div className="container flex justify-between h-16 mx-auto">
          <Link
            to="/"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <p className="uppercase text-xl">Task</p>
          </Link>
          <ul className="items-stretch hidden space-x-3 lg:flex">
            <li className="flex">
              <Link
                to="/home"
                className="flex items-center px-4 -mb-1 hover:text-yellow-400"
              >
                Home
              </Link>
            </li>
          </ul>
          <div className="items-center flex-shrink-0 hidden lg:flex">
            {user?.email ? (
              <>
                <button
                  onClick={handleLogOut}
                  className="self-center px-8 py-3 font-semibold rounded bg-yellow-400 text-gray-900"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="self-center px-8 py-3 rounded">
                    Sign in
                  </button>
                </Link>
                <Link to="/register">
                  <button className="self-center px-8 py-3 font-semibold rounded bg-yellow-400 text-gray-900">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>
          <button className="p-4 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
