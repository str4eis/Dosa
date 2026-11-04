import { Clock3, History, Settings } from "lucide-react"
import { NavLink } from "react-router-dom"

const items = [
  { to: "/paciente/home", label: "Dose Agora", icon: Clock3 },
  { to: "/paciente/historico", label: "Histórico", icon: History },
  { to: "/paciente/ajustes", label: "Ajustes", icon: Settings },
]

export default function PatientNavigation() {
  return (
    <nav className="bottom-nav patient-nav" aria-label="Navegação do paciente">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={label}
          to={to}
          className={({ isActive }) => (isActive ? "active" : "")}
          aria-label={label}
        >
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
