const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const {dbConnection} = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            uploads: '/api/uploads'
            
        }

        //conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Retas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use( express.static('public') );

        //Fileupload - Cargar de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.categorias, require('../router/categorias'));
        this.app.use(this.paths.buscar, require('../router/buscar'));
        this.app.use(this.paths.auth, require('../router/auth'));
        this.app.use(this.paths.usuarios, require('../router/usuarios'));
        this.app.use(this.paths.productos, require('../router/productos'));
        this.app.use(this.paths.uploads, require('../router/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;