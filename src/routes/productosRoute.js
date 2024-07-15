const routes = require('express').Router()

const { productosController } = require('../controllers/productosController.js')

const { validations } = require('../middlewares/validation.js')

routes.post('/productos', validations.validarToken, productosController.controller_addProduct)              //TOKEN     **
routes.get('/productos/:id', productosController.controller_getProductobyID)                                //          **                      
routes.get('/likes/:id', productosController.controller_getLikes)                                           //          **
routes.put('/likes/:id', validations.validarToken, productosController.controller_putLikes)                 //TOKEN     **    

routes.delete('/productos/:id', validations.validarToken, productosController.controller_deleteProducto)    //TOKEN     **
routes.put('/productos/:id', validations.validarToken, productosController.controller_PutProductoPrecio)    //TOKEN     **

routes.get('/productosusuario', productosController.controller_getProductoByIdUsuario)                      //          **

routes.get('/home', productosController.controller_getHome)                                                 //          **

routes.get('/categorias', productosController.controller_getCategoria)                                      //          **

routes.get('/search', productosController.controller_getSearch)                                             //


module.exports = routes