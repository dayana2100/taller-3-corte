const mongoose = require("mongoose");

async function connectDatabase() {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            throw new Error("MONGO_URI no está definida en las variables de entorno.");
        }

        await mongoose.connect(mongoUri);

        console.log("Conexión exitosa a MongoDB.");
    } catch (error) {
        console.error("Error conectando a MongoDB:", error.message);
        process.exit(1);
    }
}

module.exports = connectDatabase;
