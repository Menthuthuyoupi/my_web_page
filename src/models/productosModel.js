const database = require('../database/connection')
const format = require('pg-format');

const addProduct = async (id_usuario, nombre, imagen, descripcion, precio, categoria, cantidad) => {
    const query = "INSERT INTO productos (id_usuario, nombre, url_imagen, descripcion, precio, categoria, cantidad) values ($1, $2, $3, $4, $5, $6, $7)"
    const values = [id_usuario, nombre, imagen, descripcion, precio, categoria, cantidad]
    await database.query(query, values)
}

const getHome = async (categoria) => {
    const query = 'SELECT * FROM productos WHERE categoria = $1'
    const { rows, rowCount:total } = await database.query(query, [categoria])
    if(total === 0) throw { code: 400, message: "No hay productos de esa categoria" }
    return {rows, total}
}

const getCategory = async (categoria, order, limit, page) => {
    const offset = (page - 1)*limit
    const query = 'SELECT * FROM productos WHERE categoria = $1'
    const { rowCount: total } = await database.query(query, [categoria])
    const formattedQuery = format('SELECT * FROM productos WHERE categoria = $1 order by precio %s LIMIT %s OFFSET %s', order, limit, offset)
    const { rows } = await database.query(formattedQuery, [categoria])
    return { rows, total}
}

const getProductoByIdUsuario = async (id_usuario, order, limit, page) => {
    const offset = (page - 1)*limit
    const query = 'SELECT * FROM productos WHERE id_usuario = $1'
    const { rowCount: total } = await database.query(query, [id_usuario])
    const formattedQuery = format('SELECT * FROM productos WHERE id_usuario = $1 order by precio %s LIMIT %s OFFSET %s', order, limit, offset)
    const { rows } = await database.query(formattedQuery, [id_usuario])
    return { rows, total}
}

const getSearch = async (search, order, limit, page) => {
    const searchDatabase = '%' + search + '%'
    const offset = (page - 1)*limit
    const query = 'SELECT * FROM productos WHERE productos.nombre ILIKE $1 OR productos.descripcion ILIKE $1'
    const { rowCount: total } = await database.query(query, [searchDatabase])

    const formattedQuery = format('SELECT * FROM productos WHERE productos.nombre ILIKE $1 OR productos.descripcion ILIKE $1 order by precio %s LIMIT %s OFFSET %s', 
                            order, limit, offset)

    const {rows } = await database.query(formattedQuery, [searchDatabase])
    return { rows, total}
}

const getProductobyID = async (id) => {
    const query = 'SELECT * FROM productos WHERE id = $1'
    const { rowCount, rows } = await database.query(query, [id])
    if(rowCount === 0) {throw { code: 400, message: "No existe ese producto id" }}
    return rows[0]
}

const putLike = async (id, id_usuario) => {
    const PrevLikes = 'SELECT * FROM productos WHERE id = $1'
    const { rows } = await database.query(PrevLikes, [id])
    if(rows[0].id_usuario !== id_usuario){
        const query = 'INSERT INTO likes (id, id_producto, id_usuario) VALUES ($1, $2, $3)'
        const idLikes = id + '-' + id_usuario
        const query2 = 'SELECT * FROM likes WHERE id = $1'
        const { rowCount } = await database.query(query2, [idLikes])
        if(rowCount === 0){
            await database.query(query, [idLikes, id, id_usuario])
        }
    }
    const likes = await getLikes(id)
    return likes
}

const getLikes = async (id) => {
    const query = 'SELECT * FROM likes WHERE id_producto = $1'
    const { rowCount: likes } = await database.query(query, [id])
    return likes
}

const deleteProducto = async (id) => {
    const queryDeleteLikes = "DELETE FROM likes WHERE id_producto = $1"
    await database.query(queryDeleteLikes, [id]) 
    const queryDeleteProducto = 'DELETE FROM productos WHERE id = $1'
    const {rowCount: total} = await database.query(queryDeleteProducto, [id])
    return { total}
}

const putProduct = async (id, precio, cantidad, descripcion, url_imagen, nombre) => {
    //cantidad es la cantidad comprada por el usuario
    const evaluar = cantidad.split(' ')
    const { cantidad: cantidadDB } = await getProductobyID(id) 
    const query = 'UPDATE productos SET precio = $1, cantidad = $2, descripcion = $3, url_imagen = $4, nombre = $5 WHERE id = $6'
    if(evaluar[1] === 'default'){   
        const value = [precio, cantidadDB, descripcion, url_imagen, nombre, id]
        await database.query(query, value)
    }else{
        const nuevaCantidad = +cantidadDB - +evaluar[0]
        const value = [precio, nuevaCantidad, descripcion, url_imagen, nombre, id]
        await database.query(query, value) 
    }
}

const postMisCompras = async (id, id_usuario, nombre, imagen, cantidad) => {
    const query = 'INSERT INTO misCompras (id_producto, id_usuario, nombre, url_imagen, cantidad, fecha) VALUES ($1, $2, $3, $4, $5, DEFAULT)'
    const value = [id, id_usuario, nombre, imagen, cantidad]
    await database.query(query, value)
}

const getMisCompras = async (id) => {
    const query = 'SELECT * FROM misCompras WHERE id_usuario = $1'
    const value = [id]
    const { rows } = await database.query(query, value)
    return rows
}

const productosModel = {
    addProduct,
    getHome,
    getCategory,
    getSearch,
    getProductobyID,
    putLike,
    getLikes,
    getProductoByIdUsuario,
    deleteProducto,
    putProduct,
    postMisCompras,
    getMisCompras
}

module.exports = { productosModel }