var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = { discriminatorKey: 'kind' };

var WeeklyZhNoticeSchema = new Schema({
  message_zh: {
    type: String,
    required: true
  },
  activites: [ActivitySchema],
  message_en: {
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

var WeeklyZhNotice = Notice.discriminator('WeeklyZhNotice', WeeklyZhNoticeSchema);

module.exports = WeeklyZhNotice;
