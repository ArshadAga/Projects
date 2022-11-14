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
    let data = req.body;
    let authorId = req.query.authorId;
    let id = req.params.blogId;

    if (!id) {
      return res.status(400).send({
        status: false,
        msg: "blogId must be present in request param ",
      });
    }

    let blogFound = await blogModel.findOne({ _id: id });

    if (!blogFound) {
      return res
        .status(400)
        .send({ status: false, msg: "No Blog with this Id exist" });
    }

    let updatedBlog = await blogModel.findOneAndUpdate(
      { _id: id, authorId: authorId },
      {
        $addToSet: { tags: data.tags, subcategory: data.subcategory },
        $set: { title: data.title, body: data.body, category: data.category },
      },
      { new: true, upsert: true }
    );

    if (updatedBlog) {
      return res.status(200).send({ status: true, data: updatedBlog });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteBlog = async function (req, res) {
  try {
    let blog = req.params.blogId;
    let authorId = req.query.authorId;

    if (!blog) {
      return res.status(400).send({
        status: false,
        msg: "blogId must be present in order to delete it",
      });
    }

    let blogFound = await blogModel.findOne({ _id: blog });

    if (!blogFound) {
      return res.status(400).send({
        status: false,
        msg: "No blog exists bearing this Blog Id, please provide another one",
      });
    }

    if (blogFound.isdeleted === true) {
      return res
        .status(404)
        .send({ status: false, msg: "this blog has been deleted by You" });
    }

    let deletedBlog = await blogModel.findOneAndUpdate(
      { _id: blog },
      { $set: { isdeleted: true }, deletedAt: Date.now() },
      { new: true }
    );

    if (deletedBlog) {
      return res.status(200).send({
        status: true,
        msg: "Your Blog has been successfully deleted",
        deletedData: deletedBlog,
      });
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createBlog, getBlogs, putBlog, deleteBlog };
