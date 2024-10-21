import { Response } from 'express';

function setCookie(response: Response, name: string, value: string, options: any = {}) {
    response.cookie(name, value, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Ensures cookies are only sent over HTTPS in production
        sameSite: 'Lax', // Helps mitigate CSRF attacks
        ...options
    });
}

export default setCookie;