//__________________________ Import  ___________________________________________

const mongoose=require('mongoose')

//__________________________ Validations : First Name ___________________________________________

const isValidfname=function(fname){
    const fnameRegex=/^[a-zA-Z]{2,}+$/;
    return fnameRegex.test(fname)
};

//__________________________ Validations : Last Name ___________________________________________

const isValidLname=function(lname){
    const lnameRegex=/^[a-zA-Z]+$/;
    return lnameRegex.test(lname)
};

//__________________________ Validations : Email  ___________________________________________

const isValidEmail=function(email){
    const emailRegex=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,})$/;
    return emailRegex.test(email)
};

//__________________________ Validations : Password  ___________________________________________

const isValidPassword=function(password){
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password)
};

//__________________________ Validations : Values ___________________________________________

const isValid = function(value){
    if(typeof value === 'undefined' || value === null) return false
    if(typeof value == 'string' && value.trim().length === 0) return false
    return true
  }

  //__________________________ Validations :  ObjectId ___________________________________________

  const isValidObjectId = function(objectId){
    return mongoose.Types.ObjectId.isValid(objectId)
  }

  //__________________________ Export : Modules  ___________________________________________

  module.exports={
    isValid,
    isValidEmail,
    isValidLname,
    isValidfname,
    isValidPassword,
    isValidObjectId
  }