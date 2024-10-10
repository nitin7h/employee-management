import { NextResponse } from "next/server";
import Employee from "@/database/models/employeeModel";
import { databaseConnection } from "@/database/connection/databaseConnection";
export async function POST(req) {
    try {

        const response = await req.json();
        console.log("Employee Response : ", response);
        const { fullName, email, mobileNumber, designation, gender, course, image } = response
        // console.log("mobileNumber : ", mobileNumber);

        await databaseConnection()

        const employeeExist = await Employee.findOne({ email })
        const employeeExistWithNumber = await Employee.findOne({ mobileNumber })
            // console.log("employeeExistWithNumber : ", employeeExistWithNumber);


        if (employeeExist) {


            return NextResponse.json({ message: "Employee Exist with this Email", data: false })
        }

        if (employeeExistWithNumber) {


            return NextResponse.json({ message: "Employee Exist with this Number", data: false })
        }
        const currentTime = new Date();

        const uniqueId = mobileNumber + currentTime.getMinutes() + currentTime.getSeconds()
        console.log("uniqueId : ", uniqueId);

        const employee = new Employee({
            fullName: fullName,
            email: email,
            mobileNumber: mobileNumber,
            designation: designation,
            gender: gender,
            course: course,
            uniqueId: uniqueId,
            image: image
        })
        await employee.save()
        return NextResponse.json({ message: "Employee Created Successfully", data: employee })
    } catch (error) {
        console.log("Error while Posting Data, Please try Again");
        return NextResponse.json({ message: "Error while Posting Data, Please try Again", data: false })
    }

}


export async function GET(req) {
    try {
        await databaseConnection()
        const employeeData = await Employee.find()
            // console.log("employeeData : ", employeeData);

        return NextResponse.json({ message: "Employee Fetched Successfully", data: employeeData })
    } catch (error) {
        console.log("Error while Getting Data, Please try Again");
        return NextResponse.json({ message: "Error while Getting Data, Please try Again", data: false })
    }
}





export async function DELETE(req) {

    try {
        const uniqueId = await req.json();
        console.log("ID in DELETE: ", uniqueId);

        const responsedata = await Employee.deleteOne({ uniqueId });
        console.log("responsedata : ", responsedata);

        return NextResponse.json({ message: "Deleted Successfully", data: true })
    } catch (error) {
        console.log("Error while Deleting Data, Please try Again");
        return NextResponse.json({ message: "Error while Deleting Data, Please try Again", data: false })
    }

}


export async function PUT(req) {

    try {
        const response = await req.json();
        console.log("response: ", response);
        const { uniqueId, fullName, email, mobileNumber, designation, gender, course } = response

        const updatedEmployee = await Employee.findOneAndUpdate({ uniqueId }, // Search criteria
            {
                $set: { fullName, email, mobileNumber, designation, gender, course }
            }, { new: true } // Return the updated document
        );

        if (!updatedEmployee) {
            return NextResponse.json({ message: "Employee not found", data: false }, { status: 404 });
        }


        return NextResponse.json({ message: "Updated Successfully", data: true })
    } catch (error) {
        console.log("Error while Updating Data Please try Again");
        return NextResponse.json({ message: "Error while Updating Data, Please try Again", data: false })

    }

}