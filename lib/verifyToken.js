// lib/verifyToken.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function verifyToken(token) {
  try {
    console.log(token);
     const data=jwt.verify(token, JWT_SECRET);
     console.log(data);
     return data;
  } catch (error) {
    console.error('Token verification error:', error.message);
    return null;
  }
}
