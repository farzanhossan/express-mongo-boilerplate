import express from 'express';
import { verifyToken } from '../lib/utils/authorization';
import productController from '../modules/product/product.controller';

const productRouter = express.Router();

// product routes
productRouter.post('/', verifyToken, productController.create);
productRouter.get('/', productController.get);
productRouter.get('/:id', productController.getById);
productRouter.patch('/:id', verifyToken, productController.updateById);
productRouter.delete('/:id', verifyToken, productController.deleteById);

export default productRouter;
