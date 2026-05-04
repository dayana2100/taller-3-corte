require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDatabase = require("./config/database");
const healthRoutes = require("./routes/health.routes");
const demoRoutes = require("./routes/demo.routes");

const app = express();

const port = process.env.PORT || 4000;

app.use(cors());
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
    app.listen(port, "0.0.0.0", () => {
        console.log(`Servidor ejecutándose en http://0.0.0.0:${port}`);
    });
});