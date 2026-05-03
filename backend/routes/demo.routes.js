const express = require("express");

const {
    Institution,
    AcademicUnit,
    Person,
    Enrollment,
    AttendanceSession,
    AttendanceRecord
} = require("../models");

const router = express.Router();

router.get("/api/institutions", async (req, res) => {
    try {
        const institutions = await Institution.find().sort({ createdAt: -1 });

        res.json({
            total: institutions.length,
            data: institutions
        });
    } catch (error) {
        res.status(500).json({
            message: "Error consultando instituciones",
            error: error.message
        });
    }
});

router.get("/api/units", async (req, res) => {
    try {
        const units = await AcademicUnit.find()
            .populate("institutionId", "code name context")
            .sort({ createdAt: -1 });

        res.json({
            total: units.length,
            data: units
        });
    } catch (error) {
        res.status(500).json({
            message: "Error consultando unidades académicas",
            error: error.message
        });
    }
});

router.get("/api/people", async (req, res) => {
    try {
        const people = await Person.find()
            .populate("institutionId", "code name context")
            .sort({ createdAt: -1 });

        res.json({
            total: people.length,
            data: people
        });
    } catch (error) {
        res.status(500).json({
            message: "Error consultando personas",
            error: error.message
        });
    }
});

router.get("/api/enrollments", async (req, res) => {
    try {
        const enrollments = await Enrollment.find()
            .populate("institutionId", "code name")
            .populate("unitId", "code name type")
            .populate("personId", "documentNumber fullName roles")
            .sort({ createdAt: -1 });

        res.json({
            total: enrollments.length,
            data: enrollments
        });
    } catch (error) {
        res.status(500).json({
            message: "Error consultando inscripciones",
            error: error.message
        });
    }
});

router.get("/api/sessions", async (req, res) => {
    try {
        const sessions = await AttendanceSession.find()
            .populate("institutionId", "code name")
            .populate("unitId", "code name type")
            .populate("teacherId", "documentNumber fullName roles")
            .sort({ createdAt: -1 });

        res.json({
            total: sessions.length,
            data: sessions
        });
    } catch (error) {
        res.status(500).json({
            message: "Error consultando sesiones",
            error: error.message
        });
    }
});

router.get("/api/attendance-records", async (req, res) => {
    try {
        const records = await AttendanceRecord.find()
            .populate("sessionId", "title status roomCode qrToken")
            .populate("personId", "documentNumber fullName roles")
            .sort({ registeredAt: 1 });

        res.json({
            total: records.length,
            data: records
        });
    } catch (error) {
        res.status(500).json({
            message: "Error consultando registros de asistencia",
            error: error.message
        });
    }
});

router.get("/api/demo-summary", async (req, res) => {
    try {
        const institutionsCount = await Institution.countDocuments();
        const unitsCount = await AcademicUnit.countDocuments();
        const peopleCount = await Person.countDocuments();
        const enrollmentsCount = await Enrollment.countDocuments();
        const sessionsCount = await AttendanceSession.countDocuments();
        const recordsCount = await AttendanceRecord.countDocuments();

        const acceptedRecords = await AttendanceRecord.countDocuments({
            status: "ACCEPTED"
        });

        const rejectedRecords = await AttendanceRecord.countDocuments({
            status: "REJECTED"
        });

        const institution = await Institution.findOne().sort({ createdAt: -1 });
        const unit = await AcademicUnit.findOne().sort({ createdAt: -1 });
        const session = await AttendanceSession.findOne().sort({ createdAt: -1 });

        res.json({
            message: "Resumen demo de App Attendance",
            database: "MongoDB",
            dataType: "Datos sintéticos",
            totals: {
                institutions: institutionsCount,
                academicUnits: unitsCount,
                people: peopleCount,
                enrollments: enrollmentsCount,
                attendanceSessions: sessionsCount,
                attendanceRecords: recordsCount,
                acceptedRecords: acceptedRecords,
                rejectedRecords: rejectedRecords
            },
            demo: {
                institution: institution ? institution.name : null,
                academicUnit: unit ? unit.name : null,
                session: session ? session.title : null,
                roomCode: session ? session.roomCode : null,
                sessionStatus: session ? session.status : null
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error construyendo resumen demo",
            error: error.message
        });
    }
});

module.exports = router;
