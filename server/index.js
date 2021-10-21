import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv'
const app = express()
import postRoutes from "./routes/posts.js";

app.use(bodyParser.json({limit : "30mb", extended : true}))
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}))
app.use(cors());
dotenv.config()
app.use("/posts", postRoutes)

const PORT  = process.env.PORT || 5000;


mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser : true, useUnifiedTopology:true})

  .then(() => app.listen(PORT, () => console.log(`Server Running on PORT : ${PORT}`)))

  .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false);
