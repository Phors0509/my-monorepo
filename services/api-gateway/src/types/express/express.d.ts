// src/types/express.d.ts
import { User } from './User';

// Extend the Express Request interface
declare module 'express-serve-static-core' {
    interface Request {
        user?: User; // Add the custom user type to the Request interface
    }
}
