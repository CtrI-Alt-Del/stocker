# Arquitetura do Servidor - Stocker 📦

Este documento descreve a estrutura e arquitetura do servidor dentro do projeto Stocker.

## 📁 Estrutura de Diretórios

### `/src` - Diretório Principal
```
src/
├── api/                 # Camada de apresentação (API REST)
├── app/                 # Configuração da aplicação
├── constants/           # Constantes da aplicação
├── database/           # Camada de dados e persistência
├── jobs/               # Jobs em background
├── providers/          # Provedores externos
├── realtime/           # WebSocket e comunicação em tempo real
├── queue.ts            # Configuração de filas
└── server.ts           # Ponto de entrada do servidor
```

## 🏗️ Camadas da Arquitetura

### 1. **API Layer** (`/src/api/`)
Responsável pela camada de apresentação e endpoints HTTP.

```
api/
├── controllers/        # Controladores organizados por domínio
│   ├── auth/          # Autenticação e autorização
│   ├── batches/       # Gestão de lotes
│   ├── categories/    # Gestão de categorias
│   ├── companies/     # Gestão de empresas
│   ├── file-storage/  # Upload de arquivos
│   ├── inventory-movements/  # Movimentações de estoque
│   ├── locations/     # Gestão de localizações
│   ├── notifications/ # Sistema de notificações
│   ├── products/      # Gestão de produtos
│   ├── reports/       # Relatórios e exportações
│   ├── suppliers/     # Gestão de fornecedores
│   └── users/         # Gestão de usuários
└── middlewares/       # Middlewares da aplicação
    ├── verify-jwt-middleware.ts
    └── verify-role-permission-middleware.ts
```

**Exemplo de Controlador:**
- Localização: `/src/api/controllers/products/get-product-controller.ts`
- Função: Handles HTTP requests para buscar um produto específico

### 2. **Application Layer** (`/src/app/`)
Configuração e setup da aplicação Fastify.

```
app/
├── fastify/
│   ├── fastify-app.ts      # Configuração principal do Fastify
│   ├── fastify-handler.ts  # Handlers customizados
│   ├── fastify-http.ts     # Configuração HTTP
│   ├── fastify-ws.ts       # Configuração WebSocket
│   └── routes/             # Definição de rotas
│       ├── auth-routes.ts
│       ├── products-routes.ts
│       └── ... (outras rotas)
└── index.ts
```

**Componentes Principais:**
- **FastifyApp**: Configuração principal com plugins (CORS, JWT, WebSocket)
- **Routes**: Mapeamento de endpoints para controladores
- **Error Handler**: Tratamento centralizado de erros

### 3. **Database Layer** (`/src/database/`)
Camada de persistência usando Prisma ORM.

```
database/
├── prisma/
│   ├── mappers/           # Mapeamento entre entidades
│   ├── migrations/        # Migrações do banco
│   ├── repositories/      # Padrão Repository
│   ├── types/            # Tipos TypeScript do Prisma
│   ├── schema.prisma     # Schema do banco
│   └── seed.ts           # Dados iniciais
└── index.ts              # Exportação dos repositórios
```

**Repositórios Disponíveis:**
- `usersRepository` - Gestão de usuários
- `productsRepository` - Gestão de produtos
- `batchesRepository` - Gestão de lotes
- `inventoryMovementsRepository` - Movimentações
- `categoriesRepository` - Categorias
- `notificationsRepository` - Notificações
- `companiesRepository` - Empresas
- `locationsRepository` - Localizações
- `suppliersRepository` - Fornecedores

### 4. **Providers Layer** (`/src/providers/`)
Integrações com serviços externos e utilitários.

```
providers/
├── ai-provider/           # Integração com IA (Google AI)
├── crypto-provider/       # Criptografia (bcrypt)
├── csv-provider/          # Geração de CSV (ExcelJS)
├── email-provider/        # Envio de emails (Resend)
├── file-storage-provider/ # Armazenamento (Supabase)
├── queue-provider/        # Filas (Bull)
└── index.ts              # Exportação dos providers
```

