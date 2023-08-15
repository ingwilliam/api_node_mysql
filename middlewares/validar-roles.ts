import { Request, Response } from 'express';

export const tieneRole=(...roles:any) => {

    return (req: Request, res: Response,next:any)=>{
        const { uid }:any = req;        

        if(!uid){
            return res.status(500).json({
                msg:'Se quiere verificar el role sin validar el token primero'
            });
        }
        
        //Creo el object de roles
        const uroles = uid.usuariosroles.map((usuariosroles: any) => usuariosroles.rol.toJSON().nombre);

        if(!roles.some((value:string) => uroles.includes(value))){
            return res.status(401).json({
                msg:`No cuenta con los roles ${roles}`
            });
        }

        next();
    }
    

    
}