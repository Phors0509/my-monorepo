// src/middleware/authMiddleware.ts
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { jwtDecode } from 'jwt-decode';
import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include the user property
declare module 'express-serve-static-core' {
    interface Request {
        user?: any;
    }
}
import configs from '@/configs';

const jwtVerifier = CognitoJwtVerifier.create({
    userPoolId: configs.awsCognitoUserPool,
    clientId: configs.awsCognitoClientId,
    tokenUse: 'id', // Change to 'access' if using access tokens
});

export const authenticateJwt = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization header missing or invalid' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify the JWT token
        await jwtVerifier.verify(token);

        // Optionally decode the token to extract user information
        const decodedToken = jwtDecode<any>(token);
        req.user = decodedToken; // Attach user information to the request for further use
        next();
    } catch (err: any) {
        console.error(`[Authentication Error] Message: ${err.message}`);
        return res.status(401).json({ message: 'Invalid token' });
    }
};
