import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: String,
    username: String,
    email: String,
    password: String
})


const Admin = mongoose.models.adminData || mongoose.model("adminData", userSchema)

export default Admin