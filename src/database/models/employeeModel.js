import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: String,
    mobileNumber: Number,
    email: String,
    designation: String,
    gender: String,
    course: String,
    uniqueId: String,
    image: String
})


const Employee = mongoose.models.employeeData || mongoose.model("employeeData", userSchema)

export default Employee