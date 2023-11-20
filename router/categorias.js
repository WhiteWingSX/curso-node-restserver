const { Router } = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria} = require('../controllers/categorias');
const {usuariosGet} = require('../controllers/usuarios');
const {existeCategoriaporId, emailExiste, esRolValido, existeUsuarioPorId} = require('../helpers/db-validators')
const {tieneRole} = require('../middlewares');
const {esAdminRole} = require('../middlewares/validar-roles');

const router = Router();

//{{url}}/api/categorias

//Obtener todas las categorias - público
router.get('/', obtenerCategorias);

//Obtener todas las categoria por id - público
router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaporId),
    validarCampos
], obtenerCategoria);

//Crear categoria - privado - cualquier persona con un token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],crearCategoria);

//Actualizar - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaporId),
    validarCampos
],actualizarCategoria);

//Borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeCategoriaporId),
    validarCampos
],borrarCategoria);

module.exports = router;