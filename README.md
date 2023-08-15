# Base de datos
Recuerde que toda la base de datos se importa al contenedor desde el archivo 
./db/init.sql

El volumen se encuentra en la carpeta
./mysql-data

# Correr el contenedor mysql con phpmyadmin
docker-compose up -d

# Instalar las dependencias de npm
npm i

# Correr el proyecto en dos terminales
nodemon dist/app.ts
tsc --watch

# AYUDAS

# Operadores where
https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

# Relaciones
https://stackoverflow.com/questions/53882278/sequelize-association-called-with-something-thats-not-a-subclass-of-sequelize-m


# activar y agregar atritubutos en el Requets
Ubicar el directorio:

    node_modules/@types/express/index.d.ts

Si este archivo no existe lo puedes crear sin problema e incluir la definición de Request:

     declare global{
        namespace Express {
            interface Request {
                uid: string        
            }
        }
    }

En tu archivo tsconfig.json añades:

    "compilerOptions": {
        "typeRoots": [
          "@types",
          "./node_modules/@types",
        ]
    }

Ya con esto podrás usar el uid sin problema, y puedes añadir otras propiedades personalizadas.