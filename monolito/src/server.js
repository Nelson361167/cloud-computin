const express = require('express');
const pool = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());

// 1. Ruta de salud
app.get('/health', (req, res) => {
  res.json({ estado: 'ok' });
});

// 2. Ruta de prueba de Base de Datos
app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({
      estado: 'ok',
      mensaje: 'Conexión con PostgreSQL correcta',
      fecha: result.rows[0].now
    });
  } catch (error) {
    res.status(500).json({
      estado: 'error',
      mensaje: 'No se pudo conectar con PostgreSQL'
    });
  }
});

// 3. Ruta de productos
app.get('/productos', async (req, res) => { 
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar productos' });
  }
});

// 4. Ruta de pedidos (CORREGIDA: Ya tiene el ); al final)
app.get('/pedidos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pedidos');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar pedidos' });
  }
});

// 5. Ruta de usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar usuarios' });
  }
});

// 6. Encendido del servidor (Siempre al final)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

