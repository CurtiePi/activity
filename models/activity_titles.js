var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivityTitleSchema = new Schema({
  title_en: [String],
  title_zh: [String]
});


ActivityTitleSchema.statics.getInstance = function (callback) {
  this.findOne()
      .limit(1)
      .exec(function (error, model) {
        if(error) {
          callback(error, null);
        } else if (model == null) {
          callback(error, new ActivityTitle())
        } else { 
          callback(error, model);
        }
      });
};

ActivityTitleSchema.statics.getInstance2 = function () {
  var query = this.findOne()
      .limit(1);

  return query.exec();
};

ActivityTitleSchema.statics.getTitlesByLanguage = function(language) {
  if (language == 'ZH' ) {
    console.log('Finding chinese titles');
    var query = ActivityTitle.find({}).select('title_zh -_id');

  } else if (language ='EN') {
    console.log('Finding english titles');
    var query = ActivityTitle.find({}).select('title_en -_id');

  } else {
  }
  
  return query.exec();
};

var ActivityTitle = mongoose.model('ActivityTitle', ActivityTitleSchema); 

module.exports = ActivityTitle;
