import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
import { Faq } from "../models/faq.model.js"; // Import your FAQ model
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


AdminJS.registerAdapter({ Database, Resource });

const adminJs = new AdminJS({
  databases: [],  // No need to add the database here because we're already using Mongoose
  resources: [Faq],  // Add the FAQ model here
  rootPath: '/admin', // Path to access Admin panel
});

// Create the AdminJS router
const adminRouter = AdminJSExpress.buildRouter(adminJs);

// Middleware for Admin Panel authentication (optional)
const authenticate = (req, res, next) => {
    console.log('Authentication middleware called');
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(403).send('Forbidden: No authorization header provided');
    }
  
    const token = authHeader.split(' ')[1]; // "Basic base64string"
    
    if (!token) {
      return res.status(403).send('Forbidden: Invalid authorization header');
    }
  
    const decoded = Buffer.from(token, 'base64').toString('utf-8'); // Decode base64
    const [username, password] = decoded.split(':'); // Split the username and password
  
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
  
    if (username === adminUsername && password === adminPassword) {
      return next();
    }
  
    return res.status(403).send('Forbidden: Invalid username or password');
  };
  
  

export { adminRouter, authenticate };
