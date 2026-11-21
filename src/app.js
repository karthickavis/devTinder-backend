const express=require("express")
const connectDB=require("./config/db")
const app=express()
const User=require("./models/user")

app.post("/signup",async(req,res)=>{
    const obj=new User({
        firstName:"kar",
        lastName:"s",
        emailId:"kar123@gmail.com",
        password:"kar@123"
    })
    try{
await obj.save()
      res.send("user created sucessfully")
    } catch (err) {
         console.log("user cannot save :",err.message)
    }

})
connectDB()
.then(()=>{
    console.log("db connected successful")
    app.listen(6666,()=>{
        console.log("server connected successful")
    })
}).catch((err)=>{
    console.log("db not connected")
})


