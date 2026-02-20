# ⚡ Quick Reference - Comandos e Tarefas

## 🚀 Comandos Mais Usados

```powershell
# Iniciar servidor (TODO DIA)
npm run dev

# Build para produção
npm run build

# Rodar em produção
npm run start

# Instalar pacotes (primeira vez)
npm install

# Atualizar banco de dados
npm run db:migrate

# Popular com dados de teste
npm run db:seed

# Gerar cliente Prisma
npm run db:generate

# Iniciar Docker
docker-compose up -d

# Parar Docker
docker-compose down

# Ver logs do Docker
docker-compose logs -f postgres
```

---

## 📝 Arquivos Mais Importantes

| Arquivo | Para Quê |
|---------|----------|
| `app/page.tsx` | Editar página home |
| `app/components/` | Editar/criar componentes |
| `app/api/` | Editar/criar endpoints |
| `prisma/schema.prisma` | Editar banco de dados |
| `tailwind.config.js` | Editar cores e tema |
| `.env.local` | Variáveis de ambiente |
| `scripts/seed.ts` | Adicionar produtos demo |

---

## 🎨 Personalizações Rápidas

### Mudar Cor Principal (Azul)
`tailwind.config.js`:
```js
'brand-blue': '#SEU_HEX_AQUI',
```

### Mudar Nome do Site
`app/layout.tsx` e `app/page.tsx`:
```tsx
title: 'Seu Nome Aqui'
```

### Adicionar Novo Produto
`scripts/seed.ts`:
```ts
const newProduct = await prisma.product.create({
  data: {
    name: 'Nome',
    price: 99.99,
    // ...
  }
})
```

### Adicionar Nova Página
Crie arquivo: `app/sua-pagina/page.tsx`

---

## 🔐 Contas de Teste

| Email | Senha | Tipo |
|-------|-------|------|
| admin@aymane6.com | Admin123! | Admin |
| user@aymane6.com | User123! | User |

---

## 🐛 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| Porta 3000 em uso | `npm run dev -- -p 3001` |
| Erro "Cannot find module" | `npm install && npm run db:generate` |
| Banco não conecta | `npm run db:migrate` |
| Docker não funciona | `docker-compose down && docker-compose up -d` |
| Build falha | Deletar `.next` e tentar novamente |
| Página em branco | Ver console (F12) para erros |

---

## 📍 URLs Importantes

| URL | O Quê |
|-----|-------|
| `http://localhost:3000` | Site principal |
| `http://localhost:5050` | pgAdmin (Docker) |
| `http://localhost:5432` | PostgreSQL (Docker) |
| `/api/products` | API de produtos |
| `/api/health` | Status da API |

---

## 🌐 Variáveis de Ambiente

```env
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=sua_chave_secreta
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

---

## 📦 Estrutura de Pastas

```
app/              ← Páginas e APIs
├── api/          ← Endpoints
├── components/   ← Componentes React
└── [páginas]/    ← Páginas Next.js

lib/              ← Funções utilitárias
prisma/           ← Database schema
database/         ← SQL scripts
scripts/          ← Scripts especiais
public/           ← Imagens estáticas
```

---

## 🚀 Deploy Rápido

### Em Vercel (Recomendado)
1. `git push` seu código
2. Conecte no Vercel
3. Clique "Deploy"
4. Done! 🎉

### Localmente
```powershell
npm run build
npm run start
# Acesse: http://localhost:3000
```

---

## 🎯 To-Do para Começar

- [ ] `npm install`
- [ ] `npm run dev`
- [ ] Testar em http://localhost:3000
- [ ] Explorar todas as páginas
- [ ] Logar com admin@aymane6.com
- [ ] Customizar cores/textos
- [ ] Adicionar seus produtos
- [ ] Deploy em Vercel

---

## 💡 Dicas Pro

1. **Use Ctrl+Shift+K** para abrir terminal integrado no VS Code
2. **Hot reload** - Salve e veja mudanças na hora
3. **F12** - Abra DevTools para debug
4. **Prisma Studio** - `npm run db:studio` para ver DB visualmente
5. **TypeScript** - Aproveite autocomplete do VS Code

---

## 🔗 Links Úteis

- Docs: `COMPLETE.md`
- Setup: `SETUP_GUIDE.md`
- Deploy: `DEPLOY.md`
- Resumo: `PROJECT_SUMMARY.md`

---

**Pronto para começar? Execute:** `npm run dev` 🚀

