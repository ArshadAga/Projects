const mongoose=require('mongoose')

const isValidfname=function(fname){
    const fnameRegex=/^[a-zA-Z]+$/;
    return fnameRegex.test(fname)
};

const isValidLname=function(lname){
    const lnameRegex=/^[a-zA-Z]+$/;
    return lnameRegex.test(lname)
};

const isValidEmail=function(email){
    const emailRegex=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,63})$/;
    return emailRegex.test(email)
};

const isValidPassword=function(password){
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password)
};

const isValid = function(value){
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value == 'string' && value.trim().length === 0) return false
    return true
  }

  const isValidObjectId = function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
  }

  module.exports={
    isValid,
    isValidEmail,
    isValidLname,
    isValidfname,
    isValidPassword,
    isValidObjectId
  }