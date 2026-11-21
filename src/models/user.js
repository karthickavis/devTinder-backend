const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:50,
        trim:true,
        lowercase:true
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        minLength:5,
        maxLength:30,
        trim:true,
        required:true
    },
    age:{
     type:Number,
     min:10
    },
    gender:{
        type:String,
        validators(value){
         if(!["male","female","others"].includes(value)){
            throw new error("gender not a valid type")
         }
        }

    },
    about:{
        type:String,
        default:"This is default data of me !",
    },
    skills:{
        type:[String],

    }
},{timestamps:true})

module.exports=mongoose.model("User",userSchema)