const { DataTypes } = require('sequelize');
const database = require('../config/db');
const Cliente = require('./modelCliente');

const Venda = database.define('Venda', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dataVenda: {
        type: DataTypes.DATE,
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
    }
})

Venda.belongsTo(Cliente, {
    constraints: true,
    foreignKey: 'fkIdCliente'
})

Cliente.hasMany(Venda, {
    foreignKey: 'fkIdCliente'
})

module.exports = Venda;