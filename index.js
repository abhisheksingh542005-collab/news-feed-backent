import dotenv from"dotenv";
dotenv.config();
import express from'express';
import cors from'cors';
import connectToMongo from './src/config/db.js';

// Route Imports
import authRoutes from './src/routes/authRoutes.js';
import newsRoutes from './src/routes/newsRoutes.js';
import bookmarkRoutes from  './src/routes/bookmarkRoutes.js';
import errorHandler from './src/middleware/errorMiddleware.js';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Connect Database

connectToMongo();


// 2. Middlewa
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());

// 3. Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/news', newsRoutes);
app.use('/api/v1/bookmarks', bookmarkRoutes);

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'News Feed API is running' });
});

// 4. Global Error Handler
app.use(errorHandler);

// 5. Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});