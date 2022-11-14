const express=require('express')
const blogController=require('../Controllers/blogController')
const authorController=require('../Controllers/authorController')
const mw=require('../Middleware/auth')
const router=express.Router()

router.get("/test",(req,res)=>{
    console.log("This is My Group7 For Blog Mini Project");
})

router.post("/authors", authorController.createAuthor)

router.post("/login", authorController.logInUser)

router.post("/blogs", blogController.createBlog)

router.get("/blogs", blogController.getBlogs)

router.put("/blogs/:blogId", blogController.putBlog)

router.delete("/blogs/:blogId",blogController.deleteBlog )

module.exports = router;