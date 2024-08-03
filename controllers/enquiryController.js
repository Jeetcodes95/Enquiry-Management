const Enquiry = require('../models/enquiryModel');
const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const userModel = require('../models/userModel');
const Notification = require('../models/notificationModel');

// Creating an enquiry
exports.createEnquiry = catchAsyncErrors(async (req, res) => {
  const { title, description } = req.body;
  const userId = req.id

  try {
      const enquiry = new Enquiry({ userId, title, description });
      await enquiry.save();
      res.status(201).json({
          success: true,
          message: "Enquiry Created Successfully!",
          enquiry: enquiry
      });
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
});

// fetch all enquiries role wise
exports.getAllEnquiries = catchAsyncErrors(async (req, res) => {
  const { page = 1, limit = 10, search = '', status = '' } = req.query;
  const userId = req.id; 

  try {
    const user = await userModel.findById(userId).select('role'); 
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userRole = user.role;

    const query = {};

    if (userRole !== 'admin') {
      query.userId = userId;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
      ];
    }

    const totalEnquiries = await Enquiry.countDocuments(query);

    const totalApproved = await Enquiry.countDocuments({ status: 'Accepted' });
    const totalDeclined = await Enquiry.countDocuments({ status: 'Declined' });
    const totalPending = await Enquiry.countDocuments({ status: 'Pending' });
    const totalOnHold = await Enquiry.countDocuments({ status: 'On Hold' });

    const enquiries = await Enquiry.find(query)
      .populate('userId', 'username')
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      totalEnquiries,
      totalApproved,
      totalDeclined,
      totalPending,
      totalOnHold,
      enquiries,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

exports.approvedEnq = catchAsyncErrors(async( req, res) => {
  try {
    const approvedEnq = await Enquiry.find({status: 'Accepted'}).exec();
    console.log(approvedEnq);
    
    if(!approvedEnq){
      res.status(403).json("Record not found")
    }
    res.status(200).json({success: true, approvedEnq})
  } catch (error) {
    console.log(error);
    
  }
})

exports.pendingEnq = catchAsyncErrors(async( req, res) => {
  try {
    const pendingEnq = await Enquiry.find({status: 'Pending'}).exec();
    console.log(pendingEnq);
    
    if(!pendingEnq){
      res.status(403).json("Record not found")
    }
    res.status(200).json({success: true, pendingEnq})
  } catch (error) {
    console.log(error);
    
  }
})

exports.declinedEnq = catchAsyncErrors(async( req, res) => {
  try {
    const declinedEnq = await Enquiry.find({status: 'Declined'}).exec();
    console.log(declinedEnq);
    
    if(!declinedEnq){
      res.status(403).json("Record not found")
    }
    res.status(200).json({success: true, declinedEnq})
  } catch (error) {
    console.log(error);
    
  }
})


// Update enquiry status (admin)
exports.updateEnquiryStatus = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(id, { status }, { new: true });
    
    if (status === 'Accepted') {
      const notification = new Notification({
        message: `Your enquiry titled "${enquiry.title}" has been approved.`,
        userId: enquiry.userId
      });
      await notification.save();
    }
    
    res.json({ enquiry });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
