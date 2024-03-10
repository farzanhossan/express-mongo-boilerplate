import { Request, Response } from 'express';
import { responseData } from '../../lib/utils/responseData';
import productService from './product.service';

const productController = {
  create: async (req: Request, res: Response) => {
    try {
      const data = await productService.create(req.body);
      return responseData({ req, res, data });
    } catch (error) {
      return responseData({ req, res, error });
    }
  },
  get: async (req: Request, res: Response) => {
    try {
      const query: any = { ...req.query };
      delete query.page;
      delete query.limit;

      const data = await productService.get(query);
      return responseData({ req, res, data });
    } catch (error) {
      return responseData({ req, res, error });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = await productService.getById(id);
      return responseData({ req, res, data });
    } catch (error) {
      return responseData({ req, res, error });
    }
  },
  updateById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = await productService.updateById(id, req.body);
      return responseData({ req, res, data });
    } catch (error) {
      return responseData({ req, res, error });
    }
  },
  deleteById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const data = await productService.deleteById(id);
      return responseData({ req, res, data });
    } catch (error) {
      return responseData({ req, res, error });
    }
  },
};

export default productController;
