const jwt = require("jsonwebtoken");

const authorization = function (req, res, next) {
  try {
  } catch (err) {
    return res.status(500).send({ status: false, err: err.message });
  }
};

const authentication = function (req, res, next) {
  try {
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
module.exports = { authentication, authorization };
