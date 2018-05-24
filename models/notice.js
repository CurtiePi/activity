var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Activity = require('./activity');

var options = { discriminatorKey: 'ntype' };

var NoticeSchema = new Schema({
  creation_date: {
    type: Date,
    default: Date.now
  },
  effective_date: {
    type: Date,
    required: true
  },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  } 
}, options);

var Notice = mongoose.model('Notice', NoticeSchema);

module.exports =  Notice;
