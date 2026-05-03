const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
    {
        institutionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Institution",
            required: true
        },
        documentNumber: {
            type: String,
            required: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            default: null
        },
        roles: {
            type: [String],
            enum: ["TEACHER", "STUDENT", "ADMIN"],
            default: ["STUDENT"]
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        collection: "people"
    }
);

personSchema.index(
    { institutionId: 1, documentNumber: 1 },
    { unique: true }
);

module.exports = mongoose.model("Person", personSchema);
