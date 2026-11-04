import {
  BellRing,
  FileDown,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
} from "lucide-react"
import CaregiverShell from "../components/CaregiverShell"
import { Button, Card, StatusBadge } from "../components/UI"
import { useMedication } from "../context/MedicationContext"

export default function CaregiverSettings() {
  const { activePatient } = useMedication()

  return (
    <CaregiverShell>
      <main className="caregiver-content-page settings-caregiver">
        <div className="content-page-header">
          <div>
            <span className="page-kicker">Configurações do cuidador</span>
            <h1>Ajustes & Relatórios</h1>
            <p>Gerencie alertas e documentos do acompanhamento familiar.</p>
          </div>
        </div>
        <div className="caregiver-settings-grid">
          <Card>
            <div className="settings-card-title">
              <BellRing />
              <div>
                <h2>Notificações & alertas</h2>
                <p>Receba atrasos de dose no WhatsApp.</p>
              </div>
              <StatusBadge status="success">Ativo</StatusBadge>
            </div>
            <div className="settings-list-row">
              <MessageCircle />
              <span>Alertas via WhatsApp</span>
              <strong>Ligado</strong>
            </div>
            <div className="settings-list-row">
              <ShieldCheck />
              <span>Chamada de emergência</span>
              <strong>Ligado</strong>
            </div>
          </Card>
          <Card className="report-export-card">
            <FileDown />
            <h2>Exportação & relatórios</h2>
            <p>
              Gere um resumo de adesão e horários de {activePatient.name} para a
              próxima consulta.
            </p>
            <Button
              onClick={() => window.print()}
              ariaLabel="Exportar relatório mensal em PDF"
            >
              <FileDown /> Exportar relatório em PDF
            </Button>
          </Card>
          <Card>
            <div className="settings-card-title">
              <LockKeyhole />
              <div>
                <h2>Privacidade & LGPD</h2>
                <p>Dados protegidos e acesso controlado.</p>
              </div>
            </div>
            <p className="settings-copy">
              Somente cuidadores vinculados podem consultar a rotina e os
              registros de medicação.
            </p>
          </Card>
        </div>
      </main>
    </CaregiverShell>
  )
}
