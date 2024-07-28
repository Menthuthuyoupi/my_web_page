const database = require('../database/connection')
const bcrypt = require('bcryptjs')
const { getDatabaseError } = require('../lib/errors/database.error.js')

const register = async (email, password) => {
    const query = "INSERT INTO usuarios (email, password) VALUES ($1, $2)"
    const passwordEncrypted = bcrypt.hashSync(password)

    const values = [email, passwordEncrypted]
    await database.query(query, values)
}

const verificarCredenciales = async (email, password) => {
    const query = "SELECT * FROM usuarios WHERE email = $1"
    const values = [email]
    const { rows, rowCount } = await database.query(query, values)

    let correctedPassword = false
    if(rowCount !== 0){
        const { password: passwordEncrypted } = rows[0]
        correctedPassword = bcrypt.compareSync(password, passwordEncrypted)
    }
    
    if (!rowCount)
        throw { code: 401, message: "El Email no existe" }
    else if (!correctedPassword)
        throw { code: 401, message: "La contraseña es incorrecta" }
    else return rows[0]

}

const actualizandoFoto = async(id, imagen) => {
    const query = "UPDATE usuarios SET url_imagen = $1 WHERE id = $2 RETURNING *"
    const value = [imagen, id]
    const {rowCount, rows} = await database.query(query , value)
    if(rowCount === 0){
        throw { code: 400, message: "No se pudo actualizar tu foto" }
    }
    return rows[0]
}

const actualizandoPassword = async(id, password) => {
    const query = "UPDATE usuarios SET password = $1 WHERE id = $2"
    const passwordEncrypted = bcrypt.hashSync(password)

    const value = [passwordEncrypted, id]
    await database.query(query , value)
}

const actualizandoInfo = async(id, nombre, prefijo, telefono, birthdate) => {
    const query = "UPDATE usuarios SET nombre = $1, prefijo_telefonico = $2, telefono = $3, birthdate = $4 WHERE id = $5 RETURNING *"
    const value = [nombre, prefijo, telefono, birthdate, id]   
    const { rows } = await database.query(query , value)

    return { nombre: rows[0].nombre, prefijo: rows[0].prefijo_telefonico, telefono: rows[0].telefono, birthdate: rows[0].birthdate }
}

const deleteYourAcc = async(id) => {
    const query = "DELETE FROM usuarios WHERE id = $1 RETURNING *"
    const { rows } = await database.query(query , [id])

    return {message: 'Tu Cuenta ha sido eliminada'}
}

const usersModel = {
    register,
    verificarCredenciales,
    actualizandoFoto,
    actualizandoPassword,
    actualizandoInfo,
    deleteYourAcc
}

module.exports = { usersModel }
