/* ============ REFERÊNCIAS REAIS ============
   Stories: perfil @luanacarolinastories (conta oficial de stories do SPE), capturados em out/2026.
   Imagens salvas em ./exemplos (miniaturas para estudo). Pinterest: perfil luanacarolinaoficial, em ./pinterest. */
const PINMAP0={"aesthetic": ["pinterest/aesthetic_596867756912393887.jpg", "pinterest/aesthetic_596867756912393886.jpg", "pinterest/aesthetic_596867756912384007.jpg", "pinterest/aesthetic_596867756912383996.jpg", "pinterest/aesthetic_596867756912383989.jpg", "pinterest/aesthetic_596867756912273412.jpg"], "w-o-r-k": ["pinterest/w-o-r-k_596867756912273400.jpg", "pinterest/w-o-r-k_596867756911279860.jpg", "pinterest/w-o-r-k_596867756911242155.jpg", "pinterest/w-o-r-k_596867756911091785.jpg", "pinterest/w-o-r-k_596867756911073162.jpg", "pinterest/w-o-r-k_596867756911073161.jpg"], "t-h-i-n-k": ["pinterest/t-h-i-n-k_596867756912229811.jpg", "pinterest/t-h-i-n-k_596867756912229248.jpg", "pinterest/t-h-i-n-k_596867756911696746.jpg", "pinterest/t-h-i-n-k_596867756911444457.jpg", "pinterest/t-h-i-n-k_596867756911088927.jpg", "pinterest/t-h-i-n-k_596867756911072299.jpg"], "v-r-u-m": ["pinterest/v-r-u-m_596867756912383987.jpg", "pinterest/v-r-u-m_596867756912229225.jpg", "pinterest/v-r-u-m_596867756911649195.jpg", "pinterest/v-r-u-m_596867756911465090.jpg", "pinterest/v-r-u-m_596867756911465047.jpg", "pinterest/v-r-u-m_596867756911465034.jpg"], "b-o-o-k-s": ["pinterest/b-o-o-k-s_596867756911465040.jpg", "pinterest/b-o-o-k-s_596867756911453775.jpg", "pinterest/b-o-o-k-s_596867756911448988.jpg", "pinterest/b-o-o-k-s_596867756911448987.jpg", "pinterest/b-o-o-k-s_596867756911448977.jpg", "pinterest/b-o-o-k-s_596867756911435797.jpg"], "f-o-o-d": ["pinterest/f-o-o-d_596867756911242154.jpg", "pinterest/f-o-o-d_596867756911098960.jpg", "pinterest/f-o-o-d_596867756911073158.jpg", "pinterest/f-o-o-d_596867756911033081.jpg", "pinterest/f-o-o-d_596867756905370486.jpg", "pinterest/f-o-o-d_596867756905130587.jpg"], "r-o-o-m": ["pinterest/r-o-o-m_596867756911279852.jpg", "pinterest/r-o-o-m_596867756910963033.jpg", "pinterest/r-o-o-m_596867756910184068.jpg", "pinterest/r-o-o-m_596867756904392333.jpg", "pinterest/r-o-o-m_596867756902607862.jpg", "pinterest/r-o-o-m_596867756895655824.jpg"], "m-a-k-e-u-p": ["pinterest/m-a-k-e-u-p_596867756912383994.jpg", "pinterest/m-a-k-e-u-p_596867756912383986.jpg", "pinterest/m-a-k-e-u-p_596867756912273414.jpg", "pinterest/m-a-k-e-u-p_596867756912229235.jpg"], "t-h-i-s": ["pinterest/t-h-i-s_596867756912393884.jpg", "pinterest/t-h-i-s_596867756912273406.jpg", "pinterest/t-h-i-s_596867756912273402.jpg", "pinterest/t-h-i-s_596867756912229229.jpg"], "s-t-u-d-y": ["pinterest/s-t-u-d-y_596867756905370493.jpg", "pinterest/s-t-u-d-y_596867756905171709.jpg", "pinterest/s-t-u-d-y_596867756904392326.jpg", "pinterest/s-t-u-d-y_596867756902705062.jpg"]};
const im=p=>'assets/'+p; /* imagens ficam em assets/exemplos e assets/pinterest */
const sl=(c,n)=>[...Array(n)].map((_,i)=>im(`exemplos/${c}_${i}.jpg`));
const PINMAP=Object.fromEntries(Object.entries(PINMAP0).map(([k,v])=>[k,v.map(im)]));
const IGX=[
 {code:'DchIRCHmAH2',title:'Rotina sem expor a vida pessoal',n:12,kb:['k-aluno1','k-vendastories','k-freq'],tag:'Bastidor / estilo de vida',
  what:'Doze stories de um dia comum: carro às 7h, box do banheiro, prints de áudios no WhatsApp ("3 conteúdos para o feed garantidos"), maquiagem, almoço, caminho para o escritório. O fio condutor é a produção de conteúdo nos "entremeios" da rotina.',
  learn:['Mostra a rotina pelo ângulo do trabalho: ela vive o que ensina (aluno número 1)','Texto curto em caixa branca, fonte serifada preta, sem enfeite','Humor leve em quase todo story ("a comida da geladeira venceu")','Prints reais (WhatsApp, CapCut exportando) funcionam como prova'],
  adapt:'Mostre seu dia de produção da Essence: o áudio que vira roteiro, o print do Notion, a gravação no carro. Rotina com intenção, sem expor casa ou família.'},
 {code:'DcTZU6LnOc5',title:'Backstage com storytelling',n:7,kb:['k-trajetoria','k-video','k-capricho'],tag:'Bastidor / história',
  what:'Bastidor de uma gravação contado como mini-história: "hoje o meu dia se resumiu nisso", "como vocês podem ver tudo dando errado desde o começo", a gata invadindo, o ovo que deu errado, "nenhum alimento foi desperdiçado", "That\'s all folks".',
  learn:['Começa pelo resumo/clímax e depois conta','Erro mostrado com humor e com fechamento (nenhuma ponta solta)','Cenas com movimento: tripé, cozinha, close no prato','Uma frase por story, legível, em caixa branca'],
  adapt:'Conte uma gravação ou reunião de cliente que deu errado e como resolveu. Conflito, virada e fechamento em 5 a 7 stories.'},
 {code:'DVrMypUCWCH',title:'Storytelling mesclado (autoridade + conexão)',n:9,kb:['k-piramide','k-trajetoria','k-pontos'],tag:'Autoridade',
  what:'Em vez de postar só o vídeo no palco, ela mostrou o caminho até a palestra: estudo no carro, limpando o tênis com a meia do noivo 5 minutos antes de subir, o salto que levou, o repost de uma aluna na plateia e a piada interna da palestra. Na legenda: gerou conexão e autoridade ao mesmo tempo.',
  learn:['Topo da pirâmide (palco) com base (bastidor imperfeito)','Prova social pelo repost de quem assistiu','"Fato curioso" como gancho de texto','Detalhe pessoal com humor humaniza a autoridade'],
  adapt:'Use em qualquer conquista (evento, cliente novo, aula): mostre o antes, o perrengue e o depois, com o repost de quem estava lá.'},
 {code:'Dcb3z8DmCnr',title:'Quebra de objeção com prova social',n:5,kb:['k-antecipacao','k-3fatores','k-desejo'],tag:'Venda / objeção',
  what:'Capa: "Você sabe o que a bordadeira, a visagista e a nutricionista têm em comum?". Em seguida, stories de três alunas de nichos diferentes, com o print do perfil de cada uma e o resultado.',
  learn:['A pergunta da capa ataca a objeção "não serve para o meu nicho" sem dizer a objeção','Cada prova traz o print do perfil (ponto de informação verificável)','Palavras-chave em rosa no meio da frase em serifa preta'],
  adapt:'Para a Sensus ou o Organiza SM: "o que a ginecologista, o oftalmologista e a dentista têm em comum?" com resultados de clientes de especialidades diferentes.'},
 {code:'DVrORKvD4u3',title:'Caixinha com CTA 1x1 no final',n:3,kb:['k-caixinha','k-vendastories'],tag:'Caixinha / venda',
  what:'Pergunta de caixinha com resposta de impacto ("Seus sonhos merecem a sua disciplina"), depois uma resposta longa e didática com marcações de dinheiro e desejo, e por fim: "O story anterior te virou uma chave, mas você ainda não tem clareza de como colocar em prática? Me manda aqui sua dúvida".',
  learn:['Fundo de foto desfocada (bolsa) para o texto respirar','Lista com ✅ e ❌ para didática','CTA final leva para conversa individual: é ali que a venda acontece'],
  adapt:'Depois de uma resposta técnica de caixinha, feche com uma caixa de perguntas convidando a pessoa para a DM. Registre quem respondeu como lead.'},
 {code:'DVrMrtfiVuA',title:'"Maquia e fala" com CTA no final',n:8,kb:['k-caixinha','k-video','k-vendastories'],tag:'Caixinha / venda',
  what:'Ela se maquia enquanto responde a caixinha "Vamos conversar?": finanças, parecer mais séria, constância, o que abdicar, conteúdo raso diário ou profundo 3x por semana. No final, a pergunta "fiz o SPE, qual seria o próximo curso?" vira CTA para o produto seguinte.',
  learn:['Ação manual simples (maquiagem) segura a atenção enquanto ela fala','Uma pergunta por story, resposta curta em texto embaixo','A última pergunta é plantada para abrir a oferta'],
  adapt:'Responda caixinha enquanto se arruma ou prepara um café. Feche com a pergunta que leva à Sensus.'},
 {code:'DVrNvd1j83h',title:'Storyvlog respondendo caixinha',n:4,kb:['k-caixinha','k-video'],tag:'Caixinha',
  what:'Ela organiza a penteadeira e responde perguntas por cima do vídeo: crença limitante mais difícil de mudar, perfume preferido. Mistura pergunta profunda com pergunta leve.',
  learn:['Pergunta em caixa branca no topo, vídeo de rotina embaixo','Equilíbrio entre pergunta séria e "farofa"','Não precisa olhar para a câmera em todas'],
  adapt:'Grave arrumando a mesa de trabalho e responda 3 perguntas: 1 técnica, 1 pessoal, 1 leve.'},
 {code:'DVrNkzRj9hW',title:'Storyvlog cotidiano',n:7,kb:['k-pontos','k-rituais'],tag:'Estilo de vida',
  what:'Sequência de casa e escritório: estante, sofá, notebook com a gata, careta na comida ("juro que é por causa da alergia"), amarrando o tênis.',
  learn:['Ambientes organizados e de cores neutras comunicam o estilo de vida (ponto de informação)','Textos mínimos, quase só imagem','Humor autoirônico'],
  adapt:'Seu cotidiano na chácara e no escritório: estética cozy, organização, café. Pouco texto.'},
 {code:'DcejelsGGC_',title:'O jeito certo de repostar reels nos stories',n:2,kb:['k-texto','k-repost'],tag:'Divulgar post',
  what:'Em vez de "post novo", ela abre com uma pergunta: "Será que só você ainda não percebeu por que as pessoas estão gravando dentro do carro?" e só depois mostra o reels ("É mais um hype?").',
  learn:['Divulgar post preparando o terreno com uma pergunta','Serifa preta em fundo claro, uma palavra em rosa','Prints de exemplos de outros criadores como prova do fenômeno'],
  adapt:'Ao publicar um reels, poste antes um story-pergunta sobre o tema e só depois o repost.'},
 {code:'DVrL5aEiXz1',title:'"O que eu levo na minha bolsa?"',n:2,kb:['k-rituais','k-pontos'],tag:'Ritual / lifestyle',
  what:'Formato recorrente de lifestyle: "O que vou levar hoje para o escritório?", mostrando a bolsa e os itens.',
  learn:['Formato repetível vira ritual','Objetos são pontos de informação sobre rotina e estilo'],
  adapt:'"O que levo para a reunião com cliente": notebook, caderno, café. Repetir toda segunda.'},
];
const PINB={
 aesthetic:{n:'Aesthetic',use:'Paleta e clima geral: madeira, vinho, livros, couro, luz natural. Base para cenário de stories.'},
 'w-o-r-k':{n:'Work',use:'Mesa de trabalho, cadernos, notebook, bibliotecas. Referência para bastidores de produção.'},
 't-h-i-n-k':{n:'Think',use:'Anotações à mão, livros marcados, café. Referência para stories de reflexão e de livro.'},
 'v-r-u-m':{n:'Car',use:'Interior de carro, volante, chave. O carro é cenário recorrente dos stories dela.'},
 'b-o-o-k-s':{n:'Books',use:'Livros abertos, chá, anotações. Para stories de repertório.'},
 'f-o-o-d':{n:'Food',use:'Pratos de cima, mesa clara. Para stories de rotina e "isso ou aquilo".'},
 'r-o-o-m':{n:'Room',use:'Ambientes neutros e organizados, café, cafeteria. Para cotidiano.'},
 'm-a-k-e-u-p':{n:'Makeup',use:'Nécessaire e bancada. Para "maquia e fala" e itens favoritos.'},
 't-h-i-s':{n:'This',use:'Bolsas e o que carregar. Para "o que tem na minha bolsa".'},
 's-t-u-d-y':{n:'Study',use:'Setup de estudo e frases. Para stories de disciplina.'},
};
const PLANREF=[[['DVrL5aEiXz1'],['aesthetic']],[['DchIRCHmAH2'],['r-o-o-m']],[['DVrORKvD4u3'],['t-h-i-n-k']],[['DcejelsGGC_'],['t-h-i-s']],[['DcejelsGGC_'],['w-o-r-k']],[['DcejelsGGC_'],['b-o-o-k-s']],[['DVrMrtfiVuA'],['w-o-r-k']],[['DcTZU6LnOc5'],['aesthetic']],[['DVrNvd1j83h'],['t-h-i-n-k']],[['DVrORKvD4u3'],['aesthetic']],
 [['DVrNkzRj9hW'],['r-o-o-m']],[['DVrNvd1j83h'],['m-a-k-e-u-p']],[['DVrMypUCWCH'],['aesthetic']],[['DVrORKvD4u3'],['t-h-i-n-k']],[['DVrL5aEiXz1'],['t-h-i-s']],[['DVrMypUCWCH'],['v-r-u-m']],[['DVrMrtfiVuA'],['w-o-r-k']],[['DcejelsGGC_'],['t-h-i-n-k']],[['DcTZU6LnOc5'],['w-o-r-k']],[['DVrMypUCWCH'],['b-o-o-k-s']],
 [['DVrMrtfiVuA'],['t-h-i-n-k']],[['DchIRCHmAH2'],['r-o-o-m']],[['DVrORKvD4u3'],['s-t-u-d-y']],[['DVrL5aEiXz1'],['m-a-k-e-u-p']],[['DcTZU6LnOc5'],['aesthetic']],[['DVrNkzRj9hW'],['f-o-o-d']],[['DVrNvd1j83h'],['aesthetic']],[['DchIRCHmAH2'],['w-o-r-k']],[['Dcb3z8DmCnr'],['t-h-i-n-k']],[['Dcb3z8DmCnr'],['s-t-u-d-y']]];
const IGURL=c=>`https://www.instagram.com/luanacarolinastories/p/${c}/`;
const exByCode=c=>IGX.find(x=>x.code===c);

