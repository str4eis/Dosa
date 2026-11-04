import { CalendarDays, CheckCircle2, Clock3 } from "lucide-react"
import CaregiverShell from "../components/CaregiverShell"
import MedicationCard from "../components/MedicationCard"
import { Card } from "../components/UI"
import { useMedication } from "../context/MedicationContext"

export default function CaregiverAgenda() {
  const { medications, activePatient, adherence } = useMedication()
  const patientMedications = medications
    .filter((medication) => medication.patientId === activePatient.id)
    .sort((a, b) => a.time.localeCompare(b.time))
  const confirmed = patientMedications.filter(
    (medication) => medication.status === "confirmed",
  ).length

  return (
    <CaregiverShell>
      <main className="caregiver-content-page">
        <div className="content-page-header">
          <div>
            <span className="page-kicker">Cronograma diário</span>
            <h1>Agenda de medicamentos</h1>
            <p>{activePatient.name} • Quinta-feira, 24 de outubro</p>
          </div>
          <CalendarDays className="page-header-icon" />
        </div>
        <div className="agenda-summary">
          <Card>
            <span>Progresso de hoje</span>
            <strong>
              {confirmed} de {patientMedications.length} doses tomadas
            </strong>
            <div className="progress">
              <span
                style={{
                  width: `${(confirmed / patientMedications.length) * 100}%`,
                }}
              />
            </div>
          </Card>
          <Card>
            <span>Adesão atual</span>
            <strong>{adherence}%</strong>
            {confirmed ? <CheckCircle2 /> : <Clock3 />}
          </Card>
        </div>
        <section className="agenda-timeline">
          <h2>Cronograma clínico</h2>
          {patientMedications.map((medication) => (
            <MedicationCard key={medication.id} medication={medication} />
          ))}
        </section>
      </main>
    </CaregiverShell>
  )
}
