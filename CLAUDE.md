# Organiza SM · página de vendas

Página de vendas do **Organiza SM**, o sistema no Notion para social medias que já têm carteira de clientes.
Produto da Carol Lima. **Não tem relação com a Agência Essence**: nunca citar Essence, clientes da Essence ou dados internos.

## Stack
- HTML + CSS + JS puro, sem build. Abrir `index.html` no navegador já funciona.
- Fontes: Fraunces (títulos) e DM Sans (texto), via Google Fonts.
- Arquivos:
  - `index.html`: toda a página, seção por seção, com comentários `<!-- ===== SEÇÃO ===== -->`
  - `assets/css/style.css`: estilos. Cores e raios ficam nas variáveis do `:root`
  - `assets/js/main.js`: **links de checkout** (objeto `CONFIG`), demonstração da central no topo, lista de dores clicável, barra fixa no celular e animações
  - `assets/img/`: foto da Carol. Prints do Notion entram aqui quando existirem (há uma seção `showcase` comentada em "Por dentro" pronta para eles)

## Identidade visual
| token | cor | uso |
|---|---|---|
| `--brown` | #3B2A20 | texto, botões, seções escuras |
| `--brown-2` | #6B4E3D | texto secundário |
| `--caramel` | #A47E5F | destaques, kicker, ícones |
| `--beige` | #E6D8C3 | bordas, detalhes |
| `--beige-2` | #F3ECE1 | fundos de seção |
| `--cream` | #FBF8F3 | fundo da página |

Tom de voz: direto, acolhedor, de social media para social media. Frases curtas, sem exagero, sem promessas de faturamento.

## A oferta
| Produto | Papel | Preço | Onde aparece |
|---|---|---|---|
| Central Organiza SM (+ bônus mensagens prontas) | produto principal | R$ 56,99 no lançamento (depois R$ 357) | oferta e todos os CTAs |
| Documentação de agência | order bump | R$ 12,99 | complementos + checkout Cakto |
| Banco de 100 ganchos | order bump | R$ 9,90 | complementos + checkout Cakto |
| Planilha financeira | upsell pós-compra | R$ 49,99 sozinha | complementos |
| Central + Planilha financeira | segunda opção na oferta (combo) | R$ 97 (separados: R$ 106,98, economia de R$ 9,98) | caixa de preço, card da planilha nos complementos, FAQ |
| Scripts que fecham (ebook, 33 scripts) | compra futura | a definir | complementos ("em breve") |

Checkout: **Cakto**. Os order bumps são configurados dentro do produto na Cakto. A página tem dois links: `CONFIG.checkout.central` (R$ 56,99) e `CONFIG.checkout.combo` (Central + Planilha, R$ 97). O CTA final e a barra fixa levam para a escolha (#oferta), não direto ao checkout.

## Estrutura da página (ordem)
1. Topbar · 2. Hero escuro com a **demonstração da central** (5 abas que trocam sozinhas: Central, Cliente, Conteúdo, Aquisição, Tarefas; setores, campos e status copiados do Notion real, clientes de exemplo) · 3. Números do produto (7 setores, 26 perguntas, 14 status, 6 follow-ups, 10 min) · 4. Dor (clicável, com contador) · 5. Custo da bagunça · 6. Antes x depois · 7. Por dentro, setor a setor · 8. Um dia com a central · 9. Como funciona · 10. Para quem é / não é · 11. Quem criou · 12. Oferta · 13. Complementos · 14. Garantia · 15. Depoimentos (comentado) · 16. FAQ · 17. CTA final · 18. Rodapé · barra fixa no celular

Se a central mudar no Notion (nomes de setores, status, número de perguntas), atualize a demonstração e os números.

## Pendências antes de publicar
- [x] Link do checkout da Cakto em `CONFIG.checkout.central`
- [x] Foto da Carol em `assets/img/carol.jpg` (ensaio do Drive, IMG_4124, recortada em 4:5)
- [x] Texto "Quem criou": +20 clientes ao mesmo tempo e hoje tem uma agência (sem citar o nome da agência)
- [x] Prints reais em `assets/img/` (central, briefing, banco-info, documentacao), na seção "Prints reais" e no card da Documentação
- [x] Fim do lançamento: 11/10/2026 às 23h59 (Brasília) em `CONFIG.lancamento.fim`. Depois dessa data o contador some sozinho, mas o texto de lançamento continua: trocar o preço para R$ 357 ou estender a data
- [ ] Prints com clientes de exemplo preenchidos (calendário com posts, funil com leads) deixariam a vitrine mais forte
- [x] Link da Cakto do combo Central + Planilha em `CONFIG.checkout.combo`: https://pay.cakto.com.br/3fzs5dq_1171305
- [ ] Imagem para Planilha financeira e Scripts que fecham nos complementos
- [ ] `og:image` 1200x630
- [ ] Confirmar que a central funciona no plano gratuito do Notion (o FAQ afirma isso)
- [ ] Confirmar se vai manter a promessa "Atualizações futuras da central" na oferta
- [ ] Confirmar que o bônus "mensagens prontas" está na central entregue
- [x] E-mail de suporte no rodapé: suporteorganizasm@gmail.com
- [ ] Termos de uso e política de privacidade (links removidos do rodapé até as páginas existirem)
- [x] Pixel da Meta ativo: 1615387966657882 (em `CONFIG.rastreamento.metaPixel` e no `<noscript>` do `index.html`)
- [ ] Rastreamento restante: colar os IDs em `CONFIG.rastreamento` (`assets/js/main.js`): Pixel da Meta, GA4 e TikTok. A página já dispara PageView, ViewContent (oferta na tela) e InitiateCheckout (clique em comprar) e repassa UTMs/fbclid/gclid/ttclid para o link da Cakto. A compra (Purchase) é registrada pela Cakto: configurar o mesmo pixel no produto lá
- [ ] Banner de cookies (LGPD) se os pixels forem ativados
- [ ] Depoimentos: só descomentar a seção quando houver depoimentos **reais** e autorizados

## Regras
- Nunca inventar depoimentos, números de vendas, alunas ou resultados.
- Oferta de lançamento: "de R$ 357 por R$ 56,99" só vale porque R$ 357 é o preço depois do lançamento (está no FAQ). Se isso mudar, ajuste o texto.
- Contador só com data real de fim (`CONFIG.lancamento.fim`). Nunca contador que reinicia.
- Manter mobile-first: testar em 375px de largura.
- Acessibilidade: contraste AA, `alt` em todas as imagens, respeitar `prefers-reduced-motion`.

## Publicar
Qualquer hospedagem estática serve:
- **Vercel**: `npx vercel` na pasta do projeto
- **Netlify**: arrastar a pasta em app.netlify.com/drop
- **GitHub Pages**: subir o repositório e ativar Pages na branch `main`
Depois, apontar o domínio próprio nas configurações da hospedagem.
