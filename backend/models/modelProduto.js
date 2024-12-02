const { DataTypes } = require('sequelize');
const database = require('../config/db');
import Venda from './modelVenda';

const Produto = database.define('Produto', {
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
    quantidadeEstoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco: DataTypes.DECIMAL,
    idProduto: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Produto',
            key: 'id'
        }
    },
})

Venda.belongsTo(Produto, {
    constraints: true,
    as: 'fkIdProduto'
})



module.exports = Produto;