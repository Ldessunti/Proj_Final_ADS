const { DataTypes } = require('sequelize');
const database = require('../config/db');
const Venda = require('./modelVenda');

const Cliente = database.define('Cliente', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

Cliente.hasMany(Venda, {
    as: 'fkIdCliente',
    foreignKey: 'idCliente',
})

Produto.hasMany(Venda, {
    as: 'fkIdProduto',
    foreignKey: 'idProduto',
})


module.exports = Cliente;