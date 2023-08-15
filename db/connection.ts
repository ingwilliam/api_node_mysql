import { Sequelize } from "sequelize";

const db = new Sequelize('api_mysql','root','ingwilliam10',{
    host:'localhost',
    port: 7002,
    dialect: 'mysql',
    //logging: false
});

export default db;

