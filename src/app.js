const express = require('express')
const cors = require('cors')
require('dotenv').config()
const usersRoutes = require('./routes/usersRoute')
const productosRoutes = require('./routes/productosRoute')

const { FRONTEND_URL } = process.env

const app = express()

//middlewares
app.use(express.json())

app.use(cors({
    origin: FRONTEND_URL
}))


//routes
app.use('/', usersRoutes)
app.use('/', productosRoutes)



module.exports = app
