const express=require('express')
const blogController=require('../Controllers/blogController')
const authorController=require('../Controllers/authorController')
const {authentication,authorization}=require('../Middleware/auth')
const router=express.Router()

router.get("/test",(req,res)=>{
    return res.send({status:true,message:"This is My Group7 For Blog Mini Project"});
})

router.post("/authors", authorController.createAuthor)

router.post("/login",authorController.logInUser)

router.post("/blogs",authentication, blogController.createBlog)

router.get("/blogs", blogController.getBlogs)

router.put("/blogs/:blogId", blogController.putBlog)

router.delete("/blogs/:blogId",blogController.deleteBlog )

router.delete("/blogs/:queryParams",blogController.blogByQuery )

module.exports = router;