import { Droplets, Pill, Syringe, Tablet } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export function getMedicationIcon(nome: string, dosagem: string): LucideIcon {
  const medicationText = `${nome} ${dosagem}`
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()

  if (/insulina|injecao|injetavel|vacina/.test(medicationText)) {
    return Syringe
  }

  if (/gotas|colirio|solucao|xarope/.test(medicationText)) {
    return Droplets
  }

  if (/comprimido|tablete|tablet/.test(medicationText)) {
    return Tablet
  }

  return Pill
}