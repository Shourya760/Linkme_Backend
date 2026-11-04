
import express from "express";
import cors from "cors";
import "./config/env.js";
import connectDB from "./config/db.js";
import apiRoutes from "./src/routes/index.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "1mb" }));

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:4173",
    "https://linkmeon.netlify.app",
    ...(process.env.CLIENT_URL || "")
        .split(",")
        .map((value) => {
            try {
                return new URL(value.trim()).origin;
            } catch {
                return null;
            }
        })
        .filter(Boolean),
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.log("Blocked by CORS:", origin);
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.get("/", (_req, res) => {
    res.json({ success: true, message: "LinkMe API is running", health: "/health" });
});
app.get("/health", (_req, res) => {
    res.json({ success: true, message: "LinkMe API is running" });
});

app.use(apiRoutes);
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`✅ LinkMe Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start LinkMe server:", error);
        process.exit(1);
    }
};

startServer();
