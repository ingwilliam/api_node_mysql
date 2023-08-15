import { Router } from "express";
import { check, query } from 'express-validator';

import { googleSingin, login } from '../controllers/auth';
import { validarCampos } from "../middlewares";

const router = Router();

router.post('/login',[
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
], login);


router.post('/google',[
    check('id_token','Id token es necesario').not().isEmpty(),    
    validarCampos
], googleSingin )

export default router;
