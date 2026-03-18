import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js"
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001

const __dirname = path.resolve();



// middleware for development
if (process.env.NODE_ENV !== "production") {

    app.use(cors());
}
app.use(cors());
app.use(express.json()); //this middleware will parse JSON bodies: req.body

app.use(rateLimiter);


app.use("/api/notes", notesRoutes);

// serve our optimized react application as a static asset 
if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, "../frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}
connectDB().then(() => {

    app.listen(PORT, () => {
        console.log("Server started on port 5001");
    });
})
