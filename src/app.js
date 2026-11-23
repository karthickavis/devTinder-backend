const express=require("express")
const connectDB=require("./config/db")
const app=express()
const User=require("./models/user")
const {validateSignupData}=require("./utilis/validation")
const bcrypt=require("bcrypt")
app.use(express.json())

app.post("/signup",async(req,res)=>{
    

     
    try{
        validateSignupData(req)
        const {firstName,lastName,emailId,password}=req.body
        const passwordhash=await bcrypt.hash(password,10)
        const obj=new User({
            firstName,
            lastName,
            emailId,
            password:passwordhash
        })
      await obj.save()
      res.send("user created sucessfully")
    } catch (err) {
         res.status(400).send("Error :"+ err.message)
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

app.patch("/user/:userId",async(req,res)=>{
    const userId=req.params.userId;
    const data= req.body

     try{
        const allowed_updates=["about","gender","skills","photoUrl","age"]
        const eligible=Object.keys(data).every((k)=>allowed_updates.includes(k))
        if(!eligible){
          throw new Error("invalid update field")
        }

        if(data?.skills?.length>15){
            throw new Error("cannot add more than 15 skills")
        }
    
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




