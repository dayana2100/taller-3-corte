const mongoose = require("mongoose");

const institutionSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        context: {
            type: String,
            required: true,
            enum: ["UNIVERSITY", "SENA", "DEMO"],
            default: "DEMO"
        },
        labels: {
            studentLabel: {
                type: String,
                default: "Estudiante"
            },
            teacherLabel: {
                type: String,
                default: "Docente"
            },
            unitLabel: {
                type: String,
                default: "Materia"
            }
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        collection: "institutions"
    }
);

module.exports = mongoose.model("Institution", institutionSchema);
