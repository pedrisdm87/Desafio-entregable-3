import fs from "fs";

class ProductManager {
  #path = "./products.js";
  #_products = [];
  #format = 'utf-8'

  constructor() {
    this.#init();
    this.#format 
  }

  async #init() {
    try {
      await fs.access(this.#path);
      let data = await fs.readFile(this.#path, this.#format);
      if (!data.trim()) {
        await fs.writeFile(this.#path, JSON.stringify([], null, 2));
        this.#_products = [];
      } else {
        this.#_products = JSON.parse(data);
      }
    } catch (error) {
      await fs.promises.writeFile(this.#path, JSON.stringify([], null, 2));
    }
  }

  async getProducts() {
    let data = await fs.promises.readFile(this.#path, this.#format);
    const products = JSON.parse(data);
    return products;
  }

  #getNextID(products) {
    return products.length === 0 ? 1 : products[products.length - 1].id + 1;
  }

  async getProductById(id) {
    let data = await fs.promises.readFile(this.#path, this.#format);
    let products = JSON.parse(data);
    let product = products.find((item) => item.id === id);
    if (!product) return `[ERR] Not found id product`;
    return product;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock
    )
      return `[ERR] Required fields missing`;

    let data = await fs.promises.readFile(this.#path, this.#format);
    let products = JSON.parse(data);

    const found = products.find((item) => item.code === code);
    if (found) {
      return `[ERR] Code already in use`;
    }

    const productToAdd = {
      id: this.#getNextID(products),
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    products.push(productToAdd);
    await fs.promises.writeFile(this.#path, JSON.stringify(products, null, 2));
    return productToAdd;
  }

  async deleteProduct(id) {
    let data = await fs.promises.readFile(this.#path, this.#format);
    let products = JSON.parse(data);
    let newProducts = products.filter((item) => item.id !== id);
    if (products.length !== newProducts.length) {
      await fs.promises.writeFile(this.#path, JSON.stringify(newProducts, null, 2));
      return newProducts;
    } else {
      return `[ERR] Product does not exist`;
    }
  }

  async updateProduct(id, updatedProduct) {
    let data = await fs.promises.readFile(this.#path, this.#format);
    let products = JSON.parse(data);
    let newProducts = products.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...updatedProduct,
        };
      } else return item;
    });
    await fs.promises.writeFile(this.#path, JSON.stringify(newProducts, null, 2));
    return newProducts.find((item) => item.id === id);
  }
}

const pm = new ProductManager();

(async () => {
  await pm.addProduct(
    'Oppenheimer',
    'Biografia',
    2500,
    'Movie.jpg',
    301,
    200
  );
  await pm.addProduct(
    'Barbie',
    'Infantil',
    2500,
    'Movie.jpg',
    302,
    200
  );
  await pm.addProduct(
    'El Padrino',
    'Drama',
    2500,
    'Movie1.jpg',
    303,
    200
  );
  await pm.addProduct(
    'Titanic',
    'Romance',
    2500,
    'Movie2.jpg',
    304,
    200
  );
  await pm.addProduct(
    'La Guerra de las Galaxias',
    'Ciencia Ficción',
    2500,
    'Movie3.jpg',
    305,
    200
  );

  await pm.addProduct(
    'Jurassic Park',
    'Aventura',
    2500,
    'Movie4.jpg',
    306,
    200
  );

  await pm.addProduct(
    'El Señor de los Anillos',
    'Fantasía',
    2500,
    'Movie5.jpg',
    307,
    200
  );

  await pm.addProduct(
    'Harry Potter y la Piedra Filosofal',
    'Fantasía',
    2500,
    'Movie6.jpg',
    308,
    200
  );

  await pm.addProduct(
    'Avatar',
    'Ciencia Ficción',
    2500,
    'Movie7.jpg',
    309,
    200
  );

  await pm.addProduct(
    'El Rey León',
    'Infantil',
    2500,
    'Movie8.jpg',
    310,
    200
  );

  await pm.addProduct(
    'Forrest Gump',
    'Drama',
    2500,
    'Movie9.jpg',
    311,
    200
  );

  await pm.addProduct(
    'Misión Imposible',
    'Acción',
    2500,
    'Movie10.jpg',
    312,
    200
  );


  console.log(await pm.getProducts());
})();

export default ProductManager;