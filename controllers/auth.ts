import { Request, Response } from 'express';
import bcryptjs from "bcryptjs";
import { Op } from 'sequelize';
import {generarJWT} from '../helpers/generar-jwt';

import Usuario from "../models/usuario";
import googleVerify from '../helpers/google-verify';

export const login = async (req: Request, res: Response) => {

    const { correo, password } = req.body;

    try {
        //Verificar si el correo existe
        const usuario = await Usuario.findOne({
            where: {
                correo: {
                    [Op.eq]: correo
                }
            }
        });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - usuario',
            })
        }

        //Si el usuario esta activo
        if(!usuario.get('estado')){
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - estado:false',            
            })
        }
        
        //Verificar la contraseña
        const upassword:any= usuario.get('password');
        const validPassword = bcryptjs.compareSync(password,upassword);
        if(!validPassword)
        {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - password',            
            })
        }

        const token = await generarJWT(usuario.get('id'));

        return res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error en la atenticación',
        })
    }
};

export const googleSingin = async(req: Request, res: Response) => {

    const {id_token} = req.body;
    
    try {

        const {nombre,given_name,family_name,img,correo} = await googleVerify(id_token)

        let usuario = await Usuario.findOne({
            where: {
                correo: {
                    [Op.eq]: correo
                }
            }
        });

        if(!usuario)
        {
            const data ={
                nombre,
                correo,
                password:'123445',
                img,
                autenticacion:'Google',
                estado:true,
                rol:'USER'
            }

            usuario = await Usuario.create(data);;

            await usuario.save();

        }

        //Si el usuario BD 
        if(!usuario.get('estado')) {
            return res.status(401).json({
                msg:'Usuario bloqueado',                            
            })    
        }

        //Generar el jws
        const token = await generarJWT(usuario.get('id'));


        res.json({
            usuario,            
            token
        })  

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg:'El token no se pudo verificar',            
        })
    }

    

};