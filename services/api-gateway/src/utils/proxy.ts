import { Request, Response } from 'express';

export const logProxyRequest = (targetUrl: string, proxyReq: any) => {
    console.log(`[Proxy Request] Target: ${targetUrl}`);
    console.log(`[Proxy Request] Method: ${proxyReq.method}`);
    console.log(`[Proxy Request] Headers: ${JSON.stringify(proxyReq.getHeaders())}`);
    console.log(`[Proxy Request] Path: ${proxyReq.path}`);
};

export const logProxyResponse = (targetUrl: string, proxyRes: any, req: Request) => {
    console.log(`[Proxy Response] Target: ${targetUrl}`);
    console.log(`[Proxy Response] Status: ${proxyRes.statusCode}`);
    console.log(`[Proxy Response] Headers: ${JSON.stringify(proxyRes.headers)}`);
    console.log(`[Proxy Response] Request Path: ${req.path}`);
    console.log(`[Proxy Response] Request Method: ${req.method}`);
    console.log(`[Proxy Response] Request Headers: ${JSON.stringify(req.headers)}`);
};

export const handleProxyError = (err: any, _req: Request, res: Response) => {
    console.error(`[Proxy Error] Message: ${err.message}`);
    console.error(`[Proxy Error] Stack: ${err.stack}`);
    res.status(500).send('Proxy Error');
};