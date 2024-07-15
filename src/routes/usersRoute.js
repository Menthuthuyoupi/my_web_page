const routes = require('express').Router()

const { usersController } = require('../controllers/usersController.js')

// const { reportarConsulta } = require('../middlewares/validation.js')

routes.post('/users', usersController.controller_register)
routes.post('/login', usersController.controller_login)
routes.put('/users', usersController.controller_photo)

module.exports = routes