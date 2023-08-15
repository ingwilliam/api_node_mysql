import { DataTypes } from "sequelize";

import db from "../db/connection";
import UsuarioRol from "./usuariorol";

const Rol = db.define('roles',{
    id: {  
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,       
    },
    nombre: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.BOOLEAN
    }
})

export default Rol;