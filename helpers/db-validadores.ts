import { Op } from "sequelize";

import { Usuario, Rol, UsuarioRol } from '../models';

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ where: { nombre: rol } });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`);
    }
};

const existeId = async (id = 0, Tabla: any) => {

    const existeId = await Tabla.findByPk(id);
    if (!existeId) {
        throw new Error(`El id ${id} no existe`)
    }
};

const emailExiste = async (value: any, { req }: any) => {

    //Valido si enviaron id
    let existeEmail;
    if (req.params.id) {
        //Verificar si el correo existe
        existeEmail = await Usuario.findOne({
            where: {
                id: {
                    [Op.ne]: req.params.id
                },
                correo: {
                    [Op.eq]: value
                }
            }
        });
    }
    else {
        //Verificar si el correo existe
        existeEmail = await Usuario.findOne({ where: { correo: value } });
    }

    if (existeEmail) {
        throw new Error(`El correo ${value} ya esta registrado`)
    }
}

const usuarioRolExiste = async (value: any, { req }: any) => {

    //Valido si enviaron id
    let usuarioRolExiste;
    
    //Verificar si el correo existe
    usuarioRolExiste = await UsuarioRol.findOne({
        where: {
            usuario: {
                [Op.eq]: req.body.usuario
            },
            rol: {
                [Op.eq]: value
            }
        }
    });

    if (usuarioRolExiste) {
        throw new Error(`El usuario rol ya esta registrado`)
    }
}


export {
    esRolValido,
    emailExiste,
    existeId,
    usuarioRolExiste
}