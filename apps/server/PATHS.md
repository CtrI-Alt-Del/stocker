# Guia de Navegação - Caminhos do Servidor 🗺️

Este é um guia rápido para navegar pelos caminhos da arquitetura do servidor.

## 📍 Caminhos Principais

### Controladores por Domínio
```
/src/api/controllers/
├── auth/                  → Autenticação e login
├── products/              → Gestão de produtos
├── categories/            → Gestão de categorias  
├── inventory-movements/   → Movimentações de estoque
├── batches/              → Gestão de lotes
├── users/                → Gestão de usuários
├── companies/            → Gestão de empresas
├── locations/            → Gestão de localizações
├── suppliers/            → Gestão de fornecedores
├── notifications/        → Sistema de notificações
├── reports/              → Relatórios e exportações
└── file-storage/         → Upload de arquivos
```

### Repositórios de Dados
```
/src/database/prisma/repositories/
├── prisma-users-repository.ts
├── prisma-products-repository.ts
├── prisma-categories-repository.ts
├── prisma-inventory-movements-repository.ts
├── prisma-batches-repository.ts
├── prisma-companies-repository.ts
├── prisma-locations-repository.ts
├── prisma-suppliers-repository.ts
└── prisma-notification-repository.ts
```

### Provedores de Serviços
```
/src/providers/
├── ai-provider/           → Integração com IA
├── email-provider/        → Envio de emails
├── file-storage-provider/ → Armazenamento de arquivos
├── crypto-provider/       → Criptografia
├── csv-provider/          → Geração de relatórios
└── queue-provider/        → Processamento em background
```

### Rotas da API
```
/src/app/fastify/routes/
├── auth-routes.ts         → POST /auth/login, /auth/logout
├── products-routes.ts     → GET/POST/PUT/DELETE /products
├── categories-routes.ts   → GET/POST/PUT/DELETE /categories
├── users-routes.ts        → GET/POST/PUT/DELETE /users
├── companies-routes.ts    → GET/PUT /companies
├── locations-routes.ts    → GET/POST/PUT/DELETE /locations
├── suppliers-routes.ts    → GET/POST/PUT/DELETE /suppliers
├── reports-routes.ts      → GET /reports/*
└── notifications-routes.ts → GET/DELETE /notifications
```

### Jobs em Background
```
/src/jobs/
├── send-expiration-date-notification-job.ts
├── send-password-reset-email-job.ts  
├── send-stock-level-notification-job.ts
└── send-welcome-employee-email-job.ts
```

### WebSocket (Tempo Real)
```
/src/realtime/
├── rooms/
│   ├── ai-report-room.ts      → Relatórios com IA
│   ├── auth-room.ts           → Autenticação em tempo real
│   └── notifications-room.ts  → Notificações ao vivo
└── sockets/
    ├── auth-socket.ts
    └── notification-socket.ts
```

## 🎯 Caminhos por Funcionalidade

### Autenticação
- **Login**: `/src/api/controllers/auth/login-controller.ts`
- **Logout**: `/src/api/controllers/auth/logout-controller.ts`
- **JWT**: `/src/api/middlewares/verify-jwt-middleware.ts`
- **Permissões**: `/src/api/middlewares/verify-role-permission-middleware.ts`

### Gestão de Produtos  
- **Listar**: `/src/api/controllers/products/list-products-controller.ts`
- **Criar**: `/src/api/controllers/products/register-product-controller.ts`
- **Editar**: `/src/api/controllers/products/update-product-controller.ts`
- **Buscar**: `/src/api/controllers/products/get-product-controller.ts`
- **Deletar**: `/src/api/controllers/products/delete-products-controller.ts`

### Relatórios
- **Estoque**: `/src/api/controllers/reports/report-inventory-controller.ts`
- **Movimentações**: `/src/api/controllers/reports/report-weekly-inventory-movements-controller.ts`
- **Produtos em Alta**: `/src/api/controllers/reports/report-most-trending-products-controller.ts`
- **Exportar CSV**: `/src/api/controllers/reports/export-inventory-to-csv-file-controller.ts`

### Upload de Arquivos
- **Upload**: `/src/api/controllers/file-storage/upload-image-controller.ts`
- **Provider**: `/src/providers/file-storage-provider/supabase-file-storage-provider.ts`

## 🔧 Configuração

### Variáveis de Ambiente
```
/src/constants/env.ts      → Todas as configurações do ambiente
```

### Setup da Aplicação
```
/src/app/fastify/fastify-app.ts → Configuração principal do Fastify
/src/server.ts                  → Ponto de entrada do servidor
```

### Banco de Dados
```
/src/database/prisma/schema.prisma → Schema do banco
/src/database/index.ts             → Exportação dos repositórios
```

## 📖 Para Mais Detalhes

Consulte a [documentação completa da arquitetura](ARCHITECTURE.md) para uma explicação aprofundada de cada camada e componente.