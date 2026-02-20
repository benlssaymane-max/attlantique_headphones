# 🚀 Guia de Deploy para Produção

Seu site está pronto para ir ao vivo! Aqui estão as opções mais fáceis.

## ⭐ RECOMENDADO: Vercel (Grátis)

Vercel é feita pelo criador do Next.js e é a maneira mais fácil.

### Passo 1: Preparar o GitHub
```powershell
# Na pasta do projeto
git init
git add .
git commit -m "Initial commit"
git branch -M main

# Crie um repositório no https://github.com/new
# Então:
git remote add origin https://github.com/SEU_USUARIO/seu-repo.git
git push -u origin main
```

### Passo 2: Deploy no Vercel
1. Acesse https://vercel.com
2. Clique em "New Project"
3. Selecione seu repositório GitHub
4. Clique "Deploy"
5. **Pronto!** Site já está no ar 🎉

### Passo 3: Variáveis de Ambiente
1. No Vercel, vá para "Settings" → "Environment Variables"
2. Adicione:
```
DATABASE_URL=sua_url_database
JWT_SECRET=sua_chave_secreta
NEXT_PUBLIC_API_URL=https://seu-site.vercel.app
```

---

## 🐳 Alternativa: Docker Deploy

### Build da Imagem
```powershell
docker build -t meu-site:latest .
docker run -p 3000:3000 meu-site:latest
```

### Deploy em Container
- **AWS ECS**
- **Google Cloud Run**
- **Azure Container Apps**
- **Digital Ocean**
- **Heroku**

---

## 💻 Alternativa: Deployar Localmente

### Opção 1: No seu PC
```powershell
npm run build
npm run start
```

Deixe rodando e acesse via sua rede local.

### Opção 2: Usar ngrok para expor
```powershell
npm install -g ngrok
ngrok http 3000
```

Sua URL pública fica assim: `https://aleatorio.ngrok.io`

---

## 🏢 Para Grandes Operações

### AWS EC2
```bash
ssh ec2-user@seu-ip
git clone seu-repo
cd seu-repo
npm install
npm run build
npm run start
```

### Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    
    location / {
        proxy_pass http://localhost:3000;
    }
}
```

---

## ✅ Checklist Pré-Deploy

- [ ] Trocar JWT_SECRET para uma chave forte
- [ ] Configurar DATABASE_URL correto
- [ ] Testar todas as páginas localmente
- [ ] Verificar erros no console
- [ ] Adicionar domínio customizado
- [ ] Configurar SSL/HTTPS
- [ ] Testar mobile responsividade
- [ ] Verificar performance

---

## 🎯 Domínio Customizado

### Registrar Domínio
- **Namecheap** - $0.88/ano no primeiro ano
- **GoDaddy** - Popular
- **Vercel Domains** - Comprar direto no painel

### Conectar ao Vercel
1. Vá para "Vercel Dashboard"
2. Selecione seu projeto
3. Settings → Domains
4. Adicione seu domínio
5. Atualize os DNS no registrador

---

## 🔒 SSL/HTTPS

**Vercel:** Automático! Seu site já tem HTTPS.

**Self-hosted:**
```bash
# Usar Let's Encrypt com Certbot
sudo certbot certonly --standalone -d seu-dominio.com
```

---

## 📊 Monitoramento

### Vercel Analytics
- Automático no plano pro
- Veja visitantes, performance, etc.

### Alternativas
- **Google Analytics** - Grátis
- **Sentry** - Monitorar erros
- **New Relic** - Performance

---

## 💰 Custos Estimados

| Serviço | Custo | Notas |
|---------|----  |-------|
| Vercel  | Grátis | Perfeito para começar |
| Domínio | $1-15/ano | Namecheap é barato |
| Banco   | Grátis | Até 10k linhas |
| Total   | ~$1-15/ano | Muito barato! |

---

## 🆘 Troubleshooting

### Build falha no Vercel?
- Verifique variáveis de ambiente
- Veja logs no Vercel Dashboard
- Teste `npm run build` localmente

### Site lento?
- Use Vercel Analytics
- Otimize imagens
- Ative cache do Vercel

### Banco não conecta?
- Verifique DATABASE_URL
- Teste conexão localmente first
- Check firewall/security groups

---

## 🎬 Próximos Passos

1. **Setup local:** `npm install && npm run dev`
2. **Teste tudo:** Clique em todas as páginas
3. **Send para GitHub:** `git push`
4. **Deploy:** Vercel importa automaticamente
5. **Compartilhe:** `seu-site.vercel.app`

---

## 🍾 Parabéns!

Seu site está em produção! 

**Próximas melhorias:**
- [ ] Adicionar mais produtos
- [ ] Sistema de carrinho de compras
- [ ] Integração com pagamento (Stripe)
- [ ] Chat ao vivo
- [ ] Email marketing
- [ ] SEO optimization

---

**Boa sorte! 🚀✨**
