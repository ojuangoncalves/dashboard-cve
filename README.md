# Monitoramento CVE

Dashboard web para monitoramento em tempo real das estações de recarga de veículos elétricos (CVE) do Balneário Shopping, construído com Next.js.

A aplicação exibe o status de cada ponto de recarga (disponível, em uso, offline, em manutenção), agrega esses dados por unidade ("tenant") e mostra um painel de notificações de conexão/desconexão das estações, tudo atualizado automaticamente a cada 60 segundos.

## Funcionalidades

- **Login** com e-mail e senha, autenticado contra uma API externa; a sessão é mantida em um cookie `httpOnly` válido por 7 dias.
- **Proteção de rotas**: usuários não autenticados são redirecionados para `/login` ao tentar acessar páginas protegidas.
- **Página inicial**: contadores agregados de estações por status (Disponível, Ocupado, Offline, Manutenção) e um carrossel com rolagem automática exibindo um card por tenant.
- **Painel por tenant** (`/[tenant]`): grade com o status de cada conector de recarga, identificado por cor/ícone.
- **Notificações em tempo real**: lista de eventos de conexão e desconexão das estações, com horário ajustado para o fuso local.
- **Atualização automática dos dados** a cada 60 segundos via SWR, com revalidação ao focar a aba.

## Tecnologias

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19 + TypeScript
- [Tailwind CSS 4](https://tailwindcss.com) com componentes [shadcn/ui](https://ui.shadcn.com) (estilo `new-york`)
- [SWR](https://swr.vercel.app) para busca de dados e polling
- [Axios](https://axios-http.com) para chamadas à API
- [Embla Carousel](https://www.embla-carousel.com) (com plugin de auto-scroll) para o carrossel de tenants
- [React Icons](https://react-icons.github.io/react-icons) (conjunto Phosphor)
- Prisma está listado como dependência, mas o client correspondente está comentado no código e não é utilizado nesta versão.

## Estrutura de pastas

```
src/
├── actions/          # Server Actions (ex.: login)
├── app/
│   ├── [tenant]/      # Dashboard de um tenant específico
│   ├── login/         # Tela de login
│   └── page.tsx       # Página inicial (visão geral)
├── components/        # Componentes de UI (Dashboard, Header, Notifications, etc.)
│   └── ui/             # Componentes shadcn/ui (button, input, carousel)
├── lib/               # Utilitários genéricos (cn/utils do shadcn)
├── services/          # Chamadas à API de autenticação e obtenção de token
├── types/              # Tipagens do domínio (ChargePoint, Connector, Tenant, etc.)
├── utils/              # Funções de acesso à API (chargepoints, notificações, headers)
└── proxy.ts            # Middleware de proteção de rotas
```

## Pré-requisitos

- Node.js compatível com Next.js 16 (recomendado 18+)
- Acesso a uma API backend compatível com os endpoints consumidos pela aplicação (login, chargepoints e notificações)

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
NEXT_PUBLIC_BASE_URL=       # URL base da API (ex.: https://api.exemplo.com)
NEXT_PUBLIC_API_KEY=        # Chave usada no header Api-Key da chamada de login
```

`NEXT_PUBLIC_BASE_URL` é usada para montar as chamadas a `/api/v1/login`, `/api/v1/chargepoints` e `/api/v1/notification/chargeBox`. O token retornado no login é salvo em cookie e reenviado como `Authorization` nas demais requisições.

## Instalação

```bash
git clone <url-do-repositorio>
cd dashboard-cve
npm install
```

## Executando em desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts disponíveis

| Script          | Descrição                              |
|-----------------|-----------------------------------------|
| `npm run dev`   | Inicia o servidor de desenvolvimento (Turbopack) |
| `npm run build` | Gera a build de produção                |
| `npm run start` | Inicia o servidor em modo produção      |
| `npm run lint`  | Executa o linter                        |

## Rotas principais

| Rota         | Descrição                                                          |
|--------------|----------------------------------------------------------------------|
| `/login`     | Tela de autenticação                                                 |
| `/`          | Visão geral: contadores agregados e carrossel de tenants             |
| `/[tenant]`  | Dashboard detalhado de um tenant (atualmente só `351` - Balneário é válido) |

## Modelo de dados (resumo)

As principais entidades, definidas em `src/types/cve.d.ts`, são:

- **ChargePoint**: uma estação de recarga, com endereço, conectores, protocolo OCPP e dados de uso/cobrança.
- **Connector**: um conector individual de uma estação, com seu status (`ConnectorStatus`), tipo e velocidade de carga.
- **Tenant**: agrupamento de estações por unidade/local.
- **ChargeBoxNotification**: evento de conexão/desconexão de uma estação.

Os status de conector são mapeados para quatro categorias visuais: **Disponível** (`Available`, `SuspendedEV`), **Ocupado** (`Charging`, `Finishing`, `Preparing`, `SuspendedEVSE`), **Offline** (`Unavailable`, `Faulted`) e **Manutenção** (`Maintenance`).
