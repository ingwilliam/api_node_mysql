import { Router } from "express";
import { check, query } from 'express-validator';

import { Usuario } from "../models";
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/usuarios";
import { validarJWT, tieneRole, validarCampos }  from "../middlewares";
import { emailExiste, esRolValido, existeId } from "../helpers/db-validadores";

const router = Router();

router.get('/',
    [
        query("limit", "El valor de 'limite' debe ser numérico").isNumeric().optional(),
        query("page", "El valor de 'page' debe ser numérico").isNumeric().optional(),
        validarCampos,
    ], getUsuarios);

router.get('/:id', getUsuario);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
], postUsuario);

router.put('/:id', [
    validarJWT,
    check('id').custom(id => existeId(id, Usuario)),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol').custom(esRolValido),
    validarCampos
], putUsuario);

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN','USER','FREDY'),
    check('id').custom(id => existeId(id, Usuario)),
    validarCampos
]
    , deleteUsuario);

export default router;
