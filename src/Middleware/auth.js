const jwt = require("jsonwebtoken");

const authorization = function (req, res, next) {
  try {
    let token = req.headers["x-auth-token"];

    if (!token) {
      return res
        .status(400)
        .send({ status: false, msg: "neccessary header token is missing" });
    }

    let decodeToken = jwt.verify(token, secretKey);
    if (!decodeToken) {
      return res
        .status(400)
        .send({ status: false, msg: "this is an invalid token" });
    }

    let authorId = req.params.authorId;

    if (!authorId) {
      return res
        .status(400)
        .send({ status: false, msg: "AuthorId is required to do this action" });
    }
    req.loggedIn = decodeToken;
    next();
  } catch (err) {
    return res.status(500).send({ status: false, err: err.message });
  }
};

const authentication = function (req, res, next) {
  try {
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
module.exports = { authentication, authorization };
