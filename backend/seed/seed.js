require("dotenv").config();

const mongoose = require("mongoose");

const {
    Institution,
    AcademicUnit,
    Person,
    Enrollment,
    AttendanceSession,
    AttendanceRecord
} = require("../models");

async function runSeed() {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error("MONGO_URI no está definida. Revisa el archivo backend/.env");
        }

        await mongoose.connect(mongoUri);
        console.log("Conectado a MongoDB para cargar datos sintéticos.");

        await AttendanceRecord.deleteMany({});
        await AttendanceSession.deleteMany({});
        await Enrollment.deleteMany({});
        await Person.deleteMany({});
        await AcademicUnit.deleteMany({});
        await Institution.deleteMany({});

        console.log("Datos anteriores eliminados correctamente.");

        const institution = await Institution.create({
            code: "INST-DEMO-001",
            name: "Institución Demo de Programación Móvil",
            context: "DEMO",
            labels: {
                studentLabel: "Estudiante Demo",
                teacherLabel: "Docente Demo",
                unitLabel: "Materia Demo"
            },
            active: true
        });

        const academicUnit = await AcademicUnit.create({
            institutionId: institution._id,
            code: "PMOVIL-DEMO-01",
            name: "Programación Móvil - Clase Demo QR",
            type: "SUBJECT",
            active: true
        });

        const teacher = await Person.create({
            institutionId: institution._id,
            documentNumber: "DOC-DEMO-001",
            fullName: "Docente Demo",
            email: "docente.demo@example.com",
            roles: ["TEACHER"],
            active: true
        });

        const students = await Person.insertMany([
            {
                institutionId: institution._id,
                documentNumber: "EST-DEMO-001",
                fullName: "Estudiante Demo 01",
                email: "estudiante.demo.01@example.com",
                roles: ["STUDENT"],
                active: true
            },
            {
                institutionId: institution._id,
                documentNumber: "EST-DEMO-002",
                fullName: "Estudiante Demo 02",
                email: "estudiante.demo.02@example.com",
                roles: ["STUDENT"],
                active: true
            },
            {
                institutionId: institution._id,
                documentNumber: "EST-DEMO-003",
                fullName: "Estudiante Demo 03",
                email: "estudiante.demo.03@example.com",
                roles: ["STUDENT"],
                active: true
            },
            {
                institutionId: institution._id,
                documentNumber: "EST-DEMO-004",
                fullName: "Estudiante Demo 04",
                email: "estudiante.demo.04@example.com",
                roles: ["STUDENT"],
                active: true
            },
            {
                institutionId: institution._id,
                documentNumber: "EST-DEMO-005",
                fullName: "Estudiante Demo 05",
                email: "estudiante.demo.05@example.com",
                roles: ["STUDENT"],
                active: true
            }
        ]);

        await Enrollment.create({
            institutionId: institution._id,
            unitId: academicUnit._id,
            personId: teacher._id,
            roleInUnit: "TEACHER",
            active: true
        });

        const studentEnrollments = students.map((student) => ({
            institutionId: institution._id,
            unitId: academicUnit._id,
            personId: student._id,
            roleInUnit: "STUDENT",
            active: true
        }));

        await Enrollment.insertMany(studentEnrollments);

        const now = new Date();
        const expiresAt = new Date(now.getTime() + 10 * 60 * 1000);

        const attendanceSession = await AttendanceSession.create({
            institutionId: institution._id,
            unitId: academicUnit._id,
            teacherId: teacher._id,
            title: "Sesión Demo - Asistencia con QR Temporal",
            status: "ACTIVE",
            qrToken: "qr-token-demo-001",
            roomCode: "QRD01",
            qrExpiresAt: expiresAt,
            startedAt: now,
            closedAt: null
        });

        await AttendanceRecord.insertMany([
            {
                sessionId: attendanceSession._id,
                personId: students[0]._id,
                documentNumber: "EST-DEMO-001",
                status: "ACCEPTED",
                rejectReason: "NONE",
                registeredAt: new Date(now.getTime() + 1 * 60 * 1000)
            },
            {
                sessionId: attendanceSession._id,
                personId: students[1]._id,
                documentNumber: "EST-DEMO-002",
                status: "ACCEPTED",
                rejectReason: "NONE",
                registeredAt: new Date(now.getTime() + 2 * 60 * 1000)
            },
            {
                sessionId: attendanceSession._id,
                personId: students[2]._id,
                documentNumber: "EST-DEMO-003",
                status: "ACCEPTED",
                rejectReason: "NONE",
                registeredAt: new Date(now.getTime() + 3 * 60 * 1000)
            },
            {
                sessionId: attendanceSession._id,
                personId: null,
                documentNumber: "EST-DEMO-999",
                status: "REJECTED",
                rejectReason: "DOCUMENT_NOT_FOUND",
                registeredAt: new Date(now.getTime() + 4 * 60 * 1000)
            },
            {
                sessionId: attendanceSession._id,
                personId: students[0]._id,
                documentNumber: "EST-DEMO-001",
                status: "REJECTED",
                rejectReason: "DUPLICATED_RECORD",
                registeredAt: new Date(now.getTime() + 5 * 60 * 1000)
            }
        ]);

        console.log("Datos sintéticos cargados correctamente.");
        console.log("----------------------------------------");
        console.log("Institución:", institution.name);
        console.log("Unidad académica:", academicUnit.name);
        console.log("Docente:", teacher.fullName);
        console.log("Estudiantes demo:", students.length);
        console.log("Sesión:", attendanceSession.title);
        console.log("Código de sala:", attendanceSession.roomCode);
        console.log("----------------------------------------");

        await mongoose.disconnect();
        console.log("Conexión cerrada.");
    } catch (error) {
        console.error("Error cargando datos sintéticos:", error.message);
        await mongoose.disconnect();
        process.exit(1);
    }
}

runSeed();
