import fs from 'fs';
import { ProductManager } from './productManager.js';

const productManager = new ProductManager('./data/products.json');

export class CartManager{
    #path

    constructor(path){
        this.#path = path;
        this.#init()
    }

    async #init(){
        if(!fs.existsSync(this.#path)){
            await fs.promises.writeFile(this.#path, JSON.stringify([], null, 2));}
    }

    #generateID(data) {
    return (data.length === 0) ? 1 : data[data.length - 1].id +1;
    }



}
