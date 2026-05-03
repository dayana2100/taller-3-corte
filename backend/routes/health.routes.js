const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
    res.json({
        status: "OK",
        service: "App Attendance API",
        database: "MongoDB",
        message: "API funcionando correctamente"
    });
});

router.get("/ready", (req, res) => {
    res.json({
        status: "READY",
        service: "App Attendance API",
        message: "Servicio listo para recibir solicitudes"
    });
});

module.exports = router;
