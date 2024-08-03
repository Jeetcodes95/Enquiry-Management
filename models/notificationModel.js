const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  read: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', notificationSchema);
