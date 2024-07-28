const { usersModel } = require('../models/usersModel.js')
const jwt = require('jsonwebtoken')
const { getDatabaseError } = require('../lib/errors/database.error.js')

const controller_register = async (req, res) => {
    const { email, password } = req.body
    try {
        await usersModel.register(email, password)
        return res.status(201).send({message:"Usuario Registrado con éxito"})
    } catch (error) {
        if(error.code){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json({message: message})
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const controller_login = async (req, res) => {
    const { email, password } = req.body    
    try {
        const userLogged = await usersModel.verificarCredenciales(email, password)
        const token = jwt.sign({email}, 'az_AZ', { expiresIn: "1h"}) 
        return res.status(201).send({email: userLogged.email, photo: userLogged.url_imagen, id: userLogged.id, logged: true,
            nombre: userLogged.nombre, prefijo: userLogged.prefijo_telefonico, telefono: userLogged.telefono,
            birthdate: userLogged.birthdate, token: token, message:''})
    } catch (error) {
        if(error.code && error.code !== 401){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).send({ message: message })
        }else if(error.code === 401){
            return res.status(401).send({message: error.message})
        }
        return res.status(500).send({ message: "Internal server error" })
    }
}

const controller_photo = async (req, res) => {
    const { id, imagen } = req.body
    try {
        const tusDatos = await usersModel.actualizandoFoto(id, imagen)
        return res.status(201).send({email: tusDatos.email, photo: tusDatos.url_imagen, id: tusDatos.id, logged:true,
            nombre: tusDatos.nombre, prefijo: tusDatos.prefijo_telefonico, telefono: tusDatos.telefono,
            birthdate: tusDatos.birthdate
        })
    } catch (error) {
        if(error.code && error.code !== 400){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json({ message: message })
        }else if(error.code == 400){
            return res.status(400).send({message:error.message})
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const controller_newPassword = async (req, res) => {
    const { id, newPassword } = req.body
    try {
        await usersModel.actualizandoPassword(id, newPassword)
        return res.status(201).send({message: 'Password ha sido actualizado'})
    } catch (error) {
        if(error.code && error.code !== 400){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json({ message: message })
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const controller_yourInfo = async (req, res) => {
    const { id } = req.params
    const { nombre, prefijo, telefono, birthdate } = req.query
    try {
        const yourInfo = await usersModel.actualizandoInfo(id, nombre, prefijo, telefono, birthdate)
        return res.status(201).send(yourInfo)
    } catch (error) {
        if(error.code && error.code !== 400){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json({ message: message })
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const controller_deleteYourAcc = async (req, res) => {
    const { id } = req.params
    try {
        const deleteAcc = await usersModel.deleteYourAcc(id)
        return res.status(201).json(deleteAcc)
    } catch (error) {
        if(error.code && error.code !== 400){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json({ message: message })
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const usersController = {
    controller_register,
    controller_login,
    controller_photo,
    controller_newPassword,
    controller_yourInfo,
    controller_deleteYourAcc
}

module.exports = { usersController }