var mongoose = require('mongoose');
var Notes = mongoose.model('Notes');
var Counters = mongoose.model('Counters');

var logger = require('../lib/log');


// Create a note
exports.create = function(req, res) {
	if(!req.body.title){
		res.status(400).send("Bad Request, title missing");
		return
	}
	getNextSequence('notes_id',function(err,next_seq){
		var obj = new Notes({id:next_seq.seq,title: req.body.title});
		obj.save(function(err, obj) {
			if (err) {
				logger.error(err);
				res.status(500).send(err);
			} else {
				res.status(201).send({id:obj.id,title:obj.title});
			}
		});
	});
		
};

// Get a note by id
exports.get = function(req, res){
	var id = req.params.id;
	Notes.findOne({id: id}).select('id title -_id').exec(function(err, data) {
		if (err) {
			logger.error(err);
			res.status(500).send(err);
		} else {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send("Notes not found with id: " + id)
			}
		}
	});
};


// Update a note
exports.update = function(req, res) {
	var id = req.params.id;
	Notes.findOneAndUpdate({id:id}, {title:req.body.title}, function(err,obj) {
		if (err) {
			logger.error(err);
			res.status(500).send(err);
		} else {
			res.status(200).send({id:obj.id,title:obj.title});;
		}
	});
};


// Delete a note
exports.delete = function(req, res) {
	var id = req.params.id;
	Notes.findOne({id: id}, function(err, data) {
		if (err) {
			logger.error(err);
			res.status(500).send(err);
		} else {
			if (data) {
				data.remove(function(err, data) {
					if (err) {
						logger.error(err);
						res.status(500).send(err);
					} else {
						res.status(204).send();
					}
				});
			} else {
				res.status(404).send("Note not found with id: " + id)
			}
		}
	});	
};


// Get all notes
exports.list = function (req, res) {
	Notes.find({}).select('id title -_id').exec(function(err, data) {
		if (err) {
			logger.error(err);
			res.send(err);
		} else {
			res.send(data);
		}
	});
};

//get next sequence number
function getNextSequence(name,callback) {
   Counters.findOneAndUpdate(
            { name: name },
            { $inc: { seq: 1 } },
            {new: true},
            callback
   );

}
