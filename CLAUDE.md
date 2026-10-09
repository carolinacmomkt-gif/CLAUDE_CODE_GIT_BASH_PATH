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
  - `assets/video/`: vídeo do topo, gravação de tela da central (85 s, sem som). `central.mp4`/`.webm` (1280 px) para o computador, `central-720.mp4`/`.webm` para o celular e `central-poster.jpg` como capa. Toca sozinho, sem som e em repetição, pausa fora da tela e não toca sozinho com movimento reduzido. Para trocar o vídeo, gerar os 4 arquivos e a capa com o ffmpeg (H.264 crf 28/29 com `+faststart` e VP9 crf 40)

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

Complementos, dentro da seção da oferta: **Banco de 200 ganchos** (R$ 9,99, `CONFIG.checkout.ganchos`, botão "Quero só os ganchos", para quem veio só por eles) e **Documentação de agência** (R$ 17,00, `CONFIG.checkout.documentacao`), cada um com botão e link próprio na Hubla. Embaixo dos cards: "Você também pode escolhê-los no checkout, junto com a Organiza SM." A apresentação no Canva saiu da página.

Checkout: **Hubla**. Os links ficam em `CONFIG.checkout` (`assets/js/main.js`): `central` (botão da oferta), `ganchos` e `documentacao` (cards dos complementos). Cada botão usa `data-checkout="<nome>"`. O script de rastreamento da Hubla (`data.hub.la/hub.min.js`) fica no `<head>` do `index.html`. O link de dúvidas no WhatsApp fica em `CONFIG.contato.whatsapp`: https://wa.me/message/NFKQBSU3F4QRB1. Todos os outros botões levam para a oferta (#oferta).

## Estrutura da página (9 seções)
Topbar ("Oferta de lançamento até 27 de novembro", sem preço) e depois:

1. **Hero**: título em uma frase ("Pare de gerenciar clientes pelo WhatsApp."), subtítulo "Comece a trabalhar como agência.", vídeo real da central (gravação de tela da Carol, em `assets/video/`), botão com o preço (a única vez que o preço aparece na primeira dobra), âncora "R$ 286 se você montasse por fora", letra miúda "pagamento único · 7 dias de garantia" e a frase da Carol. No celular de 375px, promessa, print e botão aparecem sem rolar.
2. **Depoimentos**: prints reais em `assets/img/depoimentos/` (computador 3 + 2, tablet 2 por linha, celular carrossel)
3. **O que tem dentro**: demonstração da central (5 abas que trocam sozinhas, clientes de exemplo), os 7 setores com uma linha cada e "e vem junto" (scripts, ganchos, prompts, relatório, planilha, mensagens)
4. **Antes x depois**
5. **Quem criou** (Carol Lima: foto, história, +20 clientes, agência que atende clientes da área da saúde). Mantida a pedido da Carol, sem botão (a oferta vem logo depois)
6. **Oferta**: prazo (27 de novembro), três blocos sem preço por item, R$ 286 riscado, preço, botão, Pix/cartão, WhatsApp, e embaixo os complementos
7. **Garantia**
8. **FAQ** com 5 perguntas: pagar pelo Notion, saber usar o Notion, celular, preço depois do lançamento, e se eu não gostar
9. **Fechamento**

Rodapé e barra fixa no celular continuam. Saíram: lista de dores, custo da bagunça, números do produto, artigos longos dos setores, um dia com a central, como funciona, para quem é.

Chamadas para a oferta: hero, o que tem dentro, garantia e fechamento. Padrão: `<div class="cta">` com `.btn.btn-go` e `.cta-note`. Em seção escura use `.btn-caramel`. Não colocar duas chamadas seguidas sem conteúdo entre elas.

Se a central mudar no Notion (nomes de setores, status, número de perguntas), atualize a demonstração e os números.

