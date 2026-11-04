import {
  BellRing,
  CheckCircle2,
  HeartHandshake,
  LockKeyhole,
  QrCode,
  ShieldCheck,
  Smartphone,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"
import {
  ArrowCta,
  Button,
  Card,
  Logo,
  SectionTitle,
  StatusBadge,
} from "../components/UI"

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="marketing-header">
        <div className="container header-inner">
          <Logo />
          <nav aria-label="Navegação principal">
          </nav>
          <div className="header-actions">
            <Button to="/login" variant="ghost" ariaLabel="Entrar na DOSA">
              Entrar
            </Button>
            <Button to="/cadastro" ariaLabel="Começar gratuitamente">
              Criar conta
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                <ShieldCheck /> Tecnologia que cuida de verdade
              </span>
              <h1>
                Tranquilidade para quem cuida,{" "}
                <span>simplicidade para quem toma.</span>
              </h1>
              <p>
                O aplicativo de medicação que conecta pacientes e cuidadores em
                tempo real. Mais autonomia para ele. Mais tranquilidade para
                toda a família.
              </p>
              <div className="hero-actions">
                <Button to="/cadastro" ariaLabel="Começar gratuitamente">
                  <ArrowCta>Começar gratuitamente</ArrowCta>
                </Button>
                <Button
                  to="/cadastro"
                  variant="secondary"
                  ariaLabel="Ver demonstração de um minuto"
                >
                  Ver demonstração de 1 min
                </Button>
              </div>
              <div className="trust-row">
                <span>
                  <CheckCircle2 /> Grátis para começar
                </span>
                <span>
                  <LockKeyhole /> Dados protegidos
                </span>
                <span>
                  <HeartHandshake /> Feito para famílias
                </span>
              </div>
            </div>

            <Card className="simulator-card static-demo-card" accent="brand">
              <div className="simulator-top">
                <span>Visão do paciente</span>
                <strong>08:00</strong>
              </div>
              <div className="simulator-reminder">
                <StatusBadge status="warning">
                  <BellRing />
                  Hora do remédio
                </StatusBadge>
                <div className="pill-visual">
                  <span>50</span>
                </div>
                <h3>Losartana Potássica</h3>
                <strong>50 mg • 1 comprimido</strong>
                <p>Tomar logo após o café da manhã com água.</p>
              </div>
              <div className="demo-button" aria-hidden="true">
                <CheckCircle2 /> Tomei meu remédio
              </div>
            </Card>
          </div>
        </section>

        <section id="como-funciona" className="section ecosystem">
          <div className="container">
            <SectionTitle
              eyebrow="Um cuidado que todos entendem"
              title="Cuidado conectado"
              description="Cada pessoa encontra exatamente o que precisa, sem complicação."
            />
            <div className="three-grid">
              <Card className="feature-card">
                <Smartphone />
                <h3>Paciente simples</h3>
                <p>
                  Botões grandes, linguagem clara e somente a dose do momento em
                  destaque.
                </p>
              </Card>
              <Card className="feature-card">
                <Users />
                <h3>Família e cuidador</h3>
                <p>
                  Acompanhe horários, confirmações e alertas importantes em
                  tempo real.
                </p>
              </Card>
              <Card className="feature-card">
                <QrCode />
                <h3>Médico e conexão</h3>
                <p>
                  Relatórios organizados para compartilhar nas consultas e
                  conexão por código.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="section security-section">
          <div className="container">
            <SectionTitle
              eyebrow="Tecnologia segura"
              title="Como a DOSA protege sua rotina"
            />
            <div className="three-grid">
              <div className="security-item">
                <LockKeyhole />
                <div>
                  <h3>Cadastro em 1 minuto</h3>
                  <p>Sem burocracia e sem mensagens indesejadas.</p>
                </div>
              </div>
              <div className="security-item">
                <BellRing />
                <div>
                  <h3>Lembretes na hora certa</h3>
                  <p>Alertas acessíveis para paciente e cuidador.</p>
                </div>
              </div>
              <div className="security-item">
                <ShieldCheck />
                <div>
                  <h3>Seus dados protegidos</h3>
                  <p>Privacidade e segurança desde o primeiro acesso.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div>
            <Logo inverse />
            <p>Cuidado com medicação mais humano, acessível e conectado.</p>
          </div>
          <div>
            <h3>Segurança</h3>
            <p>
              <ShieldCheck /> Conforme LGPD
            </p>
            <p>
              <LockKeyhole /> Dados criptografados
            </p>
          </div>
          <div>
            <h3>Suporte</h3>
            <a href="tel:+5511984521100">Central de ajuda</a>
            <a href="mailto:ajuda@dosa.app">ajuda@dosa.app</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
