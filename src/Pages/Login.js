import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import registerImg from "../assets/images/login/login.jpg";
import toast from "react-hot-toast";
import SocialLogin from "../Pages/SocialLogin";
import { AuthContext } from "../context/AuthProvider";
const Login = () => {
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Log In
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
        toast.success("Log In Successfully");
        form.reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="hero w-full my-20">
      <div className="hero-content grid gap-7 md:grid-cols-2 flex-col lg:flex-row">
        <div>
          <img src={registerImg} alt="" className="w-5/6" />
        </div>

        <div className="card flex-shrink-0 w-full">
          <div className="card-body">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-200 text-gray-900">
              <h1 className="text-2xl font-bold text-center">Sign In</h1>
              <form
                onSubmit={handleLogin}
                className="space-y-6 ng-untouched ng-pristine ng-valid"
              >
                <div className="space-y-1 text-sm">
                  <label
                    htmlFor="email"
                    className="block text-gray-900 font-semibold"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-md border-2 border-gray-900 bg-gray-200 text-gray-900 focus:border-yellow-400"
                  />
                </div>
                <div className="space-y-1 text-sm">
                  <label
                    htmlFor="password"
                    className="block text-gray-900 font-semibold"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-md border-2 border-gray-900 bg-gray-200 text-gray-900 focus:border-yellow-400 "
                  />
                  <div className="flex justify-end text-xs text-gray-400">
                    <Link>Forgot Password?</Link>
                  </div>
                </div>
                <button className="block w-full p-3 text-center rounded-md text-gray-900 font-semibold bg-yellow-400">
                  Sign In
                </button>
              </form>
              <div className="flex items-center pt-4 space-x-1">
                <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
                <p className="px-3 text-center text-sm text-gray-400">
                  Login with social accounts
                </p>
                <div className="flex-1 h-px sm:w-16 bg-gray-700"></div>
              </div>
              <SocialLogin></SocialLogin>
              <p className="text-xs text-center sm:px-6 text-gray-400 font-semibold">
                Don't have an account?{" "}
                <Link to="/register" className="underline text-gray-500">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
