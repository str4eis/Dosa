import { FormEvent, useEffect, useRef } from "react"
import { Clock3, Pill, X } from "lucide-react"
import { useMedication } from "../context/MedicationContext"
import { Button } from "./UI"

export default function MedicationModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { addMedication } = useMedication()
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    nameRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [open, onClose])

  if (!open) return null

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    addMedication({
      name: String(data.get("name")),
      dosage: String(data.get("dosage")),
      time: String(data.get("time")),
    })
    onClose()
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="medication-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="medication-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span className="icon-tile icon-tile-mint">
              <Pill />
            </span>
            <div>
              <h2 id="medication-modal-title">Novo medicamento</h2>
              <p>Cadastre a próxima dose em poucos segundos.</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Fechar cadastro de medicamento">
            <X />
          </button>
        </div>
        <form onSubmit={submit}>
          <label>
            Nome do remédio
            <input
              ref={nameRef}
              required
              name="name"
              placeholder="Ex: Losartana"
            />
          </label>
          <label>
            Dosagem
            <input required name="dosage" placeholder="Ex: 50mg" />
          </label>
          <label>
            Horário
            <span className="input-with-icon">
              <Clock3 />
              <input required type="time" name="time" defaultValue="08:00" />
            </span>
          </label>
          <div className="modal-actions">
            <Button
              variant="secondary"
              onClick={onClose}
              ariaLabel="Cancelar cadastro de medicamento"
            >
              Cancelar
            </Button>
            <Button type="submit" ariaLabel="Salvar novo medicamento">
              Salvar medicamento
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
