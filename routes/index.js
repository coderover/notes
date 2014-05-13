
module.exports = exports = function(app) {
	app.get('/', function(req, res){
		  res.send({});
	});
	
	//notes api routes
	var notes = require('../api/notes.js');
	
	app.post('/notes', notes.create);		// CREAT
	app.get('/notes/:id', notes.get);		// GET
	app.put('/notes/:id', notes.update);	// UPDATE
	app.del('/notes/:id', notes.delete);	// DELETE
	app.get('/notes', notes.list);			// GET LIST
}