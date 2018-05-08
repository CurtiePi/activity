var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dateFormat = require('dateformat');
var mw = require('../lib/middlewares');

var ActivityTitles = require('../models/activity_titles');

var activityTitleRouter = express.Router();
module.exports = activityTitleRouter;

activityTitleRouter.use(bodyParser.json());


/*
 * General Routes
 */
activityTitleRouter.route('/list')
.get(function (req, res, next) {
  console.log('Getting a list of the Activity Titles');

  ActivityTitles.getInstance(function(err, activityTitle) {
    if (err) {
      var err = new Error('Problem getting activityResult object');
      err.status = 401;
      return next(err);
    }

    console.log('Got a list of the Chinese Activity Titles');
    var zh_titles = activityTitle.title_zh;
    var en_titles = activityTitle.title_en;

     return res.render('title/titlelist', { english: en_titles, chinese: zh_titles });
  });


});

activityTitleRouter.route('/create')
.post(function(req,res,next) {
  console.log('Creating new Activty title');


  ActivityTitles.getInstance(function(err, activityTitle) {

    if (err) {
      throw err;
    }

    var titlesArray;
    if(req.body.title_lang == 'ZH') {
      console.log('Creating new Chinese Activty title');
      titlesArray = activityTitle.title_zh; 
    } else {
      titlesArray = activityTitle.title_en; 
    }
    console.log(activityTitle);
    console.log(titlesArray);

    if(!titlesArray) {
      titlesArray = [];
    }

    if ((!titlesArray) || titlesArray.indexOf(req.body.title_lang == -1)) {
      titlesArray.push(req.body.title);

      titlesArray.sort(function(a, b) {
        return (a > b) - (b > a);
      });

      if(req.body.title_lang == 'ZH') {
        activityTitle.title_zh = titlesArray; 
      } else {
        activityTitle.title_en = titlesArray; 
      }

      activityTitle.save(function (err, activityTitle) {
        if (err) {
          throw err;
        }

        res.redirect('list');
      });
    } else {
      res.redirect('list');
    }
  });
});

/*
noticeRouter.route('/noticelist')
.get(function(req, res, next) {
  console.log('Getting the list of notices');

});

noticeRouter.route('/noticelist/:type')
.get(function(req, res, next) {
  console.log('Getting notices of a certain type');

});

noticeRouter.route('/update/:id')
.get(function(req, res, next) {
  console.log('Getting notice to update');

}).post(function(req, res, next) {
  console.log('Updating notice content');
});

noticeRouter.route('/delete/:id')
.get(function(req, res, next) {
  console.log('Getting notice to confirm delete');
})
.post(function(req, res, next) {
  console.log('Removing notice information');
});
*/
