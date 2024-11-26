const { DataTypes } = require('sequelize');
const database = require('../config/db');

const Corte = database.define('Corte', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    preco: DataTypes.DECIMAL,
    duracao: DataTypes.TIME,
})

module.exports = Corte;