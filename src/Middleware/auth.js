//__________________________ Importing Module ___________________________________________

const jwt = require("jsonwebtoken");
const validator = require("../Validator/Validation");

//__________________________ Authorization ___________________________________________

const authentication = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(400)
        .send({ status: false, msg: "Oooh... Please Provide a Token" });
    }

    let decodeToken = jwt.verify(token, "this-is-my-Group7");
    if (!decodeToken) {
      return res
        .status(400)
        .send({ status: false, msg: "this is an invalid token" });
    }

    let authorId = req.query.authorId || req.body.authorId ;
    if (!authorId) {
      return res
        .status(400)
        .send({ status: false, msg: "AuthorId is required to do this action" });
    }
    if (!validator.isValidObjectId(authorId)) {
      return res
        .status(400)
        .send({ status: false, msg: "this is not a valid author Id" });
    }
    req.loggedIn = decodeToken.authorId;
    next();
  } catch (err) {
    return res.status(500).send({ status: false, err: err.message });
  }
};

//__________________________ Authentication ___________________________________________

const authorization = function (req, res, next) {
  try {
    const authorId = req.query.authorId || req.body.authorId ;
    if (req.loggedIn != authorId) {
      return res
        .status(400)
        .send({ status: false, msg: "You are not Valid User" });
    }
    next();
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

//__________________________ Exporting Module ___________________________________________

module.exports = { authentication, authorization };
