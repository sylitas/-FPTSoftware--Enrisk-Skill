import cors from 'cors';
import express from 'express';
import serverless from 'serverless-http';
import { setupRouter } from './routers/index';

const app = express();

const { ConfigLimit: limit } = process.env;

app.use(cors());
app.use(express.json({ limit }));
app.use(express.urlencoded({ limit, extended: true }));

setupRouter(app);

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

export const handler = serverless(app);
