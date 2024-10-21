// app.ts 
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import configs from '@/configs';
// import { logRequestDetails, logResponseDetails } from './middleware/loggingMiddleware';
import cookieParser from 'cookie-parser';
import applyProxies from './middleware/proxyMiddleware';
import { routeConfigMiddleware } from './middleware/routeConfigMiddleware';

const app = express();
// ========================
// Enable CORS for all routes
// ========================
app.use(cors());
// ========================
// Add logging
// ========================
app.use(morgan('dev'));
// app.use(logRequestDetails);
// app.use(logResponseDetails);
// ========================
// Parse JSON and cookies
// ========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// ========================
// Route Configuration Middleware
// ========================
app.use(routeConfigMiddleware);
// =======================
// Proxy Routes
// =======================
applyProxies(app);
// ========================
// Add a health check route
// ========================
app.get('/', (_req, res) => {
    res.send('API Gateway is running');
});
// ========================
// Add a catch-all route for debugging
// ========================
app.use('*', (req, res) => {
    console.log('Unhandled request:', req.method, req.originalUrl);
    res.status(404).send('Not Found');
});
// ========================
// Log proxy destinations
// ========================
console.log(`Proxying requests to ${configs.authServiceUrl || 'N/A'} and ${configs.productServiceUrl || 'N/A'}`);

export default app;