const blogModel = require("../Models/blogModel");

const createBlog = async function (req, res) {
  try {

  } catch (err) {
    return res.status(500).send({ status: false, err: err.message });
  }
};

const getBlogs = async function (req, res) {
  try {

  } catch (error) {
    res.status(500).send({ status: false, err: error.message });
  }
};

const putBlog = async function (req, res) {
  try {

  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteBlog = async function (req, res) {
  try {

  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


module.exports = { createBlog, getBlogs, putBlog, deleteBlog};
