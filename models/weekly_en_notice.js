var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = { discriminatorKey: 'kind' };

var WeeklyEnNoticeSchema = new Schema({
  salutation: {
    type: String,
    default: 'Dear Parents/Caregivers,'
  },
  message_open: {
    type: String,
    required: true
  },
  activites: [ActivitySchema],
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
    required: false
  }
}, options);

var WeeklyEnNotice = Notice.discriminator('WeeklyEnNotice', WeeklyEnNoticeSchema);

module.exports = WeeklyEnNotice;
