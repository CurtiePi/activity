var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var options = { discriminatorKey: 'kind' };

var HolidayNoticeSchema = new Schema({
  salutation: {
    type: String,
    default: 'Dear Parents/Caregivers,'
  },
  message_en: {
    type: text,
    required: true
  },
  message_zh: {
    type: String,
    required: true
  },
  teacher_name: {
    type: String,
    required: true
  }
}, options);

var HolidayNotice = Notice.discriminator('HolidayNotice', HolidayNoticeSchema);

module.exports = HolidayNotice;
