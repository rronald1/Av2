# MedClin - Sistema de Atendimento para Clinicas Medicas

Prototipo visual de sistema de agendamento de consultas medicas desenvolvido com Next.js.

## Requisitos

- Node.js 18.x ou superior
- npm, yarn ou pnpm

## Instalacao

1. Clone o repositorio:
```bash
git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
cd SEU_REPOSITORIO
```

2. Instale as dependencias:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. Abra o navegador em [http://localhost:3000](http://localhost:3000)

## Paginas Disponiveis

| Rota | Descricao |
|------|-----------|
| `/` | Pagina de Login |
| `/cadastro` | Cadastro de novo usuario com integracao ViaCEP |
| `/dashboard` | Painel administrativo com estatisticas |
| `/dashboard/agendar` | Formulario de novo agendamento |
| `/dashboard/agendamentos` | Lista de agendamentos com filtros |

## Credenciais de Teste

Para acessar o dashboard, use qualquer email/senha na tela de login (prototipo visual).

## Estrutura do Projeto

```
app/
  page.tsx              # Pagina de Login
  cadastro/
    page.tsx            # Pagina de Cadastro
  dashboard/
    layout.tsx          # Layout com sidebar
    page.tsx            # Dashboard principal
    agendar/
      page.tsx          # Formulario de agendamento
    agendamentos/
      page.tsx          # Lista de agendamentos
components/
  sidebar.tsx           # Componente de navegacao lateral
  ui/                   # Componentes shadcn/ui
```

## Tecnologias Utilizadas

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide Icons

## Integracoes Simuladas

- **ViaCEP**: Busca de endereco por CEP (funcional no cadastro)
- **OpenWeatherMap**: Previsao do tempo (simulada com dados estaticos)

## Observacoes

Este e um **prototipo visual** para validacao de design e fluxos. Para uso em producao, sera necessario:

1. Implementar backend com Node.js + Express ou similar
2. Configurar banco de dados MariaDB
3. Adicionar autenticacao real
4. Integrar API OpenWeatherMap com chave valida

## Build para Producao

```bash
npm run build
npm start
```

## Deploy

O projeto esta preparado para deploy na Vercel. Basta conectar o repositorio GitHub na plataforma.
