const authorModel = require("../Models/authorModel");

const createAuthor = async function (req, res) {
  try {
    
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

const logInUser = async function (req, res){
    try{ 
        
    }
    catch(err){
        return res.status(500).send({status: false, err : err.message})
    }
}

module.exports = { createAuthor,logInUser };
