require('dotenv').config();

const express = require("express");
const cors = require("cors");
const generateRoutes = require("./src/routes/generate.js");
const { errorResponse } = require("./src/utils/responseHandler.js");


const app = express();

const PORT = process.env.PORT || 3001;
const REDIRECT_URL = process.env.REDIRECT_URL || "";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(
    cors({ origin: CORS_ORIGIN, methods: ["GET", "POST"], allowedHeaders: ["Content-Type", "Authorization"] })
);
app.use(express.json());

app.use("/api/generate", generateRoutes);

// Redirect or handle unknown API routes
app.use((req, res) => {
    if (req.path.startsWith("/api")) {
        return res.status(404).json(errorResponse("API endpoint not found"));
    }
    res.redirect(REDIRECT_URL);
});

// Start server
app.listen(PORT, () => console.log(`AI backend running on port ${PORT}`));
