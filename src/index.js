import dotenv from 'dotenv'
dotenv.config({
     path:"./.env"
});

import connectDB from "./db/dbConnection.js";

// import express from "express"
// const app = express();
import { app } from "./app.js";

connectDB()
.then(() => {
    app.on("error",(error) => {
        console.log("application not able to talk to database",error);
        throw error;
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection failed!!!",err)
})