const express = require("express");
const app = express();
const WSSserver = require("express-ws")(app);
const aWss = WSSserver.getWss()
const cors = require('cors')
const PORT = process.env.PORT || 5000;
const fs = require('fs')
const path = require('path')

app.use(cors())
app.use(express.json())
app.ws("/", (ws, req) => {
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break
      case "draw":
        connectionHandler(ws, msg);
        break
    }  
  });
});

app.post("/image",(req,res) =>{
  try {
    const data = req.body.img.replace('data:image/png;base64','')
    fs.writeFileSync(path.resolve(__dirname,'files',`${req.query.id}.jpg`),data,'base64')
    return res.status(200).json({message:"File uploaded"})
  } catch (error) { 
    console.log(error);
    return res.status(500),express.json('Error')
  }
})
app.get("/image",(req,res) =>{
  try {
    const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
    const data = `data:image/png;base64,` + file.toString('base64')
    res.json(data)
  } catch (error) {
    console.log(e);
    return res.status(500),express.json('Error')
  }
})
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
            client.send(JSON.stringify(msg))
        }
})
}