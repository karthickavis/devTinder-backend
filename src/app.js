const express=require("express")
const connectDB=require("./config/db")
const app=express()
const User=require("./models/user")
const {validateSignupData,validateLoginData}=require("./utilis/validation")
const bcrypt=require("bcrypt")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
app.use(express.json())
app.use(cookieParser())

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

app.post("/login",async(req,res)=>{
    try{
        validateLoginData(req)
        const {emailId,password}=req.body

        const user=await User.findOne({emailId:emailId})

        if(!user){
            throw new Error("invalid credentials")
        }
        const isvalidpassword=await bcrypt.compare(password,user.password)
        if(isvalidpassword){
            const token=await jwt.sign({_id:user._id},"devTinder@123")
            res.cookie("token",token)
            res.status(200).send("login successfull")
        }else{
            throw new Error("invalid credentials")
        }

    }catch(err){
        res.status(400).send("something went wrong " + err.message)
    }
})
app.get("/profile",async(req,res)=>{
    try{
       const token=req.cookies.token
    
       const decoded=await jwt.verify(token,"devTinder@123");
       const {_id}=decoded
     const user=await User.findById(_id)
     if(!user){
        throw new Error("user doesnt exists")    
     }

       res.send(user)
    }catch(err){
        res.status(400).send("something went wrong " + err.message)
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




