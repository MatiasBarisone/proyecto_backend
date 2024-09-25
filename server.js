const express = require('express');
const { Employees } = require('./src/modelos/employees');
const { Product } = require('./src/modelos/product');
const { ProductCategoryView } = require('./src/modelos/productsandcategories');
const { VistaOrderDetails } = require('./src/modelos/VistaOrderDetails');


const { sequelize } = require('./src/conexion/connection');
const {Op} = require('sequelize');
const app = express();
const PORT = process.env.PORT || 3000;




// Conectar a la base de datos antes de iniciar el servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida con éxito!');

    // Iniciar el servidor en el puerto definido solo después de que la conexión sea exitosa
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('No me pude conectar porque sucedió: ', error);
  });

// Endpoint para obtener todos los productos
app.get('/productos', async (req, res) => {
  try {
    const products = await Product.findAll(
      //ORDERNAR POR:
      {order: [['CategoryID','ASC'],['productName','DESC']]}
    );
    res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los productos' });
  }
});

//VIEW CON MYSQL WORKBENCH DE ORDENES JUNTANDO DOS TABLAS
app.get('/VistaOrderDetails/orders/:OrderID', async (req, res) => {
  try {
    const { orderId } = req.query; // Recibir el parámetro 'orderId' desde la URL

    let orders;
    if (orderId) {
      // Si se recibe un OrderID, aplicar el filtro y ordenar por ProductID de forma descendente
      orders = await VistaOrderDetails.findAll({
        where: { OrderID: orderId },
        order: [['ProductID', 'DESC']] // Ordenar por ProductID descendente
      });
    } else {
      // Si no se recibe un OrderID, traer todas las órdenes ordenadas por ProductID descendente
      orders = await VistaOrderDetails.findAll({
        order: [['ProductID', 'DESC']] // Ordenar por ProductID descendente
      });
    }

    // Enviar la respuesta con los resultados
    res.json(orders);
  } catch (error) {
    console.error('Error al obtener las órdenes:', error);
    res.status(500).send('Error al obtener las órdenes');
  }
});

// BUSQUEDA POR PRODUCTOS Y CATEGORIAS
app.get('/productsandcategories', async (req, res) => {
  try {
    const { productsandcategories } = req.params;
    const product = await Product.findAll(productsandcategories);
    product ? res.json(product) 
            : res.status(404).json({ message: 'Producto no encontrado' });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el producto' });
  }
});

// BUSQUEDA POR ID
app.get('/productos/:productID', async (req, res) => {
  try {
    const { productID } = req.params;
    const product = await Product.findByPk(productID);
    product ? res.json(product) 
            : res.status(404).json({ message: 'Producto no encontrado' });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el producto' });
  }
});

// BUSQUEDA POR CATEGORIA
app.get('productos/categoria/:CategoryID', async (req, res) => {
  try {
    const { CategoryID } = req.params;
    const product = await Product.findAll({where: {CategoryID}});
    product ? res.json(product) 
            : res.status(404).json({ message: 'Producto no encontrado' });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el producto' });
  }
});

// BUSQUEDA POR QUERY
app.get('/productos/buscar/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const products = await Product.findAll({
      where: {
        productName: {
          [Op.like]: `%${query}%` // Usamos LIKE en lugar de ILIKE
        }
      }
    });

    products.length
      ? res.json(products) 
      : res.status(404).json({ message: 'Producto no encontrado' });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los productos' });
  }
});

// BUSQUEDA POR IMPORTE MAYOR CON OPERADOR
app.get('/productos/importeMayor/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const products = await Product.findAll({
      where: {
        UnitPrice: {
          [Op.gt]: query
        }},
        //ORDENAR POR:
        order: [['UnitPrice','ASC']]
    });
    products.length 
      ? res.json(products) 
      : res.status(404).json({ message: 'Producto no encontrado' });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los productos' });
  }
});



// Endpoint para obtener todos los empleados
app.get('/empleados', async (req, res) => {
  try {
    const employees = await Employees.findAll();
    res.json(employees);
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los empleados' });
  }
});
