// configs.ts
import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

type Config = {
    env: string;
    port: number;
    authServiceUrl: string;
    productServiceUrl: string;
    awsCloudWatchLogRegion: string;
    awsCognitoClientId: string;
    awsCognitoUserPool: string;
    clientUrl: string;
};

function loadConfig(): Config {
    const env = process.env.NODE_ENV || 'development';
    const envPath = path.resolve(__dirname, `./configs/.env.${env}`);
    dotenv.config({ path: envPath });

    const envVarsSchema = Joi.object({
        NODE_ENV: Joi.string().required(),
        PORT: Joi.number().default(3000),
        AUTH_SERVICE_URL: Joi.string().required(),
        PRODUCT_SERVICE_URL: Joi.string().required(),
        AWS_CLOUDWATCH_LOGS_REGION: Joi.string().required(),
        AWS_COGNITO_CLIENT_ID: Joi.string().required(),
        AWS_COGNITO_USER_POOL: Joi.string().required(),
        CLIENT_URL: Joi.string().required(),
    }).unknown().required();

    const { value: envVars, error } = envVarsSchema.validate(process.env);
    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }

    return {
        env: envVars.NODE_ENV,
        port: envVars.PORT,
        authServiceUrl: envVars.AUTH_SERVICE_URL,
        productServiceUrl: envVars.PRODUCT_SERVICE_URL,
        awsCloudWatchLogRegion: envVars.AWS_CLOUDWATCH_LOGS_REGION,
        awsCognitoClientId: envVars.AWS_COGNITO_CLIENT_ID,
        awsCognitoUserPool: envVars.AWS_COGNITO_USER_POOL,
        clientUrl: envVars.CLIENT_URL,
    };
}

const configs = loadConfig();
export default configs;
