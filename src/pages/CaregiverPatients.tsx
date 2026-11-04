import { QrCode, Search, UserPlus } from "lucide-react"
import CaregiverShell from "../components/CaregiverShell"
import { Button, Card, StatusBadge } from "../components/UI"
import { useMedication } from "../context/MedicationContext"

export default function CaregiverPatients() {
  const { patients, medications, setActivePatientId } = useMedication()

  return (
    <CaregiverShell>
      <main className="caregiver-content-page">
        <div className="content-page-header">
          <div>
            <span className="page-kicker">Gestão familiar</span>
            <h1>Meus Pacientes</h1>
            <p>Acompanhe adesão, próximas doses e alertas em um só lugar.</p>
          </div>
          <Button
            onClick={() => window.alert("Código de convite: DOSA-8821")}
            ariaLabel="Vincular novo paciente"
          >
            <UserPlus /> Novo paciente
          </Button>
        </div>
        <label className="patient-search">
          <Search />
          <input
            type="search"
            placeholder="Buscar por nome ou parentesco..."
            aria-label="Buscar paciente"
          />
        </label>
        <div className="patients-detailed-grid">
          {patients.map((patient) => {
            const patientMedications = medications.filter(
              (medication) => medication.patientId === patient.id,
            )
            const nextDose = patientMedications.find(
              (medication) => medication.status !== "confirmed",
            )
            return (
              <Card
                key={patient.id}
                accent={patient.adherence >= 90 ? "success" : "warning"}
                className="patient-detail-card"
              >
                <div className="patient-card-heading">
                  <span className="avatar">{patient.initials}</span>
                  <div>
                    <h2>{patient.name}</h2>
                    <p>
                      {patient.age} anos • {patient.relationship}
                    </p>
                  </div>
                  <StatusBadge
                    status={patient.adherence >= 90 ? "success" : "warning"}
                  >
                    {patient.adherence >= 90
                      ? "Tudo em dia"
                      : "1 dose pendente"}
                  </StatusBadge>
                </div>
                <div className="patient-stats">
                  <div>
                    <span>Adesão semanal</span>
                    <strong>{patient.adherence}%</strong>
                  </div>
                  <div>
                    <span>Medicamentos</span>
                    <strong>{patientMedications.length}</strong>
                  </div>
                </div>
                <div className="next-patient-dose">
                  <span>Próxima dose</span>
                  <strong>
                    {nextDose?.time ?? "Concluída"} {nextDose?.name}
                  </strong>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setActivePatientId(patient.id)}
                  ariaLabel={`Selecionar ${patient.name}`}
                >
                  Ver rotina
                </Button>
              </Card>
            )
          })}
          <Card className="link-patient-card">
            <QrCode />
            <h2>Vincular novo paciente</h2>
            <p>Use o código familiar DOSA-8821 para conectar outro perfil.</p>
            <Button
              variant="secondary"
              onClick={() => navigator.clipboard?.writeText("DOSA-8821")}
              ariaLabel="Copiar código de vínculo DOSA 8821"
            >
              Copiar código
            </Button>
          </Card>
        </div>
      </main>
    </CaregiverShell>
  )
}
