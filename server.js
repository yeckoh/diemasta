/// server.js defines the entrypoint for the webserver service
/*
express serves hooks and function calls for requests and responses
bodyparser parses incoming requests for the handlers
*/
const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
// const passport = require('passport');
const mongoose = require('mongoose');
const dbconnect = require('./dbconnect.js');


// connect to db
mongoose.connect(dbconnect.database, {useNewUrlParser:true, useUnifiedTopology: true});

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+ "\x1b[36m"+ dbconnect.database + "\x1b[0m");
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

// middleware EXPRESS
const port = 3000;
const app = express()
.use(bodyParser.json())
.use(cors({ origin: 'http://localhost:4200' }));

// socketstuff
// socket io, pass in instance of a http server
const http = require('http');
const server = http.Server(app);
const wsocket = require('socket.io')(server);
app.set('socketio', wsocket);


// capture whenever someone connects to server
// defines ALL the hooks
// .emit (event name, what to send when the emit is called)
let socket_ids = [];
let people = [];
wsocket.on('connection', function(socket) {
  socket_ids.push(socket.id);

  require('./hooks/disconnect_hooks')(socket_ids, socket);
  require('./hooks/statements_hooks')(socket);
  require('./hooks/initiative_hooks')(socket);
  require('./hooks/people_hooks')(people, socket);
  // require('./routes/effect_hooks')(socket);
  // require('./routes/savingthrow_hooks')(socket);
  console.log('list of all socketids:');
  console.log(socket_ids);
  console.log('\n');  
  return socket;
});








server.listen(port, function() {
  console.log('WSocket server started on port ' +"\x1b[36m"+ port + '...' +"\x1b[0m");
});
