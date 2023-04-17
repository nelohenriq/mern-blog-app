const blogModel = require("../models/blogModel");

// get all blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No blogs found",
      });
    }
    return res.status(200).send({
      success: true,
      blogCount: blogs.length,
      message: "All blogs list",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting blogs",
      error,
    });
  }
};

// create blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    //validation
    if (!title || !description || !image) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    // const existingUser = await userModel.findById(user);
    // //validaton
    // if (!existingUser) {
    //   return res.status(404).send({
    //     success: false,
    //     message: "unable to find user",
    //   });
    // }

    const newBlog = new blogModel({ title, description, image });
    // const session = await mongoose.startSession();
    // session.startTransaction();
    await newBlog.save();
    // existingUser.blogs.push(newBlog);
    // await existingUser.save({ session });
    // await session.commitTransaction();
    // await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating blog",
      error,
    });
  }
};

// update blog
exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Blog updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while updating blog",
      error,
    });
  }
};

// single blog detail
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Blog found!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while getting blog detail",
      error,
    });
  }
};

// delete blog
exports.deleteBlogController = () => {};
