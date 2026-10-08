# Organiza SM · página de vendas

Página de vendas do **Organiza SM**, o sistema no Notion para social medias que já têm carteira de clientes.
Produto da Carol Lima. **Não tem relação com a Agência Essence**: nunca citar Essence, clientes da Essence ou dados internos.

## Stack
- HTML + CSS + JS puro, sem build. Abrir `index.html` no navegador já funciona.
- Fontes: Fraunces (títulos) e DM Sans (texto), via Google Fonts.
- Arquivos:
  - `index.html`: toda a página, seção por seção, com comentários `<!-- ===== SEÇÃO ===== -->`
  - `assets/css/style.css`: estilos. Cores e raios ficam nas variáveis do `:root`
  - `assets/js/main.js`: **links de checkout** (objeto `CONFIG`), link do WhatsApp, pixels, demonstração da central no topo, lista de dores clicável, barra fixa no celular e animações
  - `assets/img/`: foto da Carol, prints do Notion e, em `depoimentos/`, os prints das mensagens das clientes

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
Um produto só, a **Organiza SM completa**, por **R$ 29,90** no lançamento (pagamento único). Não existe mais "de R$ 357" nem combo: a planilha financeira vem junto no produto.

| O que vem | Valor mostrado na oferta |
|---|---|
| Central Organiza SM com 7 setores | R$ 97 |
| +100 scripts que fecham | R$ 47 |
| +200 ganchos de conteúdo | R$ 27 |
| Prompts de IA no método da Carol | R$ 27 |
| Modelo de relatório mensal para cliente | R$ 17 |
| Guia Comece Aqui + tutorial em vídeo | R$ 17 |
| Mensagens prontas para clientes | R$ 17 |
| Planilha financeira (Google Planilhas) | R$ 37 |
| **Total** | **R$ 286 · hoje por R$ 29,90** |

Complementos: **Banco de 100 ganchos** (R$ 9,99, `CONFIG.checkout.ganchos`) e **Documentação de agência** (R$ 17,00, `CONFIG.checkout.documentacao`), cada um com botão e link próprio na Hubla. Embaixo dos cards: "Você também pode escolhê-los no checkout, junto com a Organiza SM." A apresentação no Canva saiu da página.

