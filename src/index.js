const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const cache = require('memory-cache')

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
  if (!cache.get('messages')) socket.emit('message', { message: 'Welcome to my real time chat on Node JS' })
  socket.on('send', (data) => {
    console.log('send event', data)
    io.sockets.emit('message', data)
  })
  socket.on('setCache', data => {
    console.log('SetCache event', data)
    cache.put('messages', data)
  })
  socket.on('getCache', () => {
    console.log('GetCache Event')
    io.sockets.emit('sendCache', cache.get('messages'))
  })
})

httpServer.listen(port)