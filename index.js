const server = require('./src/app')
require('dotenv').config()

const { PORT } = process.env

server.listen(PORT,console.log(`Servidor Conectado en el puerto ${PORT}`))

module.exports = server