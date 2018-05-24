var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Activity = require('./activity');
var Notice = require('./notice.js');

var GeneralNoticeSchema = new Schema({
  salutation: {
    type: String,
    default: 'Dear Parents/Caregivers,'
  },
  message_en: {
    type: String,
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
});

var General = Notice.discriminator('General', GeneralNoticeSchema);

module.export = mongoose.model('General');
