const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function paginaLogin({ erro = '', config = false } = {}) {
  const aviso = config
    ? 'O acesso ainda não foi configurado. No Netlify, abra Site configuration, Environment variables, e crie SITE_PASSWORD com a senha desejada. Depois publique de novo.'
    : erro;
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Entrar — Carol Lima</title>
<style>
:root{--bg:#fbf8f3;--surface:#fffdf9;--line:#d9c7b3;--text:#2e2119;--muted:#8b7765;--brand:#4a3426;--brand2:#8a6a52;--ink:#fffdf9;--bad:#a4442c}
@media (prefers-color-scheme:dark){:root{--bg:#17110d;--surface:#1f1712;--line:#45352a;--text:#efe5d8;--muted:#a8927e;--brand:#d9c7b3;--brand2:#b59a80;--ink:#1f1712;--bad:#e59a82}}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;background:var(--bg);color:var(--text);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,Roboto,Arial,sans-serif;padding:16px}
.card{width:min(380px,100%);background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:34px 30px;box-shadow:0 20px 60px rgba(46,33,25,.12)}
.brand{font-family:"Neue Montreal","PP Neue Montreal","Helvetica Neue",Helvetica,Arial,sans-serif;font-size:26px;letter-spacing:-.01em;color:var(--brand)}
.sub{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);margin:4px 0 26px}
label{display:block;font-size:13px;color:var(--muted);margin-bottom:6px}
input[type=password]{width:100%;padding:11px 14px;border:1px solid var(--line);border-radius:12px;background:var(--bg);color:var(--text);font-size:16px}
input[type=password]:focus{outline:2px solid var(--brand2);outline-offset:1px}
.lembrar{display:flex;gap:8px;align-items:center;margin:14px 0 20px;font-size:13px;color:var(--text)}
button{width:100%;padding:12px;border:0;border-radius:999px;background:var(--brand);color:var(--ink);font-size:14px;cursor:pointer}
button:hover{opacity:.92}
.erro{background:rgba(164,68,44,.1);color:var(--bad);border-radius:10px;padding:10px 12px;font-size:13px;margin-bottom:16px}
.sr{position:absolute;left:-9999px}
</style>
</head>
<body>
<form class="card" method="post" action="/__login">
  <div class="brand">Carol Lima</div>
  <div class="sub">Sistema de conteúdo</div>
  ${aviso ? `<div class="erro" role="alert">${esc(aviso)}</div>` : ''}
  <input class="sr" type="text" name="usuario" value="carol" autocomplete="username" tabindex="-1" aria-hidden="true">
  <label for="senha">Senha</label>
  <input id="senha" type="password" name="senha" autocomplete="current-password" required autofocus>
  <label class="lembrar"><input type="checkbox" name="lembrar" value="1" checked> Manter acesso neste dispositivo por 30 dias</label>
  <button type="submit">Entrar</button>
</form>
</body>
</html>`;
}
