import { NextResponse } from "next/server";
import { writeFile } from "fs/promises"
export async function POST(req) {
    const data = await req.formData()
    const image = data.get("image")
    const mobileNumber = data.get("mobileNumber")
    console.log("mobileNumber : ", mobileNumber);

    console.log("data : ", data);
    console.log("image : ", image);
    console.log("image.type : ", image.type);

    if (!image) {
        return NextResponse.json({ message: "Error while Posting Data, Please try Again", data: false })
    }

    const byteData = await image.arrayBuffer()
    const buffer = Buffer.from(byteData)

    const path = `./public/${mobileNumber +"."+ image.type.split("/")[1]}`
    await writeFile(path, buffer)
    return NextResponse.json({ message: "File Uploaded SuccesFully", data: image })



}