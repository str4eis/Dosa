import { CheckCircle2, Clock3, History, Phone, ShieldAlert } from "lucide-react"
import PatientNavigation from "../components/PatientNavigation"
import { Card, Logo, StatusBadge } from "../components/UI"
import { useMedication } from "../context/MedicationContext"

export default function PatientHistory() {
  const { history, activePatient } = useMedication()
  const patientHistory = history
    .filter((item) => item.patientId === activePatient.id)
    .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime))
  const taken = patientHistory.filter((item) => item.status === "taken").length

  return (
    <div className="patient-page">
      <header className="patient-header">
        <div>
          <Logo />
          <span>Meu histórico de hoje</span>
        </div>
        <a
          className="sos-button"
          href="tel:+5511984521100"
          aria-label="Ligar para emergência SOS"
        >
          <ShieldAlert /> SOS
        </a>
      </header>
      <main className="patient-main">
        <div className="settings-title">
          <span>
            <History />
          </span>
          <div>
            <h1>Histórico</h1>
            <p>Veja quais remédios já tomou e quais ainda estão pendentes.</p>
          </div>
        </div>
        <Card className="history-summary">
          <div>
            <span>Doses tomadas hoje</span>
            <strong>
              {taken} de {patientHistory.length}
            </strong>
          </div>
          <div className="progress">
            <span
              style={{
                width: `${(taken / patientHistory.length) * 100}%`,
              }}
            />
          </div>
          <p>Seu cuidador acompanha essas confirmações em tempo real.</p>
        </Card>
        <section className="history-list" aria-label="Doses de hoje">
          {patientHistory.map((item) => (
            <Card
              key={item.id}
              accent={item.status === "taken" ? "success" : "warning"}
              className="history-dose-card"
            >
              <div className="history-time">
                <strong>{item.scheduledTime}</strong>
                <span>{item.dateLabel}</span>
              </div>
              <div>
                <h2>
                  {item.medicationName} {item.dosage}
                </h2>
                <StatusBadge
                  status={item.status === "taken" ? "success" : "warning"}
                >
                  {item.status === "taken" ? <CheckCircle2 /> : <Clock3 />}
                  {item.status === "taken"
                    ? `Tomado às ${item.takenAt}`
                    : "Aguardando horário"}
                </StatusBadge>
              </div>
            </Card>
          ))}
        </section>
        <Card className="caregiver-call-card">
          <span className="avatar">M</span>
          <div>
            <strong>Dúvida sobre uma dose?</strong>
            <p>Converse diretamente com Maria.</p>
          </div>
          <a href="tel:+5511984521100" aria-label="Ligar para cuidadora Maria">
            <Phone /> Ligar
          </a>
        </Card>
      </main>
      <PatientNavigation />
    </div>
  )
}
