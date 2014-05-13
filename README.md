#  Notes REST APIs 

This is a simple Notes API implementation using node.js, Express, and MongoDB using Basic Authentication with a username of “system” and a password of “Sy5t3m” 


## APIs
Following APIs have been implemented
<table>
  <tr><th>Action</th><th>HTTP Verb</th><th>path</th></tr>
  <tr><td>Create new note</td><td>POST</td><td>/notes</td></tr>
  <tr><td>Get by id</td><td>GET</td><td>/notes/:id</td></tr>
  <tr><td>Update </td><td>PUT</td><td>/notes/:id</td></tr>
  <tr><td>Delete</td><td>DELETE</td><td>/notes/:id</td></tr>
  <tr><td>Get all</td><td>GET</td><td>/notes</td></tr>
</table>



## Dependencies
1. Ensure that [MongoDB](http://www.mongodb.org/) is installed and running.

## Getting started
1. Clone Repo

	```bash
	$ git clone <clone url>
	```
	
1. Install 

	```bash
	$ npm install 
	```
	
1. Test 

	```bash
	$ npm test 
	```
	
	
1. Start Server

	```bash
	$ npm start
	```
	
1. Create some notes

	```bash
	$ curl -d "title=go through code" -u system:Sy5t3m  http://localhost:3000/notes
	$ curl -d "title=improve"  -u system:Sy5t3m http://localhost:3000/notes
	```
	
1. Retreive note list 

	```bash
	$ curl  -u system:Sy5t3m  http://localhost:3000/notes

	```
1. Retreive note by id

	```bash
	$ curl   -u system:Sy5t3m http://localhost:3000/notes/1

	```
1. Update a note

	```bash
	$ curl -X PUT -d "id=1" -d "title=updated title"  -u system:Sy5t3m http://localhost:3000/notes
	```

1. Delete a note

	```bash
	$ curl -X DELETE -u system:Sy5t3m  http://localhost:3000/notes/1
	```

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
