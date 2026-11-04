import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  PackageX,
  Users,
} from "lucide-react"
import CaregiverShell from "../components/CaregiverShell"
import MedicationCard from "../components/MedicationCard"
import { Card, StatusBadge } from "../components/UI"
import { useMedication } from "../context/MedicationContext"

export default function CaregiverDashboard() {
  const { medications, adherence, activePatient, patients } = useMedication()
  const patientMedications = medications.filter(
    (medication) => medication.patientId === activePatient.id,
  )
  const confirmed = patientMedications.filter(
    (medication) => medication.status === "confirmed",
  )

  return (
    <CaregiverShell>
      <main className="caregiver-main">
        {confirmed.length > 0 && (
          <div className="confirmation-banner" role="status">
            <span>✓</span>
            <div>
              <strong>Dose confirmada • {adherence}% pontualidade</strong>
              <p>
                {activePatient.name} confirmou {confirmed[0].name} às{" "}
                {confirmed[0].confirmedAt}.
              </p>
            </div>
          </div>
        )}

        <section className="summary-section">
          <div className="section-row">
            <div>
              <span className="page-kicker">Visão Geral</span>
              <h1>Resumo clínico</h1>
            </div>
            <span>Atualizado agora</span>
          </div>
          <div className="summary-grid">
            <Card>
              <div className="summary-label">
                Adesão semanal <BarChart3 />
              </div>
              <strong className="metric">{adherence}%</strong>
              <StatusBadge status="success">+4% vs. mês anterior</StatusBadge>
              <div className="mini-bars" aria-label="Gráfico semanal de adesão">
                {[40, 70, 55, 82, 64, 90, adherence].map((value, index) => (
                  <i
                    key={`${value}-${index}`}
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
            </Card>
            <Card>
              <div className="summary-label">
                Doses hoje <CalendarDays />
              </div>
              <strong className="metric">
                {confirmed.length}/{patientMedications.length}
              </strong>
              <div className="progress">
                <span
                  style={{
                    width: `${(confirmed.length / patientMedications.length) * 100}%`,
                  }}
                />
              </div>
              <p>
                Próxima dose:{" "}
                <strong>
                  {patientMedications.find(
                    (medication) => medication.status !== "confirmed",
                  )?.time ?? "Concluído"}
                </strong>
              </p>
            </Card>
            <Card className="stock-summary">
              <div className="summary-label">
                Pacientes ativos <Users />
              </div>
              <strong className="metric">{patients.length}</strong>
              <StatusBadge status="info">Todos conectados</StatusBadge>
              <p className="summary-note">
                {patients.filter((patient) => patient.adherence < 90).length}{" "}
                paciente requer atenção
              </p>
            </Card>
          </div>
        </section>

        <section className="schedule-section">
          <div className="section-row">
            <div>
              <h2>Status das doses de hoje</h2>
              <p>{activePatient.name} • Quinta-feira, 24 de outubro</p>
            </div>
            {confirmed.length ? <CheckCircle2 /> : <Clock3 />}
          </div>
          <div className="schedule-list">
            {patientMedications.map((medication) => (
              <MedicationCard key={medication.id} medication={medication} />
            ))}
          </div>
        </section>

        <aside className="management-panel">
          <h2>Pacientes acompanhados</h2>
          <div className="patient-mini-list">
            {patients.map((patient) => (
              <Card key={patient.id}>
                <span className="avatar">{patient.initials}</span>
                <div>
                  <strong>{patient.name}</strong>
                  <small>
                    {patient.age} anos • {patient.relationship}
                  </small>
                </div>
                <StatusBadge
                  status={patient.adherence >= 90 ? "success" : "warning"}
                >
                  {patient.adherence}%
                </StatusBadge>
              </Card>
            ))}
          </div>
          <Card className="stock-alert-card">
            <PackageX />
            <div>
              <strong>Estoque crítico</strong>
              <p>Sinvastatina: restam 4 comprimidos.</p>
            </div>
          </Card>
        </aside>
      </main>
    </CaregiverShell>
  )
}
