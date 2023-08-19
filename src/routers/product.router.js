import { Router } from "express";  
import {ProductManager } from "../ProductManager.js";

const router = Router();
const productManager = new ProductManager('data/products.json');

router.get('/', async (req, res) => {
    const result = await productManager.getProducts();
    const limit = req.query.limit;
    if(typeof result== 'string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({error: result.slice(6) })
    }
    res.status(200).json({status: 'success', payload: result.slice(0,limit)});
})

router.get('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const result = await productManager.getProductByID(id);
    if(typeof result=='string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({error: result.slice(6) })
    }
    res.status(200).json({status:'success', payload: result});
})

router.post('/', async (req, res) => {
    const product = req.body;
    const result = await productManager.addProduct(product);
    if(typeof result=='string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({error: result.slice(6) })
    }
    req.status(201).json({ status: 'success', payload: result})
}) 

router.put('/:pid', async (req, res) => {
    const id = parseInt(req.params.pid);
    const data = req.body
    const result = await productManager.updateProduct(id, data);
    if(typeof result=='string') {
        const error = result.split(' ')
        return res.status(parseInt(error[0].slice(1,4))).json({error: result.slice(6) })
    }
})