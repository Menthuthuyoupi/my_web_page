const routes = require('express').Router()

const { validations } = require('../middlewares/validation.js')
const { usersController } = require('../controllers/usersController.js')

routes.post('/users', usersController.controller_register)
routes.post('/login', usersController.controller_login)
routes.put('/users/photo', usersController.controller_photo)
routes.put('/users/password', validations.validarToken, usersController.controller_password)
routes.put('/users/:id', validations.validarToken, usersController.controller_yourInfo)

routes.delete('/users/:id', validations.validarToken, usersController.controller_deleteYourAcc)

module.exports = routes