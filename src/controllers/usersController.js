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
            return res.status(code).json(message)
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const controller_login = async (req, res) => {
    const { email, password } = req.body    
    try {
        const userLogged = await usersModel.verificarCredenciales(email, password)
        const token = jwt.sign({email}, 'az_AZ', { expiresIn: "1h"}) 
        return res.status(201).send({email: userLogged.email, photo: userLogged.url_imagen, id: userLogged.id, logged: true, token: token})
    } catch (error) {
        if(error.code && error.code !== 401){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).send(message)
        }else if(error.code === 401){
            return res.status(401).send({email:'', logged:false, id:'', photo:'',error: error.message})
        }
        return res.status(500).send({ message: "Internal server error" })
    }
}

const controller_photo = async (req, res) => {
    const { id, imagen } = req.body
    try {
        const tusDatos = await usersModel.actualizandoFoto(id, imagen)
        return res.status(201).send({email: tusDatos.email, logged:true, id: tusDatos.id, photo: tusDatos.url_imagen})
    } catch (error) {
        if(error.code && error.code !== 400){
            const { code, message } = getDatabaseError(error.code)
            return res.status(code).json(message)
        }else if(error.code == 400){
            return res.status(400).send({message:error.message})
        }
        return res.status(500).json({ message: "Internal server error" })
    }
}

const usersController = {
    controller_register,
    controller_login,
    controller_photo
}

module.exports = { usersController }