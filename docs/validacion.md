# Validación técnica — App Attendance

## Propósito del documento

Este documento explica cómo ejecutar y validar el proyecto **App Attendance**, desarrollado para la materia de Programación Móvil.

La validación permite comprobar que el proyecto tiene:

- Landing académica compatible con SCORM.
- Backend en Node.js y Express.
- Base de datos MongoDB ejecutándose con Docker.
- Modelos de datos creados con Mongoose.
- Datos sintéticos cargados mediante seed.
- Endpoints funcionales para consultar la información.
- App móvil/web construida con React, Ionic y Capacitor.
- Consumo real de datos desde la app hacia el backend.

---

## Estructura funcional del proyecto

El proyecto está dividido en tres partes principales:

```text
taller-3-corte/
│
├── index.html              # Landing académica SCORM
├── imsmanifest.xml         # Manifest para Moodle SCORM
├── docker-compose.yml      # Configuración de MongoDB con Docker
│
├── backend/                # API Express conectada a MongoDB
│   ├── server.js
│   ├── config/
│   ├── models/
│   ├── routes/
│   └── seed/
│
├── app/                    # App móvil/web Ionic React
│   ├── src/
│   ├── package.json
│   └── capacitor.config.json
│
├── docs/                   # Documentación técnica
├── css/                    # Estilos de la landing SCORM
├── js/                     # Scripts de la landing SCORM
└── evidence/               # Evidencias del proyecto