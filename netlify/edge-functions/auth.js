/* Porteiro do site: tudo (página, scripts, imagens) só é entregue com a sessão válida.
   Roda na borda do Netlify antes de qualquer arquivo. Mais detalhes no CLAUDE.md. */
import { configuracao, autorizado, cookieDeLogin, cookiesDeSaida, comCookies, senhaConfere, origemOk } from '../lib/sessao.js';
import { paginaLogin } from '../lib/login-html.js';

const env = k => Netlify.env.get(k);
const html = (corpo, status = 200, extra = {}) =>
  new Response(corpo, { status, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', ...extra } });

export default async (request, context) => {
  const url = new URL(request.url);
  const { senha } = configuracao(env);
  if (!senha) return html(paginaLogin({ config: true }), 503);

  if (url.pathname === '/__login' && request.method === 'POST') {
    if (!origemOk(request)) return new Response('Origem não permitida', { status: 403 });
    const f = await request.formData();
    if (await senhaConfere(String(f.get('senha') || ''), senha)) {
      const cookies = await cookieDeLogin(env, f.get('lembrar') === '1');
      return comCookies(new Response(null, { status: 303, headers: { location: '/', 'cache-control': 'no-store' } }), cookies);
    }
    await new Promise(r => setTimeout(r, 1000));            // freia tentativas em sequência
    return html(paginaLogin({ erro: 'Senha incorreta.' }), 401);
  }

  if (url.pathname === '/__logout' && request.method === 'POST') {
    if (!origemOk(request)) return new Response('Origem não permitida', { status: 403 });
    return comCookies(new Response(null, { status: 303, headers: { location: '/', 'cache-control': 'no-store' } }), cookiesDeSaida);
  }

  if (await autorizado(request, env)) {
    return context.next();
  }

  const querHtml = (request.headers.get('accept') || '').includes('text/html');
  return querHtml ? html(paginaLogin(), 401) : new Response('Não autorizado', { status: 401, headers: { 'cache-control': 'no-store' } });
};

export const config = { path: '/*' };
