import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type FontScale = "normal" | "large" | "xlarge"
export type MedicationStatus = "confirmed" | "next" | "low"
export type UserRole = "paciente" | "cuidador" | null
export type ActiveScreen = "landing" | "login" | "cadastro" | "paciente" | "cuidador"

export interface Patient {
  id: number
  name: string
  initials: string
  age: number
  relationship: string
  adherence: number
  active: boolean
}

export interface Medication {
  id: number
  patientId: number
  name: string
  dosage: string
  time: string
  period: string
  instruction: string
  status: MedicationStatus
  confirmedAt?: string
}

export interface DoseHistory {
  id: number
  medicationId: number
  patientId: number
  medicationName: string
  dosage: string
  scheduledTime: string
  takenAt?: string
  status: "taken" | "pending" | "late"
  dateLabel: string
}

export interface NewMedication {
  name: string
  dosage: string
  time: string
}

interface MedicationContextValue {
  patients: Patient[]
  medications: Medication[]
  history: DoseHistory[]
  activePatient: Patient
  activePatientId: number
  adherence: number
  fontScale: FontScale
  voiceAlerts: boolean
  highContrast: boolean
  alarmVolume: "medium" | "high"
  userRole: UserRole
  activeScreen: ActiveScreen
  setActivePatientId: (id: number) => void
  confirmDose: (medicationId?: number) => void
  postponeDose: () => void
  addMedication: (medication: NewMedication) => void
  setFontScale: (scale: FontScale) => void
  setVoiceAlerts: (enabled: boolean) => void
  setHighContrast: (enabled: boolean) => void
  setAlarmVolume: (volume: "medium" | "high") => void
  setUserRole: (role: UserRole) => void
  setActiveScreen: (screen: ActiveScreen) => void
}

const MedicationContext = createContext<MedicationContextValue | undefined>(
  undefined,
)

const initialPatients: Patient[] = [
  {
    id: 1,
    name: "Antônio Silva",
    initials: "AS",
    age: 82,
    relationship: "Pai",
    adherence: 96,
    active: true,
  },
  {
    id: 2,
    name: "Dona Helena Souza",
    initials: "HS",
    age: 76,
    relationship: "Mãe",
    adherence: 88,
    active: true,
  },
]

const initialMedications: Medication[] = [
  {
    id: 1,
    patientId: 1,
    name: "Losartana Potássica",
    dosage: "50mg",
    time: "08:00",
    period: "Manhã",
    instruction: "Tomar logo após o café da manhã",
    status: "next",
  },
  {
    id: 2,
    patientId: 1,
    name: "Omeprazol",
    dosage: "20mg",
    time: "14:00",
    period: "Tarde",
    instruction: "Tomar 30 min antes do almoço",
    status: "next",
  },
  {
    id: 3,
    patientId: 1,
    name: "Sinvastatina",
    dosage: "20mg",
    time: "20:00",
    period: "Noite",
    instruction: "Tomar após o jantar",
    status: "low",
  },
  {
    id: 4,
    patientId: 2,
    name: "Metformina",
    dosage: "500mg",
    time: "08:30",
    period: "Manhã",
    instruction: "Tomar junto ao café da manhã",
    status: "confirmed",
    confirmedAt: "08:34",
  },
]

const initialHistory: DoseHistory[] = [
  {
    id: 1,
    medicationId: 1,
    patientId: 1,
    medicationName: "Losartana Potássica",
    dosage: "50mg",
    scheduledTime: "08:00",
    status: "pending",
    dateLabel: "Hoje",
  },
  {
    id: 2,
    medicationId: 2,
    patientId: 1,
    medicationName: "Omeprazol",
    dosage: "20mg",
    scheduledTime: "14:00",
    status: "pending",
    dateLabel: "Hoje",
  },
  {
    id: 3,
    medicationId: 3,
    patientId: 1,
    medicationName: "Sinvastatina",
    dosage: "20mg",
    scheduledTime: "20:00",
    status: "pending",
    dateLabel: "Hoje",
  },
]

function readStoredMedications() {
  try {
    const value = localStorage.getItem("dosa-medications")
    return value ? JSON.parse(value) as Medication[] : initialMedications
  } catch {
    return initialMedications
  }
}

function readStoredHistory() {
  try {
    const value = localStorage.getItem("dosa-history")
    return value ? JSON.parse(value) as DoseHistory[] : initialHistory
  } catch {
    return initialHistory
  }
}

