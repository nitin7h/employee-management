import React from "react";
import UpdateEmployee from "@/components/UpdateEmployee";
export default function page({ params }) {
  return <UpdateEmployee id={params.id}></UpdateEmployee>;
}
