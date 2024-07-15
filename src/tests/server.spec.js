const request = require('supertest')
const server = require('../../index')


describe("Operaciones CRUD del contrato", () => {
    let jwt = ''
    describe("Verificando la RUTA POST - /login", () => {
        it('Obteniendo un 201, que es response es un objeto y el email coinciden de la RUTA /login', async () => {
            const usuario = { email: 'pitou@gmail.com', password:'1234' }
            const { body, statusCode } = await request(server).post("/login").send(usuario)
            jwt = 'Bearer ' +  body.token

            expect(statusCode).toBe(201)
            expect(body).toBeInstanceOf(Object)
            expect(body.email).toBe(usuario.email)
        })
        it('Obteniendo un 401, de un email incorrecto', async () => {
            const usuario = { email: 'noexiste@gmail.com', password:'1234' }
            const { body, statusCode } = await request(server).post("/login").send(usuario)

            expect(statusCode).toBe(401)
            expect(body.error).toBe("El Email no existe")
        })
        it('Obteniendo un 401, de un password incorrecto', async () => {
            const usuario = { email: 'pitou@gmail.com', password:'12345' }
            const { body, statusCode } = await request(server).post("/login").send(usuario)

            expect(statusCode).toBe(401)
            expect(body.error).toBe("La contraseña es incorrecta")
        })
    })
    
    describe("Verificando la RUTA POST - /users", () => {
        it('Obteniendo un 201, con un usuario que no existe en pg de la Ruta users', async () => {
            const usuario = { email: 'juanperez@gmail.com', password:'1234' }
            // el usuario no tiene que estar registrado en la database
            const { body, statusCode } = await request(server).post("/users").send(usuario)
    
            expect(statusCode).toBe(201)
            expect(body.message).toBe("Usuario Registrado con éxito")
        })
        it('Obteniendo un 401, con un usuario que existe en pg de la Ruta users', async () => {
            const usuario = { email: 'juanperez@gmail.com', password:'1234' }
            const { body, statusCode } = await request(server).post("/users").send(usuario)
    
            expect(statusCode).toBe(400)
            expect(body).toBe("unique_violation")
        })

    })

    describe("Verificando la RUTA PUT - /users", () => {
        it('Obteniendo un 201, subiendo una url_imagen a la RUTA PUT /users', async () => {
            const usuario = { id: 1, imagen: 'https://external-preview.redd.it/TUsG8t9P8kH_p7T1F4tbAj187DG-dFTdbzh0HExPM3k.jpg?auto=webp&s=ab0d7645b7f5ed6f300503741f9e0fe6be1e52eb' }
            const { body, statusCode } = await request(server).put("/users").send(usuario)

            expect(statusCode).toBe(201)
            expect(body.id).toBe(usuario.id)
        })

    })

    describe("Verificando la RUTA POST - /productos", () => {
        it('Obteniendo un 201, subiendo un producto a la RUTA POST /productos', async () => {
            const producto = { id_usuario: 1, nombre:'producto 1', imagen: 'imagen 1', descripcion: 'descripcion 1', precio: 1, categoria: 'procesador', cantidad: 1 }
            const { body, statusCode } = await request(server).post('/productos').set('Authorization', jwt).send(producto)

            expect(statusCode).toBe(201)
            expect(body.message).toBe("Producto publicado con éxito")
        })

    })

    describe("Verificando la RUTA GET - /productos/:id", () => {
        it('Obteniendo un 200, al consultar el producto', async () => {
            const id_producto = 2
            const { body, statusCode } = await request(server).get(`/productos/${id_producto}`).send()

            expect(statusCode).toBe(200)
            expect(body.id).toBe(id)
        })

    })

    describe("Verificando la RUTA DELETE - /productos/:id", () => {
        it('Obteniendo un 200, al eliminar el producto', async () => {
            const id_producto = 1
            const { body, statusCode } = await request(server).delete(`/productos/${id_producto}`).set('Authorization', jwt).send()

            expect(statusCode).toBe(200)
            expect(body.message).toBe('Producto eliminado')
        })

    })

    describe("Verificando la RUTA PUT - /productos/:id", () => {
        it('Obteniendo un 201, al consultar el producto', async () => {
            const id_producto = 2
            const precio = 5000
            const { body, statusCode } = await request(server).put(`/productos/${id_producto}?precio=${precio}`).set('Authorization', jwt).send()

            expect(statusCode).toBe(201)
            expect(body.message).toBe('Producto modificado')
        })

    })

    describe("Verificando la RUTA GET - /likes/:id", () => {
        it('Obteniendo un 200, al consultar los likes del producto', async () => {
            const id_producto = 2
            const { body, statusCode } = await request(server).get(`/likes/${id_producto}`).send()

            expect(statusCode).toBe(200)
            expect(body).toBeInstanceOf(Object)
        })

    })

    describe("Verificando la RUTA PUT - /likes/:id", () => {
        it('Obteniendo un 200, al poner un likes del producto', async () => {
            const id_producto = 2
            const id_usuario = 1
            const { body, statusCode } = await request(server).put(`/likes/${id_producto}`).set('Authorization', jwt).send({id_usuario: id_usuario})

            expect(statusCode).toBe(200)
            expect(body).toBeInstanceOf(Object)
        })

    })

    describe("Verificando la RUTA GET - /productosusuario", () => {
        it('Obteniendo un 200, al consultar los productos del usuario', async () => {
            const { body, statusCode } = await request(server).get(`/productosusuario?id_usuario=${1}&page=${1}&limit=${5}&order=${'ASC'}`).send()

            expect(statusCode).toBe(200)
            expect(body).toBeInstanceOf(Object)
        })

    })

    describe("Verificando la RUTA GET - /home", () => {
        it('Obteniendo un 200, al consultar los productos homePage', async () => {
            const { body, statusCode } = await request(server).get(`/home?categoria=${'procesador'}`).send()

            expect(statusCode).toBe(200)
            expect(body.productos).toBeInstanceOf(Object)
        })

    })

    describe("Verificando la RUTA GET - /categorias", () => {
        it('Obteniendo un 200, al consultar los productos de cada categoria', async () => {
            const { body, statusCode } = await request(server).get(`/categorias?categoria=${'procesador'}&page=${1}&limit=${5}&order=${'ASC'}`).send()

            expect(statusCode).toBe(200)
            expect(body.results).toBeInstanceOf(Object)
        })

    })

    describe("Verificando la RUTA GET - /categorias", () => {
        it('Obteniendo un 200, al consultar los productos de cada categoria', async () => {
            const { body, statusCode } = await request(server).get(`/search?search=${'intel'}&page=${1}&limit=${5}&order=${'ASC'}`).send()

            expect(statusCode).toBe(200)
            expect(body.results).toBeInstanceOf(Object)
        })

    })
})