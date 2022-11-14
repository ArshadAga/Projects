const express=require('express')
const blogController=require('../Controllers/blogController')
const authorController=require('../Controllers/authorController')
const router=express.Router()

router.get("/test",(req,res)=>{
    console.log("This is My Group7 For Blog Mini Project");
})

router.post("/authors",authorController.createAuthor)

router.post("/blogs",blogController.createBlog)

router.get("/blogs",blogController.getBlogs)

module.exports = router;