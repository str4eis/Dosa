import {
  AlarmClock,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Info,
  Phone,
  Pill,
  ShieldAlert,
  Utensils,
} from "lucide-react"
import { Button, Card, Logo, StatusBadge } from "../components/UI"
import PatientNavigation from "../components/PatientNavigation"
import { useMedication } from "../context/MedicationContext"
import { getMedicationIcon } from "../utils/medicationIcons"

export default function PatientHome() {
  const { confirmDose, postponeDose, medications, activePatient } =
    useMedication()
  const currentDose =
    medications.find(
      (medication) =>
        medication.patientId === activePatient.id && medication.id === 1,
    ) ?? medications[0]
  const MedicationIcon = getMedicationIcon(currentDose.name, currentDose.dosage)
  const doseConfirmed = currentDose.status === "confirmed"
  const nextDose = medications.find(
    (medication) =>
      medication.patientId === activePatient.id &&
      medication.id !== currentDose.id &&
      medication.status !== "confirmed",
  )

  return (
    <div className="patient-page">
      <header className="patient-header">
        <div>
          <Logo />
          <span>
            <i /> Conectado à Maria (Filha)
          </span>
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
        <Card className="greeting-card">
          <div className="date-row">
            <StatusBadge status="info">
              <CalendarDays /> Quarta-feira, 24 de outubro
            </StatusBadge>
            <strong>08:00</strong>
          </div>
          <h1>
            Bom dia, <span>Seu Antônio!</span>
          </h1>
          <p>Tudo pronto para cuidar da sua saúde hoje.</p>
        </Card>

        <Card className="current-dose-card" accent="brand">
          <div className="dose-status">
            <StatusBadge status={doseConfirmed ? "success" : "warning"}>
              <AlarmClock />{" "}
              {doseConfirmed ? "REMÉDIO TOMADO" : "HORA DO REMÉDIO"}
            </StatusBadge>
            <strong>08:00</strong>
          </div>
          <div className="dose-identification">
            <div className="dose-photo">
              <MedicationIcon aria-hidden="true" />
            </div>
            <span className="dose-quantity">1 comprimido</span>
            <small>Pressão arterial</small>
            <h2>Losartana 50mg</h2>
            <strong>1 comprimido com água</strong>
            <p>
              <Utensils /> Tomar logo após o café da manhã
            </p>
          </div>
          <div className="instruction-box">
            <Info />
            <p>
              Não mastigue nem parta o comprimido. Tome com meio copo d'água
              filtrada.
            </p>
          </div>
          <div className="patient-actions">
            <Button
              onClick={() => confirmDose(currentDose.id)}
              ariaLabel="Confirmar que tomei meu remédio"
              className={doseConfirmed ? "is-confirmed" : ""}
            >
              <CheckCircle2 />{" "}
              {doseConfirmed ? "REMÉDIO CONFIRMADO" : "TOMEI MEU REMÉDIO"}
            </Button>
            <Button
              variant="secondary"
              onClick={postponeDose}
              ariaLabel="Adiar remédio por 15 minutos"
            >
              <AlarmClock /> Adiar por 15 minutos
            </Button>
          </div>
        </Card>

        <section className="next-dose">
          <div className="section-row">
            <h2>Próxima dose hoje</h2>
            <span>Hoje à tarde</span>
          </div>
          <Card className="next-dose-card">
            <span className="icon-tile icon-tile-blue">
              <Pill />
            </span>
            <div>
              <strong>
                14:00 <StatusBadge status="info">Em 6 horas</StatusBadge>
              </strong>
              <h3>
                {nextDose?.name} {nextDose?.dosage}
              </h3>
              <p>{nextDose?.instruction}</p>
              <small>
                <Clock3 /> Aguardando horário
              </small>
            </div>
          </Card>
        </section>
        <Card className="caregiver-call-card">
          <span className="avatar">M</span>
          <div>
            <strong>Precisa de ajuda com o remédio?</strong>
            <p>Ligue direto para sua filha Maria</p>
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
