import express from "express";
import Connection from "./database/db.js";
import * as dotenv from "dotenv";
import Router from './routes/route.js';
import cors from 'cors';
import bodyParser from "body-parser";
import logger from "./utils/logger.js";
import morgan from "morgan";


dotenv.config();

const app = express();

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', Router);
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})

Connection(process.env.MONGODB_URL);