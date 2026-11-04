import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react"
import type { Medication } from "../context/MedicationContext"
import { getMedicationIcon } from "../utils/medicationIcons"
import { Button, Card, StatusBadge } from "./UI"

export default function MedicationCard({
  medication,
}: {
  medication: Medication
}) {
  const effectiveStatus = medication.status
  const MedicationIcon = getMedicationIcon(medication.name, medication.dosage)
  return (
    <Card
      accent={
        effectiveStatus === "low"
          ? "danger"
          : effectiveStatus === "confirmed"
            ? "success"
            : "brand"
      }
      className="medication-row"
    >
      <div className="medication-time">
        <strong>{medication.time}</strong>
        <span>{medication.period}</span>
      </div>
      <div className="medication-body">
        <div className="medication-heading">
          <div className="medicine-image">
              <MedicationIcon aria-hidden="true" />
          </div>
          <div>
            <h3>
              {medication.name} {medication.dosage}
            </h3>
            <p>1 comprimido • {medication.instruction}</p>
          </div>
          {effectiveStatus === "confirmed" && (
            <StatusBadge status="success">
              <CheckCircle2 /> Confirmado {medication.confirmedAt}
            </StatusBadge>
          )}
          {effectiveStatus === "next" && (
            <StatusBadge status="info">
              <Clock3 /> Próxima dose
            </StatusBadge>
          )}
          {effectiveStatus === "low" && (
            <StatusBadge status="danger">
              <AlertTriangle /> Estoque crítico
            </StatusBadge>
          )}
        </div>
        {effectiveStatus === "next" && (
          <Button
            variant="primary"
            ariaLabel={`Registrar manualmente ${medication.name}`}
          >
            Registrar manualmente
          </Button>
        )}
      </div>
    </Card>
  )
}
