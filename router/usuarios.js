const { Router } = require('express');
const {check} = require('express-validator');

const {validarCampos, validarJWT,esAdminRole ,tieneRole} = require('../middlewares');

const {usuariosGet,
    usuariosPut,
    usuariosPatch,
    usuariosPost,
    usuariosDelete} = require('../controllers/usuarios');

const {esRolValido, emailExiste, existeUsuarioPorId} = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.post('/',[
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El correo es obligatorio y debe ser más de 6 letras').isLength({min: 6}),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPost);

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;