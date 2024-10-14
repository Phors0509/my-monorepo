import express from "express";
import cookieParser from 'cookie-parser';
import { RegisterRoutes } from "./routes/v1/routes";
import swaggerUi from 'swagger-ui-express';
import path from "path";
import fs from 'fs';
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import reqDateMiddleware from "./middlewares/reqDateMiddleware";
// Load Swagger JSON
const swaggerFile = path.resolve(__dirname, 'docs/swagger.json');
const swaggerData = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

const user = {
    name: "Jajdkfkjdassasddhn",
    age: 30
}

// Initialize express app
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Global Middlewares

// Register middleware
app.use(reqDateMiddleware)

// Register routes
RegisterRoutes(app);

app.use(cookieParser());
// Serve Swagger UI

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/user', (_req, res) => {
    res.json(user);
}
);

// Serve Swagger JSON
app.get('/docs/swagger.json', (_req, res) => {
    res.sendFile(swaggerFile);
});
console.log(`========================================================`);
console.log('Product service started successfully');
// Global Error Handler
app.use(globalErrorHandler);

export default app;