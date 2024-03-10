import { Document } from 'mongoose';

export default interface IProduct extends Document {
  title: string;
  image: string;
  description: string;
  isActive: boolean;
}

export interface IProductFilter {
  searchTerm?: string;
  name?: string;
}
