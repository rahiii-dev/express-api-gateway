import jwt, { JwtPayload } from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; 
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h'; 

export interface CustomPayload extends JwtPayload {
  _id: string;
  isAdmin: boolean;
}

export const generateAccessToken = (payload: CustomPayload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  return token;
};

export const verifyAccessToken = (token: string): CustomPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as CustomPayload;
    return decoded; 
  } catch (error) {
    return null; 
  }
};
