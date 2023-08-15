import express, {Application} from 'express';
import cors from "cors";

import {userRoutes,authRoutes, rolesRoutes, userRolesRoutes} from '../routes';
import db from "../db/connection";

class Server {
    
    private app: Application;
    private port: string;
    private apiPaths={
        authPath: '/api/auth',
        usuarios: '/api/usuarios',
        usuariosRoles: '/api/usuarios_roles',
        roles: '/api/roles'
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8001'

        //Metodos iniciales
        this.dbConnection();
        this.middlewares();        
        this.routes();
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('Database Online :)');
            

        } catch (error:any) {
            throw new Error(error);
        }
    }

    middlewares(){
        //Configurar el CORS
        this.app.use( cors() );

        //Lectura del body
        this.app.use( express.json() );

        //Carpeta publica
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.authPath,authRoutes);
        this.app.use(this.apiPaths.usuarios,userRoutes);
        this.app.use(this.apiPaths.roles,rolesRoutes);
        this.app.use(this.apiPaths.usuariosRoles,userRolesRoutes);        
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log('Felicitaciones :) servidor corriendo en el puerto '+this.port);
            
        })
    }
    

}

/*
//otras conexiones
export class Server2 {

}
*/

export default Server;
