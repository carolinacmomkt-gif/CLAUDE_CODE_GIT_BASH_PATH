/* Assistente de IA: revisa conteúdos segundo os métodos do banco de conhecimento.
   A chave da API fica só no servidor (ANTHROPIC_API_KEY). Resposta em texto, em fluxo. */
import Anthropic from '@anthropic-ai/sdk';
import { autorizado } from '../lib/sessao.js';

const MODELO = process.env.ANTHROPIC_MODEL || 'claude-opus-5-5';
const MAX_CHARS_METODOS = 150_000, MAX_CHARS_MSG = 40_000, MAX_MSGS = 40;

const INSTRUCOES = `Você é o editor de conteúdo da Carol Lima (estratégia de conteúdo e posicionamento, co-fundadora da Agência Essence). Sua função é revisar e melhorar os conteúdos dela segundo os MÉTODOS do banco de conhecimento abaixo (as estratégias da Luana Carolina), e não segundo regras genéricas de marketing.

Como responder:
- Português do Brasil, direto, sem emojis e sem elogio vazio.
- Ao revisar um conteúdo: (1) diga em uma ou duas linhas o que já funciona; (2) liste os problemas por ordem de importância, citando o método pelo nome (por exemplo IHC, BDA, Método Guia, Antecipação de objeções); (3) entregue uma versão melhorada do gancho (2 ou 3 opções) e do trecho que precisar de mudança; (4) termine com no máximo 3 próximos passos.
- Quando ela pedir só uma coisa (por exemplo ganchos), entregue só isso.
- Só critique o que os métodos cobrem. Se faltar informação para avaliar (nicho, público, objetivo), pergunte em uma linha antes de supor.
- Não invente métricas, resultados nem citações. Preserve os fatos da história pessoal da Carol: ao reescrever, mantenha o que ela contou.
- Use markdown simples: títulos curtos com "## ", listas com "- " ou "1. ", sem tabelas.`;

const json = (obj, status) => new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

function textoDoConteudo(c) {
  if (!c || typeof c !== 'object') return '';
  const linhas = Object.entries(c).filter(([, v]) => v !== '' && v != null && !(Array.isArray(v) && !v.length)).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`);
  return linhas.join('\n').slice(0, MAX_CHARS_MSG);
}

export default async (req) => {
  if (req.method !== 'POST') return json({ erro: 'Use POST.' }, 405);
  if (!(await autorizado(req, k => process.env[k]))) return json({ erro: 'Sessão expirada. Recarregue a página e entre de novo.' }, 401);
  if (!process.env.ANTHROPIC_API_KEY) return json({ erro: 'A chave da IA ainda não foi configurada. No Netlify, crie a variável ANTHROPIC_API_KEY e publique de novo.' }, 503);

  let corpo;
  try { corpo = await req.json(); } catch { return json({ erro: 'Pedido inválido.' }, 400); }
  const { messages, metodos, conteudo } = corpo || {};
  if (!Array.isArray(messages) || !messages.length || messages.length > MAX_MSGS) return json({ erro: 'Conversa inválida.' }, 400);
  for (const m of messages) {
    if (!m || !['user', 'assistant'].includes(m.role) || typeof m.content !== 'string' || !m.content.trim() || m.content.length > MAX_CHARS_MSG) return json({ erro: 'Mensagem inválida.' }, 400);
  }
  if (messages[0].role !== 'user' || messages[messages.length - 1].role !== 'user') return json({ erro: 'A conversa deve começar e terminar com uma mensagem sua.' }, 400);
  if (typeof metodos !== 'string' || metodos.length > MAX_CHARS_METODOS) return json({ erro: 'Métodos inválidos.' }, 400);

  const system = [
    { type: 'text', text: INSTRUCOES + '\n\n# MÉTODOS (banco de conhecimento)\n\n' + metodos, cache_control: { type: 'ephemeral' } },
  ];
  const doConteudo = textoDoConteudo(conteudo);
  if (doConteudo) system.push({ type: 'text', text: '# CONTEÚDO EM EDIÇÃO (versão atual)\n\n' + doConteudo });

  const client = new Anthropic();
  const params = {
    model: MODELO,
    max_tokens: 8000,
    system,
    messages: messages.map(m => ({ role: m.role, content: m.content })),
    output_config: { effort: 'medium' },
  };
  if (process.env.IA_FALLBACK !== '0') { params.betas = ['server-side-fallback-2026-07-01']; params.fallbacks = 'default'; }

  const enc = new TextEncoder();
  const stream = client.beta.messages.stream(params);
  req.signal?.addEventListener('abort', () => stream.abort());

  return new Response(new ReadableStream({
    async start(ctrl) {
      const escrever = t => { try { ctrl.enqueue(enc.encode(t)); } catch { /* cliente saiu */ } };
      stream.on('text', escrever);
      try {
        const fim = await stream.finalMessage();
        if (fim.stop_reason === 'refusal') escrever('\n\nA IA recusou este pedido. Tente reformular.');
        else if (fim.stop_reason === 'max_tokens') escrever('\n\n[Resposta cortada pelo limite de tamanho. Peça para continuar.]');
      } catch (e) {
        const msg = e instanceof Anthropic.AuthenticationError ? 'A chave da IA foi recusada. Confira ANTHROPIC_API_KEY no Netlify.'
          : e instanceof Anthropic.RateLimitError ? 'Limite de uso da IA atingido. Tente de novo em instantes.'
          : e instanceof Anthropic.APIError ? `A IA retornou um erro (${e.status}).`
          : 'Falha ao falar com a IA.';
        if (!req.signal?.aborted) escrever(`\n\n[${msg}]`);
      } finally { try { ctrl.close(); } catch { /* já fechado */ } }
    },
    cancel() { stream.abort(); },
  }), { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store', 'x-accel-buffering': 'no' } });
};

export const config = { path: '/api/ia' };
