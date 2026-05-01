# App Attendance — Landing académica SCORM

## Descripción general

App Attendance es un proyecto académico desarrollado para la materia de Programación Móvil. El objetivo principal es documentar una solución móvil/web para gestionar la asistencia académica mediante sesiones temporales y códigos QR.

Este repositorio contiene una landing académica empaquetable como SCORM 1.2 para Moodle. La documentación explica el problema, las funcionalidades, la arquitectura, el flujo funcional, el modelo de datos, el contrato de API, la seguridad, la validación técnica y la guía de sustentación.

## Problema que resuelve

En una clase presencial o híbrida, tomar asistencia de forma manual consume tiempo, dificulta la trazabilidad y aumenta el riesgo de errores o registros duplicados.

El sistema propone una alternativa académica donde el docente o instructor puede crear una sesión temporal, generar un código QR o código de sala y permitir que los estudiantes registren su asistencia dentro de un tiempo definido.

## Objetivo general

Diseñar y documentar una solución académica para el registro de asistencia mediante QR temporal, integrando conceptos de desarrollo móvil, backend, base de datos, seguridad y empaquetado SCORM para Moodle.

## Objetivos específicos

- Documentar el problema de asistencia manual en ambientes académicos.
- Plantear una solución móvil/web basada en sesiones temporales.
- Describir las funcionalidades principales del sistema.
- Explicar la arquitectura técnica del proyecto.
- Definir un modelo de datos conceptual en MongoDB.
- Presentar un contrato de API resumido.
- Incluir fragmentos de código seguros sin exponer información sensible.
- Documentar el uso del paquete como SCORM 1.2 en Moodle.
- Registrar evidencia de uso de Git mediante commits periódicos.
- Preparar una guía de sustentación clara para la presentación en clase.

## Tecnologías propuestas

| Capa | Tecnología |
|---|---|
| Frontend | Ionic React, Vite, Capacitor |
| Backend | Node.js, Express, TypeScript |
| Validación | Zod |
| Persistencia | MongoDB 7 |
| ODM | Mongoose |
| Contenedores | Docker y Docker Compose |
| Entrega académica | SCORM 1.2 para Moodle |
| Control de versiones | Git y GitHub |

## Funcionalidades principales

- Login de formador o docente mediante JWT Bearer.
- Selección de institución o contexto académico.
- Selección de unidad académica, ficha o materia.
- Creación de sesión temporal de asistencia.
- Generación de QR o código de sala.
- Registro público de asistencia.
- Consulta de presentes y ausentes.
- Identificación de rechazos o registros inválidos.
- Historial de sesiones.
- Documentación empaquetada como SCORM para Moodle.

## Estructura del repositorio

```text
taller-3-corte/
│
├── index.html
├── imsmanifest.xml
├── README.md
│
├── css/
│   └── styles.css
│
├── js/
│   ├── app.js
│   └── scorm.js
│
├── docs/
│   ├── arquitectura.md
│   ├── seguridad.md
│   ├── sustentacion.md
│   └── validacion.md
│
└── evidence/
    └── git-evidence.md
```

## Seguridad y privacidad

Este proyecto utiliza datos sintéticos y ejemplos académicos. No se deben publicar datos reales de estudiantes, docentes, instituciones, documentos de identidad, teléfonos, correos electrónicos, contraseñas, tokens, URLs reales, archivos .env reales ni capturas con información personal.

Todo ejemplo incluido en la documentación debe usar placeholders o valores demostrativos.

## Estado del proyecto

Este repositorio corresponde al desarrollo académico del taller del tercer corte de Programación Móvil.

La entrega final debe permitir:

Visualizar la landing en navegador.
Explicar el proyecto durante la sustentación.
Empaquetar el contenido como SCORM 1.2.
Validar la estructura del paquete.
Evidenciar el trabajo mediante Git y GitHub.