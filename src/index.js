const fs = require('fs');

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = null;
  }
}

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
    this.productIdCounter = 1;

    
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      this.products = JSON.parse(data);
     
      this.productIdCounter = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
    } catch (error) {
      this.products = [];
    }
  }

  saveProducts() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
  }

  addProduct(product) {
    const codeExists = this.products.some((p) => p.code === product.code);

    if (codeExists) {
      throw new Error("El código del producto ya existe.");
    }

    product.id = this.productIdCounter++;
    this.products.push(product);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    this.products[index] = { ...updatedProduct, id };
    this.saveProducts();
  }

  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    this.products.splice(index, 1);
    this.saveProducts();
  }
}


const productManager = new ProductManager('productos.json');


const initialProducts = productManager.getProducts();
console.log("Productos iniciales:", initialProducts);

try {

  const newProduct = new Product("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  productManager.addProduct(newProduct);
  console.log("Producto agregado:", newProduct);


  const productsAfterAdd = productManager.getProducts();
  console.log("Productos después de agregar:", productsAfterAdd);


  const duplicateProduct = new Product("Producto duplicado", "Este es un producto duplicado", 300, "Sin imagen", "abc123", 30);
  productManager.addProduct(duplicateProduct);
  console.log("Producto duplicado agregado:", duplicateProduct);
} catch (error) {
  console.error(error.message);
}

try {

  const foundProduct = productManager.getProductById(1);
  console.log("Producto encontrado por ID:", foundProduct);


  const nonExistentProduct = productManager.getProductById(999);
  console.log("Producto no existente encontrado:", nonExistentProduct);
} catch (error) {
  console.error(error.message);
}
