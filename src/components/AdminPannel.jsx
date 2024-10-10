"use client";
import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
export default function AdminPannel() {
  const selector = useSelector((state) => state.admin);
  const navigate = useRouter();

  console.log("selector :  ", selector?.adminData[0]);

  useEffect(() => {
    if (selector.adminData.length === 0) {
      navigate.push("/");
    }
  }, []);
  return (
    <>
      {/* <Navbar></Navbar> */}
      {selector?.adminData.length > 0 ? (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <h1 className="text-2xl font-bold">Admin Pannel</h1>
          </main>
        </div>
      ) : null}
    </>
  );
}
