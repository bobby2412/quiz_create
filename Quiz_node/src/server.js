import express from "express";
import {signup,login,logout} from "./controller/auth.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
import { protectRoute } from "./controller/tokengen.js";
import cors from "cors";
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", 
        credentials: true, 
    })
);

app.get("/", (req, res) => {
    res.send("Hello World");
});
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.post("/signup", signup);
app.post("/login", login);
app.post("/logout", logout);
app.get('/checkAuth', protectRoute, (req, res) => {
    res.status(200).json({ message: 'User is authenticated', user: req.user });
});

const PORT = 5001; 
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:5001/`);
    connectDB();
});
