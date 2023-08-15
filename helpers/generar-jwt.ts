import jwt from "jsonwebtoken";

export const generarJWT = (uid:any)=>{

    return new Promise((resolve,reject)=>{
        const payload={uid};
        const secret:any = process.env.SECRET_PRIVATE_KEY;
        jwt.sign(payload,secret,{
            expiresIn:'4h'
        },(err,token)=>{
            if(err)
            {
                console.log(err);
                reject('No se puede generar el token');
            }
            else
            {
                resolve(token);
            }
        })
    });

}
