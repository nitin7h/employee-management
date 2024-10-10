"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function UpdateEmployee({ id }) {
  const selector = useSelector((state) => state.employee);
  const selector2 = useSelector((state) => state.admin);

  const navigate = useRouter();

  console.log("id : ", id);

  const submitHandle = async (e) => {
    let rawdata = {
      fullName: e.get("fullName"),

      email: e.get("email"),
      mobileNumber: e.get("mobileNumber"),
      designation: e.get("designation"),
      gender: e.get("gender"),
      course: e.get("course"),
      uniqueId: id,
    };

    console.log("Update rawdata  : ", rawdata);

    const { fullName, email, mobileNumber, designation, gender, course } =
      rawdata;

    if (
      !fullName ||
      !email ||
      !mobileNumber ||
      !designation ||
      !gender ||
      !course
    ) {
      return alert("Please fill all the fields");
    }

    try {
      const response = await fetch("/api/employee", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(rawdata),
        // body: rawdata,
      });

      const responseData = await response.json();
      console.log("responseData : ", responseData);
      // dispatch(storeEmployeeData(responseData.data));

      //   if (data.data === false) {
      //     return toast.error(data.message);
      //   }

      alert(responseData.message);
      //   console.log("Response POST:", data);
      //   router.push(navigateTo);
    } catch (error) {
      console.log(error);
    }
  };

  const submitFormData = async (e) => {};

  useEffect(() => {
    if (selector2.adminData.length === 0) {
      navigate.push("/");
    }
  }, []);
  return (
    // <!-- component -->
    <>
      {selector2?.adminData.length > 0 ? (
        <div className="h-screen flex justify-center">
          <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
            <form action={submitHandle} className="bg-white">
              <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello !</h1>
              <p className="text-sm font-normal text-gray-600 mb-7">Welcome</p>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name="fullName"
                  placeholder="Full name"
                  id=""
                />
              </div>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name="email"
                  placeholder="E-mail"
                  id=""
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none"
                  type="Number"
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  id=""
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <select name="designation" id="">
                  <option value="NULL">Designation</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <select name="gender" id="">
                  <option value="NULL">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="NA">NA</option>
                </select>
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <select name="course" id="">
                  <option value="NULL">Course</option>
                  <option value="MCA">MCA</option>
                  <option value="BCA">BCA</option>
                  <option value="BSC">BSC</option>
                </select>
              </div>

              <button
                type="submit"
                onClick={submitFormData}
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Update
              </button>
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                <Link href={"/employeeList"}> want Back ?</Link>
              </span>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
