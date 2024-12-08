import { useEffect, useState } from "react";
import { createuserdoc, SigninUserwithemail } from "../libs/firebaseconfig";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Signin() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [userdetalils, setuserdetails] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      const storeduser = localStorage.getItem("user");
      setuserdetails(JSON.parse(storeduser));
    }
  }, []);

  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    const result = await SigninUserwithemail(
      userdetalils.email,
      userdetalils.password
    );
    console.log(result);

    if (result !== undefined) {
      navigate("/");
    }

    // toast.success("Login successful");
    setloading(false);
    console.log(result);
    localStorage.clear();
  };

  const handleform_input = (e) => {
    const input = e.target.value;
    const name = e.target.name;

    setuserdetails({ ...userdetalils, [name]: input });
  };
  return (
    <>
      <ToastContainer />
      <div className="flex h-[100%] flex-1 bg-[#161622] flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/images/logo.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-[#fafafa] text-center text-2xl/9 font-bold tracking-tight text-gray-200">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-[#fafafa]"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleform_input}
                  required
                  value={userdetalils.email}
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-[#fafafa]"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="/"
                    className="font-semibold text-[#fafafa] hover:text-[#b5b4b4]"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  onChange={handleform_input}
                  name="password"
                  value={userdetalils.password}
                  type="password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center text-[#fff]  bg-gradient-to-r from-[#FF8C00] to-[#FFA300]  rounded-md bg-indigo-600  py-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Loading..." : " Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-[#a3a3a3]">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Register now!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
