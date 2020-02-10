import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import apiV1 from './apiV1';

class App {
  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
  }

  setMiddlewares() {
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(helmet());
  }

  setRoutes() {
    this.express.use('/v1', apiV1);
  }
}


export default new App().express;