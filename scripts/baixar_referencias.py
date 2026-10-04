#!/usr/bin/env python3
"""
Baixa as fotos de referência em qualidade maior e troca as miniaturas em public/assets.

  python3 -m pip install instaloader
  python3 scripts/baixar_referencias.py              # stories (Instagram) e pins (Pinterest)
  python3 scripts/baixar_referencias.py --so exemplos
  python3 scripts/baixar_referencias.py --so pinterest
  python3 scripts/baixar_referencias.py --listar     # só mostra o plano, não baixa nada
  python3 scripts/baixar_referencias.py --login SEU_USUARIO   # se o Instagram pedir login

Como funciona
- Os arquivos já existem em public/assets/exemplos (nome <codigo>_<n>.jpg) e public/assets/pinterest
  (nome <pasta>_<id>.jpg). O script mantém os MESMOS nomes, então o sistema não muda: só a nitidez.
- Só substitui um arquivo se a nova imagem for maior que a atual. Nunca apaga nada.
- Instagram: usa a biblioteca gratuita instaloader. Sem login costuma funcionar para posts públicos,
  mas o Instagram limita pedidos; o script espera alguns segundos entre posts. Se aparecer erro 401/403
  ou "login required", rode com --login (a senha é pedida no terminal, não fica salva no projeto).
- Pinterest: abre a página pública de cada pin e pega a imagem "originals".
- Use só para estudo pessoal; as imagens são de outras pessoas.
"""
import argparse, re, sys, time, urllib.request, urllib.error
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent / "public" / "assets"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"


def baixar(url, tentativas=3):
    for i in range(tentativas):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Referer": "https://www.pinterest.com/"})
            with urllib.request.urlopen(req, timeout=30) as r:
                return r.read()
        except (urllib.error.URLError, TimeoutError) as e:
            if i == tentativas - 1:
                print(f"    falhou: {e}")
            time.sleep(2 * (i + 1))
    return None


def eh_imagem(b):
    return bool(b) and (b[:3] == b"\xff\xd8\xff" or b[:8] == b"\x89PNG\r\n\x1a\n" or (b[:4] == b"RIFF" and b[8:12] == b"WEBP"))


def salvar_se_melhor(destino: Path, dados):
    if not eh_imagem(dados):
        print(f"    ignorado (não é imagem): {destino.name}")
        return False
    atual = destino.stat().st_size if destino.exists() else 0
    if len(dados) <= atual:
        print(f"    mantido (já é igual ou maior): {destino.name}")
        return False
    tmp = destino.with_suffix(".tmp")
    tmp.write_bytes(dados)
    tmp.replace(destino)
    print(f"    ok {destino.name}: {atual // 1024} KB -> {len(dados) // 1024} KB")
    return True


def exemplos(listar, login):
    arquivos = sorted((RAIZ / "exemplos").glob("*.jpg"))
    posts = {}
    for f in arquivos:
        codigo, _, n = f.stem.rpartition("_")
        posts.setdefault(codigo, {})[int(n)] = f
    print(f"Instagram: {len(posts)} posts, {len(arquivos)} imagens")
    if listar:
        for c, d in posts.items():
            print(f"  {c}: {len(d)} imagens -> https://www.instagram.com/p/{c}/")
        return 0, 0
    try:
        import instaloader
    except ImportError:
        sys.exit("Falta a biblioteca: python3 -m pip install instaloader")
    L = instaloader.Instaloader(download_pictures=False, download_videos=False, save_metadata=False, quiet=True)
    if login:
        L.interactive_login(login)
    ok = falha = 0
    for codigo, slides in posts.items():
        print(f"  {codigo}")
        try:
            post = instaloader.Post.from_shortcode(L.context, codigo)
            urls = [n.display_url for n in post.get_sidecar_nodes()] if post.typename == "GraphSidecar" else [post.url]
        except Exception as e:  # instaloader levanta vários tipos de erro
            print(f"    não consegui abrir o post: {e}")
            falha += len(slides)
            time.sleep(5)
            continue
        for i, arq in sorted(slides.items()):
            if i >= len(urls):
                print(f"    {arq.name}: o post só tem {len(urls)} imagens")
                continue
            ok += salvar_se_melhor(arq, baixar(urls[i]))
        time.sleep(4)
    return ok, falha


def pinterest(listar):
    arquivos = sorted((RAIZ / "pinterest").glob("*.jpg"))
    print(f"Pinterest: {len(arquivos)} pins")
    ok = falha = 0
    for arq in arquivos:
        pasta, _, pin = arq.stem.rpartition("_")
        if listar:
            print(f"  {arq.name} -> https://www.pinterest.com/pin/{pin}/")
            continue
        print(f"  {arq.name}")
        html = baixar(f"https://www.pinterest.com/pin/{pin}/")
        m = html and re.search(rb'property="og:image"\s+content="([^"]+)"', html)
        if not m:
            print("    não achei a imagem na página do pin")
            falha += 1
            continue
        url = m.group(1).decode()
        original = re.sub(r"/\d+x/", "/originals/", url)
        dados = baixar(original) or baixar(url)
        ok += salvar_se_melhor(arq, dados)
        time.sleep(1.5)
    return ok, falha


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description="Baixa as referências em qualidade maior")
    ap.add_argument("--so", choices=["exemplos", "pinterest"])
    ap.add_argument("--listar", action="store_true")
    ap.add_argument("--login")
    a = ap.parse_args()
    ok = falha = 0
    if a.so in (None, "exemplos"):
        o, f = exemplos(a.listar, a.login); ok += o; falha += f
    if a.so in (None, "pinterest"):
        o, f = pinterest(a.listar); ok += o; falha += f
    if not a.listar:
        print(f"\nPronto: {ok} imagens atualizadas, {falha} falhas. Depois: git add public/assets && git commit && git push")
