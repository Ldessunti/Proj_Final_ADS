const { DataTypes } = require('sequelize');
const database = require('../config/db');
const Barbeiro = require('./modelBarbeiro');
const Cliente = require('./modelCliente');
const Corte = require('./modelCorte');

//Adicionar as FK

const Agendamento = database.define('Agendamento', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    dataHora: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    status: {
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
    }
})

Agendamento.belongsTo(Cliente, {
    constraints: true,
    foreignKey: 'fkIdCliente'
})

Agendamento.belongsTo(Barbeiro, {
    constraints: true,
    foreignKey: 'fkIdBarbeiro'
})

Agendamento.belongsTo(Corte, {
    constraints: true,
    foreignKey: 'fkIdCorte'
})

Cliente.hasMany(Agendamento, {
    foreignKey: 'fkIdCliente'
})

module.exports = Agendamento;