Checkout: **Hubla**. Os links ficam em `CONFIG.checkout` (`assets/js/main.js`): `central` (botão da oferta), `ganchos` e `documentacao` (cards dos complementos). Cada botão usa `data-checkout="<nome>"`. O script de rastreamento da Hubla (`data.hub.la/hub.min.js`) fica no `<head>` do `index.html`. O link de dúvidas no WhatsApp fica em `CONFIG.contato.whatsapp` (vazio = o link não aparece). Todos os outros botões levam para a oferta (#oferta).

## Estrutura da página (ordem)
1. Topbar · 2. Hero escuro com a **demonstração da central** (5 abas que trocam sozinhas: Central, Cliente, Conteúdo, Aquisição, Tarefas; setores, campos e status copiados do Notion real, clientes de exemplo) · 3. Números do produto (7 setores, 26 perguntas, 14 status, 6 follow-ups, 10 min) · 4. Dor (clicável, com contador de marcadas) · 5. Custo da bagunça · 6. Antes x depois · 7. Depoimentos (prints reais em `assets/img/depoimentos/`; no computador 3 em cima e 2 centralizados embaixo, no tablet 2 por linha, no celular carrossel) · 8. Por dentro: print da página inicial, setores 01 Clientes, 02 Conteúdo e 03 Aquisição, "Junto com a central, você leva..." (scripts, ganchos, prompts, relatório e planilha financeira; 3 em cima e 2 centralizados no computador) e o bônus de mensagens · 9. Quem criou · 10. Oferta (lista do que vem, valor de cada parte, preço, Pix/cartão, WhatsApp) · 11. Complementos (banco de ganchos e documentação) · 12. Garantia · 13. FAQ · 14. CTA final · 15. Rodapé · barra fixa no celular

Saíram a pedido da Carol: Um dia com a central, Como funciona, Para quem é / não é, os prints de briefing e banco de informações e os cards dos setores 04 a 07.

Chamadas para a oferta (#oferta) ao longo da página, sempre depois de um momento de decisão: dor, custo, antes x depois (faixa `.cta-strip`), por dentro, quem criou, garantia, FAQ e CTA final. Padrão: `<div class="cta">` com `.btn.btn-go` (seta em círculo e brilho) e `.cta-note` com preço ou garantia. Em seção escura use `.btn-caramel`. Não colocar duas chamadas seguidas sem conteúdo entre elas.

Se a central mudar no Notion (nomes de setores, status, número de perguntas), atualize a demonstração e os números.

## Pendências
- [x] Checkout da Hubla em `CONFIG.checkout.central`
- [x] Foto da Carol em `assets/img/carol.jpg` (ensaio do Drive, IMG_4124, recortada em 4:5)
- [x] Texto "Quem criou": +20 clientes ao mesmo tempo, hoje tem uma agência que atende clientes da área da saúde (sem citar o nome da agência)
- [x] Prints reais em `assets/img/` (central e documentacao)
- [ ] Confirmar na Hubla que o link da documentação (39kx7Twy2nnGIc9V8auD) cobra R$ 17,00 (era R$ 12,99) e que os dois complementos estão como adicionais no checkout da Organiza SM
- [x] Depoimentos: 5 prints de mensagens enviados pela Carol em `assets/img/depoimentos/`
- [ ] Link do WhatsApp em `CONFIG.contato.whatsapp` (o link "Ficou com dúvida?" só aparece quando estiver preenchido)
- [ ] Confirmar a quantidade de ganchos (a oferta usa +200 em todo lugar; a lista de valores original dizia +100)
- [ ] `og:image` 1200x630
- [ ] Confirmar que a central funciona no plano gratuito do Notion (o FAQ afirma isso)
- [x] E-mail de suporte no rodapé: suporteorganizasm@gmail.com
- [ ] Termos de uso e política de privacidade (links removidos do rodapé até as páginas existirem)
- [x] Pixel da Meta ativo: 1615387966657882. O código oficial está no `<head>` do `index.html` (PageView). O `main.js` usa o mesmo ID em `CONFIG.rastreamento.metaPixel` para ViewContent e InitiateCheckout. Trocar o ID nos dois lugares. A compra (Purchase) é registrada pela Hubla: configurar o mesmo pixel no produto lá
- [ ] GA4 e TikTok, se quiser: colar os IDs em `CONFIG.rastreamento`
- [ ] Banner de cookies (LGPD) com os pixels ativos

## Regras
- Nunca inventar depoimentos, números de vendas, alunas ou resultados. Depoimento só com print real enviado pela Carol.
- Sem "de R$ 357" e sem contador regressivo: a ancoragem é o valor de cada parte (R$ 286) contra o preço (R$ 29,90).
- Texto: português do Brasil, tom de conversa, sem travessão, sem emoji, sem "não é sobre X, é sobre Y", "isso muda tudo", "tem gente que", "ninguém percebe", "sem perceber".
- Manter mobile-first: testar em 375px de largura.
- Acessibilidade: contraste AA, `alt` em todas as imagens (nos depoimentos, o texto da mensagem), respeitar `prefers-reduced-motion`.

## Publicar
O site está publicado na **Netlify direto do repositório** (branch `claude`). O `netlify.toml` define a pasta publicada e esconde `CLAUDE.md`, `README.md`, `netlify.toml`, `.git/` e `.claude/` (respondem 404 com a página `404.html`). Arquivo interno novo na raiz precisa de uma regra igual no `netlify.toml`.

Qualquer hospedagem estática serve:
- **Vercel**: `npx vercel` na pasta do projeto
- **Netlify**: arrastar a pasta em app.netlify.com/drop
- **GitHub Pages**: subir o repositório e ativar Pages na branch `main`
Depois, apontar o domínio próprio nas configurações da hospedagem.
