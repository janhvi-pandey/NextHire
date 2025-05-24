import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(token) {
  try {
   
     const data=jwt.verify(token, JWT_SECRET);
    
     return data;
  } catch (error) {
    console.error('Token verification error:', error.message);
    return null;
  }
}
