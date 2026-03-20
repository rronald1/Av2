"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Activity, Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState<"paciente" | "secretario">("paciente")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulação de login - Em produção, conectar ao backend
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Redireciona para o dashboard após login
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
              <Activity className="w-8 h-8" />
            </div>
            <span className="text-3xl font-bold">MedClin</span>
          </div>
          <h1 className="text-4xl font-bold text-center mb-4 text-balance">
            Sistema de Atendimento Inteligente
          </h1>
          <p className="text-lg text-center text-primary-foreground/80 max-w-md text-pretty">
            Gerencie agendamentos, consultas e pacientes de forma simples e eficiente.
          </p>
          <div className="mt-12 grid grid-cols-2 gap-6 text-center">
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <div className="text-3xl font-bold">+2.500</div>
              <div className="text-sm text-primary-foreground/70">Pacientes atendidos</div>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm text-primary-foreground/70">Satisfação</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-4 lg:hidden">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MedClin</span>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Bem-vindo de volta</CardTitle>
            <CardDescription className="text-muted-foreground">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Seletor de tipo de usuário */}
              <div className="flex rounded-lg bg-muted p-1">
                <button
                  type="button"
                  onClick={() => setUserType("paciente")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    userType === "paciente"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Paciente
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("secretario")}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    userType === "secretario"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Secretário(a)
                </button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-background text-foreground"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-background text-foreground"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-input" />
                  <span className="text-muted-foreground">Lembrar-me</span>
                </label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Esqueceu a senha?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-primary font-medium hover:underline">
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
