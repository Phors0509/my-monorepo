// config.ts
import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

type Config = {
    env: string;
    port: number;
    mongodbUrl: string;
};

function loadConfig(): Config {
    const env = process.env.NODE_ENV || 'development';
    const envPath = path.resolve(__dirname, `./configs/.env.${env}`);
    dotenv.config({ path: envPath });

    const envVarsSchema = Joi.object({
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required(),
    }).unknown().required();

    const { value: envVars, error } = envVarsSchema.validate(process.env);
    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }
    return {
        env: envVars.NODE_ENV,
        port: envVars.PORT,
        mongodbUrl: envVars.MONGODB_URL,
    };
}

const configs = loadConfig();
export default configs;