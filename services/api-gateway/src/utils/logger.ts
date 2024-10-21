// src/utils/logger.ts
import { Request, Response } from 'express';
import winston from 'winston';

const createLogger = ({ level }: { logGroupName: string, service: string, level: string }) => {
    const options = {
        console: {
            level,
            handleExceptions: true,
            json: false,
            colorize: true,
        },
    };

    // Create a winston logger instance with only console transport
    const logger = winston.createLogger({
        level,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
        ),
        transports: [
            new winston.transports.Console(options.console),
        ],
    });

    return logger;
};

export const logRequest = (logger: winston.Logger, req: Request, additionalInfo: object = {}) => {
    logger.info('Incoming Request', {
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
        ...additionalInfo,
    });
};

export const logResponse = (logger: winston.Logger, res: Response, additionalInfo: object = {}) => {
    logger.info('Outgoing Response', {
        statusCode: res.statusCode,
        headers: res.getHeaders(),
        ...additionalInfo,
    });
};

export const logError = (logger: winston.Logger, error: Error, additionalInfo: object = {}) => {
    logger.error('Error', {
        message: error.message,
        stack: error.stack,
        ...additionalInfo,
    });
};

export default createLogger;
