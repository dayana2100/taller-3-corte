const mongoose = require("mongoose");

const attendanceSessionSchema = new mongoose.Schema(
    {
        institutionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institution",
            required: true
        },
        unitId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AcademicUnit",
            required: true
        },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ["DRAFT", "ACTIVE", "CLOSED", "EXPIRED"],
            default: "DRAFT"
        },
        qrToken: {
            type: String,
            trim: true,
            default: null
        },
        roomCode: {
            type: String,
            trim: true,
            default: null
        },
        qrExpiresAt: {
            type: Date,
            default: null
        },
        startedAt: {
            type: Date,
            default: null
        },
        closedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true,
        collection: "attendance_sessions"
    }
);

attendanceSessionSchema.index(
    { qrToken: 1 },
    {
        unique: true,
        sparse: true
    }
);

module.exports = mongoose.model("AttendanceSession", attendanceSessionSchema);
