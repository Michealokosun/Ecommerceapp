import { useState } from "react";
import { CreateuserwithEmail } from "../libs/firebaseconfig";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const [registeruser, setregistruser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handlesubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    await CreateuserwithEmail(registeruser.email, registeruser.password);
    setloading(false);
    localStorage.setItem("user", JSON.stringify(registeruser));

    navigate("/signin");
  };

  const handleredisteredUser = (e) => {
    const input = e.target.value;
    const name = e.target.name;
    setregistruser({
      ...registeruser,
      [name]: input,
    });
  };
  return (
    <>
      <div className="flex h-[100%] flex-1 bg-[#161622] flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/images/logo.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10  text-center text-2xl/9 font-bold tracking-tight text-gray-200">
            Create your account!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handlesubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-[#fafafa]"
              >
                UserName
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  onChange={handleredisteredUser}
                  value={registeruser.username}
                  type="text"
                  required
                  autoComplete="username"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
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
                  onChange={handleredisteredUser}
                  required
                  value={registeruser.email}
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleredisteredUser}
                  required
                  value={registeruser.password}
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center text-[#fff]  bg-gradient-to-r from-[#FF8C00] to-[#FFA300]  rounded-md bg-indigo-600  py-3 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? "Registering user....." : "Register"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-[#a3a3a3]">
            Already a member?{" "}
            <Link
              to="/signin"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign in now!
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
