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

/**
 * @apiDefine Error
 * @apiError (4xx) 4xx Client Error
 * @apiErrorExample Forbidden
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "message": "Forbidden"
 *     }
 * @apiErrorExample Validate
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "message": "Your input params is incorrect!"
 *     }
 * @apiErrorExample Permission
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "You do not have permission!"
 *     }
 * @apiError (5xx) 5xx Server Error
 * @apiErrorExample Internal Server Error
 *     HTTP/1.1 500 Internal server error
 *     {
 *       "message": "Internal server error"
 *     }
 */
