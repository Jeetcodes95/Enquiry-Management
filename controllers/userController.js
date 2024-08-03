const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const {sendtoken} = require("../utils/SendToken.js");
const UserModel = require('../models/userModel');
const ErrorHandler = require("../utils/ErrorHandler.js");

exports.homepage = catchAsyncErrors(async(req, res, next)=>{
    res.json({message: "Server has Started Successfully!"})
})
exports.currentUser = catchAsyncErrors(async(req, res, next)=>{
    try {
    const user = await UserModel.findById(req.id).exec();
    if (!user) {
        return next(new ErrorHandler("No Record Found", 403));
      }
      res.json({ success: true, user: user });
    } catch (error) {
      console.error("Error fetching current user:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "An error occurred while fetching the user",
        });
    }
})

exports.signup = catchAsyncErrors(async (req, res, next) => {
  try {
      const existingUser = await UserModel.findOne({ email: req.body.email });

      if (existingUser) {
          return res.status(400).json({
              success: false,
              message: "User already exists with this email!",
          });
      }

      const user = await UserModel.create(req.body);

      res.status(201).json({
          success: true,
          message: "Signup Successful!",
          user: user
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({
          success: false,
          message: "Server Error",
      });
  }
});

  exports.login = catchAsyncErrors(async(req, res, next)=>{
    const user = await UserModel.findOne({email: req.body.email}).select("+password").exec();

    if(!user) return next(
            new ErrorHandler("User not found with this email address", 404)
        );

    const isMatch = user.comparePassword(req.body.password);
    if(!isMatch) return next(
        new ErrorHandler("Wrong credentials", 500)
    );
    sendtoken(user, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
    const options = {
        expires: new Date(0), 
        httpOnly: true,
      };
    
      res
        .status(200)
        .cookie('token', '', options) // Clear the existing 'token' cookie
        .json({ success: true, message: 'User logged out successfully' });
   
});