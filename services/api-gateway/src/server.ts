import express from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const PORT = 4000;
const AUTH_SERVICE = 'http://localhost:3001/auth';
const PRODUCT_SERVICE = 'http://localhost:3002/products';

// Enable CORS for all routes   
app.use(cors());

// Add morgan for logging
app.use(morgan('dev'));

// Proxy middleware configuration
const apiProxyProducts = createProxyMiddleware(<Options>{
    target: PRODUCT_SERVICE,
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Remove /api prefix
    },
    onProxyReq: (proxyReq: any) => {
        console.log(`Proxying request to: ${PRODUCT_SERVICE}${proxyReq.path}`);
    },
    onProxyRes: (proxyRes: any, req: any) => {
        console.log(`Received response from: ${PRODUCT_SERVICE}${req.url} with status: ${proxyRes.statusCode}`);
    },
    onError: (err: any, res: any) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy Error');
    },
});

const apiProxyAuth = createProxyMiddleware(<Options>{
    target: AUTH_SERVICE,
    changeOrigin: true,
    pathRewrite: {
        '^/api/auth': '/auth', // Remove /api prefix
    },
    onProxyReq: (proxyReq: any) => {
        console.log(`Proxying request to: ${AUTH_SERVICE}${proxyReq.path}`);
    },
    onProxyRes: (proxyRes: any, req: any) => {
        console.log(`Received response from: ${AUTH_SERVICE}${req.url} with status: ${proxyRes.statusCode}`);
    },
    onError: (err: any, res: any) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy Error');
    },
});

// Use the proxy middleware for all routes
app.use('/api/auth', apiProxyAuth);

// Use product proxy for /api/products routes
app.use('/api/products', apiProxyProducts);

// Add a catch-all route for debugging
app.use('*', (req, res) => {
    console.log('Unhandled request:', req.method, req.originalUrl);
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(`API Gateway running on port ${PORT}`);
    console.log(`Proxying requests to ${AUTH_SERVICE || 'N/A'} and ${PRODUCT_SERVICE || 'N/A'}`);
});
