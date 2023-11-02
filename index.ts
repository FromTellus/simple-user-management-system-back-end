import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { userRoutes } from './src/routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3003;

// Middlewares
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/copeUsers', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Could not connect to MongoDB:', err.message);
});

// Routes
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

