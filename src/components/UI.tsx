import { ArrowRight, Check, type LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      to="/"
      className={`logo ${inverse ? "text-white" : "text-brand"}`}
      aria-label="DOSA, página inicial"
    >
      <span className="logo-mark" aria-hidden="true">
        ✚
      </span>
      <span>DOSA</span>
    </Link>
  )
}

export function Button({
  children,
  to,
  onClick,
  variant = "primary",
  className = "",
  ariaLabel,
  type = "button",
}: {
  children: React.ReactNode
  to?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "danger" | "ghost"
  className?: string
  ariaLabel: string
  type?: "button" | "submit"
}) {
  const styles = `btn btn-${variant} ${className}`
  if (to) {
    return (
      <Link to={to} className={styles} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export function Card({
  children,
  className = "",
  accent,
}: {
  children: React.ReactNode
  className?: string
  accent?: "brand" | "success" | "danger" | "warning"
}) {
  return (
    <section
      className={`card ${accent ? `card-accent-${accent}` : ""} ${className}`}
    >
      {children}
    </section>
  )
}

export function StatusBadge({
  status,
  children,
}: {
  status: "success" | "warning" | "danger" | "info"
  children: React.ReactNode
}) {
  return <span className={`badge badge-${status}`}>{children}</span>
}

export function IconTile({
  icon: Icon,
  tone = "blue",
}: {
  icon: LucideIcon
  tone?: "blue" | "mint" | "red"
}) {
  return (
    <span className={`icon-tile icon-tile-${tone}`} aria-hidden="true">
      <Icon />
    </span>
  )
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  centered = true,
}: {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
}) {
  return (
    <div
      className={centered ? "section-heading text-center" : "section-heading"}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

export function ArrowCta({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ArrowRight aria-hidden="true" />
    </>
  )
}

export function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="check-item">
      <Check aria-hidden="true" />
      <span>{children}</span>
    </li>
  )
}
