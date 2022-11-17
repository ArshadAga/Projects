//__________________________ Import or Require Module ___________________________________________

const express=require('express')
const blogController=require('../Controllers/blogController')
const authorController=require('../Controllers/authorController')
const {authentication,authorization}=require('../Middleware/auth')
const router=express.Router()

//__________________________ get api : for Test ___________________________________________

router.get("/test",(req,res)=>{
    return res.send({status:true,message:"This is My Group7 For Blog Mini Project"});
})

//__________________________ post api : Create Author ___________________________________________

router.post("/authors", authorController.createAuthor)

//__________________________ post api : Login Author ___________________________________________

router.post("/login",authorController.logInUser)

//__________________________ post api : Create Blog ___________________________________________

router.post("/blogs",authentication,blogController.createBlog)

//__________________________ get api : Get Blog ___________________________________________

router.get("/blogs",authentication, blogController.getBlogs)

//__________________________ put api : Update  ___________________________________________

router.put("/blogs/:blogId",authentication,authorization, blogController.putBlog)

//__________________________ delete api : delete  ___________________________________________

router.delete("/blogs/:blogId",authentication,authorization,blogController.deleteBlog )

//__________________________ Delete api : Delete by Query ___________________________________________

router.delete("/blogs/",authentication,authorization, blogController.blogByQuery )

//__________________________ Export : Router ___________________________________________

module.exports = router;