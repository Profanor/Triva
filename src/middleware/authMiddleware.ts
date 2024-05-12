import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config(); 
import logger from "../../logger";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  }
}

// Generate a random secret key of sufficient length
const generateSecretKey = (): string => {
  return crypto.randomBytes(32).toString('hex'); // Generate a 256-bit (32-byte) random string
};

const key: string = process.env.SECRET_KEY || generateSecretKey();

const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) { 
  return res.status(401).json({ message: 'Access denied. Token missing' });
  }
  
  // Verify token
  jwt.verify(token, key, async (err: JsonWebTokenError | null, decodedToken: any) => {
    if (err) {
      logger.error('JWT verification failed:', err.message);
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Access denied. Token expired' });
      } else {
        return res.status(401).json({ message: 'Access denied. Invalid token' });
      }
    }
    // Token is verified, add user information to the request object
    req.user = {
        userId: decodedToken.userId,
        email: decodedToken.email
      };
  
      // Proceed to the next middleware or route handler
      next();
    });
};
  
export default authenticateToken;