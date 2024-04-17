const express = require('express')
const app = express()
const WSSserver = require('express-ws')(app)

const PORT = process.env.PORT || 5000

app.ws("/",(ws,req) =>{
    console.log("Connection");
})
app.listen(PORT,() =>{
    console.log("Server started on PORT ", PORT);
})