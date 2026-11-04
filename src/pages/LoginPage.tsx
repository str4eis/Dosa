import { LockKeyhole, LogIn, Mail, ShieldCheck, UserRound } from "lucide-react"
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Card, Logo } from "../components/UI"
import { useMedication, UserRole } from "../context/MedicationContext"

export default function LoginPage() {
  const [role, setRole] = useState<Exclude<UserRole, null>>("paciente")
  const { setUserRole, setActiveScreen } = useMedication()
  const navigate = useNavigate()

  const submit = (event: FormEvent) => {
    event.preventDefault()
    setUserRole(role)
    setActiveScreen(role)
    navigate(role === "paciente" ? "/paciente/home" : "/cuidador/dashboard")
  }

  return (
    <div className="auth-page login-page">
      <header className="simple-header">
        <Logo />
        <span className="secure-pill">
          <ShieldCheck /> Ambiente de demonstração
        </span>
      </header>
      <main className="login-main">
        <div className="section-heading text-center">
          <span className="eyebrow">
            <LockKeyhole /> Acesso DOSA
          </span>
          <h1>Entre no perfil de demonstração</h1>
          <p>
            Escolha a experiência que deseja testar. Nenhuma credencial real é
            necessária.
          </p>
        </div>
        <Card className="login-card">
          <form onSubmit={submit}>
            <label>
              Perfil de acesso
              <select
                value={role}
                onChange={(event) =>
                  setRole(event.target.value as Exclude<UserRole, null>)
                }
                aria-label="Selecionar perfil de demonstração"
              >
                <option value="paciente">
                  Paciente: Sr. Antônio Silva (Modo Acessível / Botões Gigantes)
                </option>
                <option value="cuidador">
                  Cuidador: Maria Luíza (Dashboard Clínico / Gestão de Doses)
                </option>
              </select>
            </label>
            <label>
              E-mail de demonstração
              <span className="input-with-icon">
                <Mail aria-hidden="true" />
                <input
                  type="email"
                  defaultValue="demo@dosa.app"
                  aria-label="E-mail de demonstração"
                />
              </span>
            </label>
            <label>
              Senha
              <span className="input-with-icon">
                <LockKeyhole aria-hidden="true" />
                <input
                  type="password"
                  defaultValue="dosa-demo"
                  aria-label="Senha de demonstração"
                />
              </span>
            </label>
            <div className="selected-login-profile" role="status">
              <UserRound />
              <div>
                <span>Você entrará como</span>
                <strong>
                  {role === "paciente"
                    ? "Sr. Antônio Silva"
                    : "Maria Luíza — Cuidadora"}
                </strong>
              </div>
            </div>
            <Button type="submit" ariaLabel="Entrar no perfil selecionado">
              <LogIn /> Entrar
            </Button>
          </form>
        </Card>
      </main>
    </div>
  )
}
