import { Request, Response } from 'express';
import bcryptjs from "bcryptjs";
import { Op } from 'sequelize';

import Usuario from '../models/usuario';

export const getUsuarios = async (req: Request, res: Response) => {

    const { limit = 5, page = 0 } = req.query;    
    
    
    const {count,rows} = await Usuario.findAndCountAll({
        where: {
            estado: {
                [Op.eq]: true
            }
        },
        offset: Number(page)*Number(limit),
        limit: Number(limit)
    });

    res.json({
        total:count,
        page:Number(page),
        limit:Number(limit),
        rowsTotal:rows.length,
        rows,        
    })

}

export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk(id);

    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }

}

export const postUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        body.password = bcryptjs.hashSync(body.password, salt);

        const usuario = await Usuario.create(body);;

        res.json(usuario);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }



}

export const putUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { password, autenticacion, ...update } = req.body;

    try {

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id ' + id
            });
        }

        if (password) {
            //Encriptar contrasela
            const salt = bcryptjs.genSaltSync(10);
            update.password = bcryptjs.hashSync(password, salt);
        }

        await usuario.update(update);

        res.json(usuario);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { uid } = req;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: 'No existe un usuario con el id ' + id
        });
    }    

    await usuario.update({ estado: false });

    res.json({usuario,uid});
}