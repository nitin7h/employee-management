"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storeAdminData } from "@/redux/slice/adminSlice";
import { useDispatch } from "react-redux";
export default function Login({ data }) {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const submitHandle = async (e) => {
    let rawdata = {
      username: e.get("username"),

      password: e.get("password"),
    };
    console.log("rawdata : ", rawdata);

    const { username, password } = rawdata;

    if (!username || !password) {
      return alert("Please fill all the fields");
    }
    navigate.push("/adminPannel");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(rawdata),
      });

      const responseData = await response.json();
      console.log("data : ", responseData);

      if (responseData.data === false) {
        return alert(responseData.message);
      }
      dispatch(storeAdminData(responseData.data));
      alert("Login Successfully");

      router.push("/adminPannel");
    } catch (error) {
      console.log(error);
    }
  };

  const submitFormData = async (e) => {};

  return (
    // <!-- component -->
    <>
      <div className="h-screen flex justify-center">
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form action={submitHandle} className="bg-white">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello !</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Welcome</p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="username"
                id=""
                placeholder="Username"
              />
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none"
                type="text"
                name="password"
                id=""
                placeholder="Password"
              />
            </div>
            <button
              type="submit"
              onClick={submitFormData}
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Login
            </button>
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
              <Link href={"/signup"}> want Signup ?</Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
