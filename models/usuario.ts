import { DataTypes } from "sequelize";

import db from "../db/connection";
import UsuarioRol from "./usuariorol";

const Usuario = db.define('usuarios',{
    id: {  
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,       
    },
    nombre: {
        type: DataTypes.STRING
    },
    correo: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    autenticacion: {
        type: DataTypes.TEXT,
        defaultValue: "N/A"
    },
})

//Oculto los campos que no deseo mostrar del modelo
Usuario.prototype.toJSON = function () {
    const { password, ...usuario } = Object.assign({}, this.get());
    return usuario;
}


export default Usuario;