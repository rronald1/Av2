"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  User,
  X
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type AppointmentStatus = "confirmado" | "pendente" | "cancelado" | "realizado"

interface Appointment {
  id: string
  patient: string
  patientPhone: string
  doctor: string
  specialty: string
  date: string
  time: string
  type: string
  status: AppointmentStatus
}

const appointments: Appointment[] = [
  { id: "1", patient: "Ronald Macedo", patientPhone: "(21) 9999-1234", doctor: "Dr. Carlos Mendes", specialty: "Clínico Geral", date: "2026-03-20", time: "08:00", type: "Consulta", status: "confirmado" },
  { id: "2", patient: "Murilo Macedo", patientPhone: "(21) 98888-5678", doctor: "Dra. Patricia Lima", specialty: "Cardiologista", date: "2026-03-20", time: "09:00", type: "Retorno", status: "confirmado" },
  { id: "3", patient: "Max Verstappen", patientPhone: "(21) 97777-9012", doctor: "Dr. Carlos Mendes", specialty: "Clínico Geral", date: "2026-03-20", time: "10:30", type: "Consulta", status: "pendente" },
  { id: "4", patient: "Neymar Jr", patientPhone: "(21) 96666-3456", doctor: "Dra. Patricia Lima", specialty: "Cardiologista", date: "2026-03-20", time: "11:00", type: "Exame", status: "confirmado" },
  { id: "5", patient: "Rayan Vitor", patientPhone: "(21) 95555-7890", doctor: "Dr. Carlos Mendes", specialty: "Clínico Geral", date: "2026-03-20", time: "14:00", type: "Consulta", status: "pendente" },
  { id: "6", patient: "Fernanda Souza", patientPhone: "(21) 94444-1234", doctor: "Dr. Roberto Souza", specialty: "Ortopedista", date: "2026-03-21", time: "08:30", type: "Consulta", status: "confirmado" },
  { id: "7", patient: "Roberto Almeida", patientPhone: "(21) 93333-5678", doctor: "Dra. Fernanda Costa", specialty: "Dermatologista", date: "2026-03-21", time: "09:30", type: "Procedimento", status: "pendente" },
  { id: "8", patient: "Juliana Lima", patientPhone: "(21) 92222-9012", doctor: "Dr. Carlos Mendes", specialty: "Clínico Geral", date: "2026-03-21", time: "10:00", type: "Retorno", status: "confirmado" },
  { id: "9", patient: "Marcos Pereira", patientPhone: "(21) 91111-3456", doctor: "Dra. Patricia Lima", specialty: "Cardiologista", date: "2026-03-19", time: "15:00", type: "Consulta", status: "realizado" },
  { id: "10", patient: "Carolina Dias", patientPhone: "(21) 90000-7890", doctor: "Dr. Roberto Souza", specialty: "Ortopedista", date: "2026-03-19", time: "16:00", type: "Exame", status: "cancelado" },
]

const statusConfig = {
  confirmado: { label: "Confirmado", color: "bg-accent/10 text-accent border-accent/20" },
  pendente: { label: "Pendente", color: "bg-chart-4/10 text-chart-4 border-chart-4/20" },
  cancelado: { label: "Cancelado", color: "bg-destructive/10 text-destructive border-destructive/20" },
  realizado: { label: "Realizado", color: "bg-chart-1/10 text-chart-1 border-chart-1/20" },
}

export default function AgendamentosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "all">("all")
  const [dateFilter, setDateFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter
    const matchesDate = !dateFilter || apt.date === dateFilter
    return matchesSearch && matchesStatus && matchesDate
  })

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00")
    return date.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" })
  }

  const updateStatus = (id: string, newStatus: AppointmentStatus) => {
    // In production, this would update the backend
    console.log(`Updating appointment ${id} to ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agendamentos</h1>
          <p className="text-muted-foreground">Gerencie todas as consultas agendadas</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/agendar">
            <Plus className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card className="border border-border">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por paciente ou médico..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background text-foreground"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as AppointmentStatus | "all")}
                className="h-10 px-3 rounded-md border border-input bg-background text-foreground"
              >
                <option value="all">Todos os status</option>
                <option value="confirmado">Confirmado</option>
                <option value="pendente">Pendente</option>
                <option value="realizado">Realizado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-10 bg-background text-foreground w-full md:w-auto"
              />
            </div>

            {(searchTerm || statusFilter !== "all" || dateFilter) && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setDateFilter("")
                }}
              >
                <X className="w-4 h-4 mr-1" />
                Limpar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{appointments.filter(a => a.status === "confirmado").length}</p>
            <p className="text-xs text-muted-foreground">Confirmados</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{appointments.filter(a => a.status === "pendente").length}</p>
            <p className="text-xs text-muted-foreground">Pendentes</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{appointments.filter(a => a.status === "realizado").length}</p>
            <p className="text-xs text-muted-foreground">Realizados</p>
          </CardContent>
        </Card>
        <Card className="border border-border">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{appointments.filter(a => a.status === "cancelado").length}</p>
            <p className="text-xs text-muted-foreground">Cancelados</p>
          </CardContent>
        </Card>
      </div>

      {/* Appointments List */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Lista de Agendamentos</CardTitle>
          <CardDescription>
            {filteredAppointments.length} agendamento(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {paginatedAppointments.length > 0 ? (
            <div className="space-y-4">
              {paginatedAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-muted/30 border border-border gap-4"
                >
                  <div className="flex items-start md:items-center gap-4 flex-1">
                    {/* Date/Time */}
                    <div className="flex flex-col items-center justify-center min-w-[80px] p-3 bg-card rounded-lg border border-border">
                      <span className="text-xs text-muted-foreground uppercase">{formatDate(appointment.date)}</span>
                      <span className="text-lg font-bold text-foreground flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {appointment.time}
                      </span>
                    </div>

                    {/* Patient & Doctor Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{appointment.patient}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusConfig[appointment.status].color}`}>
                          {statusConfig[appointment.status].label}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {appointment.doctor} - {appointment.specialty}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {appointment.patientPhone}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    {appointment.status === "pendente" && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-accent border-accent hover:bg-accent/10"
                          onClick={() => updateStatus(appointment.id, "confirmado")}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Confirmar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-destructive border-destructive hover:bg-destructive/10"
                          onClick={() => updateStatus(appointment.id, "cancelado")}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Cancelar
                        </Button>
                      </>
                    )}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Enviar lembrete</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {appointment.status !== "realizado" && (
                          <DropdownMenuItem onClick={() => updateStatus(appointment.id, "realizado")}>
                            Marcar como realizado
                          </DropdownMenuItem>
                        )}
                        {appointment.status !== "cancelado" && (
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => updateStatus(appointment.id, "cancelado")}
                          >
                            Cancelar agendamento
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredAppointments.length)} de {filteredAppointments.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum agendamento encontrado</p>
              <Button asChild className="mt-4">
                <Link href="/dashboard/agendar">Criar novo agendamento</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
