# Guía de sustentación — App Attendance

## Objetivo de la sustentación

Presentar de forma clara el proyecto **App Attendance**, una solución académica para el registro de asistencia mediante QR temporal, documentada como landing y empaquetable como SCORM 1.2 para Moodle.

La sustentación debe demostrar que el proyecto comprende:

- El problema que se busca resolver.
- La arquitectura general de la solución.
- El flujo funcional del docente y del estudiante.
- El modelo de datos propuesto.
- El contrato básico de la API.
- Las reglas de seguridad y privacidad.
- La forma en que se empaqueta como SCORM para Moodle.
- La evidencia de trabajo mediante Git y commits.

---

## 1. Presentación inicial


App Attendance es un proyecto académico desarrollado para la materia de Programación Móvil. Su objetivo es documentar una solución móvil/web para gestionar la asistencia académica mediante sesiones temporales y códigos QR.

El proyecto está organizado como una landing académica que puede empaquetarse como SCORM 1.2 para Moodle. En ella se documentan las funcionalidades, arquitectura, modelo de datos, API, seguridad, validación técnica y guía de sustentación.

---

## 2. Problema identificado


El problema principal es que en clases presenciales o híbridas, tomar asistencia manualmente consume tiempo, puede generar errores y dificulta llevar trazabilidad. Además, cuando se manejan varios grupos, fichas o materias, es importante evitar duplicados y validar que cada estudiante pertenezca realmente a la unidad académica correspondiente.

Por eso, el proyecto propone una sesión temporal de asistencia, donde el docente genera un QR o código de sala, y el estudiante registra su asistencia durante un tiempo limitado.

---

## 3. Solución propuesta

La solución propone:

- Login del docente o instructor.
- Selección de institución o contexto académico.
- Selección de ficha, materia o unidad académica.
- Generación de una sesión temporal.
- Activación de un QR con tiempo de expiración.
- Registro público del estudiante.
- Validación de duplicados.
- Consulta de presentes, ausentes y rechazos.
- Historial de sesiones.
- Documentación segura en formato SCORM para Moodle.

La solución se basa en crear una sesión temporal. El docente activa un QR, los estudiantes lo escanean y registran su asistencia. El sistema valida si el estudiante existe, si pertenece a la unidad académica, si la sesión está activa y si no se ha registrado previamente.

---

## 4. Arquitectura general

La arquitectura se organiza por capas:

1. Frontend
2. Backend
3. Base de datos
4. Documentación SCORM
5. Control de versiones

### Frontend

Tecnologías propuestas:

- Ionic React
- Vite
- Capacitor

Responsabilidad:
El frontend permite que el docente interactúe con la plataforma, seleccione unidad académica, genere sesiones y consulte resultados.

### Backend

Tecnologías propuestas:

- Node.js
- Express
- TypeScript
- Zod
- Mongoose

Responsabilidad:

El backend expone la API REST, valida datos, aplica reglas de negocio, maneja autenticación JWT y se comunica con MongoDB.

### Base de datos

Tecnología propuesta:

- MongoDB 7

Responsabilidad:

MongoDB almacena instituciones, unidades académicas, personas, matrículas, sesiones de asistencia, registros de asistencia y permisos.

### SCORM

Responsabilidad:

SCORM permite que la landing sea cargada en Moodle como una actividad académica. El paquete debe incluir `imsmanifest.xml` en la raíz, junto con `index.html`, CSS y JavaScript.

---

## 5. Flujo funcional explicado

### Flujo del docente

1. El docente inicia sesión.
2. Selecciona institución o contexto académico.
3. Selecciona ficha, materia o unidad académica.
4. Consulta estudiantes inscritos.
5. Crea una sesión temporal.
6. Activa el QR.
7. Comparte el QR o código de sala.
8. Consulta presentes, ausentes y rechazos.
9. Cierra la sesión.

### Flujo del estudiante

1. El estudiante escanea el QR.
2. Ingresa o confirma su documento.
3. El sistema valida la sesión.
4. El sistema valida si pertenece a la unidad académica.
5. Si cumple las reglas, se registra la asistencia.
6. Si no cumple, se genera un rechazo trazable.

Texto sugerido:

El docente tiene el control de la sesión. El estudiante solo puede registrar asistencia mientras la sesión esté activa y el QR no haya expirado. Esto ayuda a evitar registros fuera de tiempo o duplicados.

---

## 6. Modelo de datos

Colecciones principales:

| Colección | Responsabilidad |
|---|---|
| institutions | Guarda instituciones o contextos académicos |
| academic_units | Guarda fichas, materias o unidades académicas |
| people | Guarda docentes, instructores, estudiantes o aprendices |
| enrollments | Relaciona personas con unidades académicas |
| attendance_sessions | Guarda sesiones temporales de asistencia |
| attendance_records | Guarda registros aceptados o rechazados |
| permissions | Define permisos por rol, recurso y acción |

Texto sugerido:

El modelo separa las entidades principales para evitar mezclar responsabilidades. Por ejemplo, una persona no se guarda directamente dentro de una sesión, sino que se relaciona mediante una matrícula o inscripción. Esto permite consultar quién pertenece a una unidad académica y después validar asistencia.

