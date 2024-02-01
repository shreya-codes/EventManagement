import mongoose from 'mongoose';
import validator from 'validator';

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true,validate(value: string) {
    if (!validator.isEmail(value)) {
      throw new Error('Email is invalid');
    }
  },},
  phone: { type: String },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6,
    validate(value: string) {
      if (!validator.isStrongPassword(value)) {
        throw new Error('Password is not strong enough');
      }
    },
  },
});

const UserModel = mongoose.model<IUser>('User',UserSchema);

export { UserModel };
