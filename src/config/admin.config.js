import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import { Faq } from "../models/faq.model.js"; 
import dotenv from 'dotenv';
dotenv.config();


AdminJS.registerAdapter({ Database, Resource });

const adminJs = new AdminJS({
  databases: [], 
  resources: [Faq],  
  rootPath: '/admin', 
});


const adminRouter = AdminJSExpress.buildRouter(adminJs);


const authenticate = (req, res, next) => {
    console.log('Authentication middleware called');
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(403).send('Forbidden: No authorization header provided');
    }
  
    const token = authHeader.split(' ')[1]; 
    
    if (!token) {
      return res.status(403).send('Forbidden: Invalid authorization header');
    }
  
    const decoded = Buffer.from(token, 'base64').toString('utf-8'); 
    const [username, password] = decoded.split(':'); 
  
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
  
    if (username === adminUsername && password === adminPassword) {
      return next();
    }
  
    return res.status(403).send('Forbidden: Invalid username or password');
  };
  
  

export { adminRouter, authenticate };
