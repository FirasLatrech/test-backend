// middleware/index.ts
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from "cors"
import swaggerUi from 'swagger-ui-express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import swaggerJSDoc from 'swagger-jsdoc';
import specs from '../swagger';
const middleware = express();
middleware.use(cors({
  origin: 'http://localhost:3001', // Replace with your frontend URL
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));
const app: express.Application = express();

// Set up GraphQL schema


middleware.use(express.json());
middleware.use(express.static('public'));
middleware.use(express.static(path.join(__dirname, 'public')));
middleware.use(cookieParser());

export default middleware;
