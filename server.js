const express = require('express');
const { Employees } = require('./src/modelos/employees');
const { Product } = require('./src/modelos/product');
const { sequelize } = require('./src/conexion/connection');

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
    const products = await Product.findAll();
    res.status(200).res.json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los productos' });
  }
});

// Endpoint para obtener todos los empleados
app.get('/empleados', async (req, res) => {
  try {
    const employees = await Employees.findAll();
    res.status(200).res.json(employees);
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los empleados' });
  }
});
