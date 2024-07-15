const express = require('express')
const cors = require('cors')
const usersRoutes = require('./routes/usersRoute')
const productosRoutes = require('./routes/productosRoute')

const app = express()

//middlewares
app.use(express.json())

app.use(cors())


//routes
app.use('/', usersRoutes)
app.use('/', productosRoutes)



module.exports = app
