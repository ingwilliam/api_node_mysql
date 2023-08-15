import { Router } from "express";
import { check, query } from 'express-validator';

import { Rol, Usuario, UsuarioRol } from "../models";
import { getUsuarioRol, getUsuariosRoles, postUsuarioRol, putUsuarioRol } from "../controllers/usuariosroles";
import { validarCampos, validarJWT } from "../middlewares";
import { emailExiste, esRolValido, existeId, usuarioRolExiste } from "../helpers/db-validadores";

const router = Router();

router.get('/',
    [
        query("limit", "El valor de 'limite' debe ser numérico").isNumeric().optional(),
        query("page", "El valor de 'page' debe ser numérico").isNumeric().optional(),
        validarCampos,
    ], getUsuariosRoles);

router.get('/:id', getUsuarioRol);

router.post('/', [
    validarJWT,
    check('usuarioId', 'El usuario es obligatorio').not().isEmpty(),
    check('roleId', 'El rol es obligatorio').not().isEmpty(),
    check('roleId').custom(id => existeId(id, Rol)),
    check('usuarioId').custom(id => existeId(id, Usuario)),
    validarCampos
], postUsuarioRol);

router.put('/:id', [
    validarJWT,
    check('id').custom(id => existeId(id, UsuarioRol)),
    check('usuarioId', 'El usuario es obligatorio').not().isEmpty(),
    check('roleId', 'El rol es obligatorio').not().isEmpty(),
    check('roleId').custom(id => existeId(id, Rol)),
    check('usuarioId').custom(id => existeId(id, Usuario)),
    check('roleId').custom(usuarioRolExiste),
    validarCampos
], putUsuarioRol);

export default router;