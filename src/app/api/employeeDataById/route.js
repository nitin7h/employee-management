import { NextResponse } from "next/server";
import { databaseConnection } from "@/database/connection/databaseConnection";
import Employee from "@/database/models/employeeModel";
export async function POST(req) {
    const uniqueId = await req.json();
    console.log("ID : ", uniqueId);

    const responsedata = await Employee.findOne({ uniqueId })
    console.log("responsedata : ", responsedata);

    return NextResponse.json({ message: "Good", data: responsedata })
}