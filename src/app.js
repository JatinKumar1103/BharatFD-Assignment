import express from 'express';
import { adminRouter, authenticate } from './config/admin.config.js'; 
import faqRouter from './routes/faq.routes.js'; 

const app = express();

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));


app.use('/admin', (req, res, next) => {
    console.log("Admin panel accessed");  
    next();
  }, authenticate, adminRouter) 

// Use FAQ API routes
app.use('/api/faqs', faqRouter);

export { app };
