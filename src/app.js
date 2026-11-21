const express=require("express")
const connectDB=require("./config/db")
const app=express()
const User=require("./models/user")
app.use(express.json())

app.post("/signup",async(req,res)=>{
    
     const obj=new User(req.body)
    try{
      await obj.save()
      res.send("user created sucessfully")
    } catch (err) {
         console.log("user cannot save :",err.message)
    }

})

app.get("/user",async(req,res)=>{
    const email=req.body.emailId
    
    try{
        const users=await User.find({emailId:email})
        res.send(users)

    }catch(err){
        res.status(400).send("something went wrong")
    }
})

app.get("/feed",async(req,res)=>{
   try{
        const users=await User.find({})
        res.send(users)

    }catch(err){
        res.status(400).send("something went wrong")
    }
})

app.delete("/user",async(req,res)=>{
    const userId=req.body.userId
     try{
        const users=await User.findByIdAndDelete(userId)
        res.send("user deleted successfully")
    }catch(err){
        res.status(400).send("something went wrong")
    }
})

app.patch("/user",async(req,res)=>{
    const userId=req.body.userId;
    const data= req.body

     try{
        const users=await User.findByIdAndUpdate({_id:userId},data,{returnDocument:"after",runValidators:true})
        console.log(users)
        res.send("user updated successfully")
    }catch(err){
        res.status(400).send("something went wrong" + err.message)
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

console.log("bye")


