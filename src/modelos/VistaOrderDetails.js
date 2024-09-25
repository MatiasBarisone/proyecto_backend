const { sequelize } = require('../conexion/connection')
const { DataTypes } = require('sequelize')


const VistaOrderDetails = sequelize.define('VistaOrderDetails', {
    OrderID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ProductID: {
      type: DataTypes.INTEGER
    },
    ProductName: {
      type: DataTypes.STRING
    },
    UnitPrice: {
      type: DataTypes.FLOAT
    },
    Quantity: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'VistaOrderDetails',
    timestamps: false
  });

module.exports = { VistaOrderDetails }