---

## 7. API principal

Endpoints principales:

| Método | Endpoint | Uso |
|---|---|---|
| POST | /api/auth/login | Iniciar sesión |
| POST | /api/sessions | Crear sesión |
| POST | /api/sessions/:id/activate | Activar sesión |
| GET | /api/sessions/:id/present | Consultar presentes |
| GET | /api/sessions/:id/absent | Consultar ausentes |
| GET | /api/sessions/:id/rejections | Consultar rechazos |
| POST | /api/sessions/:id/close | Cerrar sesión |
| POST | /public/attendance/:token/register | Registrar asistencia pública |

Texto sugerido:

La API separa rutas protegidas y rutas públicas. Las rutas del docente requieren JWT, mientras que el registro por QR usa un token temporal asociado a la sesión.

---

## 8. Seguridad y privacidad

Puntos clave:

- No se publican datos reales.
- No se sube archivo `.env` real.
- No se publican contraseñas.
- No se publican tokens JWT reales.
- No se usan URLs reales de túneles.
- Las capturas deben estar anonimizadas.
- Los ejemplos usan datos sintéticos.
- El QR debe expirar.
- La sesión debe estar activa.
- El sistema debe evitar duplicados.

La seguridad se trabajó desde la documentación. Como el paquete se sube a Moodle, se evita exponer información real. Por eso se usan placeholders, datos demo y URLs de ejemplo. Además, el flujo QR considera expiración, validación de sesión y control de duplicados.

---

## 9. SCORM y Moodle

SCORM significa que el contenido puede cargarse como actividad en Moodle.

El paquete debe tener esta estructura mínima:

    imsmanifest.xml
    index.html
    css/styles.css
    js/app.js
    js/scorm.js

El archivo `imsmanifest.xml` le indica a Moodle cuál es el recurso principal del paquete. En este caso, el recurso principal es `index.html`. Además, se incluye JavaScript para intentar registrar progreso y estado de completado mediante la API SCORM 1.2.

---

## 10. Evidencia Git

Rama usada:

    feat/initial-project

Commits realizados:

    chore(docs): initialize scorm documentation structure
    docs(scorm): add sanitized academic overview
    feat(scorm): add Moodle landing package
    docs(security): add privacy checklist
    docs(sustentation): add presentation guide


El trabajo se organizó por avances usando Git. Cada commit representa una parte del desarrollo: estructura inicial, documentación general, landing SCORM, seguridad y guía de sustentación.

---

## 11. Validación técnica

Antes de entregar, se recomienda validar:

    git status
    git branch --show-current
    git log --oneline

Para el paquete SCORM:

    imsmanifest.xml debe estar en la raíz
    index.html debe estar en la raíz
    css/styles.css debe existir
    js/app.js debe existir
    js/scorm.js debe existir

La validación permite comprobar que el repositorio está limpio, que se trabajó en la rama correcta y que el paquete tiene los archivos mínimos para ser importado en Moodle.

---

## 12. Preguntas que puede hacer el profesor

### ¿Por qué MongoDB?

Porque permite manejar documentos flexibles y se adapta bien a estructuras como sesiones, registros de asistencia, rechazos e historial. Además, se puede ejecutar localmente con Docker para facilitar el entorno académico.

### ¿Por qué el frontend no se conecta directamente a MongoDB?

Porque sería inseguro. El frontend debe comunicarse con el backend, y el backend es quien valida datos, aplica reglas de negocio y controla el acceso a la base de datos.

### ¿Cómo se evita un registro duplicado?

Se valida si ya existe una asistencia aceptada para la misma persona dentro de la misma sesión. Si ya existe, el sistema no crea otro registro aceptado y puede registrar el intento como rechazo.

### ¿Qué pasa si el QR expira?

El sistema rechaza el registro porque la sesión o el token QR ya no están vigentes. Esto ayuda a que la asistencia solo pueda registrarse dentro del tiempo permitido.

### ¿Qué pasa si un estudiante no pertenece a la materia o ficha?

El sistema rechaza el registro porque la persona no está inscrita en esa unidad académica.

### ¿Qué función cumple JWT?

JWT permite autenticar al docente o instructor. Con ese token, el backend puede verificar si el usuario tiene permiso para crear sesiones, activarlas o consultar resultados.

### ¿Qué función cumple SCORM?

SCORM permite empaquetar la landing como una actividad compatible con Moodle. También permite reportar progreso, puntaje o estado de completado.

### ¿Por qué no se publican datos reales?

Porque el proyecto se sube a Moodle y GitHub. Para proteger la privacidad, se usan datos sintéticos, placeholders y ejemplos seguros.

---

## 13. Cierre de la sustentación
En conclusión, App Attendance demuestra cómo una solución móvil/web puede apoyar el registro de asistencia académica mediante QR temporal, integrando frontend, backend, base de datos, seguridad, control de versiones y empaquetado SCORM para Moodle. El proyecto también prioriza la privacidad, evitando publicar datos reales y usando información sintética para la entrega académica.