export function MedicationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [medications, setMedications] = useState<Medication[]>(
    readStoredMedications,
  )
  const [history, setHistory] = useState<DoseHistory[]>(readStoredHistory)
  const [activePatientId, setActivePatientId] = useState(1)
  const [fontScale, setFontScale] = useState<FontScale>(
    () => localStorage.getItem("dosa-font-scale") as FontScale || "normal",
  )
  const [voiceAlerts, setVoiceAlerts] = useState(true)
  const [highContrast, setHighContrast] = useState(
    () => localStorage.getItem("dosa-high-contrast") === "true",
  )
  const [alarmVolume, setAlarmVolume] = useState<"medium" | "high">("high")
  const [userRole, setUserRoleState] = useState<UserRole>(
    () => localStorage.getItem("dosa-user-role") as UserRole,
  )
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>("landing")

  const activePatient =
    initialPatients.find((patient) => patient.id === activePatientId) ??
    initialPatients[0]
  const activeMedications = medications.filter(
    (medication) => medication.patientId === activePatientId,
  )
  const confirmedCount = activeMedications.filter(
    (medication) => medication.status === "confirmed",
  ).length
  const adherence = confirmedCount
    ? Math.min(100, activePatient.adherence + confirmedCount * 2)
    : activePatient.adherence

  useEffect(() => {
    localStorage.setItem("dosa-medications", JSON.stringify(medications))
    localStorage.setItem("dosa-history", JSON.stringify(history))
  }, [medications, history])

  useEffect(() => {
    localStorage.setItem("dosa-font-scale", fontScale)
    localStorage.setItem("dosa-high-contrast", String(highContrast))
    document.documentElement.dataset.fontScale = fontScale
    document.documentElement.classList.toggle("high-contrast", highContrast)
  }, [fontScale, highContrast])

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role)
    if (role) localStorage.setItem("dosa-user-role", role)
    else localStorage.removeItem("dosa-user-role")
  }

  const confirmDose = (medicationId = 1) => {
    const medication = medications.find((item) => item.id === medicationId)
    if (!medication || medication.status === "confirmed") return

    const takenAt = "08:05"
    setMedications((current) =>
      current.map((item) =>
        item.id === medicationId
          ? { ...item, status: "confirmed", confirmedAt: takenAt }
          : item,
      ),
    )
    setHistory((current) => [
      {
        id: Date.now(),
        medicationId,
        patientId: medication.patientId,
        medicationName: medication.name,
        dosage: medication.dosage,
        scheduledTime: medication.time,
        takenAt,
        status: "taken",
        dateLabel: "Hoje",
      },
      ...current.filter((item) => item.medicationId !== medicationId),
    ])

    if (voiceAlerts && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(
        new SpeechSynthesisUtterance(
          `Dose de ${medication.name} confirmada. Muito bem, Seu Antônio.`,
        ),
      )
    }
  }

  const addMedication = ({ name, dosage, time }: NewMedication) => {
    const hour = Number(time.split(":")[0])
    const period = hour < 12 ? "Manhã" : hour < 18 ? "Tarde" : "Noite"
    const id = Date.now()
    setMedications((current) => [
      ...current,
      {
        id,
        patientId: activePatientId,
        name,
        dosage,
        time,
        period,
        instruction: "Seguir orientação médica",
        status: "next",
      },
    ])
    setHistory((current) => [
      ...current,
      {
        id: id + 1,
        medicationId: id,
        patientId: activePatientId,
        medicationName: name,
        dosage,
        scheduledTime: time,
        status: "pending",
        dateLabel: "Hoje",
      },
    ])
  }

  const value = useMemo(
    () => ({
      patients: initialPatients,
      medications,
      history,
      activePatient,
      activePatientId,
      adherence,
      fontScale,
      voiceAlerts,
      highContrast,
      alarmVolume,
      userRole,
      activeScreen,
      setActivePatientId,
      confirmDose,
      postponeDose: () => window.alert("Dose adiada por 15 minutos."),
      addMedication,
      setFontScale,
      setVoiceAlerts,
      setHighContrast,
      setAlarmVolume,
      setUserRole,
      setActiveScreen,
    }),
    [
      medications,
      history,
      activePatient,
      activePatientId,
      adherence,
      fontScale,
      voiceAlerts,
      highContrast,
      alarmVolume,
      userRole,
      activeScreen,
    ],
  )

  return (
    <MedicationContext.Provider value={value}>
      {children}
    </MedicationContext.Provider>
  )
}

export function useMedication() {
  const context = useContext(MedicationContext)
  if (!context) {
    throw new Error(
      "useMedication deve ser usado dentro de MedicationProvider.",
    )
  }
  return context
}
