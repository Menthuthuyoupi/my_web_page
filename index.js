const server = require('./src/app')

const PORT = 3000

server.listen(PORT,console.log(`Servidor Conectado en el puerto ${PORT}`))

module.exports = server