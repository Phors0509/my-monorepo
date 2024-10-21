import { Request, Response, NextFunction } from 'express';

export const logRequestDetails = (req: Request, _res: Response, next: NextFunction) => {
    console.log(`[Request] Host: ${JSON.stringify(req.headers.host)}`);
    console.log(`[Request] URL: ${req.url}`);
    console.log(`[Request] Method: ${req.method}`);
    console.log(`[Request] Path: ${req.path}`);
    console.log(`[Request] Headers: ${JSON.stringify(req.headers)}`);
    next();
};

export const logResponseDetails = (_req: Request, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    res.send = function (body) {
        console.log(`[Response] Status: ${res.statusCode}`);
        console.log(`[Response] Headers: ${JSON.stringify(res.getHeaders())}`);
        console.log(`[Response] Body: ${body}`);
        return originalSend.apply(this, arguments as any);
    };
    next();
};