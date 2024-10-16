import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const router = Router();

// Proxy requests to the Product service (at /products)
router.use('/products', createProxyMiddleware({
    target: 'http://localhost:3002',  // Product service running on port 3002
    changeOrigin: true,
    pathRewrite: {
        '^/products': '/products',  // Keep '/products' as is
    },
}));

export default router;
