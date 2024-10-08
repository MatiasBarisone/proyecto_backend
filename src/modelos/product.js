const { sequelize } = require('../conexion/connection')
const { DataTypes } = require('sequelize')

const Product = sequelize.define(
  'Product',
  {
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false, // No permitir null para el ID
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false, // Nombre del producto es obligatorio
    },
    SupplierID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false, // La categoría es obligatoria
    },
    QuantityPerUnit: {
      type: DataTypes.STRING,
      allowNull: false, // Cantidad por unidad es obligatoria
    },
    UnitPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false, // El precio unitario no debe ser nulo
    },
    UnitsInStock: {
      type: DataTypes.SMALLINT,
      allowNull: false, // Las unidades en stock son obligatorias
    },
    UnitsOnOrder: {
      type: DataTypes.SMALLINT,
      allowNull: false, // Las unidades en orden son obligatorias
    },
    ReorderLevel: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    Discontinued: {
      type: DataTypes.BOOLEAN,
      allowNull: false, // No permitir nulo; por defecto es falso
      defaultValue: false,
    },
  },
  {
    tableName: 'Products',
    timestamps: false,
  }
);

module.exports = { Product }
