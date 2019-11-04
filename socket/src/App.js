import React, {useState, useEffect} from 'react';
import socketIOClient from "socket.io-client";

function App() {

  const [response, setResponse] = useState({change:""});

  const socket = socketIOClient("http://localhost:4000/api/hubs");
  //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
 
  socket.on('incoming data',response);
  socket.on('outgoing data', data => console.log(data));

  return (
    <div className="App">
      <h1>Hi</h1>
    </div>
  );
}

export default App;
