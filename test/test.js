process.env.NODE_ENV = 'test'
var should = require('chai').should(),
    supertest = require('supertest'),
    api = supertest(require('../app.js'));

describe('Authentication', function() {
  it('errors if wrong basic auth', function(done) {
    api.get('/notes')
    .auth('wrong', 'auth-info')
    .expect(401, done)
  });
});


describe('/notes', function() {
  var id;
  it('Create a new note with missing title', function(done) {
    api.post('/notes')
    .auth('system', 'Sy5t3m')
    .expect(400)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
  it('Create a new note', function(done) {
    api.post('/notes')
    .auth('system', 'Sy5t3m')
    .send({title:"new note"})
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.have.property('title');
      res.body.title.should.eq('new note');
      id=res.body.id;
      done();
    });
  });
  it('returns list of notes as JSON', function(done) {
      api.get('/notes')
      .auth('system', 'Sy5t3m')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
        });
  });
  
  it('get a newly created note', function(done) {
    api.get('/notes/' + id)
    .auth('system', 'Sy5t3m')
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.have.property('id');
      res.body.should.have.property('title');
      res.body.title.should.eq('new note');
      res.body.id.should.eq(id);
      done();
    });
  });

  it('update newly created note', function(done) {
    api.put('/notes/' + id)
    .auth('system', 'Sy5t3m')
    .send({title:"updated note"})
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      if (err) return done(err);
      res.body.should.have.property('title');
      res.body.title.should.eq('updated note');
      done();
    });
  });

  it('delete a newly created note', function(done) {
    api.delete('/notes/' + id)
    .auth('system', 'Sy5t3m')
    .expect(204)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
 
});