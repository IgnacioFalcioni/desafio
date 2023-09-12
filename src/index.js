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
  constructor() {
    this.products = [];
    this.productIdCounter = 1; 
  }

  addProduct(product) {
    
    const codeExists = this.products.some((p) => p.code === product.code);

    if (codeExists) {
      throw new Error("El código del producto ya existe.");
    }

    
    product.id = this.productIdCounter++;
    this.products.push(product);
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
}


const productManager = new ProductManager();


const initialProducts = productManager.getProducts();
console.log("Productos iniciales:", initialProducts);


try {
  const newProduct = new Product("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  productManager.addProduct(newProduct);
  console.log("Producto agregado:", newProduct);
} catch (error) {
  console.error(error.message);
}


const productsAfterAdd = productManager.getProducts();
console.log("Productos después de agregar:", productsAfterAdd);


try {
  const duplicateProduct = new Product("Producto duplicado", "Este es un producto duplicado", 300, "Sin imagen", "abc123", 30);
  productManager.addProduct(duplicateProduct);
  console.log("Producto duplicado agregado:", duplicateProduct);
} catch (error) {
  console.error(error.message);
}


const foundProduct = productManager.getProductById(1);
console.log("Producto encontrado por ID:", foundProduct);


try {
  const nonExistentProduct = productManager.getProductById(999);
  console.log("Producto no existente encontrado:", nonExistentProduct);
} catch (error) {
  console.error(error.message);
}

