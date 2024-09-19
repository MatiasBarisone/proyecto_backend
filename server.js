const { Sequelize, DataTypes } = require('sequelize')
process.loadEnvFile()

const { DBUSER, PASSWORD, HOST, DATABASE } = process.env

const sequelize = new Sequelize(DATABASE, DBUSER, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
})

const Product = sequelize.define(
  'Product',
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
    SupplierID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1,
    },
    CategoryID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1,
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
    },
    UnitsOnOrder: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      default: 0,
    },
    ReorderLevel: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      default: 1,
    },
    Discontinued: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: 0,
    },
  },
  {
    tableName: 'Products',
    timestamps: false,
  }
)

const main = async () => {
  try {
    await sequelize.authenticate()
    console.log('Conexión establecida con exito ! =)')
    await Product.sync()
    const products = await Product.findAll()
    const productsData = products.map((p) => p.dataValues)
    console.table(productsData)
  } catch (error) {
    console.error('No me pude conectar porque sucedió: ', error)
  } finally {
    sequelize.close()
  }
}

main()
