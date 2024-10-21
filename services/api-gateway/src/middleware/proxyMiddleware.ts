// src/middleware/proxyMiddleware.ts
import { ROUTE_PATHS } from '@/route-defs';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { authenticateToken } from './authenticateToken';

const proxyConfigs: { [key: string]: any } = {};

Object.keys(ROUTE_PATHS).forEach((key) => {
    const route = ROUTE_PATHS[key];

    if (route && route.path && route.target) {
        proxyConfigs[route.path] = {
            target: route.target,
            changeOrigin: true,
            pathRewrite: (path: any) => path.replace(route.path, ''),
            timeout: 10000, // Set a timeout of 10 seconds
            proxyTimeout: 10000,
            onError: (err: any, res: any) => {
                console.error(`[Proxy Error] ${err.message}`);
                res.status(500).send('Proxy Error');
            },
            onProxyReq: (req: any) => {
                console.log(`[Proxy Request] ${req.method} ${req.url}`);
            },
            onProxyRes: (proxyRes: any, req: any,) => {
                console.log(`[Proxy Response] ${proxyRes.statusCode} ${req.url}`);
            },
        };
    }
});

const applyProxies = (app: express.Application) => {
    Object.keys(ROUTE_PATHS).forEach((key) => {
        const route = ROUTE_PATHS[key];

        if (route && route.path && proxyConfigs[route.path]) {
            console.log(`Configuring route: ${route.path}`);
            if (route.isPrivate) {
                app.use(route.path, authenticateToken, createProxyMiddleware(proxyConfigs[route.path]));
            } else {
                app.use(route.path, createProxyMiddleware(proxyConfigs[route.path]));
            }
        }
    });
};

export default applyProxies;
