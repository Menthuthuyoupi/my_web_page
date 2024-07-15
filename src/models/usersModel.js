const database = require('../database/connection')
const bcrypt = require('bcryptjs')
const { getDatabaseError } = require('../lib/errors/database.error.js')

const register = async (email, password) => {
    const query = "INSERT INTO usuarios (email, password) VALUES ($1, $2)"
    const passwordEncrypted = bcrypt.hashSync(password)
    password = passwordEncrypted
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

const usersModel = {
    register,
    verificarCredenciales,
    actualizandoFoto
}

module.exports = { usersModel }
