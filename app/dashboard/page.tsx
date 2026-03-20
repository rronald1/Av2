"use client"

import { 
  Calendar, 
  CalendarCheck, 
  CalendarX, 
  Clock, 
  TrendingUp, 
  Users 
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const stats = [
  {
    title: "Total de Pacientes",
    value: "248",
    change: "+12%",
    icon: Users,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10"
  },
  {
    title: "Consultas Hoje",
    value: "18",
    change: "+4",
    icon: Calendar,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10"
  },
  {
    title: "Confirmadas",
    value: "156",
    change: "+23%",
    icon: CalendarCheck,
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    title: "Canceladas",
    value: "12",
    change: "-8%",
    icon: CalendarX,
    color: "text-destructive",
    bgColor: "bg-destructive/10"
  },
]

const todayAppointments = [
  { id: 1, patient: "João Silva", time: "08:00", doctor: "Dr. Carlos Mendes", type: "Consulta", status: "confirmado" },
  { id: 2, patient: "Ana Costa", time: "09:00", doctor: "Dra. Patricia Lima", type: "Retorno", status: "confirmado" },
  { id: 3, patient: "Pedro Santos", time: "10:30", doctor: "Dr. Carlos Mendes", type: "Consulta", status: "pendente" },
  { id: 4, patient: "Maria Oliveira", time: "11:00", doctor: "Dra. Patricia Lima", type: "Exame", status: "confirmado" },
  { id: 5, patient: "Lucas Ferreira", time: "14:00", doctor: "Dr. Carlos Mendes", type: "Consulta", status: "pendente" },
]

const recentPatients = [
  { id: 1, name: "Fernanda Souza", lastVisit: "15/03/2026", phone: "(11) 99999-1234" },
  { id: 2, name: "Roberto Almeida", lastVisit: "14/03/2026", phone: "(11) 98888-5678" },
  { id: 3, name: "Juliana Lima", lastVisit: "13/03/2026", phone: "(11) 97777-9012" },
  { id: 4, name: "Marcos Pereira", lastVisit: "12/03/2026", phone: "(11) 96666-3456" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Bem-vindo(a) de volta! Aqui está o resumo de hoje.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/agendar">
            <Calendar className="w-4 h-4 mr-2" />
            Novo Agendamento
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-3 h-3 text-accent" />
                    <span className="text-xs text-accent">{stat.change} este mês</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <Card className="lg:col-span-2 border border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Agendamentos de Hoje</CardTitle>
              <CardDescription>20 de março de 2026</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/agendamentos">Ver todos</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 min-w-[80px]">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{appointment.time}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">{appointment.doctor} - {appointment.type}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === "confirmado"
                        ? "bg-accent/10 text-accent"
                        : "bg-chart-4/10 text-chart-4"
                    }`}
                  >
                    {appointment.status === "confirmado" ? "Confirmado" : "Pendente"}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Pacientes Recentes</CardTitle>
            <CardDescription>Últimas consultas realizadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">
                      {patient.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.phone}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {patient.lastVisit}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4" asChild>
              <Link href="/dashboard/pacientes">Ver todos os pacientes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
