/* ============ BANCO DE CONHECIMENTO ============
   Fontes: ED = Execução Digital 3.0 (resumos dos módulos), SPE = Stories para Enriquecer (resumos e planner),
   RC = aula ao vivo Rafael Censon (copy e ofertas), WEB = pesquisa pública (indicada em cada artigo).
   Textos reescritos/resumidos para estudo; citações curtas entre aspas. */
const SRC={ED:'Execução Digital 3.0',SPE:'Stories para Enriquecer',RC:'Aula Rafael Censon · Execução Digital',WEB:'Pesquisa pública'};
const KB=[
/* ---------------- FUNDAMENTOS ---------------- */
{id:'k-guia',cat:'Fundamentos',tech:'guia',src:['ED'],title:'Método Guia',
 sum:'Pessoas seguem guias para errar menos. Você não precisa estar no topo; precisa conhecer o caminho um pouco melhor que quem está começando e assumir esse papel.',
 body:`## A ideia central
Todo ser humano procura guias. Queremos a experiência e a segurança de alguém que já percorreu o caminho que queremos fazer. Quando alguém já passou pela trilha, nossas chances de errar caem muito.
## Familiaridade gera segurança
Dirigir pelo caminho de sempre é automático: você conhece até os buracos. Na praia, deixamos nossas coisas perto de um vizinho, mesmo que não seja próximo, porque ele é familiar. Tudo que traz familiaridade ou experiência traz segurança, e é isso que o seguidor busca em você.
## Você não precisa ser o melhor
O seguidor quer acesso ao básico. Se você é "meio bom" em algo, já pode ensinar quem está atrás de você. Um criador gera autoridade quando assume o papel de guia, não quando atinge a perfeição.
## Como descobrir do que você é guia
- Em que assunto você se destaca no seu meio? Sobre o que as pessoas te procuram?
- No que você era boa na infância, na escola, no trabalho?
- Que conteúdo você consome por vontade própria (vídeos, livros, perfis)?
- Quantas pessoas querem um guia nesse assunto? Alguém pagaria por ele?
## Nicho e subnicho
> Num safari, você confiaria no guia que faz isso há dez anos ou no barman que às vezes cobre a folga dele?
Nicho é o assunto em que você é guia; subnicho é o recorte (ex.: nutrição → nutrição esportiva para atletas de alta performance). Quanto mais você fala do mesmo assunto, mais forte fica a mensagem.
## Na prática para a Carol
Escreva: "Eu guio ___ de ___ até ___". Para o seu contexto, isso passa por quem já tem operação de conteúdo e perdeu a clareza da própria comunicação.`,
 apply:['Completar a frase do guia em Posicionamento','Listar 3 assuntos em que já te procuram','Revisar se a bio comunica esse papel']},

{id:'k-destino',cat:'Fundamentos',tech:'destino',src:['ED'],title:'Destino final',
 sum:'As pessoas compram para chegar a algum lugar. Todo o seu conteúdo precisa convergir para uma promessa clara, senão você mostra a girafa para quem veio ver o leão.',
 body:`## Todo mundo quer chegar a algum lugar
Uma joia é compra de imagem e autoridade social. Um salão de beleza é compra de autoestima. Um planner é compra de produtividade. Entender o destino deixa claro que narrativa, palavras e descrição usar.
## O erro mais comum
Criar conteúdo que o seguidor não se importa. Quem quer ganhar massa magra não precisa de um guia que fala de sapato e velocidade da esteira. O conteúdo pode ser bom, mas não serve àquele destino.
> "O seu desejo não foi atendido, a girafa pouco importa se o seu objetivo era ver o leão."
## O destino precisa estar visível
Quem acompanha a Luana sabe que vai sair mais produtiva, com mais autoridade e mais resultado na criação de conteúdo. Seguir alguém precisa ter uma vantagem clara.
## Como descobrir o destino da audiência
- Pergunte (caixinha de perguntas)
- Observe (leia comentários)
- Perceba o que gera mais resposta nos seus conteúdos
- Sem audiência: faça isso nos perfis das suas referências
## Teste rápido
Quando alguém chega no seu perfil, entende o que você ensina e para onde leva? Os conteúdos se conectam numa mesma direção ou estão soltos?`,
 apply:['Escrever o destino final em Posicionamento','Revisar os últimos 9 posts com o filtro "leva ao destino?"','Preencher o campo "Como leva ao destino" em cada conteúdo']},

{id:'k-metodologia',cat:'Fundamentos',tech:'guia',src:['ED'],title:'Um caminho só: método e trajetória',
 sum:'Quem segue vários métodos ao mesmo tempo demora mais. O guia escolhe um caminho, percorre até o fim e mostra ao seguidor cada obstáculo dele.',
 body:`## Por que um caminho só
Existem muitas estradas para a praia, mas quem fica trocando de estrada no meio da viagem chega mais tarde. Abandonar um processo no meio custa tempo e energia para recomeçar.
## Convicção vem de ter percorrido
O guia conhece cada lombada e cada pedágio porque já passou por lá. É essa convicção que dá segurança ao seguidor, e é o que permite que ele meça o próprio progresso.
## O conteúdo infinito
Fale todo dia sobre o trajeto: quem você era antes, os problemas que surgiram, como resolveu. Se o seguidor diz que não tem dinheiro para equipamento, mostre como você conseguiu equipamento sem dinheiro.
> "Não fale de coisas que nunca foram um problema."
## Micro provas
Ajude o seguidor a resolver os pequenos problemas do caminho, todo dia. Cada problema resolvido é uma micro prova de que o seu método funciona e aumenta a confiança nele.
## O produto é só uma ferramenta
Curso, mentoria e serviço são meios de levar o seguidor ao destino. Quando ele chega longe com o conteúdo gratuito, pensa: "imagina com o pago?".`,
 apply:['Nomear o seu método (ex.: as etapas que você sempre usa com clientes)','Listar 10 obstáculos que seu cliente encontra no caminho']},

/* ---------------- CONTEÚDO ---------------- */
{id:'k-trajetoria',cat:'Conteúdo',tech:'trajetoria',src:['ED'],title:'Trajetória e storytelling',
 sum:'Sua história é o tesouro onde mora todo o seu conteúdo. Conte problemas sempre acompanhados da solução e documente a jornada enquanto ela acontece.',
 body:`## Transformar o ouro em joia
As queixas mais comuns são "não sei o que postar", "não sei storytelling", "tenho vergonha", "não tenho criatividade". A resposta é olhar para trás: o que te ajudou a chegar aqui, onde pensou em desistir, que obstáculos enfrentou.
## Exemplo da Luana
Quando começou, criaram grupos no Facebook só para zombar dela. Ela sentiu raiva, respirou e continuou. Um fato real que virou storytelling, com a virada no final.
## Não sangre num tanque de tubarões
Mostrar fraqueza em excesso afasta. Toda fraqueza exposta precisa vir com a solução que você encontrou. Nenhuma ponta solta.
> "Um bom escritor nunca inclui uma arma num livro se não tiver intenção de usá-la."
## Documente
Se você ainda não chegou ao destino, documente a jornada. O passado pode ser a manhã de hoje: "estava desanimada e mesmo assim gravei, e foi assim que fiz". Mostre decisões e consequências.
## Conteúdo intencional
Não compartilhe partes da vida que não agregam ao seguidor. Cada conteúdo precisa ter algo que ele consegue extrair.`,
 apply:['Cadastrar 5 histórias no Banco de histórias','Transformar 1 história por semana em conteúdo IHC']},

{id:'k-bda',cat:'Conteúdo',tech:'bda',src:['ED','SPE'],title:'Método BDA: Básico, Didático, Aplicável',
 sum:'O critério que a Luana usa para explicar qualquer coisa. Gera entendimento, aplicação, resultado e, por consequência, prova social.',
 body:`## B · Básico
Ela achava que parecer inteligente era explicar de forma complexa. Erro. Sem o básico não existe o complexo. Quem chega hoje não sabe o que você sabe; siglas e jargões fazem a pessoa se sentir excluída.
> "Se você não pode explicar algo de maneira simples, é porque não entende bem o suficiente."
## D · Didático
Didática é a estrutura da explicação. Use analogias, exemplos do dia a dia, ordem lógica. A referência dela de didática é o Clóvis de Barros. Ela diz que seus resultados mudaram quando mudou a forma de explicar.
## A · Aplicável
Se a pessoa consegue aplicar, ela aplica, lembra de você e volta com feedback. Esse retorno vira prova social e ativa a reciprocidade. A pessoa pode até virar divulgadora.
## Exemplo nos stories
Na caixinha "O que eu faria se...", ela responde com 10 passos simples e numerados. "Quem não conseguiria aplicar?" O simples dá mais resultado que a resposta mirabolante.
## Consequência
Depois de ensinar e transformar, a venda vira o último gatilho natural: a audiência já experimentou o valor.`,
 apply:['Usar o checklist "Antes de publicar" no Escrever','1 conteúdo por semana 100% básico','Pedir print de quem aplicou']},

{id:'k-funil',cat:'Conteúdo',tech:'funil',src:['ED'],title:'Conteúdo por estágio de audiência',
 sum:'Topo para quem chega, meio para quem já se conecta, fundo para quem sabe que só você pode levá-lo ao destino.',
 body:`## Topo
Conteúdo mais básico e amplo, para quem acabou de chegar. Responde dúvidas iniciais, apresenta o problema.
## Meio
Para quem já te segue e tem conexão. Trajetória, bastidores, aprofundamento, a pirâmide da conexão.
## Fundo
Para quem está perto do destino e já entendeu que você é a pessoa certa. Método, detalhes, quebra de objeções específicas, oferta.
## Equilíbrio
Só topo gera seguidor que não compra. Só fundo cansa quem acabou de chegar. O painel do sistema mostra sua distribuição; mantenha cada estágio acima de 20%.`,
 apply:['Classificar todo conteúdo por funil','Corrigir quando o alerta de funil aparecer']},

{id:'k-ihc',cat:'Conteúdo',tech:'ihc',src:['ED'],title:'Roteiro IHC: Identificação, História, Conteúdo',
 sum:'Estrutura de vídeo trabalhada nas aulas ao vivo: a primeira frase conecta, a história prende, o ensinamento entra como moral.',
 body:`## Fale do que importa para o outro primeiro
Pessoas se interessam por temas. Temas universais (relacionamento, perda, medo, conquista, autodesenvolvimento) prendem mais. Depois de prender, mostre o que importa para você.
## I · Identificação
A primeira frase precisa ser emocionalmente relevante:
- "Eu já me senti assim quando..."
- "Eu já passei por essa situação..."
- "Isso me lembrou alguém..."
- "E foi assim que eu aprendi..."
## H · História
1. O conflito acontece
2. O processo de virada
3. As consequências positivas da transformação
## C · Conteúdo
O ensinamento fica em terceiro plano e entra como moral da história.
## Contraste
O mundo é percebido pelo contraste: você sente o calor porque conhece o frio. Para a emoção boa do final pesar, faça sentir a emoção ruim antes.`,
 apply:['Usar o template IHC no Escrever','Começar todo Reels de conexão com uma frase de identificação']},

{id:'k-interessante',cat:'Conteúdo',tech:'interessante',src:['ED'],title:'Ser interessante para as pessoas certas (vaca roxa)',
 sum:'Interesse depende de contexto. Posicione-se onde seu núcleo (crenças, hábitos, história) é valorizado e torne-se notável.',
 body:`## Interesse é contexto
A água custa pouco no mercado e muito no aeroporto. Conteúdo de balada não interessa à Luana, mas interessa a outras pessoas. Você não precisa de uma vida extraordinária; precisa estar diante do público certo.
## Pontos de distinção
O público precisa de sinais para te diferenciar: como você se veste, como fala, o que defende. Seu núcleo fundamental (crenças, conhecimento, hábitos, histórico) é a sua vaca roxa, expressão de Seth Godin.
## Exemplo
Detalhes como as linhas brancas e o habit tracker no planner da Studies diferenciaram o produto de todos os outros.
## Coerência
Quando você quebra a expectativa que o público tem do seu posicionamento, ele se desconecta. Identidade clara permite que ele saiba o que esperar.
## Gerar reflexão
Trazer um método novo, uma pesquisa, um jeito diferente de ver um problema comum desperta interesse.`,
 apply:['Escrever seu núcleo em Posicionamento','Escolher 1 marca verbal e 1 visual recorrentes']},

{id:'k-repertorio',cat:'Conteúdo',tech:'bda',src:['ED'],title:'Círculo do conhecimento e repertório',
 sum:'Fique sempre na borda do que você sabe. Cada ideia nova pode ser desdobrada em vários formatos de conteúdo.',
 body:`## Autoestima intelectual
Diante de pessoas mais inteligentes, você pode se diminuir ou usar isso para aprender. O que separa você de quem admira são hábitos: ler mais, consumir melhor, procurar boas referências.
## A borda do círculo
Imagine tudo que você sabe dentro de um círculo. O objetivo é aumentar o raio. O constrangimento de não saber algo só acontece uma vez, se você for aprender.
## Desdobrar
Quando a Luana destaca um trecho de livro, transforma a ideia em stories, reels, vídeo, post e aula. Isso fixa o aprendizado e amplia o repertório.
## Filtro
Evite sobrecarga. O conhecimento que importa é o que você executa. Ensine enquanto aprende; aprender mais não pode virar desculpa para não ensinar.
## Na pesquisa pública
Análises do perfil dela apontam a literatura clássica e a filosofia como diferencial de repertório, fontes que concorrentes raramente usam (fonte: Substack Jonny Viccari).`,
 apply:['A cada livro, anotar 1 grande ideia e gerar 3 conteúdos','Registrar ideias no Banco de histórias ou como Ideia em Conteúdos']},

/* ---------------- AUTORIDADE ---------------- */
{id:'k-pontos',cat:'Autoridade',tech:'pontos',src:['ED'],title:'Pontos de informação',
 sum:'A mente escolhe um guia com base em sinais rápidos. Coerência entre o que você fala e o que mostra gera segurança no primeiro segundo.',
 body:`## Inverta a pergunta
Em vez de "como eu gero autoridade?", pergunte "o que leva o outro a me ver como autoridade?". Pergunte o porquê das suas próprias escolhas: por que assisti até o fim, por que comprei esse curso, por que confio nessa pessoa.
## Decidimos com o que temos
Entre um restaurante cheio e um vazio, escolhemos o cheio sem saber o motivo. Seguidores, foto, bio, destaques, link e número de posts são pontos de informação. Sozinhos não provam nada, mas é com eles que a pessoa decide.
## Contexto muda o peso
Para uma cirurgia urgente, um médico com 30 anos de experiência pesa mais que um recém-formado em Harvard. Descubra que ponto de informação o seu público valoriza.
## Coerência
Temos uma imagem de como "deveria ser" um bom advogado. Se ele aparece de moletom, algo destoa. O discurso precisa estar alinhado com como você se veste, fala, olha, com quem anda.
## Checklist
Como me visto, como ajo, com quem ando, meu perfil está coerente com o que falo? Não siga um padrão genérico: analise o que o seu público valida.`,
 apply:['Fazer a auditoria em Posicionamento → Pontos de informação','Ajustar o que tiver nota 0 ou 1']},

{id:'k-piramide',cat:'Autoridade',tech:'piramide',src:['ED'],title:'Pirâmide da conexão e inexperiência como vantagem',
 sum:'Mostre o topo que o seguidor deseja e a base onde ele está. Quem está um passo à frente muitas vezes conecta mais do que quem está muito acima.',
 body:`## Os dois extremos
No topo está a imagem do sucesso que o seguidor quer. Na base está onde ele está agora, e onde você já esteve. Mostrar só o topo cria distância; mostrar só a base não gera desejo.
## Exemplo da Luana
Ela não era a mais inteligente da sala, não passou no vestibular, não tinha as melhores câmeras. Um vídeo sobre tabelinha de estudos, ainda no ensino médio, chegou a 100 mil visualizações. Ela mostrou a tentativa e a conexão cresceu, inclusive depois de não ser aprovada.
## A vantagem de quem está começando
O público dos muito grandes nem sempre se conecta com eles. Sobra espaço para quem está próximo da base. Você pediria dicas de Paris a um amigo que já foi duas vezes.
## Regras
- Mostre tentativas, dedicação e falhas, com equilíbrio
- Transforme momentos difíceis em escudo
- Evite um clima sombrio e reclamação constante
- Mostrar que não existe plano B passa foco e persistência
## Gerar desejo
Mostre como é bom estar no destino final, sem exagero. Ela evitou ostentar viagens extravagantes e preferiu mostrar trabalho duro e liberdade de tempo e dinheiro como algo alcançável.`,
 apply:['Preencher topo e base em Posicionamento → Pirâmide','Marcar a pirâmide em cada conteúdo']},

{id:'k-aluno1',cat:'Autoridade',tech:'estilovida',src:['ED'],title:'Seja o aluno número 1',
 sum:'Pratique o que ensina e mostre isso quase todo dia. As pessoas aprendem mais pelo exemplo do que pelo discurso.',
 body:`## O erro fatal
Influenciadores que não vivem o que pregam perdem credibilidade. Um nutricionista precisa mostrar a própria alimentação.
## Por que funciona
Bebês aprendem observando. Instrutores de autoescola mostram na prática. Ver alguém fazendo torna o aprendizado mais fácil.
## Exemplo da Luana
Se ela diz que a segunda-feira começa no domingo, mostra a rotina sendo planejada no domingo. Ela registra tanto o próprio uso do planner que quem usa um lembra dela.
## Para a Carol
Mostrar os bastidores do seu próprio sistema de conteúdo, da sua organização e dos processos da Essence é a prova de que o método funciona.`,
 apply:['Definir 3 cenas da sua rotina que provam o que você ensina','Postar 1 bastidor por dia']},

{id:'k-identidade',cat:'Autoridade',tech:'guia',src:['ED'],title:'Identidade de criadora e vergonha',
 sum:'Leve sua profissão a sério antes de esperar que os outros levem. A vergonha é medo da opinião alheia, e quase ninguém está prestando tanta atenção.',
 body:`## Ser, não brincar de ser
Dizer "vou dar uma de blogueira" avisa à sua mente que você está fingindo. Quem tem resultado se vê como criador de conteúdo, em todo lugar, o tempo todo.
## Aja como quem quer ser
Na academia, ela começou a agir como "boa aluna" antes de ser uma. Pergunte: como a minha referência agiria agora?
## O efeito holofote
Superestimamos o quanto os outros nos julgam. Um story no aeroporto é um grão de areia na praia. Quem chegou ao topo raramente ri de quem está tentando.
> "O que é maior: seu sonho ou sua vergonha?"
## Profissional x amador
Profissionalismo é organização, prazo, rotina e compromisso. O amador faz por amor, e o amor acaba. Uma tarefa ocupa o prazo que você dá a ela.`,
 apply:['Definir horário fixo de produção','Gravar para o Close Friends até perder a trava']},

/* ---------------- STORIES ---------------- */
{id:'k-capricho',cat:'Stories',tech:'video',src:['SPE'],title:'Capricho, não enfeite',
 sum:'Enfeitar stories gasta tempo, polui a tela e trava a constância. Capricho é fazer o básico muito bem.',
 body:`## A diferença
Capricho é a mãe que recebe visita e faz o almoço de sempre muito bem-feito. Enfeite é encher de decoração que atrapalha o resultado.
## Por que enfeite atrapalha
- Cria gargalo: você deixa de postar porque a sombra não está no lugar
- Polui: o seguidor não sabe onde olhar
- Infantiliza, a menos que o público seja jovem
- Pode ser procrastinação ativa: enfeitar para não produzir
## Atenção
A bolinha dos seus stories compete com pessoas tão ou mais interessantes. A informação precisa estar clara desde o primeiro segundo.
## Visual que conversa com o público
Para público maduro, menos cores e fontes, mais objetividade. Pergunte: que tipo de pessoa eu quero vendo meus stories?`,
 apply:['Definir 1 fonte, 2 cores e 1 cor de destaque para stories']},

{id:'k-rituais',cat:'Stories',tech:'rituais',src:['SPE'],title:'Rituais',
 sum:'Seguidores precisam de previsibilidade. Um ritual repetido gruda na mente, cria comunidade e marca território.',
 body:`## Seja previsível
Uma seguidora tinha medo de ficar repetitiva postando o mesmo take estudando todo dia. A resposta: quem liga a TV num horário fixo não quer surpresa. No Instagram, seus seguidores esperam que você seja repetitiva.
## Exemplos da Luana
- "Bom dia, dormiu bem, acordou melhor ainda?" é o primeiro story do dia
- "Unhas feitas, pronta pra dominar o mundo": seguidoras postam, marcam e ela reposta
- Uma brincadeira com o papel do chá fez seguidores lembrarem dela anos depois ao comprar chá
- "Cadê os homens dessa trend com cabelinho na régua?" incluiu quem não faz unha
## Outros casos
Thiago Finch e a frase sobre não ir à padaria malvestido. A loja Ilustralle e o movimento "tão Ilustralle" para cores vibrantes.
## Como criar
1. Algo que você repete todos os dias
2. Uma frase de efeito original, no seu tom de voz
3. Algo que o seguidor também consegue fazer na rotina dele
4. Garanta que todo o seu público pode participar
5. Reposte participações com um comentário que incentive os outros`,
 apply:['Cadastrar 1 ritual diário em Stories → Rituais','Postar por 14 dias seguidos']},

{id:'k-texto',cat:'Stories',tech:'camadas',src:['SPE'],title:'Stories em texto e em camadas',
 sum:'Texto qualifica o lead, alcança quem está sem som e treina a escrita. A técnica de camadas gera curiosidade e volume.',
 body:`## Por que texto
- Muita gente assiste sem som
- Quem para para ler quer aprofundar: é um lead mais qualificado
- Cabe mais conteúdo em um story; a pessoa pode tirar print
- Escrever obriga a ter clareza e mostra o que você ainda não domina
- Você produz em qualquer horário, sem precisar estar arrumada
## Como ela escreve
Cores sempre no mesmo padrão para ser reconhecida, palavras grandes como headline, setas, tópicos, sublinhado e círculos. Letra grande para celulares pequenos. Fundo escuro com letra clara.
> "Se tudo é importante, nada é importante."
## Camadas
1. Crie um story de texto ocupando a tela
2. Salve na galeria
3. Suba de novo
4. Pinte por cima, de cima para baixo
5. Poste parte por parte até ficar completo
Um conteúdo de uma barrinha vira quatro ou cinco, com mais retenção.
## Sequência com CTA
Para divulgar um post, ela prepara o terreno com uma história antes e reforça que é simples aplicar.`,
 apply:['1 story em camadas por semana','Definir paleta fixa de stories']},

{id:'k-video',cat:'Stories',tech:'video',src:['SPE'],title:'Stories em vídeo e oratória',
 sum:'Vídeo gera conexão porque mostra uma pessoa real. Nunca seja morna: energia, olhar na câmera e spoiler no começo.',
 body:`## Conexão
Gostamos de acompanhar pessoas que aparecem. Vídeo mostra pele, voz, gesto e que você não é personagem.
## Perder a vergonha
Comece pelo Close Friends, responda directs em vídeo, faça chamada de vídeo com amigos, finja uma publi no espelho. O segredo: postar e ir fazer outra coisa.
## Nada de morna
A atenção é a moeda. Quente ou fria, nunca morna. "Se você não tem energia para dar bom dia, como vai ter energia para venda?"
## Técnica
- Grave de frente para a luz
- Olhe para a câmera, não para você
- Story não é live: movimente, troque de cenário
- Comece pelo clímax: "Quebrei um prato caro e já vou te contar"
- Texto-título em todo vídeo
- Varie cenário e roupa: o mesmo ângulo todo dia parece repetição
- Filtros leves; ela já gravou com espinha e isso aproximou o público
## Imagem
Cuidar de si não é luxo: cabelo limpo, roupa apresentável, cenário arrumado. Ela confundia desleixo com autoconfiança.
## Oratória (aula bônus)
Ler para ganhar vocabulário, ler em voz alta e gravar, corrigir vícios ("tipo", cortar R e S), treinar com caneta na boca, pausar para respirar, ouvir bons oradores e até cantar rap em português de forma clara.`,
 apply:['Texto-título em 100% dos vídeos','Ler 5 minutos em voz alta por dia']},

{id:'k-caixinha',cat:'Stories',tech:'caixinha',src:['SPE'],title:'Caixinha de perguntas',
 sum:'A ferramenta que os maiores perfis mais usam. Conhece o público, testa conteúdos e mostra quem você é.',
 body:`## Para que serve
- Conhecer dores e assuntos recorrentes
- Testar quais temas e jeitos de falar engajam
- Mostrar princípios e valores
## Misture assuntos
O nicho prevalece, mas entre vida pessoal, outras áreas e humor. Flávio Augusto fala de filhos e viagens; Ícaro de Carvalho usa memes; Lara Nesteruk vai além da nutrição.
## Sem perguntas?
Mande perguntas para você mesma. Isso cria efeito de bando e educa o público sobre o que você responde. Misture perguntas boas com leves para ninguém se intimidar. Não fale do que não quer ser perguntado.
## Tipos de resposta que ela usa
- Desenvolvimento pessoal: quebrar o senso comum ou concordar aprofundando
- "O que eu faria se...": passo a passo BDA
- Frase de impacto: deixa claro quem você é ("uma chama que aponta para cima")
- Explicação + lista
- Humor
## Regras de resposta
Sempre exemplo prático. Parágrafos curtos, sublinhados, palavras circuladas. Foto com expressão coerente com sua personalidade.
> As pessoas param pela pergunta, não pela resposta.
## Temas
Tudo menos trabalho · O que você quer ver no meu celular? · Eu nunca… · Conselhos sobre (seu tema) · O que eu faria se…`,
 apply:['Abrir caixinha 3 vezes por semana','Registrar cada uma em Stories → Caixinhas']},

{id:'k-enquete',cat:'Stories',tech:'enquete',src:['SPE'],title:'Enquetes estratégicas',
 sum:'Enquetes alimentam o algoritmo e ensinam sobre o público, desde que sejam intencionais e não farofa.',
 body:`## Por que funcionam
O Instagram quer que você fique no app. Interação nas ferramentas do story sinaliza conteúdo interessante.
## Gatilhos
- Medo de ficar de fora: "vocês já viram esse vídeo?" com 90% de sim
- Vontade de parecer inteligente: as pessoas adoram corrigir e completar
## Exemplos da Luana
Sobre "preço por DM", mais de 22 mil pessoas votaram. Ela não citou a ilegalidade de propósito, para os seguidores completarem. Uma "notícia" de que o Instagram ia acabar fez muita gente votar só para mostrar que sabia que era mentira.
## Como fazer
- Divergência: oito ou oitenta (ex.: low carb é boa ou ruim?)
- Comece simples (idade, gênero) e aprofunde: a pessoa continua respondendo
- Informações internas, como interesse no curso, vão melhor em quiz
- Enquetes sobre você: opções "sim" e "com certeza"
## Antecipação
Pergunte algo que a maioria não sabe fazer, mostre seu resultado e, no próximo story, chame para o conteúdo que explica o "segredo".`,
 apply:['1 enquete de divergência por semana','1 enquete de antecipação antes de conteúdo de fundo']},

{id:'k-freq',cat:'Stories',tech:'video',src:['SPE'],title:'Frequência e horários',
 sum:'Postar todos os dias, em blocos ao longo do dia, começando cedo. A barrinha só deve ficar cheia à noite.',
 body:`## Como a fila funciona
Quem acabou de atualizar os stories vai para o começo da fila. Atualizar em vários horários te mantém na frente.
## Horários
Cedo (6h ou 7h aumenta muito a audiência dela), por volta das 10h, almoço, meio da tarde e 20h–21h, o pico. À noite a concorrência é maior.
## Detalhes
- Marcas pedem que o story de divulgação seja o primeiro do dia, porque é o mais visto
- Não apague stories para "melhorar alcance": você perde gente nova
- Não poste tudo de uma vez
## No sistema
Use a semana de stories para marcar os blocos de cada dia.`,
 apply:['Marcar os blocos diários no Início']},

{id:'k-repost',cat:'Stories',tech:'repost',src:['SPE'],title:'Repost e marcação',
 sum:'Para ser repostada por alguém maior: uma marcação por story, foco na pessoa e conteúdo intencional. E esteja pronta.',
 body:`## Quando te marcam
Reposte com frequência, mas não lote seus stories de conteúdo alheio. Quando não repostar, mande uma mensagem ou áudio. Sempre comente algo no repost para incentivar quem vê.
## Quando você marca
1. Só uma pessoa por story, nunca concorrentes juntos
2. Fale da pessoa, não só de você; conte como ela mudou algo na sua vida
3. Sem babar ovo: traga algo intencional que faça o público dela querer te conhecer
## Exemplo
Ela repostou uma seguidora cujo story estava tão bom que a pessoa ganhou cinco a seis mil seguidores.
## Esteja pronta
Feed cheio, destaques montados, talvez uma oferta. Oportunidade que passa não volta.`,
 apply:['Revisar destaques antes de qualquer collab','Listar 5 perfis-alvo']},

{id:'k-vendastories',cat:'Stories',tech:'estilovida',src:['SPE'],title:'Vender nos stories',
 sum:'A venda acontece muito antes do pitch. Três pilares: estar bem, preparar o terreno por meses e vender um estilo de vida.',
 body:`## Pilar 1 · Estar bem
Com energia ruim, o pitch sai fraco. Equilíbrio nas outras áreas da vida sustenta a venda.
## Pilar 2 · Preparar o terreno
Não existe plantação sem terra fértil. Ela vendia a Sala do Saber porque passava meses se mostrando estudando com disciplina. Arquiteta precisa mostrar todo dia que conhece os melhores produtos.
## Pilar 3 · Estilo de vida
Há anos ela mostra organização e disciplina. Quando diz que o planner ajuda, a pessoa compra a organização dela, não o caderno. Mulheres compram a marca de uma influenciadora esperando levar um pedaço daquela vida.
> As pessoas compram o quadro na sala, não a furadeira.
## Escolha o seu difícil
Produzir todo dia é difícil. Nunca produzir e não vender é mais difícil. Vendedor carismático vende mais que o técnico antipático. Na hora da venda, você só aumenta a intensidade do que já faz.`,
 apply:['Planejar 30 dias de terreno antes de cada oferta']},

/* ---------------- VENDA ---------------- */
{id:'k-vergonhavender',cat:'Venda',tech:'acucar',src:['ED'],title:'Perder a vergonha de vender e atrair compradores',
 sum:'Vender é oferecer solução. Se você não oferta, alguém menos preparado oferta no seu lugar. E produto certo para público errado não vende.',
 body:`## Venda não é empurrar
O estereótipo do vendedor insistente afasta. Feita com empatia, venda é benefício mútuo. Oferecer tudo de graça para sempre não é sustentável.
## Por que ofertar
Sua audiência está no deserto e você vende água. Se você não oferece, ela compra de quem está menos preparado. Sem primeira oferta, você nunca terá depoimentos.
## O caso Studies
A Studies vendia papelaria fina para estudantes do ensino médio que não podiam pagar. Baixar o preço deixaria o caderno comum. A solução foi reposicionar para jovens que já trabalhavam e fechar parcerias com influenciadores alinhados. A demanda disparou: era produto certo para a audiência errada.
## Mudança de nicho
Quando ela foi de estudos para marketing digital, em vez de tentar mudar a cabeça dos seguidores, mostrou como o novo conteúdo servia aos interesses deles. Levou quase um ano para alinhar imagem e audiência.
## A parte invisível
Venda não é só copy e oferta. É antecipação, história e comunicação constante, todos os dominós alinhados.`,
 apply:['Descrever o comprador ideal em Posicionamento','Fazer a primeira oferta mesmo pequena']},

{id:'k-antecipacao',cat:'Venda',tech:'antecipacao',src:['ED'],title:'Antecipação e narrativas de venda',
 sum:'Ninguém decide bem em 15 minutos. Use semanas e meses para mostrar benefícios e quebrar objeções antes de abrir a venda.',
 body:`## Logística reversa da venda
Como no carro que você precisa decidir em 15 minutos, informação demais de uma vez cansa. Distribua os argumentos ao longo do tempo.
> "Você precisa de tempo!"
## Exemplos
A Apple anuncia produtos com muita antecedência. A Luana falava de vida organizada e de não gostar de escrever no iPad muito antes de lançar o planner.
## Objeções
"Não gostei da cor", "não tenho dinheiro", "preciso pensar". O "não" é para o produto, não para você. Cada objeção é uma bola para rebater ou uma pista para melhorar o produto.
## O cliente é o protagonista
Não fale de você nem só dos benefícios da caneta: fale de como as anotações ficam mais bonitas e a organização melhora. A designer de sobrancelhas vende autoestima, não técnica.
## Pré-venda
Compartilhe a transformação antes do produto existir. Pré-vendas criam base comprometida.`,
 apply:['Listar objeções em Lançamentos','Criar 1 conteúdo por objeção']},

{id:'k-3fatores',cat:'Venda',tech:'tres',src:['ED'],title:'Os 3 fatores determinantes',
 sum:'Página bonita é importante, não determinante. As pessoas não compram porque não entenderam, não viram vantagem ou não sentiram urgência.',
 body:`## Importante x determinante
Design, criativo e página bonita ajudam. Mas o fracasso vem das coisas determinantes.
## 1 · Não entendeu
O que é óbvio para você não é para o outro. Clareza vem do método guia ao longo do tempo e do BDA.
## 2 · Não viu vantagem
Ou não despertou desejo. Produtos precisam nascer da necessidade que a audiência apresenta. Ouça mais, olhe a concorrência.
## 3 · Não sentiu urgência
Cuidado com estar sempre disponível. Escassez real de tempo ou quantidade e as desvantagens de adiar.
> "Imagina se o Execução Digital ficasse aberto por tempo indeterminado?"
## Resiliência
Não culpe só o número de seguidores. Considere a proporção entre visualizações e vendas. Corrija rápido e siga.`,
 apply:['Escrever o diagnóstico dos 3 fatores em cada lançamento']},

{id:'k-desejo',cat:'Venda',tech:'acucar',src:['ED'],title:'Açúcar para formigas: escutar e gerar desejo',
 sum:'Crie para quem já quer comprar. Escute antes de ditar a transformação e mostre como é bom estar no destino final.',
 body:`## O erro da autora
Ela produzia o que achava interessante sobre papelaria. Quando passou a atender o que a audiência pedia, engajamento e alcance saltaram.
## Viés de confirmação
As pessoas buscam soluções que confirmam o que já acreditam. Ditar o problema que elas deveriam resolver soa arrogante e não funciona.
## Isca certa
Dale Carnegie: ninguém põe morango com chantilly no anzol porque gosta; usa minhoca porque o peixe gosta. "Se quer atrair formigas, coloque açúcar no chão."
## Como saber o que querem
- Com audiência: caixinhas, comentários, DMs, escuta ativa
- Sem audiência: comentários, caixinhas e cursos das referências
> "Você pode ter o que quiser, só precisa ajudar as pessoas a terem o que elas querem." (Zig Ziglar)
## Desejo
Venda benefício, não característica: o tênis é saúde e autoestima. Mostre a vida no destino final e o caminho até lá, sem exagero.`,
 apply:['Anotar frases literais do público em Posicionamento']},

/* ---------------- OFERTA ---------------- */
{id:'k-mercado',cat:'Oferta',tech:'oferta',src:['RC'],title:'Como ler o mercado',
 sum:'Mercados dinâmicos ou estáticos, criativos ou mecânicos. Jogar no modelo padrão do nicho é competir com os maiores com menos verba.',
 body:`## Dinâmico x estático
Dinâmico: muda o tempo todo, conteúdo infinito mas envelhece rápido (tráfego, IA, táticas). Estático: sólido, inovação lenta, satura cedo (musculação, direito, nutrição).
## Criativo x mecânico
Criativo exige esforço e julgamento do cliente (marketing). Mecânico entrega passo a passo (o desafio é tornar fácil de seguir). Ideal: dar método ao criativo e criatividade ao estático.
## Como perder
Copiar o modelo padrão do nicho coloca você no mesmo jogo dos maiores, com menos recursos. No máximo, resultado mediano.
## Quem educa o mercado
Alguém está gastando tempo e dinheiro criando consciência e desejo. Saiba quem está fazendo isso por você e para quem você está fazendo.`,
 apply:['Responder no lançamento: mercado dinâmico ou estático? produto criativo ou mecânico?']},

{id:'k-estagios',cat:'Oferta',tech:'oferta',src:['RC'],title:'Oferta, estágios de mercado e desejo único',
 sum:'Uma boa oferta faz a pessoa trocar tempo, dinheiro e relações pelo seu resultado. O argumento muda conforme o estágio de consciência do mercado.',
 body:`## O que é oferta
O modo como você torna lucrativa a venda. Todo mundo tem uma, até o desempregado (o tempo dele).
## De desejo a necessidade
Quase ninguém precisa de 10% de gordura; quer. Para virar necessidade: mostre que a sua é a melhor forma, deixe claro com o que ela compete, faça a transição para a sua metodologia e use contraexemplos. Persuasão beneficia os dois lados; manipulação, só você.
## Formato
O formato que vende parece o jeito que o público gosta de passar tempo: VSL parece vídeo legal, webinar parece treinamento gratuito, grupo parece comunidade.
## Cinco estágios
1. Algo novo: faça a promessa
2. Concorrência chegou: foque no "para quê"
3. Mercado cético: mecanismo único
4. Promessas inacreditáveis: comparação lado a lado
5. Bombardeado: experiência do cliente e preeminência; seja a pessoa mais confiável do mercado
## Emoção central
Investimento = segurança. Emagrecimento = vergonha. Coaching = reconhecimento. As pessoas compram para fugir de emoções negativas.
## Quanto cobrar
Do nível 1 ao 5: ferramentas, produtos e serviços, acesso, identidade. Quanto mais perto de identidade, maior o preço.`,
 apply:['Preencher estágio, mecanismo e emoção central em Lançamentos']},

{id:'k-diferenciar',cat:'Oferta',tech:'interessante',src:['RC'],title:'Formas de se diferenciar',
 sum:'Nome, segredo, causa, você, história, processo, valor lateral, fama, prova social, tamanho, preço e liderança.',
 body:`## Nome
Todos os nomes da oferta precisam pertencer ao mesmo campo metafórico. A Luana chama alunos de "executores". Um bom nome inicia o posicionamento (Hog Island virou Paradise Island).
## Segredo
Segredo é diferente de informação: é experiência e conhecimento que só se acessa conhecendo a pessoa.
## Boa causa
Doações ligadas à venda, se forem honestas.
## Você e sua história
O jeito como você conta a sua história. Fale a verdade de um jeito fascinante.
## Processo de marketing
Conteúdo é marketing, não venda: torna a venda menos agressiva. O jeito como você gosta de comprar é como gosta de vender.
## Valor lateral
O estacionamento do restaurante: algo que ninguém compra sozinho, mas faz pagar mais. Material físico, comunidade, acesso.
## Fama, prova social, tamanho
Ser conhecido o bastante para não ser "um ninguém". Depoimentos e associações; com poucos cases, construa uma boa história sobre um. Ser pequeno pode significar pessoal e artesanal.
## Preço e liderança
O preço diz quem você é. Se não é número 1, crie uma categoria em que seja.`,
 apply:['Escolher 3 formas de diferenciação para o seu produto principal']},

{id:'k-criaroferta',cat:'Oferta',tech:'oferta',src:['RC'],title:'Criando a oferta na prática',
 sum:'Parta do resultado dos sonhos, liste todos os problemas e crenças do caminho e crie respostas novas para cada um.',
 body:`## Passo 1 · Resultado dos sonhos
Pessoas querem perder peso, não acesso à academia. "Não venda a passagem, venda a viagem."
## Passo 2 · Liste os problemas
Escreva cada problema e crença limitante, pensando no antes e no depois do uso. Para perder peso: comprar comida saudável é confuso, demorado e caro; cozinhar também; manter ao viajar, com a família…
## Pensamento divergente
Marketing é encontrar respostas novas para os mesmos problemas. Exercício do tijolo: em 2 minutos, liste quantas formas existem de gerar valor com um tijolo, e depois pense em tamanho, material e formato.
## Perguntas de revisão
- Meu mercado é dinâmico ou estático?
- Meu produto é mecânico ou criativo?
- É percebido como necessidade? Se não, que status oferece?
- Como as pessoas gostam de passar tempo comigo?
- Em que estágio está o mercado?`,
 apply:['Fazer a lista de problemas do seu produto principal nas notas do lançamento']},

/* ---------------- EXECUÇÃO ---------------- */
{id:'k-execucao',cat:'Execução',tech:'guia',src:['ED'],title:'Mindset executor e constância',
 sum:'Disciplina vence motivação. Comece pequeno, aceite o imperfeito e não deixe um dia ruim virar uma semana ruim.',
 body:`## Aplicar enquanto aprende
Não espere acumular conhecimento. Pergunte: como uso isso no trabalho hoje?
## Motivação passa, disciplina fica
A resistência está em começar. Pegar a esponja já é metade de lavar a louça. Automatize tarefas no coração da rotina.
## Story imperfeito
Regravar dez vezes atrasa. Poste e siga. Ninguém repara nos detalhes que você acha que todos reparam.
## Determinantes x importantes
Determinantes exigem decisão e esforço; importantes contribuem para o bem-estar. Priorize os primeiros.
## Seis passos contra o excesso de pensamento
Defina prioridades, metas claras, elimine distrações, aceite a imperfeição, divida em etapas, estabeleça prazos.
## Constância
Um café da manhã ruim não precisa virar um dia ruim. A não movimentação é movimentação para trás. Constância é decisão diária.`,
 apply:['Usar o Início como checklist diário']},

/* ---------------- CASO LUANA (WEB) ---------------- */
{id:'k-caso',cat:'Caso Luana',tech:'oferta',src:['WEB'],title:'Como a Luana opera hoje',
 sum:'O que se vê publicamente sobre o ecossistema dela: plataformas adaptadas, títulos com padrão, escada de produtos e uma comunidade de "executores".',
 body:`## Números públicos
Cerca de 1,7 milhão de seguidores no Instagram (@luanacarolina.s), 1,7 milhão de inscritos no YouTube e mais de 40 mil alunos, segundo perfil publicado pela Reportei.
## Empresas
Execução Digital (educação para criadores e infoprodutos) e Studies (planners e cadernos, cofundada com Lucas Bravo). O Stories para Enriquecer aparece como Método SPE.
## Cada plataforma com seu formato
Segundo análise de Jonny Viccari: TikTok com estética simples e som do celular, Instagram com produção mais alta, YouTube no formato "talking head" com vídeos longos semanais. Adaptar, não replicar.
## Títulos com padrão
- Como + ação + benefício
- O mínimo para + evitar consequência
- Por que + problema universal
- Revelação pessoal + autoridade
## Escada de produtos
Conteúdo gratuito → curso de entrada → Stories (SPE) → desenvolvimento pessoal como produto mais caro → mentoria. O produto mais caro é o que o público mais valoriza, não necessariamente o mais técnico.
## Visual que evolui
A mesma análise aponta a mudança de uma estética "clean" com fundo branco para tons amadeirados e fontes serifadas quando o primeiro estilo saturou.
## O app e a comunidade
O app "Luana Carolina" (App Store e Google Play) reúne cursos como Execução Digital, Execução Máxima, Protagonista Digital e Stories para Enriquecer. Também tem podcasts, recomendações, conteúdo offline e uma área para "conhecer os executores da sua cidade e marcar encontros". O nome da comunidade aplica a diferenciação por nome da aula do Rafael Censon. O slogan do site é "Bom você se torna".
## O que levar para a Carol
Nomear sua comunidade, padronizar estruturas de título, ter uma escada clara (conteúdo → Organiza SM → Sensus → mentoria) e adaptar o formato a cada plataforma, inclusive no YouTube que você está planejando.`,
 links:[['Reportei · Quem é Luana Carolina','https://reportei.com/luana-carolina-quem-e/'],['Jonny Viccari · A genialidade por trás do império de Luana Carolina','https://jonnyviccari.substack.com/p/a-genialidade-por-tras-do-imperio'],['App Luana Carolina · App Store','https://apps.apple.com/br/app/luana-carolina/id6450752988'],['Canal no YouTube','https://www.youtube.com/@luanacarolina.s'],['Instagram @luanacarolina.s','https://www.instagram.com/luanacarolina.s/']],
 apply:['Definir o nome da sua comunidade','Desenhar sua escada de produtos em Lançamentos']},
];

