const express = require("express")
const ourApp = express()
const socketio = require("socket.io")
var PORT = process.env.PORT || 3000
ourApp.use(express.static("Frontend"))

const expressServer = ourApp.listen(PORT, () => {
  console.log("server Started")
})

const io = socketio(expressServer)

io.on("connect", (socket) => {
  console.log(socket)
  socket.on("dataToServer", (dataFromClient) => {
    console.log(dataFromClient.data + " " + socket.id)
  })
  socket.on("chatMessageToServer", (data) => {
    console.log(data.text + " " + data.id)
    io.emit("chatMessageToAllClients", data)
  })
})
