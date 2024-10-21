// src/middleware/routeConfigMiddleware.ts
import { Request, Response, NextFunction } from 'express';

export const routeConfigMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    // Here, you can add any custom configuration or perform actions based on the route.
    // For example, logging the route information:
    console.log(`Configuring route: ${req.method} ${req.originalUrl}`);

    // You could also modify request properties or set some default values, if needed
    // For example, setting a custom header
    req.headers['x-custom-header'] = 'MyCustomHeaderValue';

    next(); // Proceed to the next middleware
};
