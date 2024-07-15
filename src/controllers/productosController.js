const { productosModel } = require('../models/productosModel.js')
const { getDatabaseError } = require('../lib/errors/database.error.js')

const controller_addProduct = async (req, res) => {
    const { id_usuario, nombre, imagen, descripcion, precio, categoria, cantidad } = req.body
    try {
        await productosModel.addProduct(id_usuario, nombre, imagen, descripcion, precio, categoria, cantidad)
        return res.status(201).send({message:"Producto publicado con éxito"})
    } catch (error) {
        if(error.code){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json(message)
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const controller_getHome = async (req, res) => {
    const { categoria } = req.query
    try {
        const {rows, total} = await productosModel.getHome(categoria)
        return res.status(200).send({productos: rows, total: total})
    } catch (error) {
        if(error.code){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json(message)
        }else if(error.code == 400){
            return res.status(500).send([{ message: error.message }])
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const controller_getCategoria = async (req, res) => {
    const { categoria, order, limit, page } = req.query
    try {
        const productos = await productosModel.getCategory(categoria, order, limit, page)
        if(productos.total !== 0){
            const HATEOAS = getHATEOAS(productos.rows, productos.total, limit, page)
            return res.status(200).send(HATEOAS)
        }else {
            return res.status(200).send({total: 0, total_pages: 0, next: null, previous: null, results: []})
        }
              
    } catch (error) {
        if(error.code){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json(message)
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const getHATEOAS = (productos, total, limit, page) => {
    const total_pages = Math.ceil(total / limit)
    const results = productos.map(p => {
        return {
            imagen: p.url_imagen,
            nombre: p.nombre,
            categoria: p.categoria,
            precio: p.precio,
            cantidad: p.cantidad,
            href: p.id  
        }

    })

    const HATEOAS = {
        total: total,
        total_pages: total_pages,
        next:
            total_pages <= +page ? null : `?limit=${limit}&page=${+page + 1}`,
        previous:
            +page <= 1 ? null : `?limit=${limit}&page=${+page - 1}`,
        results
    }
    return HATEOAS
}

const controller_getSearch = async(req, res) => {
    const { search, order, limit, page } = req.query
    try {
        const productos = await productosModel.getSearch(search, order, limit, page)
        if(productos.total !== 0){
            const HATEOAS = getHATEOAS(productos.rows, productos.total, limit, page)
            return res.status(200).send(HATEOAS)
        }else {
            return res.status(200).send({total: 0, total_pages: 0, next: null, previous: null, results: []})
        }
              
    } catch (error) {
        if(error.code){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json(message)
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const controller_getProductobyID = async(req, res) => {
    const { id } = req.params
    try {
        const producto = await productosModel.getProductobyID(id)
        return res.status(200).send(producto)              
    } catch (error) {
        if(error.code){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json(message)
        }else if(error.code == 400){
            return res.status(500).send([{ message: error.message }])
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const controller_putLikes = async(req, res) => {
    const { id } = req.params
    const { id_usuario } = req.body
    try {
        const likes = await productosModel.putLike(id, id_usuario)
        return res.status(200).send({likes: likes})     
    } catch (error) {
        if(error.code){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json(message)
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const controller_getLikes = async(req, res) => {
    const { id } = req.params
    try {
        const likes = await productosModel.getLikes(id)
        return res.status(200).send({likes: likes})       
    } catch (error) {
        if(error.code){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json(message)
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const controller_getProductoByIdUsuario = async (req, res) => {
    const {id_usuario, page, limit, order } = req.query
    try {
        const productos = await productosModel.getProductoByIdUsuario(id_usuario, order, limit, page)
        if(productos.total !== 0){
            const HATEOAS = getHATEOAS(productos.rows, productos.total, limit, page)
            return res.status(200).send(HATEOAS)
        }else {
            return res.status(200).send({total: 0, total_pages: 0, next: null, previous: null, results: []})
        }           
    } catch (error) {
        if(error.code){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json(message)
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const  controller_deleteProducto = async (req, res) => {
    const { id } = req.params
    try {
        await productosModel.deleteProducto(id)
        return res.status(200).send({message: 'Producto eliminado'})
    } catch (error) {
        if(error.code){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json(message)
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const  controller_PutProductoPrecio = async (req, res) => {
    const { id } = req.params
    const { precio } = req.query
    try {
        await productosModel.putProductoPrecio(id, precio)
        return res.status(201).send({message: 'Producto modificado'})
    } catch (error) {
        if(error.code){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json(message)
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}


const productosController = {
    controller_addProduct,
    controller_getHome,
    controller_getCategoria,
    controller_getSearch,
    controller_getProductobyID,
    controller_putLikes,
    controller_getLikes,
    controller_getProductoByIdUsuario,
    controller_deleteProducto,
    controller_PutProductoPrecio
}

module.exports = { productosController }