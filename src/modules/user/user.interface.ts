import { Document } from 'mongoose';
import { IBaseEntity } from '../base/base.interfaces';

export default interface IUserModel extends Document {
  name: string;
  avatar: string;
  phoneNumber: string;
  companyName: string;
  email: string;
  dob: string;
  password: string;
  gender: string;
  address: string;
  isVerified: boolean;
}

export interface IUser extends IBaseEntity {
  name: string;
  avatar: string;
  phoneNumber: string;
  companyName: string;
  email: string;
  dob: string;
  password: string;
  gender: string;
  address: string;
  isVerified: boolean;
}

export interface IUserQuery extends IUser {
  searchTerm: string;
  name: any;
}
