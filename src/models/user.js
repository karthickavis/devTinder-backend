const mongoose=require("mongoose")
const validator=require("validator")

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid emailId")
            }
        }
    },
    password:{
        type:String,
        minLength:5,
        maxLength:100,
        trim:true,
        required:true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("password is not strong")
            }
        }
    },
    age:{
     type:Number,
     min:10
    },
    gender:{
        type:String,
        validate(value){
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

    },
    photoUrl:{
        type:String,
        default:"https://img.magnific.com/premium-vector/translator-icon_1076610-18679.jpg?semt=ais_hybrid&w=740&q=80",
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("invalid photoUrl")
            }
        }
    }
},{timestamps:true})

module.exports=mongoose.model("User",userSchema)