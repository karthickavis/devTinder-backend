
const mongoose=require("mongoose")

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://nkarthisiva292_db_user:lcgFf58jZAECaN6I@devtinder.5sopodm.mongodb.net/devTinder");
};

module.exports=connectDB


