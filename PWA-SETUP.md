# 📱 Como Usar o PWA na Vercel

## ✅ Configuração Atual

O PWA já está configurado no projeto com:
- ✓ `vite-plugin-pwa` instalado
- ✓ Service Worker configurado para auto-atualização
- ✓ Manifest configurado no `vite.config.ts`
- ✓ Meta tags PWA no `index.html`

## 🎨 Criar Ícones PWA

Você precisa criar 2 ícones na pasta `public/`:

### 1. pwa-192.png (192x192 pixels)
### 2. pwa-512.png (512x512 pixels)

**Recomendações:**
- Use o emoji 🌸 ou logo da Tie Sensei
- Fundo sólido ou gradiente japonês
- Cores: use o tema autumn (#8c4a2f para primary)
- Ferramentas online: [Favicon.io](https://favicon.io/), [RealFaviconGenerator](https://realfavicongenerator.net/)

### Opção Rápida - Criar com Canvas Online:
1. Acesse: https://www.canva.com/
2. Crie design 512x512px
3. Adicione: 🌸 + "Tiensino" + fundo gradiente
4. Exporte como PNG
5. Redimensione uma cópia para 192x192px

## 🚀 Deploy na Vercel

### 1. Fazer Build do Projeto
```bash
npm run build
```

### 2. Deploy na Vercel

#### Opção A - Via CLI:
```bash
npm install -g vercel
vercel
```

#### Opção B - Via GitHub:
1. Faça push do código para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Import Project"
4. Selecione seu repositório
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 3. Verificar PWA após Deploy

1. Acesse o site na URL da Vercel
2. Abra DevTools (F12)
3. Vá em **Application > Manifest**
4. Verifique se o manifest está carregado
5. Vá em **Application > Service Workers**
6. Confirme que o SW está ativo

## 📱 Como Instalar o PWA no Celular

### Android (Chrome):
1. Acesse o site no Chrome
2. Clique no menu ⋮ (3 pontos)
3. Selecione **"Adicionar à tela inicial"**
4. Confirme o nome e toque em "Adicionar"
5. O ícone aparecerá na tela inicial

### iOS (Safari):
1. Acesse o site no Safari
2. Toque no botão **Compartilhar** 📤
3. Role para baixo e selecione **"Adicionar à Tela de Início"**
4. Edite o nome se necessário
5. Toque em "Adicionar"
6. O ícone aparecerá na tela inicial

### Desktop (Chrome/Edge):
1. Acesse o site
2. Clique no ícone **+ Instalar** na barra de endereço
3. Confirme a instalação
4. O app abrirá como aplicativo standalone

## 🔍 Testar PWA Localmente

```bash
# 1. Build do projeto
npm run build

# 2. Preview local
npm run preview
```

Acesse `http://localhost:4173` e teste a instalação do PWA

## ⚙️ Configurações Importantes da Vercel

Crie um arquivo `vercel.json` na raiz do projeto (opcional):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "headers": [
    {
      "source": "/manifest.webmanifest",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/manifest+json"
        }
      ]
    },
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

## 🎯 Checklist Pré-Deploy

- [ ] Ícones `pwa-192.png` e `pwa-512.png` criados na pasta `public/`
- [ ] Build executado sem erros: `npm run build`
- [ ] Manifest validado no DevTools
- [ ] Service Worker registrado
- [ ] Meta tags PWA no HTML
- [ ] Tema configurado (dark/light)

## 📊 Métricas PWA

Após o deploy, teste o PWA com:
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) (DevTools > Lighthouse)
- [PWA Builder](https://www.pwabuilder.com/)

**Meta de Score PWA:** 90+

## 🐛 Troubleshooting

### PWA não aparece opção de instalar:
- Verifique se o site está em HTTPS (Vercel faz automaticamente)
- Confirme se o manifest está acessível em `/manifest.webmanifest`
- Verifique se os ícones estão carregando (Network tab)

### Service Worker não atualiza:
- Limpe o cache do navegador
- No DevTools: Application > Service Workers > Unregister
- Hard refresh: Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)

### Ícones não aparecem:
- Verifique se os arquivos estão em `public/` (não em `src/assets/`)
- Confirme os nomes exatos: `pwa-192.png` e `pwa-512.png`
- Verifique o formato: PNG, não JPG

## 🔄 Atualizações Automáticas

Com `registerType: 'autoUpdate'`, o PWA atualiza automaticamente quando:
1. Usuário visita o site novamente
2. Nova versão é detectada
3. Atualização é baixada em background
4. Página recarrega com nova versão

## 🌐 URLs Úteis

- Vercel Dashboard: https://vercel.com/dashboard
- PWA Builder: https://www.pwabuilder.com/
- Manifest Generator: https://www.simicart.com/manifest-generator.html/
- Icon Generator: https://favicon.io/favicon-converter/

## 💡 Dicas Finais

1. **Performance**: O PWA funciona offline após primeira visita
2. **Cache**: Atualizações de conteúdo aparecem após reload
3. **Notificações**: Adicione Push Notifications se necessário
4. **Analytics**: Integre Google Analytics para PWA
5. **SEO**: PWA melhora ranking no Google

---

**Status Atual**: ✅ Configurado e pronto para deploy
**Próximo Passo**: Criar ícones e fazer deploy na Vercel
