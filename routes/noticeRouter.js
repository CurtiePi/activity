var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dateFormat = require('dateformat');
var mw = require('../lib/middlewares');

var Users = require('../models/user');
var Activities = require('../models/activity_titles');
var Activity = require('../models/activity');
var Notice = require('../models/notice');
var WeeklyEnglish = require('../models/weekly_english');
var WeeklyChinese = require('../models/weekly_chinese');
var General = require('../models/general');

var noticeRouter = express.Router();
module.exports = noticeRouter;

noticeRouter.use(bodyParser.json());


/*
 * General Routes
 */

noticeRouter.route('/noticelist')
.get(function(req, res, next) {
  console.log('Getting the list of notices');
  console.log('Going to render list of notices');

  res.render('notice/noticelist', { notices: [] } );
});

noticeRouter.route('/create')
.get(function(req,res,next) {
  console.log('Getting the general create notice  page');
  var defaultId = req.session.userId;

  var content = {staff: [],
                 defaultId: defaultId,
                 en_titles:[],
                 zh_titles: [],
                 current_type: 'WEN'};

  var staff = Users.listStaff();
  var model = Activities.getInstance2();

  staff.then(function(result) {
    content.staff = result;
   
    return model;})
  .then(function(result){
    content.en_titles = result.title_en;
    content.zh_titles = result.title_zh;
    res.render('notice/create', content);
   })
  .catch(function (err) {
     console.log('An error was happened upon');
     throw (err);
   }); 
})
.post(function(req, res, next) {
//  console.log('Creating the notice.');
//  console.log(req.body);
  var data = req.body;
  data.creator_id = req.session.userId;
  Notice.create(data, function(err, notice) {
    if (err) {
      console.log('DANGER WILL ROBINSON! DANGER! DANGER!');
      console.log(err);
      throw err;
    }

    console.log("Saved the notice to the database");
    res.send('noticelist');
  });
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
