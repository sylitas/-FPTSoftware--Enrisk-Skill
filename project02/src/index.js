import express, { urlencoded } from 'express';
import cors from 'cors';
import json from 'body-parser/lib/types/json.js';
import setupRouter from './routers/index.js';

const app = express();

const { ConfigPort: port, ConfigLimit: limit } = process.env;

app.use(cors());
app.use(json({ limit }));
app.use(urlencoded({ limit, extended: true }));

setupRouter(app);

app.use((req, res, next) => {
  res.status(404).send('Page Not Found');
});

app.listen(port, () => {
  console.log(`The app is listening on port ${port}`);
});
