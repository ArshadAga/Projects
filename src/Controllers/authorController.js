//______________________ Import or Require Modules ________________________________

const authorModel = require("../Models/authorModel");
const validator = require("../Validator/Validation");
const jwt=require('jsonwebtoken')

//______________________ post api : Create Author ________________________________

const createAuthor = async function (req, res) {
  try {
    const data = req.body;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "All Keys are Mandatory" });
    }

    const { fname, lname, title, email, password } = data;

    if (!validator.isValidfname(fname)) {
      return res
        .status(400)
        .send({ status: false, msg: "first name is required" });
    }

    if (!validator.isValidLname(lname)) {
      return res
        .status(400)
        .send({ status: false, msg: "last name is required" });
    }

    if (!title) {
      return res.status(400).send({ status: false, msg: "title is required" });
    } else {
      if (title != "Mr" && title != "Mrs" && title != "Miss") {
        return res
          .status(400)
          .send({ status: false, msg: "title can be Mr. Miss or Mrs " });
      }
    }

    if (!validator.isValidEmail(email)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Valid Email Address" });
    }
    const isEmailAlreadyUsed = await authorModel.findOne({ email });
    if (isEmailAlreadyUsed) {
      return res
        .status(400)
        .send({ status: false, msg: "email already registered" });
    }

    if (!validator.isValidPassword(password)) {
      return res
        .status(400)
        .send({ status: false, msg: "Password is required" });
    }
    const newAuthor = await authorModel.create(data);

    res.status(201).send({
      status: true,
      msg: "author created successfully",
      data: newAuthor,
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

//______________________ post api : Login Author ________________________________

const logInUser = async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!validator.isValidEmail(email)) {
      return res.status(400).send({ status: false, msg: "Email is required" });
    }

    if (!validator.isValidPassword(password)) {
      return res
        .status(400)
        .send({ status: false, msg: "password is required" });
    }

    const author = await authorModel.findOne({ email, password });
    if (!author) {
      return res
        .status(401)
        .send({ status: false, msg: "Invalid login credentials" });
    }
    const token = jwt.sign({ authorId: author._id.toString() }, "this-is-my-Group7");
    res.setHeader("x-api-key", token);
    return res.status(200).send({ status: true, msg: token });
  } catch (err) {
    return res.status(500).send({ status: false, err: err.message });
  }
};

//__________________________ Exporting Module ___________________________________________

module.exports = { createAuthor, logInUser };
