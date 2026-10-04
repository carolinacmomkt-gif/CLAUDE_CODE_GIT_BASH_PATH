# Sistema de Conteúdo — Carol Lima

Sistema de gestão de conteúdo para o perfil pessoal da Carol. HTML, CSS e JavaScript puros, **sem build e sem frameworks**. Tudo em português do Brasil, sem emojis na interface (ícones SVG de traço fino).

## Como rodar

```
npm start              # servidor simples da pasta public/  → http://localhost:3000 (sem login e sem IA)
npm run dev            # Netlify Dev: roda também o login e o assistente (precisa das variáveis abaixo num arquivo .env)
npm run test:servidor  # testes do login e da função da IA
```

Precisa de servidor (não abrir o `index.html` direto pelo arquivo) para as imagens e o IndexedDB funcionarem.

## Estrutura

```
public/                 tudo o que o Netlify publica
  index.html            casca da página (menu, topo, gaveta, assistente, lightbox) e a ordem dos scripts
  css/styles.css        visual, modo claro e escuro (variáveis em :root)
  js/                   scripts clássicos (não são módulos ES): compartilham variáveis globais,
                        então a ORDEM em index.html importa
    icones.js           IC e ic(): ícones SVG
    dados-tecnicas.js   TECHS, OPTS, TONE, SCHEMAS (campos de posts, anúncios, fases etc.)
    estado.js           KEY, seed(), S (estado), completarPadroes(), save(), helpers ($, esc, fmtD, toast…)
    idb.js              IndexedDB (banco carol-sistema-capas, v2): gavetas "capas" e "anexos"
    capas.js            Capas: upload de capa, arrastar e soltar, coverSrc()
    anexos.js           Anexos: links externos e arquivos anexados ao conteúdo; limparArquivos()
    persistencia.js     exportarBackup(), importarBackup(), backupSemanal()
    guia.js             STAGES, STEPS (23 passos em 6 etapas), journey(), alerts()
    dados-conhecimento.js  SRC e KB (34 estratégias da Luana Carolina)
    dados-referencias.js   PINMAP0, IGX, PINB, PLANREF, PLAN30; im() aponta para assets/
    views-*.js          páginas (base, produção, estratégia, conhecimento)
    ficha.js            gaveta de edição (openItem, newItem, closeDrawer)
    eventos.js          click, input, change, teclado, tema
    assistente.js       Chat: conversa com a IA (usa KB como "métodos")
    sessao.js           botão Sair (só aparece com o login do Netlify)
    main.js             inicialização (carrega capas, render, backup semanal)
  assets/exemplos/      59 imagens de @luanacarolinastories (nome: <código>_<n>.jpg)
  assets/pinterest/     54 pins do Pinterest da Luana (nome: <pasta>_<id>.jpg)
  fonts/                opcional: Neue Montreal (.otf)
netlify/
  edge-functions/auth.js  login: nada é entregue sem sessão (página, JS, imagens)
  functions/ia.mjs        assistente de IA (SDK da Anthropic, resposta em fluxo)
  lib/                    sessao.js (cookie assinado) e login-html.js (tela de login)
tests/servidor.test.mjs   testes do login e da IA (com API falsa)
scripts/baixar_referencias.py  baixa as fotos de referência em qualidade maior
netlify.toml            publica public/ e aponta a pasta de funções
```

## Dados e persistência

- Estado em `localStorage`, chave **`carol-sistema-v1`** (não mudar a chave).
- Backup: botões **Exportar** e **Importar** no topo geram/leem um JSON com tudo, incluindo as capas enviadas (campo `_capas`). Importar substitui os dados do navegador, com confirmação.
- Backup automático: uma vez a cada 7 dias o navegador baixa `backup-semanal-conteudo-AAAA-MM-DD.json` ao abrir o sistema (só se houver dados). O controle fica em `carol-sistema-v1-ultimo-backup`.
- Links e anexos: na ficha do conteúdo, `post.links` ([{t,u}], só http/https) e `post.anexos` ([{id,nome,tipo,tam}], arquivo no IndexedDB, até 50 MB). Entram no backup (`_anexos`).
- Capas: o campo "Capa" do conteúdo aceita arrastar imagem (reduzida a 1080 px, guardada no IndexedDB `carol-sistema-capas`, referência `idb:<id>` em `post.cover`) ou URL. Imagens sem uso são apagadas do IndexedDB (`Capas.limpar()`).

## Login e IA no Netlify

Publicar pelo Git (Netlify conectado ao repositório, branch `claude-sistema`); arrastar pasta não leva as funções. Variáveis em Site configuration, Environment variables:

- `SITE_PASSWORD` (obrigatória): senha de entrada. Sem ela o site fica fechado e mostra o aviso.
- `AUTH_SECRET` (opcional): segredo que assina o cookie. Se faltar, usa a senha (trocar a senha desloga todo mundo).
- `ANTHROPIC_API_KEY`: chave da API para o assistente. A chave nunca vai para o navegador.
- `ANTHROPIC_MODEL` (opcional, padrão `claude-opus-5-5`) e `IA_FALLBACK=0` (desliga o fallback automático em caso de recusa).

Login: cookie `carol_sessao` (HttpOnly, assinado, 30 dias se marcar "Manter acesso", senão até fechar o navegador) e `carol_logado` (sem segredo, só para mostrar o botão Sair). Os dados do sistema continuam no navegador (localStorage e IndexedDB), o login protege o acesso ao site, não cifra esses dados.

Assistente: `Chat` envia a conversa, o texto de `KB` (métodos) e a versão atual do conteúdo para `/api/ia`. O prompt dos métodos é cacheado no servidor. O servidor valida sessão e tamanho dos pedidos.

## Referências em qualidade maior

`python3 scripts/baixar_referencias.py` (ver o cabeçalho do arquivo) troca as miniaturas por imagens maiores mantendo os mesmos nomes. Rodar no computador da Carol, porque o ambiente de desenvolvimento não alcança Instagram nem Pinterest.

## Regras

- Não alterar os textos das estratégias (`KB`) nem os exemplos da Luana (`IGX`, `PINB`, `PLAN30`).
- Sem emojis, sem frameworks pesados (no máximo Vite, se algum dia for necessário).
- Paleta: marrom `#4a3426`, caramelo `#8a6a52`, bege `#efe5d8` e `#d9c7b3`, off-white `#fffdf9`. Títulos em Neue Montreal, texto na fonte do sistema.
- Novo script JS: criar em `public/js/` e incluir em `index.html` na ordem certa (dados antes de views, views antes de eventos, `main.js` por último).

## Neue Montreal

A fonte é comercial e não está no repositório. O CSS usa a fonte instalada no computador (`local()`). Para embutir: copiar `PPNeueMontreal-Regular.otf`, `-Medium.otf` e `-Bold.otf` para `public/fonts/` e descomentar os `url(...)` em `public/css/styles.css` (dentro dos `@font-face`).
