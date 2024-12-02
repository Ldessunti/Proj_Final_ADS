const { DataTypes } = require('sequelize');
const database = require('../config/db');
const Cliente = require('./modelCliente');
const Produto = require('./modelProduto');

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
})

Venda.belongsTo(Cliente, {
    constraints: true,
    as: 'fkIdCliente'
})

Venda.belongsTo(Produto, {
    constraints: true,
    as: 'fkIdProduto'
})

Cliente.hasMany(Venda, {
    as: 'fkIdCliente'
})

Produto.hasMany(Venda, {
    as: 'fkIdProduto'
})


module.exports = Venda;