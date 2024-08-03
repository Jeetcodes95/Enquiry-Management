exports.sendtoken = (user, statusCode, res) => {
    try {
      const token = user.getjwttoken();
      user.currentToken = token;
      user.save();
      
      const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 4 * 60 * 60 * 1000),
        httpOnly: true,
      };
  
      res
        .status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, id: user._id, token });
    } catch (error) {
      console.error('JWT token generation error:', error);
      res.status(500).json({ success: false, message: 'Failed to generate JWT token' });
    }
  };