### 5. **Jobs Layer** (`/src/jobs/`)
Processamento em background e tarefas agendadas.

```
jobs/
├── send-expiration-date-notification-job.ts
├── send-password-reset-email-job.ts
├── send-stock-level-notification-job.ts
└── send-welcome-employee-email-job.ts
```

### 6. **Realtime Layer** (`/src/realtime/`)
Comunicação em tempo real via WebSocket.

```
realtime/
├── rooms/                 # Salas de WebSocket
│   ├── ai-report-room.ts
│   ├── auth-room.ts
│   └── notifications-room.ts
└── sockets/              # Configuração de sockets
    ├── auth-socket.ts
    └── notification-socket.ts
```

### 7. **Constants** (`/src/constants/`)
Configurações e constantes da aplicação.

```
constants/
├── env.ts              # Variáveis de ambiente
├── cookies.ts          # Configuração de cookies
└── max-file-size.ts    # Limites de arquivo
```

## 🔄 Fluxo de Dados

### Requisição HTTP:
1. **Route** (`/src/app/fastify/routes/`) → 
2. **Middleware** (`/src/api/middlewares/`) → 
3. **Controller** (`/src/api/controllers/`) → 
4. **Use Case** (em `packages/core`) → 
5. **Repository** (`/src/database/prisma/repositories/`) → 
6. **Database**

### WebSocket:
1. **Socket** (`/src/realtime/sockets/`) → 
2. **Room** (`/src/realtime/rooms/`) → 
3. **Use Case** → 
4. **Repository** → 
5. **Database**

### Background Jobs:
1. **Queue** (`/src/queue.ts`) → 
2. **Job** (`/src/jobs/`) → 
3. **Provider** (`/src/providers/`) → 
4. **External Service**

## 🚀 Pontos de Entrada

### Principais Arquivos:
- **`/src/server.ts`**: Inicia o servidor HTTP
- **`/src/queue.ts`**: Inicia o processador de filas
- **`/src/app/fastify/fastify-app.ts`**: Configuração do Fastify

### Comandos de Desenvolvimento:
```bash
npm run dev:server  # Inicia servidor em modo desenvolvimento
npm run dev:queue   # Inicia processador de filas
npm run dev         # Inicia ambos em paralelo
```

## 📋 Exemplos de Navegação

### Para adicionar um novo endpoint:
1. Criar controlador em `/src/api/controllers/[domain]/`
2. Adicionar rota em `/src/app/fastify/routes/[domain]-routes.ts`
3. Implementar use case em `packages/core/src/use-cases/`

### Para adicionar um novo provider:
1. Criar em `/src/providers/[provider-name]/`
2. Exportar em `/src/providers/index.ts`
3. Usar nos controladores ou use cases

### Para adicionar um novo job:
1. Criar em `/src/jobs/[job-name].ts`
2. Registrar em `/src/providers/index.ts` (queueProvider)
3. Agendar em `/src/app/fastify/fastify-app.ts` se necessário

## 🔧 Tecnologias Utilizadas

- **Framework**: Fastify
- **ORM**: Prisma
- **Database**: PostgreSQL
- **WebSocket**: @fastify/websocket
- **Queue**: Bull (Redis)
- **Auth**: JWT (@fastify/jwt)
- **File Storage**: Supabase
- **Email**: Resend
- **AI**: Google Generative AI

## 📝 Convenções

- **Naming**: kebab-case para arquivos, PascalCase para classes
- **Structure**: Organização por domínio/feature
- **Exports**: Centralizados em arquivos `index.ts`
- **Types**: Interfaces definidas em `packages/core`

## 🗺️ Guia Rápido de Navegação

Para uma referência rápida dos caminhos principais, consulte o [Guia de Navegação](PATHS.md).