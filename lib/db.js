/* 
 * Create a Mongoose Connection and define the data models.
 */

var mongoose = require('mongoose');
var logger = require('./log');
var config = require('../config');
	
// Connect to mongo
var mongoURL = config.mongodbURL
mongoose.connect(mongoURL);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	logger.info("mongoose connection is open");
});


// notes models
var NotesModel = mongoose.model("Notes", new mongoose.Schema({id:{ type: Number, index: true },title:String}, {strict: false}));
var CountersModel = mongoose.model("Counters", new mongoose.Schema({name:{ type: String, index: true },seq:Number}, {strict: false}));
	
CountersModel.findOne({name:"notes_id"},function(err,result){
	if(err) {
		logger.error("Failed to initialize Notes id sequence ");
		return;
	}
	if(!result) {
		var counterModel = new CountersModel({
		      name: "notes_id",
		      seq: 0
		   });
		counterModel.save(function(err, obj) {
			if(err)
				logger.error("Failed to initialize Notes id sequence ");
			else
				logger.info("Notes id sequence initialized");
		});
	}

})

