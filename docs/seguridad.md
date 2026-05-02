# Seguridad y privacidad — App Attendance

## Propósito del documento

Este documento define las reglas de seguridad y privacidad aplicadas al proyecto académico **App Attendance**, desarrollado para la materia de Programación Móvil.

El objetivo es garantizar que la landing SCORM, la documentación y las evidencias del proyecto puedan ser compartidas en Moodle sin exponer información sensible, datos personales, credenciales, tokens o configuraciones privadas.

---

## Principio general

Toda la información publicada en este repositorio debe ser académica, demostrativa y segura.

Por esta razón, el proyecto utiliza:

- Datos sintéticos.
- Usuarios demo.
- Documentos ficticios.
- URLs de ejemplo.
- Contraseñas de muestra no reales.
- Tokens reemplazados por placeholders.
- Capturas anonimizadas o mockups.

---

## Información que NO debe publicarse

No se debe subir al repositorio ni incluir en el paquete SCORM:

| Tipo de información | Ejemplos |
|---|---|
| Datos personales reales | nombres reales, documentos de identidad, teléfonos, correos electrónicos |
| Información académica sensible | listados reales de estudiantes, fichas reales, materias reales con personas identificables |
| Credenciales | usuarios reales, contraseñas reales, claves de base de datos |
| Tokens | JWT reales, tokens de sesión, tokens de API |
| Variables privadas | contenido real de `.env`, secretos, cadenas de conexión reales |
| URLs reales | túneles activos, dominios internos, endpoints institucionales privados |
| Capturas sensibles | pantallas con nombres, documentos, correos, tokens o información institucional |
| Seeds privados | archivos de carga con información real de estudiantes o docentes |

---

## Información permitida

Sí se puede publicar:

| Tipo de información | Ejemplos |
|---|---|
| Datos demo | Docente Demo, Estudiante Demo, DOC-DEMO-001 |
| Placeholders | `<jwt-demo>`, `<object-id>`, `<password-demo-local>` |
| URLs de ejemplo | `https://example.com/attendance/session-demo` |
| Diagramas conceptuales | arquitectura por capas, flujo QR, modelo general |
| Comandos genéricos | comandos de instalación sin secretos |
| Capturas anonimizadas | imágenes sin datos personales visibles |
| Fragmentos de código seguros | código sin credenciales ni tokens reales |

---

## Manejo de variables de entorno

El proyecto puede usar un archivo `.env` de manera local, pero este archivo no debe publicarse.

En el repositorio solo debe incluirse un archivo de ejemplo como:

```text
.env.example
APP_ATTENDANCE_DB_NAME=app_attendance
MONGO_PORT=27017
MONGO_INITDB_ROOT_USERNAME=<mongo-user-local>
MONGO_INITDB_ROOT_PASSWORD=<mongo-password-local>
MONGO_URI=mongodb://<mongo-user-local>:<mongo-password-local>@mongo:27017/app_attendance
API_PORT=4000
APP_PORT=8080
API_CORS_ORIGIN=http://localhost:5173
QR_DEFAULT_TTL_MINUTES=10
ROOM_CODE_TTL_SECONDS=90
JWT_SECRET=<cambiar-por-secreto-seguro-de-32-caracteres>
```
## Protección del token JWT
El token JWT se utiliza para representar una sesión autenticada del docente o instructor.

Buenas prácticas aplicadas o recomendadas:

- No publicar tokens reales.
- No incluir tokens en capturas.
- No guardar tokens reales en el repositorio.
- Usar expiración del token.
- Usar HTTPS en despliegues reales.
- Evitar colocar tokens directamente en el código fuente.
- Reemplazar cualquier token de ejemplo por <jwt-demo>.

## Seguridad en el registro con QR

El registro de asistencia mediante QR debe considerar las siguientes reglas:

1. El QR debe ser temporal.
2. El token del QR debe expirar.
3. La sesión debe estar activa para aceptar registros.
4. El documento ingresado debe pertenecer a la unidad académica.
5. El sistema debe evitar registros duplicados.
6. Los intentos inválidos deben registrarse como rechazos.
7. Una sesión cerrada no debe aceptar nuevas asistencias.
8. El código de sala debe cambiar periódicamente o tener vigencia limitada.

## Casos de rechazo esperados

| Caso | Motivo |
|---|---|
| QR expirado | El estudiante intenta registrarse después del tiempo permitido. |
| Sesión cerrada | La sesión ya fue finalizada por el docente o instructor. |
| Documento inexistente | El documento ingresado no pertenece a ninguna persona registrada. |
| Estudiante no inscrito | La persona existe, pero no pertenece a la ficha, materia o unidad académica seleccionada. |
| Registro duplicado | El estudiante ya tiene una asistencia aceptada en la misma sesión. |
| Código de sala inválido | El código ingresado no coincide con el código vigente de la sesión. |
| Token inválido | El enlace o token del QR no existe, fue alterado o no pertenece a una sesión activa. |
| Usuario sin autorización | La persona que intenta consultar o administrar la sesión no tiene el rol permitido. |

---
## Protección de datos en Moodle

El paquete SCORM será cargado en Moodle, por lo tanto debe estar preparado para ser revisado por el docente sin exponer información sensible.

Antes de comprimir el paquete, se debe validar:

- Que `imsmanifest.xml` no tenga datos privados.
- Que `index.html` no tenga nombres reales ni tokens.
- Que `README.md` no tenga URLs reales.
- Que los documentos en `docs/` usen datos demo.
- Que las imágenes o capturas estén anonimizadas.
- Que no exista un archivo `.env` real dentro del ZIP.
- Que no se incluyan bases de datos, backups o archivos privados.

---

## Checklist de privacidad antes de entregar

Marcar cada punto antes de subir el SCORM a Moodle:

- [ ] No hay nombres reales de estudiantes.
- [ ] No hay documentos de identidad reales.
- [ ] No hay teléfonos reales.
- [ ] No hay correos reales.
- [ ] No hay contraseñas reales.
- [ ] No hay tokens JWT reales.
- [ ] No hay URLs internas o túneles activos.
- [ ] No se incluyó el archivo `.env` real.
- [ ] No hay capturas con información sensible.
- [ ] Los datos del modelo son sintéticos.
- [ ] Los comandos son genéricos y seguros.
- [ ] El ZIP contiene únicamente archivos necesarios para la landing SCORM.

---

## Recomendaciones para despliegue real

Si el proyecto se llevara a producción, se recomienda:

- Usar HTTPS.
- Aplicar rate limiting en endpoints públicos.
- Usar hash seguro para contraseñas.
- Configurar CORS solo para dominios permitidos.
- Rotar secretos periódicamente.
- Usar logs sin datos sensibles.
- Implementar control de roles y permisos.
- Validar entradas con Zod u otra herramienta equivalente.
- Agregar monitoreo y alertas.
- Realizar pruebas de seguridad antes del despliegue.

---

## Conclusión

La seguridad del proyecto no depende únicamente del código, sino también de cómo se documenta, se sube a GitHub y se empaqueta para Moodle.

Por eso, App Attendance usa datos sintéticos, placeholders y reglas claras para evitar la exposición de información sensible durante la entrega académica.
EOF