exports.generatedErrors = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    
    if (err.name === "MongoServerError" && err.message.includes("E11000 duplicate key")) {
        err.message = "This email is already taken";
        err.statusCode = 400; 
    }
    err.success = statusCode >= 200 && statusCode < 300 ? true : false;
    res.status(statusCode).json({
        success: err.success,
        message: err.message,
        errName: err.name
    });
};
