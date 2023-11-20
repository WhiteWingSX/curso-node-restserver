const {Role, Categoria, Producto} = require('../models');
const Usuario = require('../models/usuario');

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if ( !existeRol ) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async(correo = '') => {
    const existeEmail = await Usuario.findOne({correo})
    if (existeEmail) {
        throw new Error(`El correo: ${correo} ya está registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id)
    if (!existeUsuario) {
        throw new Error(`El id no existe: ${id}`);
    }
}

const existeCategoriaporId = async(id) => {
    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria) {
        throw new Error(`El id no existe: ${id}`);
    }
}

const existeProductoporId = async(id) => {
    const existeProducto = await Producto.findById(id)
    if (!existeProducto) {
        throw new Error(`El id no existe: ${id}`);
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida) {
        throw new Error(`La coleccion ${ coleccion } no es permitida ${ colecciones }`);
    }
    return true;
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaporId,
    existeProductoporId,
    coleccionesPermitidas
}