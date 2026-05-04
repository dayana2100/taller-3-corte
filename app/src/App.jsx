import { useState } from "react";
import {
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from "@ionic/react";

import {
  checkmarkCircleOutline,
  closeCircleOutline,
  peopleOutline,
  qrCodeOutline,
  schoolOutline,
  serverOutline
} from "ionicons/icons";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "./App.css";

setupIonicReact();

const API_URL = "http://10.0.2.2:4000";

const DEMO_SUMMARY = {
  message: "Resumen demo de App Attendance",
  database: "MongoDB",
  dataType: "Datos sintéticos",
  totals: {
    institutions: 1,
    academicUnits: 1,
    people: 6,
    enrollments: 6,
    attendanceSessions: 1,
    attendanceRecords: 5,
    acceptedRecords: 3,
    rejectedRecords: 2
  },
  demo: {
    institution: "Institución Demo de Programación Móvil",
    academicUnit: "Programación Móvil - Clase Demo QR",
    session: "Sesión Demo - Asistencia con QR Temporal",
    roomCode: "QRD01",
    sessionStatus: "ACTIVE"
  }
};

const DEMO_PEOPLE = [
  {
    _id: "teacher-demo",
    fullName: "Docente Demo",
    documentNumber: "DOC-DEMO-001",
    roles: ["TEACHER"]
  },
  {
    _id: "student-demo-1",
    fullName: "Estudiante Demo 01",
    documentNumber: "EST-DEMO-001",
    roles: ["STUDENT"]
  },
  {
    _id: "student-demo-2",
    fullName: "Estudiante Demo 02",
    documentNumber: "EST-DEMO-002",
    roles: ["STUDENT"]
  },
  {
    _id: "student-demo-3",
    fullName: "Estudiante Demo 03",
    documentNumber: "EST-DEMO-003",
    roles: ["STUDENT"]
  },
  {
    _id: "student-demo-4",
    fullName: "Estudiante Demo 04",
    documentNumber: "EST-DEMO-004",
    roles: ["STUDENT"]
  },
  {
    _id: "student-demo-5",
    fullName: "Estudiante Demo 05",
    documentNumber: "EST-DEMO-005",
    roles: ["STUDENT"]
  }
];

const DEMO_SESSIONS = [
  {
    _id: "session-demo",
    title: "Sesión Demo - Asistencia con QR Temporal",
    status: "ACTIVE",
    roomCode: "QRD01",
    qrToken: "qr-token-demo-001",
    unitId: {
      name: "Programación Móvil - Clase Demo QR"
    },
    teacherId: {
      fullName: "Docente Demo"
    }
  }
];

const DEMO_RECORDS = [
  {
    _id: "record-1",
    personId: { fullName: "Estudiante Demo 01" },
    documentNumber: "EST-DEMO-001",
    status: "ACCEPTED",
    rejectReason: "NONE"
  },
  {
    _id: "record-2",
    personId: { fullName: "Estudiante Demo 02" },
    documentNumber: "EST-DEMO-002",
    status: "ACCEPTED",
    rejectReason: "NONE"
  },
  {
    _id: "record-3",
    personId: { fullName: "Estudiante Demo 03" },
    documentNumber: "EST-DEMO-003",
    status: "ACCEPTED",
    rejectReason: "NONE"
  },
  {
    _id: "record-4",
    personId: null,
    documentNumber: "EST-DEMO-999",
    status: "REJECTED",
    rejectReason: "DOCUMENT_NOT_FOUND"
  },
  {
    _id: "record-5",
    personId: { fullName: "Estudiante Demo 01" },
    documentNumber: "EST-DEMO-001",
    status: "REJECTED",
    rejectReason: "DUPLICATED_RECORD"
  }
];

function App() {
  const [logged, setLogged] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [summary, setSummary] = useState(null);
  const [people, setPeople] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const summaryResponse = await fetch(`${API_URL}/api/demo-summary`);
      const peopleResponse = await fetch(`${API_URL}/api/people`);
      const sessionsResponse = await fetch(`${API_URL}/api/sessions`);
      const recordsResponse = await fetch(`${API_URL}/api/attendance-records`);

      if (
        !summaryResponse.ok ||
        !peopleResponse.ok ||
        !sessionsResponse.ok ||
        !recordsResponse.ok
      ) {
        throw new Error("Error consultando la API");
      }

      const summaryData = await summaryResponse.json();
      const peopleData = await peopleResponse.json();
      const sessionsData = await sessionsResponse.json();
      const recordsData = await recordsResponse.json();

      setSummary(summaryData);
      setPeople(peopleData.data || []);
      setSessions(sessionsData.data || []);
      setRecords(recordsData.data || []);
      setError("");
    } catch (err) {
      setSummary(DEMO_SUMMARY);
      setPeople(DEMO_PEOPLE);
      setSessions(DEMO_SESSIONS);
      setRecords(DEMO_RECORDS);
      setError("");
    } finally {
      setLoading(false);
    }
  }

  function loginDemo() {
    setLogged(true);
    loadData();
  }

  if (!logged) {
    return (
      <IonApp>
        <IonPage>
          <IonContent fullscreen className="login-screen">
            <div className="login-container">
              <div className="login-logo">
                <IonIcon icon={qrCodeOutline} />
              </div>

              <h1>App Attendance</h1>
              <p>
                App móvil académica para gestionar asistencia mediante QR temporal.
              </p>

              <IonCard className="login-card">
                <IonCardHeader>
                  <IonCardTitle>Acceso demo</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <p>
                    Esta versión usa datos sintéticos cargados en MongoDB.
                  </p>

                  <div className="demo-box">
                    <span>Usuario: DOC-DEMO-001</span>
                    <span>Rol: Docente Demo</span>
                  </div>

                  <IonButton expand="block" onClick={loginDemo}>
                    Entrar a la app
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </div>
          </IonContent>
        </IonPage>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>App Attendance</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className="app-content">
          <div className="app-shell">
            <section className="welcome-card">
              <div>
                <h1>Panel docente</h1>
                <p>Consulta la asistencia demo desde MongoDB.</p>
              </div>

              <IonButton fill="outline" onClick={loadData}>
                Actualizar
              </IonButton>
            </section>

            {loading && (
              <div className="loading-box">
                <IonSpinner name="crescent" />
                <p>Cargando datos...</p>
              </div>
            )}

            {error && (
              <IonCard className="error-card">
                <IonCardContent>
                  <strong>{error}</strong>
                </IonCardContent>
              </IonCard>
            )}

            <IonSegment value={tab} onIonChange={(e) => setTab(e.detail.value)}>
              <IonSegmentButton value="dashboard">
                <IonLabel>Inicio</IonLabel>
              </IonSegmentButton>

              <IonSegmentButton value="students">
                <IonLabel>Estudiantes</IonLabel>
              </IonSegmentButton>

              <IonSegmentButton value="session">
                <IonLabel>Sesión QR</IonLabel>
              </IonSegmentButton>

              <IonSegmentButton value="records">
                <IonLabel>Registros</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            {tab === "dashboard" && <Dashboard summary={summary} />}
            {tab === "students" && <Students people={people} />}
            {tab === "session" && <Session sessions={sessions} />}
            {tab === "records" && <Records records={records} />}
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
}

function Dashboard({ summary }) {
  if (!summary) {
    return (
      <IonCard>
        <IonCardContent>No hay datos cargados todavía.</IonCardContent>
      </IonCard>
    );
  }

  return (
    <section className="dashboard-grid">
      <InfoCard
        icon={schoolOutline}
        title="Institución"
        value={summary.demo.institution}
        description={summary.demo.academicUnit}
      />

      <InfoCard
        icon={peopleOutline}
        title="Personas"
        value={summary.totals.people}
        description={`${summary.totals.enrollments} inscripciones`}
      />

      <InfoCard
        icon={qrCodeOutline}
        title="Sesión QR"
        value={summary.demo.roomCode}
        description={`Estado: ${summary.demo.sessionStatus}`}
      />

      <InfoCard
        icon={serverOutline}
        title="Base de datos"
        value={summary.database}
        description={summary.dataType}
      />

      <IonCard className="summary-card">
        <IonCardHeader>
          <IonCardTitle>Resumen de asistencia</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <div className="attendance-summary">
            <div className="accepted">
              <IonIcon icon={checkmarkCircleOutline} />
              <strong>{summary.totals.acceptedRecords}</strong>
              <span>Aceptados</span>
            </div>

            <div className="rejected">
              <IonIcon icon={closeCircleOutline} />
              <strong>{summary.totals.rejectedRecords}</strong>
              <span>Rechazados</span>
            </div>
          </div>
        </IonCardContent>
      </IonCard>
    </section>
  );
}

function InfoCard({ icon, title, value, description }) {
  return (
    <IonCard className="info-card">
      <IonCardContent>
        <div className="info-icon">
          <IonIcon icon={icon} />
        </div>
        <h2>{value}</h2>
        <h3>{title}</h3>
        <p>{description}</p>
      </IonCardContent>
    </IonCard>
  );
}

function Students({ people }) {
  const teachers = people.filter((person) => person.roles.includes("TEACHER"));
  const students = people.filter((person) => person.roles.includes("STUDENT"));

  return (
    <section>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Docente demo</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonList>
            {teachers.map((teacher) => (
              <IonItem key={teacher._id}>
                <IonLabel>
                  <h2>{teacher.fullName}</h2>
                  <p>{teacher.documentNumber}</p>
                </IonLabel>
                <IonChip color="primary">TEACHER</IonChip>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>

      <IonCard>
        <IonCardHeader>
          <IonCardTitle>Estudiantes inscritos</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <IonList>
            {students.map((student) => (
              <IonItem key={student._id}>
                <IonLabel>
                  <h2>{student.fullName}</h2>
                  <p>{student.documentNumber}</p>
                </IonLabel>
                <IonChip color="success">STUDENT</IonChip>
              </IonItem>
            ))}
          </IonList>
        </IonCardContent>
      </IonCard>
    </section>
  );
}

function Session({ sessions }) {
  const session = sessions[0];

  if (!session) {
    return (
      <IonCard>
        <IonCardContent>No hay sesión registrada.</IonCardContent>
      </IonCard>
    );
  }

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{session.title}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <div className="qr-box">
          <div className="qr-fake"></div>
          <h2>{session.roomCode}</h2>
          <p>Código de sala demo</p>
        </div>

        <div className="session-details">
          <p><strong>Estado:</strong> {session.status}</p>
          <p><strong>Token QR:</strong> {session.qrToken}</p>
          <p><strong>Materia:</strong> {session.unitId?.name}</p>
          <p><strong>Docente:</strong> {session.teacherId?.fullName}</p>
        </div>
      </IonCardContent>
    </IonCard>
  );
}

function Records({ records }) {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>Registros de asistencia</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonList>
          {records.map((record) => (
            <IonItem key={record._id}>
              <IonLabel>
                <h2>{record.personId?.fullName || "Persona no encontrada"}</h2>
                <p>{record.documentNumber}</p>
                <p>Motivo: {record.rejectReason}</p>
              </IonLabel>

              <IonChip color={record.status === "ACCEPTED" ? "success" : "danger"}>
                {record.status}
              </IonChip>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  );
}

export default App;