import {
  ArrowRight,
  Check,
  HeartHandshake,
  LockKeyhole,
  UserRound,
} from "lucide-react"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Button, IconTile, Logo } from "../components/UI"
import { useMedication } from "../context/MedicationContext"

export default function SignupPage() {
  const [searchParams] = useSearchParams()
  const requestedProfile = searchParams.get("perfil")
  const [profile, setProfile] = useState<"patient" | "caregiver">(
    requestedProfile === "caregiver" ? "caregiver" : "patient",
  )
  const { setUserRole, setActiveScreen } = useMedication()
  const navigate = useNavigate()

  const continueToApp = () => {
    const patient = profile === "patient"
    setUserRole(patient ? "paciente" : "cuidador")
    setActiveScreen(patient ? "paciente" : "cuidador")
    navigate(patient ? "/paciente/home" : "/cuidador/dashboard")
  }

  return (
    <div className="auth-page">
      <header className="simple-header">
        <Logo />
        <span className="secure-pill">
          <LockKeyhole /> Acesso seguro
        </span>
      </header>
      <main className="auth-main">
        <div className="section-heading text-center">
          <span className="eyebrow">Cadastro rápido</span>
          <h1>Como você deseja utilizar a DOSA hoje?</h1>
          <p>
            Escolha o perfil para adaptar o tamanho dos botões, a navegação e os
            alertas.
          </p>
        </div>

        <div
          className="profile-grid"
          role="radiogroup"
          aria-label="Escolha seu perfil"
        >
          <button
            type="button"
            className={`profile-card ${
              profile === "patient" ? "selected" : ""
            }`}
            onClick={() => setProfile("patient")}
            role="radio"
            aria-checked={profile === "patient"}
            aria-label="Sou paciente"
          >
            <IconTile icon={UserRound} />
            <div>
              <h2>Sou Paciente</h2>
              <p>
                Quero ver meus remédios com botões grandes e confirmar minhas
                doses sem complicação.
              </p>
              <strong>Modo acessível e simplificado</strong>
            </div>
            {profile === "patient" && <Check aria-hidden="true" />}
          </button>
          <button
            type="button"
            className={`profile-card caregiver ${
              profile === "caregiver" ? "selected" : ""
            }`}
            onClick={() => setProfile("caregiver")}
            role="radio"
            aria-checked={profile === "caregiver"}
            aria-label="Sou cuidador ou familiar"
          >
            <IconTile icon={HeartHandshake} tone="mint" />
            <div>
              <h2>Sou Cuidador ou Familiar</h2>
              <p>
                Quero gerenciar medicamentos, horários, pacientes e alertas de
                dose.
              </p>
              <strong>Dashboard clínico e relatórios</strong>
            </div>
            {profile === "caregiver" && <Check aria-hidden="true" />}
          </button>
        </div>

        <div className="signup-continue">
          <p>
            Perfil selecionado:{" "}
            <strong>
              {profile === "patient" ? "Paciente" : "Cuidador ou familiar"}
            </strong>
          </p>
          <Button
            onClick={continueToApp}
            ariaLabel={`Continuar como ${
              profile === "patient" ? "paciente" : "cuidador"
            }`}
          >
            Continuar <ArrowRight />
          </Button>
        </div>
        <p className="auth-login">
          Já tem uma conta?{" "}
          <button
            type="button"
            aria-label="Ir para a tela de login"
            onClick={() => navigate("/login")}
          >
            Entrar agora
          </button>
        </p>
      </main>
    </div>
  )
}
