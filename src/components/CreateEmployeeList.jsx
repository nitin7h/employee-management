"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storeEmployeeData } from "@/redux/slice/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { set } from "mongoose";

export default function CreateEmployeeList() {
  const selector = useSelector((state) => state.admin);

  const navigate = useRouter();

  console.log("selector :  ", selector.adminData);
  const dispatch = useDispatch();
  const submitHandle = async (e) => {
    const filedata = e.get("image");
    console.log("filedata : ", filedata);
    console.log("filedata.type : ", filedata.type.split("/")[1]);

    const imageUrl = `${
      e.get("mobileNumber") + "." + filedata.type.split("/")[1]
    }`;
    let rawdata = {
      fullName: e.get("fullName"),

      email: e.get("email"),
      mobileNumber: e.get("mobileNumber"),
      designation: e.get("designation"),
      gender: e.get("gender"),
      course: e.get("course"),
      image: imageUrl,
    };

    const {
      fullName,
      email,
      mobileNumber,
      designation,
      gender,
      course,
      image,
    } = rawdata;

    if (
      !fullName ||
      !email ||
      !mobileNumber ||
      !designation ||
      !gender ||
      !course ||
      !image
    ) {
      return alert("Please fill all the fields");
    }

    // if (
    //   filedata.type.split("/")[1] !== "jpeg" ||
    //   filedata.type.split("/")[1] !== "png"
    // ) {
    //   return alert("Please Upload image Type as PNG/GPEG");
    // }
    try {
      const data = new FormData();
      data.append("image", filedata);
      data.append("mobileNumber", e.get("mobileNumber"));
      console.log("data 555 : ", data);

      const imageResponse = await fetch("/api/image", {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
        },

        body: data,
      });

      const imageResponseData = await imageResponse.json();
      console.log("imageResponseData : ", imageResponseData);
    } catch (error) {}

    try {
      const response = await fetch("/api/employee", {
        method: "POST",
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
    if (selector.adminData.length === 0) {
      navigate.push("/");
    }
  }, []);

  return (
    // <!-- component -->
    <>
      {selector?.adminData.length > 0 ? (
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
                  id=""
                  placeholder="Full name"
                />
              </div>

              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none"
                  type="text"
                  name="email"
                  id=""
                  placeholder="Email Address"
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none"
                  type="Number"
                  name="mobileNumber"
                  id=""
                  placeholder="Mobile Number"
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
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <input
                  className="pl-2 outline-none border-none"
                  type="file"
                  name="image"
                  id=""
                  placeholder="Upload Image"
                  // onChange={(e) => setFile(e.target.files?.[0])}
                />
              </div>

              <button
                type="submit"
                onClick={submitFormData}
                className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
              >
                Register
              </button>
              <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                <Link href={"/adminPannel"}> want Home ?</Link>
              </span>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
