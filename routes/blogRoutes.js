const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  deleteBlogController,
  getBlogByIdController,
} = require("../controllers/blogController");

// router objecct
const router = express.Router();

// routes
// get all blogs || get
router.get("/all-blogs", getAllBlogsController);

// create blog || post
router.post("/create-blog", createBlogController);

// update blog || put
router.put("/update-blog/:id", updateBlogController);

// delete blog || delete
router.delete("/delete-blog/:id", deleteBlogController);

// single blog details || get
router.get("/get-blog/:id", getBlogByIdController);
module.exports = router;