/* Plano de 30 dias de stories (adaptado do planner do Stories para Enriquecer) */
const PLAN30=[
 ['Apresentação para os destaques','Quem você é, por que faz o que faz, objetivo da conta, o que esperar e o que não esperar de você.'],
 ['Rotina da manhã','Que horas acorda, o que come, o que faz primeiro.'],
 ['Caixinha: mito x verdade do nicho','Ex.: mitos e verdades sobre conteúdo para médicos.'],
 ['Um filme ligado ao nicho','Enquete "já assistiu?" e depois por que assistir e o que ensina.'],
 ['Notícia recente do nicho','Compartilhe e dê sua leitura.'],
 ['3 curiosidades do nicho','Formato lista, em texto.'],
 ['Ensine algo do nicho','Tutorial curto e aplicável (BDA).'],
 ['Uma dificuldade que você superou','Quando pensou em desistir e como passou.'],
 ['Caixinha pedindo opinião','Sobre um tema polêmico do nicho.'],
 ['Caixinha "Eu nunca…"','Foto de fundo, "eu já / eu nunca" e enquete com as mesmas opções.'],
 ['Rotina da noite','Como você encerra o dia.'],
 ['Caixinha "Tudo menos trabalho"','Mostre quem você é fora do nicho.'],
 ['5 fatos sobre mim','Conte partes da sua história.'],
 ['Enquetes sobre o público','Perguntas simples e depois mais específicas, ligadas ao nicho.'],
 ['Look do dia','Fale de onde são as peças; ponto de informação visual.'],
 ['História de superação','Em vídeo ou texto, mostrando que você não é perfeita.'],
 ['Caixinha "O que eu faria se…"','Resposta em passos BDA.'],
 ['5 erros que você está cometendo','Ex.: 5 erros ao delegar o conteúdo da clínica.'],
 ['Timelapse de algo que você faz','Bastidor do trabalho com música.'],
 ['Um livro e o que ele ensina','Desdobre uma ideia do livro.'],
 ['3 maiores lições do seu nicho','O que a profissão te ensinou.'],
 ['Criar e postar um ritual','Ver o artigo Rituais.'],
 ['Quiz do nicho','Múltipla escolha; benefício para quem acertar tudo.'],
 ['5 itens favoritos','Pessoais ou profissionais.'],
 ['Algo difícil para você na jornada','Um medo que ainda não superou 100%, mas encara.'],
 ['Enquete "isso ou aquilo"','Itens do nicho com fotos.'],
 ['Caixinha "pergunte qualquer coisa"','Deixe o público conduzir.'],
 ['Bastidor do trabalho','Mostre o processo real.'],
 ['5 mentiras que te contam sobre…','Desmonte crenças do nicho.'],
 ['Antes e depois','Mostre um processo e o resultado.'],
];

