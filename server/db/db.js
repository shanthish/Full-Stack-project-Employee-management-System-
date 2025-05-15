import mongoose from "mongoose";

const connectToDatabase=async()=>{
  try{
    await mongoose.connect("mongodb://localhost:27017/shanthish_ems")
  }catch(err){
    console.log(err)
  }
}

export default connectToDatabase; 