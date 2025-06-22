import express from 'express';
import dotenv from 'dotenv';

import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/database.js';
dotenv.config({ path: './src/config/.env' });
//
const app = express();
const PORT = process.env.PORT || 5001;

app.use('/api/notes', notesRoutes);
console.log(process.env.PORT);

connectDB().then(() => {
  console.log('Connected to DB');
  app.listen(PORT, () => {
    console.log(`Server started on PORT: ${PORT}`);
  });
});
