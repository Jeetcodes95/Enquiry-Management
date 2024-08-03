const express = require("express");
const Notification = require("../models/notificationModel");
const router = express.Router();

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const notifications = await Notification.find({ userId, read: false });
      res.json({ notifications });
    } catch (error) {
      console.error('Error fetching notifications:', error);  
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router; 
