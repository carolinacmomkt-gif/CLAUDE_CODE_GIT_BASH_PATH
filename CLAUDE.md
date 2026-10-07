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
| Central Organiza SM (+ bônus mensagens prontas) | produto principal | R$ 29,90 no lançamento (depois R$ 357) | oferta e todos os CTAs |
| Documentação de agência | complemento avulso | R$ 12,99 | complementos (botão com link próprio) |
| Banco de 100 ganchos | complemento avulso | R$ 9,99 | complementos (botão com link próprio) |
| Planilha financeira | complemento avulso | R$ 17,00 sozinha | complementos (botão com link próprio) |
| Central + Planilha financeira | segunda opção na oferta (combo) | R$ 39,90 (separados: R$ 46,90, economia de R$ 7,00) | caixa de preço, card da planilha nos complementos, FAQ |
| Scripts que fecham (ebook, 33 scripts) | compra futura | a definir | complementos ("em breve") |

Checkout: **Hub.la**. Todos os links ficam em `CONFIG.checkout` (`assets/js/main.js`): `central` (R$ 29,90), `combo` (Central + Planilha, R$ 39,90), `planilha` (R$ 17,00), `ganchos` (R$ 9,99) e `documentacao` (R$ 12,99). Cada botão usa `data-checkout="<nome>"`. O script de rastreamento da Hub.la (`data.hub.la/hub.min.js`) fica no `<head>` do `index.html`. O CTA final e a barra fixa levam para a escolha (#oferta), não direto ao checkout.

## Estrutura da página (ordem)
1. Topbar · 2. Hero escuro com a **demonstração da central** (5 abas que trocam sozinhas: Central, Cliente, Conteúdo, Aquisição, Tarefas; setores, campos e status copiados do Notion real, clientes de exemplo) · 3. Números do produto (7 setores, 26 perguntas, 14 status, 6 follow-ups, 10 min) · 4. Dor (clicável, com contador) · 5. Custo da bagunça · 6. Antes x depois · 7. Por dentro, setor a setor · 8. Um dia com a central · 9. Como funciona · 10. Para quem é / não é · 11. Quem criou · 12. Oferta · 13. Complementos · 14. Garantia · 15. Depoimentos (comentado) · 16. FAQ · 17. CTA final · 18. Rodapé · barra fixa no celular

Chamadas para a oferta (#oferta) ao longo da página, sempre depois de um momento de decisão: dor, custo, antes x depois (faixa `.cta-strip` com preço e contador), por dentro, um dia com a central, quem criou, garantia, FAQ e CTA final. Padrão: `<div class="cta">` com `.btn.btn-go` (seta em círculo e brilho) e `.cta-note` com preço âncora ou garantia. Em seção escura use `.btn-caramel`. Não colocar duas chamadas seguidas sem conteúdo entre elas.

Se a central mudar no Notion (nomes de setores, status, número de perguntas), atualize a demonstração e os números.

## Pendências antes de publicar
- [x] Links de checkout da Hub.la em `CONFIG.checkout` (antes eram da Cakto)
- [x] Foto da Carol em `assets/img/carol.jpg` (ensaio do Drive, IMG_4124, recortada em 4:5)
- [x] Texto "Quem criou": +20 clientes ao mesmo tempo e hoje tem uma agência (sem citar o nome da agência)
- [x] Prints reais em `assets/img/` (briefing, banco-info, documentacao), na seção "Prints reais" e no card da Documentação
- [x] Print da página inicial em `assets/img/central.jpg` (versão CENTRAL COMBO, modo escuro, com atalho financeiro; a legenda avisa que o financeiro vem na opção com a planilha)
- [x] Fim do lançamento: 11/10/2026 às 23h59 (Brasília) em `CONFIG.lancamento.fim`. Depois dessa data o contador some sozinho, mas o texto de lançamento continua: trocar o preço para R$ 357 ou estender a data
- [ ] Prints com clientes de exemplo preenchidos (calendário com posts, funil com leads) deixariam a vitrine mais forte
- [ ] Imagem para Planilha financeira e Scripts que fecham nos complementos
- [ ] `og:image` 1200x630
- [ ] Confirmar que a central funciona no plano gratuito do Notion (o FAQ afirma isso)
- [ ] Confirmar se vai manter a promessa "Atualizações futuras da central" na oferta
- [ ] Confirmar que o bônus "mensagens prontas" está na central entregue
- [x] E-mail de suporte no rodapé: suporteorganizasm@gmail.com
- [ ] Termos de uso e política de privacidade (links removidos do rodapé até as páginas existirem)
- [x] Pixel da Meta ativo: 1615387966657882. O código oficial está no `<head>` do `index.html` (PageView). O `main.js` usa o mesmo ID em `CONFIG.rastreamento.metaPixel` para ViewContent e InitiateCheckout e só carrega o pixel sozinho se o código do `<head>` for removido. Trocar o ID nos dois lugares
- [ ] Rastreamento restante: colar os IDs em `CONFIG.rastreamento` (`assets/js/main.js`): Pixel da Meta, GA4 e TikTok. A página já dispara PageView, ViewContent (oferta na tela) e InitiateCheckout (clique em comprar) e repassa UTMs/fbclid/gclid/ttclid para o link da Hub.la. A compra (Purchase) é registrada pela Hub.la: configurar o mesmo pixel em cada produto lá
- [ ] Banner de cookies (LGPD) se os pixels forem ativados
- [ ] Depoimentos: só descomentar a seção quando houver depoimentos **reais** e autorizados

## Regras
- Nunca inventar depoimentos, números de vendas, alunas ou resultados.
- Oferta de lançamento: "de R$ 357 por R$ 29,90" só vale porque R$ 357 é o preço depois do lançamento (está no FAQ). Se isso mudar, ajuste o texto.
- Contador só com data real de fim (`CONFIG.lancamento.fim`). Nunca contador que reinicia.
- Manter mobile-first: testar em 375px de largura.
- Acessibilidade: contraste AA, `alt` em todas as imagens, respeitar `prefers-reduced-motion`.

## Publicar
O site está publicado na **Netlify direto do repositório** (branch `claude`). O `netlify.toml` define a pasta publicada e esconde `CLAUDE.md`, `README.md`, `netlify.toml`, `.git/` e `.claude/` (respondem 404 com a página `404.html`). Arquivo interno novo na raiz precisa de uma regra igual no `netlify.toml`.

Qualquer hospedagem estática serve:
- **Vercel**: `npx vercel` na pasta do projeto
- **Netlify**: arrastar a pasta em app.netlify.com/drop
- **GitHub Pages**: subir o repositório e ativar Pages na branch `main`
Depois, apontar o domínio próprio nas configurações da hospedagem.
