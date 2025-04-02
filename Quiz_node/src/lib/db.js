import mongoose from 'mongoose';
import { error } from 'console';

export const connectDB = async() =>{
    try{
        const con=await mongoose.connect("mongodb+srv://helloworld:helloworld@cluster0.fux16.mongodb.net/");
        console.log(`MONGO DB Connected : ${con.connection.host}`)
    }
    catch(error){
        console.error("Mongo db error :" + error.message);
    }
}


const userSchema=new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true,
    },
    fullName:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
},
 {
    timestamps:true
 }
);
const User= mongoose.model("User",userSchema);

export default User;