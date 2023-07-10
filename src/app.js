import express from 'express';
import employeesRouter from './routes/employees.routes.js';

const app = express();

app.use(express.json());
app.use('/api', employeesRouter);
app.use((req, res, next) => {
   return res.status(404).json({
      message: 'endpoint not found.',
   });
});

export default app;
