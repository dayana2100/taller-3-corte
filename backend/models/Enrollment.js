const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
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
        personId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person",
            required: true
        },
        roleInUnit: {
            type: String,
            enum: ["TEACHER", "STUDENT"],
            required: true
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        collection: "enrollments"
    }
);

enrollmentSchema.index(
    { unitId: 1, personId: 1 },
    { unique: true }
);

module.exports = mongoose.model("Enrollment", enrollmentSchema);
