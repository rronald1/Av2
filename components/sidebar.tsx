"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Activity, 
  Calendar, 
  ClipboardList, 
  Home, 
  LogOut, 
  Settings, 
  User, 
  Users 
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Calendar, label: "Novo Agendamento", href: "/dashboard/agendar" },
  { icon: ClipboardList, label: "Agendamentos", href: "/dashboard/agendamentos" },
  { icon: Users, label: "Pacientes", href: "/dashboard/pacientes" },
  { icon: User, label: "Meu Perfil", href: "/dashboard/perfil" },
  { icon: Settings, label: "Configurações", href: "/dashboard/configuracoes" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
          <div className="w-10 h-10 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">MedClin</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User info */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-sidebar-accent rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-sidebar-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Maria Santos</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Secretária</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Link>
        </div>
      </div>
    </aside>
  )
}
