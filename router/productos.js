const { Router } = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto} = require('../controllers/productos')
const {existeProductoporId, existeCategoriaporId} = require('../helpers/db-validators');
const {esAdminRole} = require('../middlewares/validar-roles');

const router = Router();

//{{url}}/api/categorias

//Obtener todas las categorias - público
router.get('/', obtenerProductos);

//Obtener todas las categoria por id - público
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoporId),
    validarCampos
], obtenerProducto);

//Crear categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaporId),
    validarCampos
],crearProducto);

//Actualizar - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    // check('categoria','No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoporId),
    validarCampos
],actualizarProducto);

//Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoporId),
    validarCampos
],borrarProducto);

module.exports = router;