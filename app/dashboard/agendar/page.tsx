"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Calendar, 
  Clock, 
  Cloud, 
  CloudRain, 
  MapPin, 
  Phone, 
  Search, 
  Sun, 
  User,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface WeatherData {
  condition: "sunny" | "cloudy" | "rainy"
  temperature: number
  description: string
  humidity: number
}

interface PatientData {
  id: string
  name: string
  cpf: string
  phone: string
  email: string
}

const doctors = [
  { id: "1", name: "Dr. Carlos Mendes", specialty: "Clínico Geral" },
  { id: "2", name: "Dra. Patricia Lima", specialty: "Cardiologista" },
  { id: "3", name: "Dr. Roberto Souza", specialty: "Ortopedista" },
  { id: "4", name: "Dra. Fernanda Costa", specialty: "Dermatologista" },
]

const appointmentTypes = [
  { id: "consulta", name: "Consulta" },
  { id: "retorno", name: "Retorno" },
  { id: "exame", name: "Exame" },
  { id: "procedimento", name: "Procedimento" },
]

const availableTimes = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
]

// Simulated patient search
const searchPatient = (query: string): PatientData | null => {
  const patients: PatientData[] = [
    { id: "1", name: "João Silva", cpf: "123.456.789-00", phone: "(11) 99999-1234", email: "joao@email.com" },
    { id: "2", name: "Ana Costa", cpf: "987.654.321-00", phone: "(11) 98888-5678", email: "ana@email.com" },
    { id: "3", name: "Pedro Santos", cpf: "456.789.123-00", phone: "(11) 97777-9012", email: "pedro@email.com" },
  ]
  return patients.find(p => 
    p.cpf.replace(/\D/g, "").includes(query.replace(/\D/g, "")) ||
    p.name.toLowerCase().includes(query.toLowerCase())
  ) || null
}

// Simulated weather API
const getWeather = (date: string): WeatherData => {
  const conditions: WeatherData[] = [
    { condition: "sunny", temperature: 28, description: "Ensolarado", humidity: 45 },
    { condition: "cloudy", temperature: 24, description: "Parcialmente nublado", humidity: 60 },
    { condition: "rainy", temperature: 20, description: "Chuva prevista", humidity: 85 },
  ]
  // Simple simulation based on date
  const dayNum = parseInt(date.split("-")[2] || "1")
  return conditions[dayNum % 3]
}

