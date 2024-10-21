// src/middleware/authenticateToken.ts
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { jwtDecode } from 'jwt-decode';
import { Request, Response, NextFunction } from 'express';
import { User } from '@/types/User';
import configs from '@/configs';

const jwtVerifier = CognitoJwtVerifier.create({
    userPoolId: configs.awsCognitoUserPool,
    clientId: configs.awsCognitoClientId,
    tokenUse: 'id',
});

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('[authenticateToken] Middleware invoked');

    const token = req.cookies.accessToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        console.log('[authenticateToken] No token found');
        res.status(401).json({ message: 'Login to view the user' });
        return;
    }

    console.log('[authenticateToken] Token found:', token);

    try {
        // Verify the JWT token
        await jwtVerifier.verify(token);
        console.log('[authenticateToken] Token verified successfully');

        // Decode the token to extract user information
        const decodedToken = jwtDecode<any>(token);
        const user: User = {
            id: decodedToken.sub,
            email: decodedToken.email,
            role: decodedToken['custom:role'],
            username: decodedToken.username,
        };

        // Attach the user object to the request
        (req as any).user = user;
        next(); // Move to the next middleware
    } catch (err: any) {
        console.error('[authenticateToken] Authentication Error:', err.message);
        next(new Error('Invalid token')); // Pass the error to Express error handling
    }
};
