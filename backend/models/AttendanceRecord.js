const mongoose = require("mongoose");

const attendanceRecordSchema = new mongoose.Schema(
    {
        sessionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AttendanceSession",
            required: true
        },
        personId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person",
            default: null
        },
        documentNumber: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ["ACCEPTED", "REJECTED"],
            required: true
        },
        rejectReason: {
            type: String,
            enum: [
                "NONE",
                "QR_EXPIRED",
                "SESSION_CLOSED",
                "DOCUMENT_NOT_FOUND",
                "PERSON_NOT_ENROLLED",
                "DUPLICATED_RECORD",
                "INVALID_ROOM_CODE",
                "INVALID_TOKEN"
            ],
            default: "NONE"
        },
        registeredAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true,
        collection: "attendance_records"
    }
);

attendanceRecordSchema.index(
    { sessionId: 1, personId: 1, status: 1 }
);

attendanceRecordSchema.index(
    { sessionId: 1, documentNumber: 1 }
);

module.exports = mongoose.model("AttendanceRecord", attendanceRecordSchema);
