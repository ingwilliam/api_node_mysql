import { Request, Response } from 'express';
import bcryptjs from "bcryptjs";
import { Op } from 'sequelize';

import Rol from '../models/rol';

export const getRoles = async (req: Request, res: Response) => {

    const { limit = 5, page = 0 } = req.query;    
    
    
    const {count,rows} = await Rol.findAndCountAll({
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

export const getRol = async (req: Request, res: Response) => {

    const { id } = req.params;

    const rol = await Rol.findByPk(id);

    if (rol) {
        res.json(rol);
    } else {
        res.status(404).json({
            msg: `No existe un rol con el id ${id}`
        });
    }

}

export const postRol = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        const rol = await Rol.create(body);;

        res.json(rol);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }



}

export const putRol = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { password, autenticacion, ...update } = req.body;

    try {

        const rol = await Rol.findByPk(id);
        if (!rol) {
            return res.status(404).json({
                msg: 'No existe un rol con el id ' + id
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

export const deleteRol = async (req: Request, res: Response) => {

    const { id } = req.params;

    const rol = await Rol.findByPk(id);
    if (!rol) {
        return res.status(404).json({
            msg: 'No existe un rol con el id ' + id
        });
    }

    await rol.update({ estado: false });

    res.json(rol);
}