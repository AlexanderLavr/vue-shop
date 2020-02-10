import { Router } from 'express';
import Controller from './product.controller';

const product = Router();
const controller = new Controller();

product.post('/save', controller.saveProduct);

product.get('/', controller.getAll);

product.put('/editFavorite/:id', controller.update);


export default product;