export default function AgendarPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [patientSearch, setPatientSearch] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<PatientData | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    doctor: "",
    type: "",
    observations: ""
  })

  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [occupiedTimes, setOccupiedTimes] = useState<string[]>(["09:00", "10:30", "14:30"])

  const handlePatientSearch = async () => {
    if (!patientSearch.trim()) return
    
    setIsSearching(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const found = searchPatient(patientSearch)
    setSelectedPatient(found)
    setIsSearching(false)
  }

  const handleDateChange = (date: string) => {
    setFormData(prev => ({ ...prev, date, time: "" }))
    if (date) {
      const weatherData = getWeather(date)
      setWeather(weatherData)
      // Simulate different occupied times per date
      const dayNum = parseInt(date.split("-")[2] || "1")
      setOccupiedTimes(availableTimes.filter((_, i) => (i + dayNum) % 4 === 0))
    } else {
      setWeather(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Redirect to appointments list
    router.push("/dashboard/agendamentos")
  }

  const WeatherIcon = weather?.condition === "sunny" ? Sun : weather?.condition === "rainy" ? CloudRain : Cloud

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Novo Agendamento</h1>
        <p className="text-muted-foreground">Preencha os dados para agendar uma consulta</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Search */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Paciente</CardTitle>
            <CardDescription>Busque pelo CPF ou nome do paciente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Digite o CPF ou nome do paciente"
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                  className="pl-10 bg-background text-foreground"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handlePatientSearch())}
                />
              </div>
              <Button type="button" onClick={handlePatientSearch} disabled={isSearching}>
                {isSearching ? "Buscando..." : "Buscar"}
              </Button>
            </div>

            {selectedPatient && (
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="font-medium text-foreground">Paciente encontrado</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{selectedPatient.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">CPF:</span>
                    <span className="text-sm text-foreground">{selectedPatient.cpf}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{selectedPatient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Email:</span>
                    <span className="text-sm text-foreground">{selectedPatient.email}</span>
                  </div>
                </div>
              </div>
            )}

            {patientSearch && !selectedPatient && !isSearching && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <span className="text-sm text-foreground">Paciente não encontrado. Verifique os dados ou cadastre um novo paciente.</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Appointment Details */}
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Detalhes do Agendamento</CardTitle>
            <CardDescription>Selecione a data, horário e tipo de consulta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Doctor */}
              <div className="space-y-2">
                <Label className="text-foreground">Médico(a)</Label>
                <select
                  value={formData.doctor}
                  onChange={(e) => setFormData(prev => ({ ...prev, doctor: e.target.value }))}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
                  required
                >
                  <option value="">Selecione o médico</option>
                  {doctors.map(doc => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} - {doc.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Appointment Type */}
              <div className="space-y-2">
                <Label className="text-foreground">Tipo de Atendimento</Label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground"
                  required
                >
                  <option value="">Selecione o tipo</option>
                  {appointmentTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label className="text-foreground">Data</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="pl-10 bg-background text-foreground"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>

              {/* Weather Alert */}
              <div className="space-y-2">
                <Label className="text-foreground">Previsão do Tempo</Label>
                {weather ? (
                  <div className={`flex items-center gap-3 p-3 rounded-lg border ${
                    weather.condition === "rainy" 
                      ? "bg-chart-4/10 border-chart-4/30" 
                      : weather.condition === "sunny"
                      ? "bg-accent/10 border-accent/30"
                      : "bg-muted border-border"
                  }`}>
                    <WeatherIcon className={`w-8 h-8 ${
                      weather.condition === "rainy" 
                        ? "text-chart-4" 
                        : weather.condition === "sunny"
                        ? "text-chart-4"
                        : "text-muted-foreground"
                    }`} />
                    <div>
                      <p className="font-medium text-foreground">{weather.temperature}°C - {weather.description}</p>
                      <p className="text-xs text-muted-foreground">Umidade: {weather.humidity}%</p>
                    </div>
                    {weather.condition === "rainy" && (
                      <div className="ml-auto">
                        <AlertTriangle className="w-5 h-5 text-chart-4" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted border border-border">
                    <Cloud className="w-8 h-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Selecione uma data para ver a previsão</p>
                  </div>
                )}
              </div>
            </div>

            {/* Time Selection */}
            {formData.date && (
              <div className="space-y-3">
                <Label className="text-foreground">Horário Disponível</Label>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {availableTimes.map(time => {
                    const isOccupied = occupiedTimes.includes(time)
                    const isSelected = formData.time === time
                    
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => !isOccupied && setFormData(prev => ({ ...prev, time }))}
                        disabled={isOccupied}
                        className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                          isOccupied
                            ? "bg-muted text-muted-foreground cursor-not-allowed line-through"
                            : isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border border-border text-foreground hover:bg-accent/10 hover:border-accent"
                        }`}
                      >
                        <Clock className="w-3 h-3 mx-auto mb-1" />
                        {time}
                      </button>
                    )
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  Horários riscados já estão ocupados
                </p>
              </div>
            )}

            {/* Observations */}
            <div className="space-y-2">
              <Label htmlFor="observations" className="text-foreground">Observações (opcional)</Label>
              <textarea
                id="observations"
                value={formData.observations}
                onChange={(e) => setFormData(prev => ({ ...prev, observations: e.target.value }))}
                className="w-full min-h-[100px] p-3 rounded-md border border-input bg-background text-foreground resize-none"
                placeholder="Adicione observações sobre o agendamento..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Weather Warning */}
        {weather?.condition === "rainy" && (
          <Card className="border border-chart-4/30 bg-chart-4/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <CloudRain className="w-6 h-6 text-chart-4 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Alerta de Chuva</p>
                  <p className="text-sm text-muted-foreground">
                    Há previsão de chuva para o dia selecionado. Recomendamos informar o paciente para que se prepare adequadamente.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="button" variant="outline" className="flex-1" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            className="flex-1" 
            disabled={isLoading || !selectedPatient || !formData.time}
          >
            {isLoading ? "Agendando..." : "Confirmar Agendamento"}
          </Button>
        </div>
      </form>
    </div>
  )
}
