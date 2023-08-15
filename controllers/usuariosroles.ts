import { Request, Response } from 'express';
import bcryptjs from "bcryptjs";
import { Op } from 'sequelize';

import UsuarioRol from '../models/usuariorol';

export const getUsuariosRoles = async (req: Request, res: Response) => {

    const { limit = 5, page = 0 } = req.query;    
    
    
    const {count,rows} = await UsuarioRol.findAndCountAll({
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

export const getUsuarioRol = async (req: Request, res: Response) => {

    const { id } = req.params;

    const rol = await UsuarioRol.findByPk(id);

    if (rol) {
        res.json(rol);
    } else {
        res.status(404).json({
            msg: `No existe un usuario rol con el id ${id}`
        });
    }

}

export const postUsuarioRol = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const rol = await UsuarioRol.create(body);;

        res.json(rol);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }



}

export const putUsuarioRol = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { password, autenticacion, ...update } = req.body;
 
    try {

        const rol = await UsuarioRol.findByPk(id);
        if (!rol) {
            return res.status(404).json({
                msg: 'No existe un usuario rol con el id ' + id
            });
        }

        await rol.update(update);

        res.json(rol);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}