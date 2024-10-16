import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import router from "./routes/routes.js";

const app = express();
dotenv.config(); //to config env file 
app.use(express.json()); // to fetch and post data in json format
const PORT = process.env.PORT;
const DBURL = process.env.DATABASE_URL;

//Parent route
router(app);

//Database connection
mongoose.connect(DBURL).then(() => {
    app.listen(PORT, () => {
        console.log(`App is running in ${PORT} ---- PORT`)
    });
}).catch((err) => {
    console.log(`Not able to connect the Database, ${err}`);
})
