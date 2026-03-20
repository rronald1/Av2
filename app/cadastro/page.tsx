"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Activity, Eye, EyeOff, Lock, Mail, MapPin, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddressData {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
}

export default function CadastroPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCep, setIsLoadingCep] = useState(false)
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    cep: "",
    endereco: "",
    bairro: "",
    cidade: "",
    estado: "",
    password: "",
    confirmPassword: "",
    userType: "paciente" as "paciente" | "secretario"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const buscarCep = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "")
    if (cleanCep.length !== 8) return

    setIsLoadingCep(true)
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data: AddressData = await response.json()
      
      if (data.logradouro) {
        setFormData(prev => ({
          ...prev,
          endereco: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        }))
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
    } finally {
      setIsLoadingCep(false)
    }
  }

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, cep: value }))
    
    if (value.replace(/\D/g, "").length === 8) {
      buscarCep(value)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulação de cadastro - Em produção, conectar ao backend
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Branding */}
      <div className="hidden lg:flex lg:w-2/5 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
              <Activity className="w-8 h-8" />
            </div>
            <span className="text-3xl font-bold">MedClin</span>
          </div>
          <h1 className="text-3xl font-bold text-center mb-4 text-balance">
            Cadastre-se e comece a agendar suas consultas
          </h1>
          <p className="text-lg text-center text-primary-foreground/80 max-w-md text-pretty">
            Processo simples e rápido. Em poucos minutos você terá acesso ao sistema.
          </p>
          
          <div className="mt-12 space-y-4 w-full max-w-xs">
            <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <span className="text-sm">Preencha seus dados pessoais</span>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <span className="text-sm">Informe o CEP para autocompletar</span>
            </div>
            <div className="flex items-center gap-3 bg-primary-foreground/10 rounded-lg p-4">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <span className="text-sm">Crie sua senha e acesse</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-8 bg-background overflow-y-auto">
        <Card className="w-full max-w-2xl border-0 shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex items-center justify-center gap-2 mb-4 lg:hidden">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">MedClin</span>
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Criar nova conta</CardTitle>
            <CardDescription className="text-muted-foreground">
              Preencha os dados abaixo para se cadastrar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Seletor de tipo de usuário */}
              <div className="flex rounded-lg bg-muted p-1">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userType: "paciente" }))}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    formData.userType === "paciente"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Paciente
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, userType: "secretario" }))}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    formData.userType === "secretario"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Secretário(a)
                </button>
              </div>

              {/* Dados pessoais */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Dados Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome" className="text-foreground">Nome completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="nome"
                        name="nome"
                        placeholder="Seu nome"
                        value={formData.nome}
                        onChange={handleChange}
                        className="pl-10 bg-background text-foreground"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 bg-background text-foreground"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone" className="text-foreground">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="telefone"
                        name="telefone"
                        placeholder="(00) 00000-0000"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="pl-10 bg-background text-foreground"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf" className="text-foreground">CPF</Label>
                    <Input
                      id="cpf"
                      name="cpf"
                      placeholder="000.000.000-00"
                      value={formData.cpf}
                      onChange={handleChange}
                      className="bg-background text-foreground"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep" className="text-foreground">CEP</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="cep"
                        name="cep"
                        placeholder="00000-000"
                        value={formData.cep}
                        onChange={handleCepChange}
                        className="pl-10 bg-background text-foreground"
                        required
                      />
                      {isLoadingCep && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="endereco" className="text-foreground">Endereço</Label>
                    <Input
                      id="endereco"
                      name="endereco"
                      placeholder="Rua, Avenida..."
                      value={formData.endereco}
                      onChange={handleChange}
                      className="bg-background text-foreground"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bairro" className="text-foreground">Bairro</Label>
                    <Input
                      id="bairro"
                      name="bairro"
                      placeholder="Bairro"
                      value={formData.bairro}
                      onChange={handleChange}
                      className="bg-background text-foreground"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade" className="text-foreground">Cidade</Label>
                    <Input
                      id="cidade"
                      name="cidade"
                      placeholder="Cidade"
                      value={formData.cidade}
                      onChange={handleChange}
                      className="bg-background text-foreground"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado" className="text-foreground">Estado</Label>
                    <Input
                      id="estado"
                      name="estado"
                      placeholder="UF"
                      value={formData.estado}
                      onChange={handleChange}
                      className="bg-background text-foreground"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-foreground border-b border-border pb-2">Segurança</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Crie uma senha"
                        value={formData.password}
                        onChange={handleChange}
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
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-foreground">Confirmar senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirme a senha"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-10 bg-background text-foreground"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="termos" className="mt-1 rounded border-input" required />
                <label htmlFor="termos" className="text-sm text-muted-foreground">
                  Li e aceito os{" "}
                  <Link href="#" className="text-primary hover:underline">Termos de Uso</Link>
                  {" "}e a{" "}
                  <Link href="#" className="text-primary hover:underline">Política de Privacidade</Link>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Cadastrando..." : "Criar conta"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/" className="text-primary font-medium hover:underline">
                Fazer login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
