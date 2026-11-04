import { ChevronDown, Plus } from "lucide-react"
import { useState } from "react"
import { Button, Logo } from "./UI"
import CaregiverNavigation from "./CaregiverNavigation"
import MedicationModal from "./MedicationModal"
import { useMedication } from "../context/MedicationContext"

export default function CaregiverShell({
  children,
}: {
  children: React.ReactNode
}) {
  const { patients, activePatient, activePatientId, setActivePatientId } =
    useMedication()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="caregiver-page">
      <header className="caregiver-header">
        <div className="caregiver-header-top">
          <div>
            <Logo />
            <small>Cuidador Pro</small>
          </div>
          <Button
            onClick={() => setModalOpen(true)}
            ariaLabel="Adicionar novo medicamento"
          >
            <Plus /> Medicamento
          </Button>
        </div>
        <div className="patient-selector">
          <span className="avatar">{activePatient.initials}</span>
          <label>
            Paciente ativo
            <select
              value={activePatientId}
              onChange={(event) =>
                setActivePatientId(Number(event.target.value))
              }
              aria-label="Selecionar paciente ativo"
            >
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </label>
          <ChevronDown aria-hidden="true" />
          <Button
            variant="ghost"
            onClick={() => window.alert("Convite de paciente copiado.")}
            ariaLabel="Adicionar novo paciente"
          >
            <Plus /> Novo
          </Button>
        </div>
      </header>
      {children}
      <CaregiverNavigation />
      <MedicationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
