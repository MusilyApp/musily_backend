import 'dotenv/config';

import express, { Express } from 'express';
import userRoutes from '../../../../features/user/presenter/routes';
import authRoutes from '../../../../features/auth/presenter/routes';
import libraryRoutes from '../../../../features/library/presenter/routes';

const app: Express = express();
app.use(express.json());

const port = process.env.PORT || 4000;

app.use('/users', userRoutes.router);
app.use('/auth', authRoutes.router);
app.use('/library', libraryRoutes.router);

app.listen(port, () => console.log(`App running at port ${port}`));
