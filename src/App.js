const express = require('express');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;


app.get('/products', (req, res) => {
  try {
    const data = fs.readFileSync('productos.json', 'utf8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});


app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);

  try {
    const data = fs.readFileSync('productos.json', 'utf8');
    const products = JSON.parse(data);
    const product = products.find((p) => p.id === productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
});
