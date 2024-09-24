const { sequelize } = require('../conexion/connection')
const { DataTypes } = require('sequelize')

const ProductCategoryView = sequelize.define(
  'ProductCategoryView',
  {
    productID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1,
    },
    CategoryName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    QuantityPerUnit: {
      type: DataTypes.STRING,
      allowNull: false,
      default: 'N/A',
    },
    UnitPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      default: 0.0,
    },
    UnitsInStock: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      default: 0,
    }
  },
  {
    tableName: 'productsandcategories',
    timestamps: false,
  }
)

module.exports = { ProductCategoryView }
