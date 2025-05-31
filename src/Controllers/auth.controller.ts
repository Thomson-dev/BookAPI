// src/Controllers/auth.controller.ts
import { Request, Response } from 'express';
import UserServiceImpl from '../Services/user.service';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { NextFunction } from 'express';






const userService = new UserServiceImpl();




/**
 * Registers a new user and creates a JWT token.
 * @param {Request} req - The request object containing user credentials.
 * @param {Response} res - The response object used to send back the response.
 *
 * @returns {Promise<void>} - Responds with the user data and a JWT token if
 * registration is successful, or an error message if the user already
 * exists or an error occurs.
 */
export  const register = async (req: Request, res: Response, next: NextFunction ) : Promise<any> => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await userService.createUser(name, email, password);

    const token = jwt.sign({ id: user._id }, "passwordKey", { expiresIn: '1d' });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
     next(error);
  }
};








/**
 * 

 * Authenticates a user by validating their email and password.
 * 
 * @param {Request} req - The request object containing user credentials.
 * @param {Response} res - The response object used to send back the response.
 * 
 * @returns {Promise<void>} - Responds with a JWT token if authentication is successful, 
 * or an error message if the credentials are invalid or an error occurs.
 */
export const login  = async (req: Request, res: Response , next: NextFunction) : Promise<any> => {
  const { email, password } = req.body;

  try {
    const user = await userService.getUserByEmail(email);
    console.log(user)

    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await  user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'passwordKey', { expiresIn: '1d' });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
     next(error);
  }
};



/**
 * Verifies if a given token is valid.
 * @param {Request} req - The request object containing the token in the
 * "x-auth-token" header.
 * @param {Response} res - The response object used to send back the response.
 * 
 * @returns {Promise<void>} - Responds with a boolean indicating if the token is
 * valid or not.
 */
export const tokenIsValid = async (req: Request, res: Response) => {
  try {
    const token = req.header("x-auth-token");
    const isValid = await userService.isTokenValid(token || '');
    res.json(isValid);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }


}





