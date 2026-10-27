import 'dotenv/config';
import express from 'express';
import { bootstrap } from './src/app.js';
//dotenv.config();
const port = process.env.PORT;
const app = express();


bootstrap(app,express)

app.listen(port,()=>{
    console.log(`app run on port ${port}`)
})




