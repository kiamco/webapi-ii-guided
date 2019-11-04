const HubsRouter = require('./hubs/hubs-router');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http, {
  origins: '*:*'
});;
var bodyParser = require('body-parser')

// app.use(bodyParser.urlencoded({
//   extended: false
// }));

// app.use(bodyParser.json())

io.origins('*:*');
app.use("/api/hubs", HubsRouter)
app.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

io.on("connection", socket => {
  console.log("New client connected");

  //Here we listen on a new namespace called "incoming data"
  socket.on("incoming data", (data) => {
    //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
    console.log("hit",data);
    socket.broadcast.emit("outgoing data", data);
  });

  //A special namespace "disconnect" for when a client disconnects
  socket.on("disconnect", () => console.log("Client disconnected"));
});

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

http.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
