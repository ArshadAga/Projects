const blogModel = require("../Models/blogModel");
const authorModel = require("../Models/authorModel");
const validator = require("../Validator/Validation");

const createBlog = async function (req, res) {
  try {
    const data = req.body;

    if (Object.keys(data).length == 0) {
      return res
        .status(400)
        .send({ status: false, message: "All Keys are Mandatory" });
    }

    const { title, body, authorId, category } = data;

    if (!title) {
      return res.status(400).send({ status: false, msg: "title is required" });
    }

    if (!body) {
      return res.status(400).send({ status: false, msg: "body is required" });
    }

    if (!validator.isValidObjectId(authorId)) {
      return res
        .status(400)
        .send({ status: false, msg: `${authorId} is not a valid authorId` });
    }

    if (!category) {
      return res
        .status(400)
        .send({ status: false, msg: "category title is required" });
    }

    const author = await authorModel.findById(authorId);
    if (!author) {
      return res
        .status(400)
        .send({ status: false, msg: "author does not exist" });
    }

    const savedData = await blogModel.create(data);
    res.status(201).send({ msg: savedData });
  } catch (err) {
    return res.status(500).send({ status: false, err: err.message });
  }
};

const getBlogs = async function (req, res) {
  try {
    let data = req.query;
    let getBlogs = await blogModel
      .find({ isPublished: true, isDeleted: false, ...data })
      .populate("authorId");
    res.status(201).send({ msg: getBlogs });
    if (Object.keys(data).length == 0)
      return res.status(404).send({ msg: "no such blog exist" });
  } catch (error) {
    res.status(500).send({ status: false, err: error.message });
  }
};

const putBlog = async function (req, res) {
  try {
    let data = req.body;
    let id = req.params.blogId;

    if (!id) {
      return res.status(400).send({
        status: false,
        msg: "blogId must be present in request param ",
      });
    }

    if (!data.tags) {
      return res
        .status(400)
        .send({ status: false, msg: "tags is required in the request body" });
    }

    if (!data.subcategory) {
      return res.status(400).send({
        status: false,
        msg: "subcategory is required in the request body",
      });
    }

    if (id.isDeleted === true) {
      return res
        .status(400)
        .send({ status: false, msg: "Blog already Deleted" });
    }

    let blogFound = await blogModel.findOne({ _id: id });

    if (!blogFound) {
      return res
        .status(400)
        .send({ status: false, msg: "No Blog with this Id exist" });
    }

    let updatedBlog = await blogModel.findOneAndUpdate(
      { _id: id },
      {
        $push: { tags: data.tags, subcategory: data.subcategory },
        $set: { title: data.title, body: data.body, category: data.category },
      },
      { new: true, upsert: true }
    );
    return res.status(200).send({ status: true, data: updatedBlog });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteBlog = async function (req, res) {
  try {
    let blog = req.params.blogId;

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

    return res.status(200).send({
      status: true,
      msg: "Your Blog has been successfully deleted",
      deletedData: deletedBlog,
    });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

const blogByQuery = async (req, res) => {
  try {
    const data = req.query;

    if (Object.keys(data) == 0) {
      return res
        .status(400)
        .send({ status: false, message: "No input provided" });
    }

    const { authorId, category, subcategory, tags } = data;
    if (!authorId) {
      return res
        .status(404)
        .send({ status: false, message: "Author Id is Mandatory" });
    }

    if (category) {
      let verifyCategory = await blogModel.findOne({ category: category });
      if (!verifyCategory) {
        return res
          .status(400)
          .send({ status: false, msg: "No blogs in this category exist" });
      }
    }

    if (tags) {
      let verifytags = await blogModel.findOne({ tags: tags });
      if (!verifytags) {
        return res
          .status(400)
          .send({ status: false, msg: "no blog with this tags exist" });
      }
    }

    if (subcategory) {
      let verifysubcategory = await blogModel.findOne({
        subcategory: subcategory,
      });
      if (!verifysubcategory) {
        return res
          .status(400)
          .send({ status: false, msg: "no blog with this subcategory exist" });
      }
    }

    let findBlog = await blogModel.find({
      $and: [data, { isdeleted: false }, { authorId: authorId }],
    });

    if (!findBlog) {
      return res
        .status(400)
        .send({ status: false, msg: "no blogs are present with this query" });
    }

    const deleteByQuery = await blogModel.updateMany(
      data,
      { isdeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (deleteByQuery) {
      res.status(200).send({
        status: true,
        msg: "Your blogs have been deleted",
        data: deleteByQuery,
      });
    }
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createBlog, getBlogs, putBlog, deleteBlog, blogByQuery };
