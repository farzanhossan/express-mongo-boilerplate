import mongoose from 'mongoose';
import IUserModel from './user.interface';
const { Schema } = mongoose;

const userSchema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      required: Boolean,
    },
    avatar: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model<IUserModel>('User', userSchema);
export default User;
