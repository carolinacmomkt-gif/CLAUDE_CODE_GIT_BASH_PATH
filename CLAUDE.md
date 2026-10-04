# Sistema de Conteúdo — Carol Lima

Sistema de gestão de conteúdo para o perfil pessoal da Carol. HTML, CSS e JavaScript puros, **sem build e sem frameworks**. Tudo em português do Brasil, sem emojis na interface (ícones SVG de traço fino).

## Como rodar

```
npm start        # = npx serve . -l 3000  → abra http://localhost:3000
```

Precisa de servidor (não abrir o `index.html` direto pelo arquivo) para as imagens e o IndexedDB funcionarem.

## Estrutura

```
index.html              casca da página (menu, topo, gaveta, lightbox) e a ordem dos scripts
css/styles.css          todo o visual, modo claro e escuro (variáveis em :root)
js/                     scripts clássicos (não são módulos ES): compartilham variáveis globais,
                        então a ORDEM em index.html importa
  icones.js             IC e ic(): ícones SVG
  dados-tecnicas.js     TECHS, OPTS, TONE, SCHEMAS (campos de posts, anúncios, fases etc.)
  estado.js             KEY, seed(), S (estado), completarPadroes(), save(), helpers ($, esc, fmtD, toast…)
  capas.js              Capas: upload de capa em IndexedDB, arrastar e soltar, coverSrc()
  persistencia.js       exportarBackup(), importarBackup(), backupSemanal()
  guia.js               STAGES, STEPS (23 passos em 6 etapas), journey(), alerts()
  dados-conhecimento.js SRC e KB (34 estratégias da Luana Carolina)
  dados-referencias.js  PINMAP0, IGX, PINB, PLANREF, PLAN30; im() aponta para assets/
  views-base.js         PAGES, nav(), go(), render(), VIEWS: início, jornada, calendário, conteúdos
  views-producao.js     escrever, preview do feed, análise
  views-estrategia.js   coleção genérica, stories, posicionamento, lançamentos, anúncios
  views-conhecimento.js conhecimento, referências, técnicas
  ficha.js              gaveta de edição (openItem, newItem, closeDrawer)
  eventos.js            click, input, change, teclado, tema
  main.js               inicialização (carrega capas, render, backup semanal)
assets/exemplos/        59 stories reais de @luanacarolinastories (nome: <código>_<n>.jpg)
assets/pinterest/       54 pins do Pinterest da Luana, por pasta (aesthetic_…, r-o-o-m_… etc.)
fonts/                  opcional: Neue Montreal (.otf)
```

## Dados e persistência

- Estado em `localStorage`, chave **`carol-sistema-v1`** (não mudar a chave).
- Backup: botões **Exportar** e **Importar** no topo geram/leem um JSON com tudo, incluindo as capas enviadas (campo `_capas`). Importar substitui os dados do navegador, com confirmação.
- Backup automático: uma vez a cada 7 dias o navegador baixa `backup-semanal-conteudo-AAAA-MM-DD.json` ao abrir o sistema (só se houver dados). O controle fica em `carol-sistema-v1-ultimo-backup`.
- Capas: o campo "Capa" do conteúdo aceita arrastar imagem (reduzida a 1080 px, guardada no IndexedDB `carol-sistema-capas`, referência `idb:<id>` em `post.cover`) ou URL. Imagens sem uso são apagadas do IndexedDB (`Capas.limpar()`).

## Regras

- Não alterar os textos das estratégias (`KB`) nem os exemplos da Luana (`IGX`, `PINB`, `PLAN30`).
- Sem emojis, sem frameworks pesados (no máximo Vite, se algum dia for necessário).
- Paleta: marrom `#4a3426`, caramelo `#8a6a52`, bege `#efe5d8` e `#d9c7b3`, off-white `#fffdf9`. Títulos em Neue Montreal, texto na fonte do sistema.
- Novo script JS: criar em `js/` e incluir em `index.html` na ordem certa (dados antes de views, views antes de eventos, `main.js` por último).

## Neue Montreal

A fonte é comercial e não está no repositório. O CSS usa a fonte instalada no computador (`local()`). Para embutir: copiar `PPNeueMontreal-Regular.otf`, `-Medium.otf` e `-Bold.otf` para `fonts/` e descomentar os `url(...)` em `css/styles.css` (dentro dos `@font-face`).
