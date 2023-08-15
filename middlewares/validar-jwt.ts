import { Request, Response } from 'express';
import jwt from "jsonwebtoken";

import { Rol, UsuarioRol, Usuario } from '../models';

export const validarJWT = async (req: Request, res: Response,next:any)=>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la petición'
        });
    }

    try {
        //Valido que el token
        const secret:any = process.env.SECRET_PRIVATE_KEY;
        const uid:any = jwt.verify(token,secret);

        //Consulyo el usuario autenticado
        const usuario = await Usuario.findByPk(uid.uid,{
            include: [{
                model: UsuarioRol,
                include: [
                    {
                        model: Rol,
                    },
                    {
                        model: Usuario,
                    }
                ]
                }            
        ]});
        
        //Validar si el usuario no existe
        if(!usuario)
        {
            return res.status(401).json({
                msg:'Token no valido - usuario no existe'
            });
        }

        //Verificar si el usuario ya fue borrado
        if(!usuario.get('estado'))
        {
            return res.status(401).json({
                msg:'Token no valido - usuario eliminado'
            });
        }

        //Ingreso el usuario al request
        req.uid=usuario.toJSON();
        
        //Llamo al siguiente middlewares
        next();    
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:'Token no valido'
        });
    }

    
    
}