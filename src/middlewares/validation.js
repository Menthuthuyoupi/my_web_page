const jwt = require('jsonwebtoken')

const validarToken = async (req, res, next) => {
    const Authorization = req.header('Authorization')
    const token = Authorization.split('Bearer ')[1]
    if (!token) {
        return res.status(401).json({ message: "No se recibio ningún token" });
      }    
    try {
        jwt.verify(token, "az_AZ")
        // const { email } = jwt.decode(token)
        next()
    } catch (error) {
        res.status(401).send({message:'token incorrecto'})
    }
}

const validations = {
    validarToken
}

module.exports = { validations }