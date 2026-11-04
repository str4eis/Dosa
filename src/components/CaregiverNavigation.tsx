import { CalendarDays, LayoutDashboard, Settings, Users } from "lucide-react"
import { NavLink } from "react-router-dom"

const items = [
  {
    to: "/cuidador/dashboard",
    label: "Visão Geral",
    icon: LayoutDashboard,
  },
  { to: "/cuidador/pacientes", label: "Meus Pacientes", icon: Users },
  { to: "/cuidador/agenda", label: "Agenda", icon: CalendarDays },
  { to: "/cuidador/ajustes", label: "Ajustes", icon: Settings },
]

export default function CaregiverNavigation() {
  return (
    <nav
      className="bottom-nav caregiver-nav"
      aria-label="Navegação do cuidador"
    >
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          to={to}
          className={({ isActive }) => (isActive ? "active" : "")}
          key={label}
          aria-label={label}
        >
          <Icon aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
