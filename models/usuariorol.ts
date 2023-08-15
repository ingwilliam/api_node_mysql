import { DataTypes } from "sequelize";
import db from "../db/connection";
import Usuario from "./usuario";
import Rol from "./rol";

const UsuarioRol = db.define('usuarios_roles',{
    id: {  
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,       
    },
    usuarioId: {
        type: DataTypes.INTEGER,        
        references: {
            model: Usuario,
            key: "id"
        }
    },
    roleId: {
        type: DataTypes.INTEGER,        
        references: {
            model: Rol,
            key: "id"
        }
    }

})




export default UsuarioRol;