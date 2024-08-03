const jwt = require("jsonwebtoken");
const { catchAsyncErrors } = require("./catchAsyncErrors.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const User = require("../models/userModel.js");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
  
    if (!token) {
      return next(
        new ErrorHandler("Please Login First to access the Resources!", 401)
      );
    }
  
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.id = id;
      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return next(
        new ErrorHandler("Invalid or expired token. Please login again.", 401)
      );
    }
  });

// exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
//     const { token } = req.cookies;

//     if (!token) {
//         return next(
//             new ErrorHandler("Please Login First to access the Resources!", 401)
//         );
//     }

//     try {
//         const { id } = jwt.verify(token, process.env.JWT_SECRET);

//         // Fetch the user from the database
//         const user = await User.findById(id);
        
//         if (!user) {
//             return next(
//                 new ErrorHandler("User not found. Please login again.", 401)
//             );
//         }

//         // Set the user on the request object
//         req.user = user;

//         next();
//     } catch (error) {
//         console.error("Token verification error:", error);
//         return next(
//             new ErrorHandler("Invalid or expired token. Please login again.", 401)
//         );
//     }
// });
