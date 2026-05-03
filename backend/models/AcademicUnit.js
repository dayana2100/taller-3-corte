const mongoose = require("mongoose");

const academicUnitSchema = new mongoose.Schema(
    {
        institutionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institution",
            required: true
        },
        code: {
            type: String,
            required: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        type: {
            type: String,
            required: true,
            enum: ["SUBJECT", "COURSE", "GROUP", "DEMO"],
            default: "DEMO"
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        collection: "academic_units"
    }
);

academicUnitSchema.index(
    { institutionId: 1, code: 1 },
    { unique: true }
);

module.exports = mongoose.model("AcademicUnit", academicUnitSchema);
