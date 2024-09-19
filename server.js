const { Product } = require('./src/modelos/product')
const { sequelize } = require('./src/conexion/connection')

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
