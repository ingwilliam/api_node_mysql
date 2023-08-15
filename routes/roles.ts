import { Router } from "express";
import { check, query } from 'express-validator';

import { Rol } from "../models";
import { deleteRol, getRol, getRoles, postRol, putRol } from "../controllers/roles";
import { validarCampos,validarJWT } from "../middlewares";
import { emailExiste, esRolValido, existeId } from "../helpers/db-validadores";

const router = Router();

router.get('/',
    [
        query("limit", "El valor de 'limite' debe ser numérico").isNumeric().optional(),
        query("page", "El valor de 'page' debe ser numérico").isNumeric().optional(),
        validarCampos,
    ], getRoles);

router.get('/:id', getRol);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], postRol);

router.put('/:id', [
    validarJWT,
    check('id').custom(id => existeId(id, Rol)),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], putRol);

router.delete('/:id', [
    validarJWT,
    check('id').custom(id => existeId(id, Rol)),
    validarCampos
], deleteRol);

export default router;