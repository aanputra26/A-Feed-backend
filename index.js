import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config/Database.js';
import Users from './models/UserModel.js';// ini dinyalakn jika pertama kali mau buat table user
import router from './routes/index.js';
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log('Database Connected...');
    await Users.sync(); // untuk mengenerate Table User dengan squelize jika kita belum punya table user, dan ini dinyalakn jika pertama kali mau buat table user
} catch (error) {
  console.error(error);
}

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log('A-Feed server running at port 5000'));
