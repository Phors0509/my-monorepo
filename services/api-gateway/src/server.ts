// server.ts
import { createServer } from 'http';
import app from '@/app';
import configs from '@/configs';

const startServer = async () => {
    try {
        const server = createServer(app);

        server.listen(configs.port, () => {
            console.log(`========================================================`);
            console.log(`API Gateway is running on: http://localhost:${configs.port}`);
            console.log(`========================================================`);
        });
    } catch (error) {
        console.error('Server: Server error:', error);
        process.exit(1);
    }
};

startServer();