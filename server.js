import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import morgan from 'morgan';
dotenv.config();
const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', authRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`server is listening on port https://localhost:${port}`);
});
