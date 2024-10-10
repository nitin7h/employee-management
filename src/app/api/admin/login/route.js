import { NextResponse, NextApiResponse } from "next/server";
import Admin from "@/database/models/adminModel";
import { databaseConnection } from "@/database/connection/databaseConnection";
export async function POST(req) {
    const response = await req.json();
    console.log("Employee Response : ", response);
    const { username, password } = response
    await databaseConnection()

    const adminExist = await Admin.findOne({ username, password })
    if (!adminExist) {
        return NextResponse.json({ message: "Invalid Login Details", data: false })
    }

    return NextResponse.json({ message: "Login successfully", data: adminExist })

}