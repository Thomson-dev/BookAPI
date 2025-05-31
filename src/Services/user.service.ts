import { User, IUser } from '../Model/user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface UserService {
  createUser(name: string, email: string, password: string): Promise<IUser >;
  getUserByEmail(email: string): Promise<IUser  | null>;
  isTokenValid(token: string): Promise<boolean>;
}

class UserServiceImpl implements UserService {
  /**
   * Creates a new user with the given details.
   * @param {string} name - The name of the user.
   * @param {string} email - The email address of the user.
   * @param {string} password - The password of the user to hash before saving.
   * @returns {Promise<IUser >} - The saved user document.
   */
  async createUser(name: string, email: string, password: string): Promise<IUser > {

    const user: IUser = new User({ email, password, name });
    return user.save();
  }

  /**
   * Retrieves a user by their email address.
   * @param {string} email - The email address to search for.
   * @returns {Promise<IUser | null>} - The user document if found, or null if not found.
   */
  async getUserByEmail(email: string): Promise<IUser  | null> {
    return User.findOne({ email });
  }



  async isTokenValid(token: string): Promise<boolean> {
    if (!token) return false;

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'passwordKey') as { id: string };
      const user = await  User.findById(decoded.id);
      return !!user;
    } catch {
      return false;
    }
  }
}

export default UserServiceImpl;