import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);



userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


/**
 * Compares a given password with the user's hashed password.
 * @param {string} candidate - The password to compare.
 * @returns {Promise<boolean>} - A promise that resolves to true if the
 * passwords match, false otherwise.
 */
userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {

 

  const isMatch = await bcrypt.compare(candidate, this.password);
  
  return isMatch;

};



export const User = model<IUser>('LibraryUser', userSchema);
