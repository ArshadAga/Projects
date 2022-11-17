//__________________________ Importing Module ___________________________________________

const jwt = require("jsonwebtoken");

//__________________________ authentication ___________________________________________

const authentication = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(400)
        .send({ status: false, msg: "Oooh... Please Provide a Token" });
    }

    try {
      let decodeToken = jwt.verify(token, "this-is-my-Group7");
      if (!decodeToken) {
        return res
          .status(400)
          .send({ status: false, msg: "this is an invalid token" });
      }
      req.token = decodeToken;
    } catch (error) {
      {
        return res
          .status(400)
          .send({ status: false, msg: "this is an invalid token" });
      }
    }
    next();
  } catch (err) {
    return res.status(500).send({ status: false, err: err.message });
  }
};

//__________________________ authorization ___________________________________________

const authorization = function (req, res, next) {
  try {
    const authorId = req.query.authorId || req.body.authorId;
    if (req.token.authorId != authorId) {
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
