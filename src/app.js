import express, { urlencoded } from 'express'
const app = express();

app.use(express.json({
    limit : "16kb"
}));

app.use(express.urlencoded({
    extended : true,
    limit : "16kb"
}));

import faqRouter from './routes/faq.routes.js';

app.use('/api/faqs', faqRouter)

export {app} 