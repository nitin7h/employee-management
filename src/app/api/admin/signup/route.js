import { NextResponse, NextApiResponse } from "next/server";
import Admin from "@/database/models/adminModel";
import { databaseConnection } from "@/database/connection/databaseConnection";
export async function POST(req) {
    const response = await req.json();
    console.log("Employee Response : ", response);
    const { fullName, email, username, password } = response
    await databaseConnection()

    const adminExist = await Admin.findOne({ email })
    console.log("adminExist : ", adminExist);

    if (adminExist) {
        if (adminExist.username === username) {
            return NextResponse.json({ message: "Username Allready Exist", data: false })
        }
        return NextResponse.json({ message: "Email Allready Exist", data: false })
    }

    const data = new Admin({
        fullName: fullName,
        email: email,
        username: username,
        password: password

    })

    await data.save()
    return NextResponse.json({ message: "Signup successfully", data })

}