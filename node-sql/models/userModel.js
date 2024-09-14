import { DataTypes } from "sequelize"
import connection from "../models/index.js"

const User = connection.define('User',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
})