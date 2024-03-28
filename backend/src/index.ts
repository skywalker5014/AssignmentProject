import express, { Express } from "express";
import { connectDb } from "./configs/db.config";
import mainRoutes from "./routes/main.routes";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config()

const app : Express = express();

app.use(cors())

mainRoutes(app)

const port = process.env.SERVER_PORT || 5050
app.listen(port,() => {
    connectDb(process.env.MONGODB_URL);
    console.log(`server running on port ${port}`);
})