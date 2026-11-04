import { useEffect } from "react"
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom"
import {
  ActiveScreen,
  MedicationProvider,
  useMedication,
} from "./context/MedicationContext"
import CaregiverAgenda from "./pages/CaregiverAgenda"
import CaregiverDashboard from "./pages/CaregiverDashboard"
import CaregiverPatients from "./pages/CaregiverPatients"
import CaregiverSettings from "./pages/CaregiverSettings"
import LandingPage from "./pages/LandingPage"
import LoginPage from "./pages/LoginPage"
import PatientHistory from "./pages/PatientHistory"
import PatientHome from "./pages/PatientHome"
import PatientSettings from "./pages/PatientSettings"
import SignupPage from "./pages/SignupPage"

function ScreenStateSync() {
  const { pathname } = useLocation()
  const { setActiveScreen } = useMedication()

  useEffect(() => {
    let screen: ActiveScreen = "landing"
    if (pathname === "/login") screen = "login"
    else if (pathname === "/cadastro") screen = "cadastro"
    else if (pathname.startsWith("/paciente")) screen = "paciente"
    else if (pathname.startsWith("/cuidador")) screen = "cuidador"
    setActiveScreen(screen)
  }, [pathname, setActiveScreen])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <MedicationProvider>
        <ScreenStateSync />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<SignupPage />} />
          <Route path="/cuidador/dashboard" element={<CaregiverDashboard />} />
          <Route path="/cuidador/pacientes" element={<CaregiverPatients />} />
          <Route path="/cuidador/agenda" element={<CaregiverAgenda />} />
          <Route path="/cuidador/ajustes" element={<CaregiverSettings />} />
          <Route path="/paciente/home" element={<PatientHome />} />
          <Route path="/paciente/historico" element={<PatientHistory />} />
          <Route path="/paciente/ajustes" element={<PatientSettings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MedicationProvider>
    </BrowserRouter>
  )
}
