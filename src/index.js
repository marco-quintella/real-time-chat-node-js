const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')

const app = express()
const httpServer = createServer(app)
const port = process.env.PORT || 3000

app.set('view engine', 'pug')

app.set('views', __dirname + '/views')
// Set Static Routes
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('page')
})

const io = new Server(httpServer)

io.sockets.on('connection', (socket) => {
  socket.emit('message', { message: 'Welcome to my real time chat on Node JS' })
  socket.on('send', (data) => {
    io.sockets.emit('message', data)
  })
})

httpServer.listen(port)