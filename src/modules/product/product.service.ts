import { escapeRegex } from '../../lib/utils/regex';
import IProduct, { IProductFilter } from './product.interface';
import Product from './product.model';

const productService = {
  create: async (data: IProduct) => {
    return Product.create(data);
  },
  get: async (query: any = {}) => {
    if (query) {
      if (query.title) {
        const regex = new RegExp(escapeRegex(query.title), 'gi');
        query.title = regex;
        return Product.find({ ...query });
      }
      return Product.find({ ...query });
    }

    return Product.find({});
  },
  getById: async (id: string) => {
    return Product.findById(id);
  },
  updateById: async (id: string, data: any) => {
    return Product.findByIdAndUpdate(id, data, { new: true });
  },
  deleteById: async (id: string) => {
    return Product.findByIdAndDelete(id);
  },
};

export default productService;
