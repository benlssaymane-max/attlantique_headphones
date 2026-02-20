# 📚 Complete Project Setup Guide

Seu site de e-commerce do Sony WH-1000XM6 está **100% pronto**! Aqui está como usar:

## 🎯 Início Rápido

### ⚙️ Configuração Inicial (Execute uma única vez)

**Windows (PowerShell):**
```powershell
cd "c:\Users\AYMANE  BEN\Desktop\new skills\wh-1000xm6-full"
npm install
```

**Após instalar, você pode escolher:**

### Opção A: Usar Docker (Recomendado - SEM TERMINAL)

1. **Instale Docker Desktop** se ainda não tiver:
   - Baixe em: https://www.docker.com/products/docker-desktop

2. **Abra Docker Desktop** e deixe rodando

3. **O banco de dados estará pronto automaticamente** quando você iniciar o servidor

### Opção B: Executar Localmente

Se preferir usar PowerShell (mínimo necessário):

```powershell
# Apenas uma vez
npm install

# Para iniciar o servidor
npm run dev
```

## 🌐 Acessar o Site

Depois de executar `npm run dev`, abra seu navegador:
```
http://localhost:3000
```

## 🔐 Credenciais de Teste

### Admin
- **Email:** admin@aymane6.com
- **Senha:** Admin123!

### Usuário Regular
- **Email:** user@aymane6.com
- **Senha:** User123!

## 📦 Estrutura do Site

### Páginas Disponíveis

| URL | Descrição |
|-----|-----------|
| `/` | Página inicial com apresentação |
| `/products` | Catálogo completo de produtos |
| `/products/[id]` | Detalhes de um produto |
| `/about` | Sobre a empresa |
| `/contact` | Formulário de contato |
| `/privacy` | Política de privacidade |
| `/terms` | Termos de serviço |

### API Disponível

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/products` | Lista de produtos |
| GET | `/api/products/[id]` | Detalhes do produto |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Registro |
| GET | `/api/health` | Status da API |

## 🗄️ Banco de Dados

### Estrutura

```
Users (usuários)
├── Admin (admin@aymane6.com)
└── Regular User (user@aymane6.com)

Products (produtos)
├── Sony WH-1000XM6 - Matte Black
└── Sony WH-1000XM6 - Silver

Orders (pedidos)
Reviews (avaliações)
OrderItems (itens de pedido)
```

### Acessar Google Admin (pgAdmin)

Se estiver usando Docker:
- URL: http://localhost:5050
- Email: admin@aymane6.com
- Senha: admin

## 💻 Comandos Disponíveis

```bash
npm run dev          # Iniciar servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Iniciar servidor em produção
npm run db:generate  # Gerar cliente Prisma
npm run db:migrate   # Executar migrations
npm run db:seed      # Popular banco com dados de teste
npm run docker:up    # Iniciar Docker containers
npm run docker:down  # Parar Docker containers
```

## 🎨 Personalizações Fáceis

### Cores (tailwind.config.js)
```js
'brand-dark': '#0a0e27',        // Fundo escuro
'brand-blue': '#0066cc',        // Azul principal
'brand-cyan': '#00d4ff',        // Cyan
'brand-purple': '#7c3aed',      // Roxo
```

### Textos
- Editar `/app/page.tsx` para home
- Editar `/app/about/page.tsx` para sobre
- Editar `/app/contact/page.tsx` para contato

### Produtos
- Adicionar/editar em `/scripts/seed.ts`
- Depois rodar: `npm run db:seed`

## 🔒 Segurança

✅ Senhas com hash bcryptjs
✅ JWT para sessões
✅ Validação de entrada
✅ HTTPS ready
✅ CORS configurável

## 🚀 Próximos Passos

### Para Desenvolvimento
1. Modificar produtos em `/scripts/seed.ts`
2. Adicionar novas páginas em `/app`
3. Criar novos endpoints em `/app/api`

### Para Produção
1. Configurar variáveis de ambiente
2. Build: `npm run build`
3. Deploy em Vercel, Netlify, AWS, etc.

## 📊 Tecnologias Usadas

- **Frontend:** React 18, Next.js 14, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Backend:** Node.js API Routes
- **Database:** PostgreSQL, Prisma ORM
- **Auth:** JWT, bcryptjs
- **Tools:** Docker, npm

## 🐛 Troubleshooting

### Porta 3000 em uso
```powershell
npm run dev -- -p 3001
```

### Docker não conecta
```powershell
docker-compose down
docker-compose up -d
```

### Database erro
```powershell
npm run db:migrate
npm run db:seed
```

## 📞 Suporte

Para dúvidas técnicas:
- Documentação Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs/
- Tailwind: https://tailwindcss.com/docs

---

**Tudo está pronto! Aproveite seu site completo! 🎉**
