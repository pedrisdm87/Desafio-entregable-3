import fs from "fs";

class ProductManager {
  #path = "./src/products.js";
  #_products = [];
  #format = "utf-8";

  constructor() {
    this.#init();
    this.#format;
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
    if (!title || !description || !price || !thumbnail || !code || !stock)
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
      await fs.promises.writeFile(
        this.#path,
        JSON.stringify(newProducts, null, 2)
      );
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
    await fs.promises.writeFile(
      this.#path,
      JSON.stringify(newProducts, null, 2)
    );
    return newProducts.find((item) => item.id === id);
  }
}



export default ProductManager;
