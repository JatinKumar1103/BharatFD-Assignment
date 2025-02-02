import express from 'express';
import { adminRouter, authenticate } from './config/admin.config.js'; // Import AdminJS router and auth middleware
import faqRouter from './routes/faq.routes.js'; // Import your FAQ routes

const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Admin panel route with authentication middleware
app.use('/admin', (req, res, next) => {
    console.log("Admin panel accessed");  // This should log when the /admin route is accessed
    next();
  }, authenticate, adminRouter) // AdminJS panel at /admin route

// Use FAQ API routes
app.use('/api/faqs', faqRouter);

export { app };
