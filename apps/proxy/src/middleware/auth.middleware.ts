import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { AuthRequest } from '../types/auth.types';

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return
    }

    const decoded = verifyAccessToken(token);

    if (!decoded) {
        res.status(401).json({ message: 'Invalid or expired token' });
        return
    }
    (req as AuthRequest).user = decoded;
    next();
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    const user = (req as AuthRequest).user;
    if(!user.isAdmin){
        res.status(403).json({ message: 'Forbidden. Only admin can access' })
        return
    }

    next();
}