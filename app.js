import  express, { response }  from 'express';
import ProductManager from './src/ProductManager.js';

const app = express()

const PORT = 8080;

const productManager = new ProductManager('./src/products.json')

const peliculas = await productManager.getProducts()


//RUTA RAIZ "localhost:8080"
app.get('/', (request, response) => {
    response.send('<h1>Cartelera de Cine</h1>')
})


// RUTA DE PRODUCTO SEGUN ID CON req.params
app.get('/products/:pid', (request, response) => {
    const id = parseInt(request.params.pid)
    const productId = peliculas.find(item => item.id == id)
    if (!productId) {
        return response.send({Error: 'La pelicula no fue encontrada'})
    } else {
        response.send(productId)
    }
})


// LIMITADOR CON QUERY PARAMS
app.get('/products', async(request, response) => {
    const result = await productManager.getProducts()
    const limit = request.query.limit
    if (!limit) {
        response.send(peliculas )
    } else {
        let prodLimit = peliculas.slice(0,limit)
        response.send(prodLimit) 
    }
})



app.listen(PORT, () => console.log('Server Up'))