## Pendências
- [x] Checkout da Hubla em `CONFIG.checkout.central`: https://pay.hub.la/Z31VtTvN6YhrGbSagzjr (mesmo ID do antigo combo; confirmar na Hubla que cobra R$ 29,90 e entrega tudo)
- [x] Foto da Carol em `assets/img/carol.jpg` (ensaio do Drive, IMG_4124, recortada em 4:5)
- [x] Texto "Quem criou": +20 clientes ao mesmo tempo, hoje tem uma agência que atende clientes da área da saúde (sem citar o nome da agência)
- [x] Prints reais em `assets/img/` (central e documentacao)
- [ ] Confirmar na Hubla que o link da documentação (39kx7Twy2nnGIc9V8auD) cobra R$ 17,00 (era R$ 12,99) e que os dois complementos estão como adicionais no checkout da Organiza SM
- [x] Depoimentos: 5 prints de mensagens enviados pela Carol em `assets/img/depoimentos/`
- [x] Link do WhatsApp em `CONFIG.contato.whatsapp`
- [ ] Garantia: a página usa 7 dias em todo lugar. O pedido da reformulação citava 30 dias na letra miúda; se a Hubla estiver configurada para 30, trocar em todos os lugares de uma vez
- [ ] Depois de 27 de novembro: trocar o preço ou o prazo (topbar, oferta e FAQ)
- [x] Ganchos: são 200, no produto e no banco avulso
- [ ] `og:image` 1200x630
- [ ] Confirmar que a central funciona no plano gratuito do Notion (o FAQ afirma isso)
- [x] E-mail de suporte no rodapé: suporteorganizasm@gmail.com
- [ ] Termos de uso e política de privacidade (links removidos do rodapé até as páginas existirem)
- [x] Pixel da Meta ativo: 1615387966657882. O código oficial está no `<head>` do `index.html` (PageView). O `main.js` usa o mesmo ID em `CONFIG.rastreamento.metaPixel` para ViewContent e InitiateCheckout. Trocar o ID nos dois lugares. A compra (Purchase) é registrada pela Hubla: configurar o mesmo pixel no produto lá
- [ ] GA4 e TikTok, se quiser: colar os IDs em `CONFIG.rastreamento`
- [ ] Banner de cookies (LGPD) com os pixels ativos

## Regras
- Nunca inventar depoimentos, números de vendas, alunas ou resultados. Depoimento só com print real enviado pela Carol.
- Sem "de R$ 357" e sem contador regressivo. A ancoragem é R$ 286 (o que custaria montar por fora) contra R$ 29,90, e o prazo é uma data escrita: 27 de novembro.
- Texto: português do Brasil, tom de conversa, segunda pessoa, frases curtas, sem emoji em título. Proibido: travessão; negação seguida de revelação ("não é sobre X, é sobre Y"); "isso muda tudo"; sujeito vago ("ninguém", "todo mundo", "pouca gente", "tem gente que"); "sem perceber", "nem percebeu"; caminhada, aprofundamento, clareza, às vezes, na prática, "real" como reforço; estrangeirismo quando há palavra em português (exceto nomes de campos do Notion); promessa de vantagem por entender antes dos outros; "porque" encadeado.
- Manter mobile-first: testar em 375px de largura.
- Acessibilidade: contraste AA, `alt` em todas as imagens (nos depoimentos, o texto da mensagem), respeitar `prefers-reduced-motion`.

## Publicar
O site está publicado na **Netlify direto do repositório** (branch `claude`). O `netlify.toml` define a pasta publicada e esconde `CLAUDE.md`, `README.md`, `netlify.toml`, `.git/` e `.claude/` (respondem 404 com a página `404.html`). Arquivo interno novo na raiz precisa de uma regra igual no `netlify.toml`.

Qualquer hospedagem estática serve:
- **Vercel**: `npx vercel` na pasta do projeto
- **Netlify**: arrastar a pasta em app.netlify.com/drop
- **GitHub Pages**: subir o repositório e ativar Pages na branch `main`
Depois, apontar o domínio próprio nas configurações da hospedagem.
