window.onload = () => {
  let messages = []
  const socket = io.connect('http://localhost:3000')
  const field = document.getElementById('field')
  const sendButton = document.getElementById('send')
  const content = document.getElementById('content')
  const name = document.getElementById('name')

  socket.on('message', (data) => {
    if (data.message) {
      messages.push(data)
      let html = ''
      for (let i = 0; i < messages.length; i++) {
        html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>'
        html += messages[i].message + '<br />'
      }
      content.innerHTML = html
      content.scrollTop = content.scrollHeight
    } else {
      console.log('Error:', data)
    }
  })

  
  sendButton.onclick = () => {
    if (name.value === '') {
      alert('Please enter a message')
    } else {
      let text = field.value
      socket.emit('send', { message: text, username: name.value })
      field.value = ''
    }
  }

  field.addEventListener('keypress', (e) => {
    const key = e.key || e.code
    if (key === 'Enter') sendButton.onclick()
  })
}