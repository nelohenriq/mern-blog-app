const userModel = require("../models/userModel");
// bcrypt - password hash
const bcrypt = require("bcrypt");

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: userModel.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sucess: false,
      message: "Error in get all users",
      error,
    });
  }
};

// create user / register User
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Fill all fields",
      });
    }

    //existing user
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exisits",
      });
    }

    // hash the password field
    const hashedPassword = await bcrypt.hash(password, 10);

    // register new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      message: "New user registered",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in Register callback",
      success: false,
      error,
    });
  }
};

// login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password){
      return res.status(401).send({
        success: false,
        message: "Please provide email/password",
      });
    }
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(200).send({
            success: false,
            message: 'email not registered'
        })
    }
    // password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(401).send({
            success: false,
            message: 'Invalid username or password'
        })
    }
    return res.status(200).send({
        success: true,
        message: 'login successfull',
        user
    })
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login callback",
      error,
    });
  }
};
