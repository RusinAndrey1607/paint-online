const express = require("express");
const app = express();
const WSSserver = require("express-ws")(app);
const aWss = WSSserver.getWss()
const PORT = process.env.PORT || 5000;

app.ws("/", (ws, req) => {
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break
    }
  });
});
app.listen(PORT, () => {
  console.log("Server started on PORT ", PORT);
});
const connectionHandler = (ws, msg) => {
    ws.id = msg.id
    broadcastConnection(ws,msg)
};
const broadcastConnection = (ws,msg) =>{
    aWss.clients.forEach(client => {
        if(client.id === msg.id){
            client.send(`User ${msg.username} connected`)
        }
})
}