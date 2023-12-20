// index.ts
import { config } from "./config/config";
import logger from "./utils/logger";
import connect from "./utils/connect";
import dotenv from 'dotenv';
import express from "express";
export const currentpath = __dirname;
import path from 'path';
import middleware from './middleware';
import routes from './routes';
import { handleNotFound, globalErrorHandler } from './middleware/errorHandler';
import { buildSchema } from "type-graphql";
import cors from "cors"
import { ApolloServer } from "apollo-server-express";
const app  : any= express();
//Midelware : 

// Handle 404 Error

// ⚡️
const NAMESPACE = "Main";
dotenv.config();

app.use(cors());

const start = async () => {
  // const schema = await buildSchema({
  //   resolvers,
  // });
  // const server = new ApolloServer({
  //   schema,
  // });
  // await server.start();
  // server.applyMiddleware({ app });
  try {
    await connect();
    logger.info(`${NAMESPACE} : Server started successfully`);
    
    app.listen({ port: 3000 }, () => {
      logger.info(` App is listening on http://localhost:300`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
void start();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// // Use middleware
app.use(middleware);
// // Use routes
app.use(routes);
// app.all('*', handleNotFound);
// // Global Error Handler
// app.use(globalErrorHandler);

