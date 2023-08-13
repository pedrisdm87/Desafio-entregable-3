import ProductManager from './ProductManager.js';

const productLoader = async () => {
  const pm = new ProductManager('./products.json');

  await pm.addProduct("Oppenheimer", "Biografia", 2500, "Movie1.jpg", 301, 200);
  await pm.addProduct("Barbie", "Infantil", 2500, "Movie2.jpg", 302, 200);
  await pm.addProduct("El Padrino", "Drama", 2500, "Movie3.jpg", 303, 200);
  await pm.addProduct("Titanic", "Romance", 2500, "Movie4.jpg", 304, 200);
  await pm.addProduct("La Guerra de las Galaxias","Ciencia Ficción", 2500, "Movie5.jpg", 305, 200);
  await pm.addProduct("Jurassic Park", "Aventura", 2500, "Movie6.jpg", 306, 200);
  await pm.addProduct("El Señor de los Anillos", "Fantasía", 2500, "Movie7.jpg", 307, 200);
  await pm.addProduct("Harry Potter y la Piedra Filosofal", "Fantasía", 2500, "Movie8.jpg", 308, 200);
  await pm.addProduct("Avatar", "Ciencia Ficción", 2500, "Movie9.jpg", 309, 200);
  await pm.addProduct("El Rey León", "Infantil", 2500, "Movie10.jpg", 310, 200);
  await pm.addProduct("Forrest Gump", "Drama", 2500, "Movie11.jpg", 311, 200);
  await pm.addProduct("Misión Imposible", "Acción", 2500, "Movie12.jpg", 312, 200);
// ... Agregar más productos ...

  const products = await pm.getProducts();
  console.log(products);
};

productLoader();
export default productLoader;