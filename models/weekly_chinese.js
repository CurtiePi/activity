var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Activity = require('./activity');
var Notice = require('./notice.js');

var WeeklyZhNoticeSchema = new Schema({
  salutation: {
    type: String,
    default: '你好,'
  },
  message_zh: {
    type: String,
    required: true
  },
  activites: [Activity.schema],
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
    required: true
  }
});

var WeeklyChinese = Notice.discriminator('WeeklyChinese', WeeklyZhNoticeSchema);

module.exports = mongoose.model('WeeklyChinese');
