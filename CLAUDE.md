# Organiza SM · página de vendas

Página de vendas do **Organiza SM**, o sistema no Notion para social medias que já têm carteira de clientes.
Produto da Carol Lima. **Não tem relação com a Agência Essence**: nunca citar Essence, clientes da Essence ou dados internos.

## Stack
- HTML + CSS + JS puro, sem build. Abrir `index.html` no navegador já funciona.
- Fontes: Fraunces (títulos) e DM Sans (texto), via Google Fonts.
- Arquivos:
  - `index.html`: toda a página, seção por seção, com comentários `<!-- ===== SEÇÃO ===== -->`
  - `assets/css/style.css`: estilos. Cores e raios ficam nas variáveis do `:root`
  - `assets/js/main.js`: **links de checkout** (objeto `CONFIG`), link do WhatsApp, pixels, vídeo da central (seção dos 7 setores), barra fixa no celular, animações e FAQ
  - `assets/img/`: foto da Carol, prints do Notion, mockups (`mockup-kit.webp` no topo do computador e `mockup-kit-celular.webp` no topo do celular, via `<picture>`; `mockup-oferta.webp` no preço; `mockup-central.webp` só no JSON-LD) e, em `depoimentos/`, os prints das mensagens das clientes
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
Um produto só, a **Organiza SM completa**, por **R$ 29,90** (pagamento único). **O preço só aparece na seção de compra (#oferta)** e não se fala mais em oferta de lançamento nem em prazo. Não existe mais "de R$ 357" nem combo: a planilha financeira vem junto no produto.

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

## Estrutura da página (versão de 21/10/2026, texto final da Carol)
- **Título da aba:** "Organiza SM | Sistema no Notion para social media organizar clientes". **Meta description:** "Central pronta no Notion para social media organizar clientes, planejamento de conteúdo, aprovações e leads. Com +100 scripts para conseguir clientes. R$ 29,90." (o único preço fora da compra, só no Google)
- **Botões:** todos levam para o bloco de preço (#oferta) e dizem "Quero organizar minha carteira", menos a garantia ("Quero testar por 7 dias") e o fechamento ("Quero parar de surtar"). Só o botão do preço ("Quero a Organiza SM completa") e os dos complementos vão para o checkout
- **Alt das imagens:** com termo de busca ("central de clientes no Notion para social media" etc.)

1. **Topo**: H1 pequeno "Sistema no Notion para social media", H2 grande "Se você já pensou em largar tudo e virar CLT, senta aqui.", a frase "Eu já gerenciei mais de 20 clientes ao mesmo tempo..." (sem foto), mockup com tudo que vem (tablet com a planilha, notebook com a central, relatório, celular com a ficha e 3 capas de ebook com fotos da Carol no estilo do Instagram dela: scripts, ganchos e prompts; `mockup-kit.webp` no computador e `mockup-kit-celular.webp`, com capas maiores e sem o relatório, no celular, a 90% da largura), botão e "Pix ou cartão · compra segura · 7 dias de garantia". Sem lista de itens. Em 375×667 tudo aparece sem rolar, na ordem texto, mockup, botão
2. **Os 7 setores**: "Como organizar os clientes de social media num lugar só", o vídeo da central grande em cima (até 1000 px; só carrega quando aparece na tela) e embaixo os 7 setores em cartões (4 + 3 no computador, 2 por linha no tablet, um embaixo do outro no celular)
3. **Antes e depois**: 6 pares "Hoje / Com a central" (no celular, cada par vira um cartão)
4. **Bônus** (fundo escuro): 6 cartões, cada um com uma mini tela ilustrativa feita em HTML (scripts, ganchos, prompts, relatório, planilha, mensagens) e botão. No celular, carrossel
5. **Prova**: "+20 clientes ao mesmo tempo · 1 agência construída com esse sistema" (no celular, dois cartões lado a lado) e os 5 prints (senha e orçamento primeiro). O espaçamento colado no preço usa `.sec.sec-proof` e `.sec.sec-price` para vencer o padding padrão do celular
6. **Preço** (colado na prova, mesmo fundo; único lugar com preço na página): "Hoje você leva", 6 itens, mockup da central com os bônus (`assets/img/mockup-oferta.webp`), ~~R$ 286~~ R$ 29,90, botão para o checkout e "Pix ou cartão · compra segura pela Hubla · central na hora, scripts no 7º dia · 7 dias de garantia". O cartão inteiro cabe numa tela de celular (testado em 360×640). Embaixo: link do WhatsApp e os complementos (ganchos e documentação, sem mudança)
7. **Garantia**: selo, título e botão
8. **FAQ** com 4 perguntas: saber usar o Notion, celular, como recebo o acesso (scripts no 7º dia), serve pra quem está começando
9. **Fechamento**: título e botão "Quero parar de surtar"
10. **Rodapé**: © Organiza SM, aviso da marca Notion e e-mail de suporte, sem botão. A barra fixa no celular continua

Saíram: "Oi, eu sou a Carol" (Quem criou), a demonstração com abas, o "e vem junto", a pergunta sobre pagar o Notion e a de "e se eu não gostar". Os mockups foram montados com telas do vídeo da Carol, sem sombra embutida (a sombra é feita no CSS com `drop-shadow`, que acompanha o contorno) (página inicial e ficha do cliente); para refazer, ver `assets/img/` e gerar de novo a partir de um print.

## SEO e IAs (ChatGPT, Claude, Perplexity, Gemini)
Nada garante que uma IA recomende o produto: elas respondem com o que encontram na internet (o site e o que falam dele em outros lugares). O que está feito no site:
- `robots.txt` liberando buscadores e robôs de IA (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended etc.) e apontando para o `sitemap.xml`
- `llms.txt`: resumo do produto em texto simples para IAs (o que é, para quem, o que vem, preço, compra, links). **Atualizar quando a oferta mudar**
- No `<head>` do `index.html`: canonical, robots, Open Graph com `assets/img/og-image.jpg` (1200x630) e dados estruturados JSON-LD (Product com preço, FAQPage com as perguntas do FAQ e WebSite). **Se mudar o preço ou o FAQ, mudar o JSON-LD também.** Sem avaliações (`aggregateRating`) no JSON-LD: só colocar com avaliações reais
- Tudo aponta para `https://organizasm.netlify.app/`. Se comprar domínio próprio, trocar em canonical, og:url, og:image, JSON-LD, `robots.txt`, `sitemap.xml` e `llms.txt`
- Google Search Console verificado em 21/10/2026 (propriedade de prefixo `https://organizasm.netlify.app/`) com o arquivo `google542f53483e7b73d1.html` na raiz. **Nunca apagar esse arquivo**: sem ele o Google perde a verificação
- Bing Webmaster Tools: arquivo `BingSiteAuth.xml` na raiz. **Nunca apagar** também
- Fora do site (Carol): cadastrar no Google Search Console e no Bing Webmaster Tools (a busca do ChatGPT usa o Bing) e enviar o sitemap; conseguir menções em outros lugares (Instagram, YouTube, blogs, grupos, Reddit) com o nome "Organiza SM" e a frase "sistema no Notion para social media"

## Página de WhatsApp (link de bio para campanhas)
`whatsapp/index.html`, publicada em **organizasm.netlify.app/whatsapp**. Feita como uma página do Notion: capa da marca ("Organiza SM · seu escritório"), foto da Carol como ícone, título "Me conta como está a sua carteira hoje.", botão "Chamar no WhatsApp" (mesmo link de `CONFIG.contato.whatsapp`), perguntas de exemplo como etiquetas do Notion, um print de depoimento real e dois atalhos para o site (#produto e #oferta), sem preço. Tem o mesmo Pixel da Meta: PageView ao abrir e **Contact** ao clicar no WhatsApp. UTMs e fbclid da campanha seguem para os links do site. `noindex` para não aparecer no Google. No celular, o botão do WhatsApp aparece sem rolar. Se o link do WhatsApp mudar, trocar aqui e no `main.js`.

## Pendências
- [x] Checkout da Hubla em `CONFIG.checkout.central`: https://pay.hub.la/Z31VtTvN6YhrGbSagzjr (mesmo ID do antigo combo; confirmar na Hubla que cobra R$ 29,90 e entrega tudo)
- [x] Foto da Carol em `assets/img/carol.jpg` (ensaio do Drive, IMG_4124, recortada em 4:5)
- [x] Texto "Quem criou": +20 clientes ao mesmo tempo, hoje tem uma agência que atende clientes da área da saúde (sem citar o nome da agência)
- [x] Prints reais em `assets/img/` (central e documentacao)
- [ ] Confirmar na Hubla que o link da documentação (39kx7Twy2nnGIc9V8auD) cobra R$ 17,00 (era R$ 12,99) e que os dois complementos estão como adicionais no checkout da Organiza SM
- [x] Depoimentos: 5 prints de mensagens enviados pela Carol em `assets/img/depoimentos/`
- [x] Link do WhatsApp em `CONFIG.contato.whatsapp`
- [ ] Garantia: a página usa 7 dias em todo lugar. O pedido da reformulação citava 30 dias na letra miúda; se a Hubla estiver configurada para 30, trocar em todos os lugares de uma vez
- [x] Ganchos: são 200, no produto e no banco avulso
- [x] `og:image` 1200x630 em `assets/img/og-image.jpg`
- [ ] Confirmar na Hubla a entrega dos scripts no 7º dia (a página e o FAQ prometem isso) e que os ganchos vêm separados por nicho
- [ ] Confirmar que a central funciona no plano gratuito do Notion (o FAQ afirma isso)
- [x] E-mail de suporte no rodapé: suporteorganizasm@gmail.com
- [ ] Termos de uso e política de privacidade (links removidos do rodapé até as páginas existirem)
- [x] Pixel da Meta ativo: 1615387966657882. O código oficial está no `<head>` do `index.html` (PageView). O `main.js` usa o mesmo ID em `CONFIG.rastreamento.metaPixel` para ViewContent e InitiateCheckout. Trocar o ID nos dois lugares. A compra (Purchase) é registrada pela Hubla: configurar o mesmo pixel no produto lá
- [ ] GA4 e TikTok, se quiser: colar os IDs em `CONFIG.rastreamento`
- [ ] Banner de cookies (LGPD) com os pixels ativos

## Regras
- Nunca inventar depoimentos, números de vendas, alunas ou resultados. Depoimento só com print real enviado pela Carol.
- Preço só na seção de compra. Sem "oferta de lançamento", sem prazo, sem "de R$ 357" e sem contador. A ancoragem é R$ 286 (o que custaria montar por fora) contra R$ 29,90, dentro da oferta. Exceção: o print do depoimento 2 mostra "R$ 29,90" (é a mensagem real da cliente)
- Texto: português do Brasil, tom de conversa, segunda pessoa, frases curtas, sem emoji em título. Proibido: travessão; negação seguida de revelação ("não é sobre X, é sobre Y"); "isso muda tudo"; sujeito vago ("ninguém", "todo mundo", "pouca gente", "tem gente que"); "sem perceber", "nem percebeu"; caminhada, aprofundamento, clareza, às vezes, na prática, "real" como reforço; estrangeirismo quando há palavra em português (exceto nomes de campos do Notion); promessa de vantagem por entender antes dos outros; "porque" encadeado.
- Manter mobile-first: testar em 375px de largura.
- Acessibilidade: contraste AA, `alt` em todas as imagens (nos depoimentos, o texto da mensagem), respeitar `prefers-reduced-motion`.

## Segurança (auditoria de 18/10/2026)
Site estático, sem servidor, login, banco de dados, upload ou formulário: os itens de backend não se aplicam. O que foi conferido e feito:
- Nenhuma chave, senha ou `.env` no código nem no histórico do Git (só valores de teste no outro projeto, branch `claude-sistema`). O ID do Pixel e o código `wk_` da Hubla são públicos por natureza
- Parâmetros da URL (UTMs) só entram nos links como parâmetros codificados, e só os de rastreamento. Sem `innerHTML` com dado de fora
- Cabeçalhos de segurança no `netlify.toml` (nosniff, proibido embutir em outro site, Referrer-Policy, Permissions-Policy, HSTS e CSP básico). O CSP não restringe scripts para não quebrar Pixel e Hubla
- Arquivos internos respondem 404 (regras no `netlify.toml`)
- O repositório no GitHub é **público**: o código e este arquivo ficam visíveis lá. Recomendado deixar privado (a Netlify continua publicando)

## Publicar
O site está publicado na **Netlify direto do repositório** (branch `claude`). O `netlify.toml` define a pasta publicada e esconde `CLAUDE.md`, `README.md`, `netlify.toml`, `.git/` e `.claude/` (respondem 404 com a página `404.html`). Arquivo interno novo na raiz precisa de uma regra igual no `netlify.toml`.

Qualquer hospedagem estática serve:
- **Vercel**: `npx vercel` na pasta do projeto
- **Netlify**: arrastar a pasta em app.netlify.com/drop
- **GitHub Pages**: subir o repositório e ativar Pages na branch `main`
Depois, apontar o domínio próprio nas configurações da hospedagem.
