const express = require('express')
const path = require('path')
const port = 5001
const app = express()

// serve static assets normally
app.use('/static', express.static(path.resolve(__dirname + '/dist')))

app.get('/', function (request, response) {
    response.sendFile(path.resolve(__dirname + '/dist', 'index.html'))
})

app.listen(port)
console.log('server started on port ' + port)