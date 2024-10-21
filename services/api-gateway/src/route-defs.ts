import configs from "./configs";

// src/route-defs.ts
interface RouteDefinition {
    path: string;
    target: string;
    isPrivate?: boolean;
    requiredRole?: string;
}

export const ROUTE_PATHS: { [key: string]: RouteDefinition } = {
    AUTH_USERS: {
        path: '/api/auth/users',
        target: configs.authServiceUrl,
        isPrivate: true, // Make sure this is set to true
    },
    AUTH_GOOGLE_LOGIN: {
        path: '/api/auth/',
        target: configs.authServiceUrl || 'http://localhost:3001/',
        isPrivate: false, // This can be public as it starts the login flow
    },
    AUTH_LOGIN: {
        path: '/api/auth/',
        target: configs.authServiceUrl || 'http://localhost:3001/',
        isPrivate: false, // This can be public as it starts the login flow
    },
    PRODUCTS: {
        path: '/api/products',
        target: configs.productServiceUrl || 'http://localhost:3002/',
        isPrivate: false, // This route is public
    },
};
