import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cloudinary from 'cloudinary'
// routes
import AuthRoute from './routes/AuthRoute.js'
import UserRoute from './routes/UserRoute.js'
import PostRoute from './routes/PostRoute.js'

const app = express();
dotenv.config();
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_CLIENT_NAME,
  api_key:process.env.CLOUDINARY_CLIENT_API,
  api_secret:process.env.CLOUDINARY_CLIENT_SECRET,
})

// middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());



const PORT = process.env.PORT;
const CONNECTION =process.env.MONGODB_CONNECTION;
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

app.use('/auth', AuthRoute);
app.use('/user', UserRoute)
app.use('/posts', PostRoute)


