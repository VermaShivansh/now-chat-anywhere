const express = require("express")
const ourApp = express()
const socketio = require("socket.io")
var PORT = process.env.PORT || 3000
ourApp.use(express.static("./"))
ourApp.get("/", (req, res) => {
  res.render("index.html")
})
const expressServer = ourApp.listen(PORT, () => {
  console.log("server Started")
})

const io = socketio(expressServer)

io.on("connect", (socket) => {
  socket.on("newUser", (data) => {
    console.log("New User Joined " + data.name + " with socket id " + socket.id)
    io.emit("newUserNotification", data)
  })
  socket.on("chatMessageToServer", (data) => {
    console.log(data.text + " " + data.id)
    io.emit("chatMessageToAllClients", data)
  })
})
