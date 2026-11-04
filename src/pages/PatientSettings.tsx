import {
  Contrast,
  HeartHandshake,
  Phone,
  Settings,
  ShieldCheck,
  Siren,
  Type,
  Volume2,
} from "lucide-react"
import { Button, Card, Logo, StatusBadge } from "../components/UI"
import PatientNavigation from "../components/PatientNavigation"
import { FontScale, useMedication } from "../context/MedicationContext"

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: () => void
  label: string
}) {
  return (
    <button
      className={`toggle ${checked ? "on" : ""}`}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
    >
      <span />
    </button>
  )
}

export default function PatientSettings() {
  const {
    fontScale,
    setFontScale,
    voiceAlerts,
    setVoiceAlerts,
    highContrast,
    setHighContrast,
    alarmVolume,
    setAlarmVolume,
  } = useMedication()

  const readPreview = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(
        new SpeechSynthesisUtterance("Seu Antônio, hora da Losartana."),
      )
    }
  }

  return (
    <div className="patient-page settings-page">
      <header className="patient-header">
        <div>
          <Logo />
          <span>Modo Paciente</span>
        </div>
        <a
          className="sos-button outline"
          href="tel:+5511984521100"
          aria-label="Ligar para emergência SOS"
        >
          <Siren /> SOS
        </a>
      </header>
      <main className="patient-main">
        <div className="settings-title">
          <span>
            <Settings />
          </span>
          <div>
            <h1>Ajustes & Conforto</h1>
            <p>Configure o som, letras e contatos da sua família</p>
          </div>
        </div>
        <Card className="patient-identity" accent="brand">
          <img src="/assets/ad07d.png" alt="Foto de Seu Antônio Silva" />
          <h2>
            Seu Antônio Silva <StatusBadge status="info">82 anos</StatusBadge>
          </h2>
          <div>
            <HeartHandshake />
            <span>
              Cuidado por: Maria Luiza (Filha)
              <strong>Conectado e monitorando</strong>
            </span>
          </div>
        </Card>

        <Card className="setting-card">
          <div className="setting-heading">
            <span className="icon-tile icon-tile-blue">
              <Type />
            </span>
            <div>
              <h2>Tamanho das letras</h2>
              <p>Ajuste para facilitar a sua leitura</p>
            </div>
            <StatusBadge status="success">
              Ativo:{" "}
              {fontScale === "xlarge"
                ? "Muito grande"
                : fontScale === "large"
                  ? "Grande"
                  : "Normal"}
            </StatusBadge>
          </div>
          <div
            className="font-options"
            role="radiogroup"
            aria-label="Tamanho das letras"
          >
            {([
              ["normal", "A", "Normal"],
              ["large", "A", "Grande"],
              ["xlarge", "A+", "Muito grande"],
            ] as [FontScale, string, string][]).map(
              ([value, letter, label]) => (
                <button
                  key={value}
                  className={fontScale === value ? "active" : ""}
                  onClick={() => setFontScale(value)}
                  role="radio"
                  aria-checked={fontScale === value}
                  aria-label={`Tamanho ${label}`}
                >
                  <strong>{letter}</strong>
                  <span>{label}</span>
                </button>
              ),
            )}
          </div>
        </Card>

        <Card className="setting-card">
          <div className="setting-heading">
            <span className="icon-tile icon-tile-blue">
              <Volume2 />
            </span>
            <div>
              <h2>Avisos em voz alta</h2>
              <p>Ler em voz clara o nome e a cor de cada remédio.</p>
            </div>
            <Toggle
              checked={voiceAlerts}
              onChange={() => setVoiceAlerts(!voiceAlerts)}
              label="Ativar avisos em voz alta"
            />
          </div>
          <Button
            variant="secondary"
            onClick={readPreview}
            ariaLabel="Ouvir exemplo do aviso em voz alta"
          >
            <Volume2 /> Ouvir exemplo: "Seu Antônio, hora da Losartana"
          </Button>
        </Card>

        <Card className="setting-card">
          <div className="setting-heading">
            <span className="icon-tile icon-tile-blue">
              <Volume2 />
            </span>
            <div>
              <h2>Volume do despertador</h2>
              <p>Som que toca na caixa e no telefone.</p>
            </div>
          </div>
          <div className="volume-options">
            <button
              className={alarmVolume === "medium" ? "active" : ""}
              onClick={() => setAlarmVolume("medium")}
              aria-label="Volume médio"
            >
              Médio (normal)
            </button>
            <button
              className={alarmVolume === "high" ? "active" : ""}
              onClick={() => setAlarmVolume("high")}
              aria-label="Volume alto"
            >
              Alto (forte)
            </button>
          </div>
        </Card>

        <Card className="setting-card">
          <div className="setting-heading">
            <span className="icon-tile icon-tile-blue">
              <Contrast />
            </span>
            <div>
              <h2>Alto contraste</h2>
              <p>Bordas mais escuras e fundos nítidos.</p>
            </div>
            <Toggle
              checked={highContrast}
              onChange={() => setHighContrast(!highContrast)}
              label="Ativar modo alto contraste"
            />
          </div>
        </Card>

        <Card className="emergency-card">
          <div className="setting-heading">
            <span className="icon-tile icon-tile-red">
              <Phone />
            </span>
            <div>
              <h2>Ligação de emergência</h2>
              <p>Filha Maria Luiza</p>
            </div>
            <StatusBadge status="danger">SOS 1 toque</StatusBadge>
          </div>
          <strong>Número cadastrado: (11) 98452-1100</strong>
          <a
            href="tel:+5511984521100"
            aria-label="Ligar agora para Maria Luiza"
          >
            <Phone /> Ligar agora para Maria Luiza
          </a>
        </Card>
        <Card className="support-card">
          <ShieldCheck />
          <h2>Precisa de ajuda com o aplicativo?</h2>
          <p>
            Qualquer dúvida, você pode falar com o suporte ou pedir para a Maria
            te ajudar.
          </p>
          <Button variant="secondary" ariaLabel="Pedir ajuda com o aplicativo">
            Pedir ajuda com o aplicativo
          </Button>
        </Card>
      </main>
      <PatientNavigation />
    </div>
  )
}
