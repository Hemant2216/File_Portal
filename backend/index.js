import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import { PORT } from './config.js';
import router from './routes/route.js';
import DBconnection from './database/db.js';


const app=express();
app.use(cors());
app.use('/',router);
DBconnection();
app.listen(PORT,()=> console.log('server is running on',PORT))
