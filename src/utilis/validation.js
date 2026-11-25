const validator=require('validator')

const validateSignupData=(req)=>{
    const {firstName,lastName,emailId,password}=req.body

    if(!firstName || !lastName){
        throw new Error("please enter valid name")
    }else if(!validator.isEmail(emailId)){
        throw new Error("please enter valid email")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("please enter a strong password")
    }
}

const validateLoginData=(req)=>{
    const{emailId,password}=req.body

    if(!validator.isEmail(emailId)){
        throw new Error("please enter a valid email")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("please enter a strong password")
    }
}

module.exports={
    validateSignupData,validateLoginData
}