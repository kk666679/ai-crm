import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import documentRoutes from "./routes/documents.js";
import { logger } from "./utils/logger.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/documents", documentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => logger.info(`Backend running on port ${PORT}`));
