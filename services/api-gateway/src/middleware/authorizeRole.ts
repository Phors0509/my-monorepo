// src/middleware/authorizeRole.ts
import { Request, Response, NextFunction } from 'express';

export const authorizeRole = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRole = (req as any).user?.role; // Accessing the user role from the extended type

        if (!userRole || userRole !== requiredRole) {
            return res.status(403).json({ message: 'Access Denied: Insufficient Permissions' });
        }

        next();
    };
};
