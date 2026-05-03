require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDatabase = require("./config/database");
const healthRoutes = require("./routes/health.routes");
const demoRoutes = require("./routes/demo.routes");

const app = express();

const port = process.env.PORT || 4000;

app.use(cors({
    origin: process.env.API_CORS_ORIGIN || "*"
}));

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.json({
        message: "Bienvenido a App Attendance API",
        documentation: "Landing académica SCORM",
        status: "running"
    });
});

app.use("/", healthRoutes);
app.use("/", demoRoutes);

connectDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Servidor ejecutándose en http://localhost:${port}`);
    });
});
