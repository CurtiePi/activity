var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Activity = require('./activity');
var Notice = require('./notice.js');

var WeeklyEnNoticeSchema = new Schema({
  salutation: {
    type: String,
    default: 'Dear Parents/Caregivers,'
  },
  message_open: {
    type: String,
    required: true
  },
  activites: [Activity.schema],
  message_close: {
    type: String,
    required: false
  },
  closing: {
    type: String,
    required: true
  },
  teacher_name: {
    type: String,
    required: true
  }
});

var WeeklyEnglish = Notice.discriminator('WeeklyEnglish', WeeklyEnNoticeSchema);

module.exports = mongoose.model('WeeklyEnglish');
