/* =========================================================
   Organiza SM · scripts da página
   ========================================================= */

/* ---------- CONFIGURAÇÃO: edite só aqui ---------- */
const CONFIG = {
  checkout: {
    // Link do produto principal na Cakto (os order bumps ficam configurados lá dentro).
    // Exemplo: "https://pay.cakto.com.br/XXXXXXX"
    central: "https://pay.cakto.com.br/3895dea_1166626",
    // Link da oferta Central + Planilha financeira (R$ 97) na Cakto
    combo: "https://pay.cakto.com.br/3fzs5dq_1171305",
  },
  precos: {
    // Quando o ebook "Scripts que fecham" tiver preço, preencha aqui (ex.: "R$ 27,00").
    scripts: "",
  },
  lancamento: {
    // Data e hora em que o preço de lançamento termina (horário de Brasília).
    // Exemplo: "2026-10-31T23:59:00-03:00". Vazio = sem contador na página.
    // Use uma data real: o contador não reinicia.
    fim: "2026-10-11T23:59:00-03:00",
  },
  rastreamento: {
    // Cole só os IDs. Vazio = não carrega nada.
    metaPixel: "1615387966657882", // Pixel da Meta (Facebook/Instagram)
    googleAnalytics: "",  // Google Analytics 4. Ex.: "G-XXXXXXXXXX"
    tiktokPixel: "",      // Pixel do TikTok. Ex.: "CXXXXXXXXXXXXXXXXXXX"
    valor: 56.99,         // valor enviado nos eventos de início de checkout
  },
  demo: {
    // Tempo (ms) que cada setor fica na tela na demonstração do topo.
    duracao: 5500,
  },
};

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- rastreamento (pixels) ---------- */
  const R = CONFIG.rastreamento;
  const loadScript = (src) => { const el = document.createElement("script"); el.async = true; el.src = src; document.head.appendChild(el); };

  if (R.metaPixel) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; }(window, document);
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", R.metaPixel);
    window.fbq("track", "PageView");
  }
  if (R.googleAnalytics) {
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(R.googleAnalytics));
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", R.googleAnalytics);
  }
  if (R.tiktokPixel) {
    !function (w, d, t) { w.TiktokAnalyticsObject = t; const ttq = w[t] = w[t] || []; ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"]; ttq.setAndDefer = function (o, m) { o[m] = function () { o.push([m].concat([].slice.call(arguments, 0))); }; }; ttq.methods.forEach((m) => ttq.setAndDefer(ttq, m)); ttq.load = function (id) { const u = "https://analytics.tiktok.com/i18n/pixel/events.js"; ttq._i = ttq._i || {}; ttq._i[id] = []; ttq._i[id]._u = u; ttq._t = ttq._t || {}; ttq._t[id] = +new Date(); ttq._o = ttq._o || {}; ttq._o[id] = {}; loadScript(u + "?sdkid=" + id + "&lib=" + t); }; ttq.load(R.tiktokPixel); ttq.page(); }(window, document, "ttq");
  }

  // Envia o mesmo evento para todos os pixels ativos
  const track = (meta, ga, tiktok, valor, item) => {
    valor = valor || R.valor;
    item = item || "Central Organiza SM";
    const data = { value: valor, currency: "BRL" };
    if (window.fbq) window.fbq("track", meta, Object.assign({ content_name: item }, data));
    if (window.gtag) window.gtag("event", ga, Object.assign({ items: [{ item_name: item, price: valor }] }, data));
    if (window.ttq) window.ttq.track(tiktok, Object.assign({ content_name: item }, data));
  };

  // ViewContent: quando a oferta aparece na tela (uma vez)
  const offerEl = document.getElementById("oferta");
  if (offerEl && "IntersectionObserver" in window && (R.metaPixel || R.googleAnalytics || R.tiktokPixel)) {
    const vo = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { track("ViewContent", "view_item", "ViewContent"); vo.disconnect(); }
    }, { threshold: 0.3 });
    vo.observe(offerEl);
  }

  // Leva UTMs e IDs de clique do anúncio até o checkout (a Cakto registra a origem da venda)
  const withTracking = (url) => {
    try {
      const out = new URL(url);
      new URLSearchParams(location.search).forEach((v, k) => {
        if (/^(utm_|fbclid$|gclid$|ttclid$|src$|sck$)/.test(k) && !out.searchParams.has(k)) out.searchParams.set(k, v);
      });
      return out.toString();
    } catch (e) { return url; }
  };

  /* ---------- links de checkout ---------- */
  document.querySelectorAll("[data-checkout]").forEach((link) => {
    const url = CONFIG.checkout[link.dataset.checkout];
    if (url) {
      link.href = withTracking(url);
      link.rel = "noopener";
      // InitiateCheckout: clique em qualquer botão de compra
      link.addEventListener("click", () => track("InitiateCheckout", "begin_checkout", "InitiateCheckout",
        parseFloat(link.dataset.valor) || R.valor, link.dataset.item));
    } else {
      // Sem link configurado: leva para a oferta em vez de um "#" morto.
      link.href = "#oferta";
      if (link.closest(".plans")) {
        // Botão da própria oferta sem link: deixa claro que falta configurar
        link.setAttribute("aria-disabled", "true");
        link.classList.add("is-pending");
        link.textContent = "Link de pagamento em breve";
      }
    }
  });
  Object.keys(CONFIG.checkout).forEach((k) => {
    if (!CONFIG.checkout[k]) console.warn("[Organiza SM] Falta o link da Cakto em CONFIG.checkout." + k + " (assets/js/main.js).");
  });

  /* ---------- preço do ebook ---------- */
  if (CONFIG.precos.scripts) {
    const el = document.querySelector('[data-price="scripts"]');
    if (el) el.textContent = CONFIG.precos.scripts;
  }

  /* ---------- ano no rodapé ---------- */
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- contador do lançamento ---------- */
  const fim = CONFIG.lancamento.fim ? new Date(CONFIG.lancamento.fim).getTime() : NaN;
  const cdBoxes = document.querySelectorAll("[data-countdown]");
  const cdInline = document.querySelectorAll("[data-countdown-inline]");
  if (!isNaN(fim) && fim > Date.now()) {
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const left = Math.max(0, fim - Date.now());
      const d = Math.floor(left / 864e5), h = Math.floor(left / 36e5) % 24,
            m = Math.floor(left / 6e4) % 60, sec = Math.floor(left / 1e3) % 60;
      cdBoxes.forEach((box) => {
        box.querySelector('[data-cd="d"]').textContent = pad(d);
        box.querySelector('[data-cd="h"]').textContent = pad(h);
        box.querySelector('[data-cd="m"]').textContent = pad(m);
        box.querySelector('[data-cd="s"]').textContent = pad(sec);
      });
      cdInline.forEach((el) => {
        el.querySelector("[data-cd-text]").textContent = (d ? d + "d " : "") + pad(h) + "h" + pad(m) + "m";
      });
      if (left === 0) { clearInterval(iv); [...cdBoxes, ...cdInline].forEach((el) => (el.hidden = true)); }
    };
    [...cdBoxes, ...cdInline].forEach((el) => (el.hidden = false));
    tick();
    const iv = setInterval(tick, 1000);
  }

  /* ---------- demonstração da central (abas que trocam sozinhas) ---------- */
  const demo = document.getElementById("demo");
  if (demo) {
    const tabs = Array.from(demo.querySelectorAll('[role="tab"]'));
    const path = demo.querySelector("[data-path]");
    const bar = demo.querySelector(".win-progress");
    const paths = {
      "view-central": "organiza sm · central",
      "view-cliente": "central · clientes · Clínica Sorriso",
      "view-conteudo": "central · conteúdo · calendário",
      "view-leads": "central · aquisição · falar hoje",
      "view-tarefas": "central · gestão de tarefas",
    };
    let current = 0;
    let timer = null;
    let paused = false;

    const show = (i, focus) => {
      current = (i + tabs.length) % tabs.length;
      tabs.forEach((tab, n) => {
        const on = n === current;
        tab.setAttribute("aria-selected", on);
        tab.tabIndex = on ? 0 : -1;
        const view = document.getElementById(tab.getAttribute("aria-controls"));
        view.hidden = !on;
        // reinicia as animações internas da aba ativa
        view.classList.remove("is-active");
        if (on) { void view.offsetWidth; view.classList.add("is-active"); }
      });
      if (path) path.textContent = paths[tabs[current].getAttribute("aria-controls")] || "";
      if (focus) tabs[current].focus();
      // Rola a aba ativa para dentro da faixa no celular, sem mexer na página
      const strip = tabs[current].parentElement;
      strip.scrollTo({ left: tabs[current].offsetLeft - strip.offsetLeft - 16, behavior: reduceMotion ? "auto" : "smooth" });
      restart();
    };

    const restart = () => {
      clearTimeout(timer);
      if (bar) { bar.classList.remove("run"); void bar.offsetWidth; }
      if (reduceMotion || paused) return;
      if (bar) { bar.style.setProperty("--dur", CONFIG.demo.duracao + "ms"); bar.classList.add("run"); }
      timer = setTimeout(() => show(current + 1), CONFIG.demo.duracao);
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => show(i));
      tab.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); show(current + 1, true); }
        if (e.key === "ArrowLeft") { e.preventDefault(); show(current - 1, true); }
      });
    });

    // Pausa quando a pessoa está olhando de perto ou navegando pelo teclado
    const pause = () => { paused = true; restart(); };
    const resume = () => { paused = false; restart(); };
    demo.addEventListener("mouseenter", pause);
    demo.addEventListener("mouseleave", resume);
    demo.addEventListener("focusin", pause);
    demo.addEventListener("focusout", (e) => { if (!demo.contains(e.relatedTarget)) resume(); });

    // Só roda enquanto estiver na tela
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) { if (!paused) restart(); }
        else { clearTimeout(timer); }
      }, { threshold: 0.2 }).observe(demo);
    }

    show(0);
  }

  /* ---------- lista de dores: marcar e contar ---------- */
  const pain = document.getElementById("pain");
  const result = document.getElementById("pain-result");
  if (pain && result) {
    const original = result.innerHTML;
    const buttons = Array.from(pain.querySelectorAll("button"));
    const update = () => {
      const n = buttons.filter((b) => b.getAttribute("aria-pressed") === "true").length;
      if (n === 0) { result.innerHTML = original; return; }
      const label = n === 1 ? "1 de 6 marcada." : n + " de 6 marcadas.";
      result.innerHTML = n >= 2
        ? '<span class="count">' + label + "</span>O problema não é você. <strong>Você está fazendo trabalho de agência sem o sistema de uma agência.</strong>"
        : '<span class="count">' + label + "</span>Já é um sinal. Uma por mês vira doze por ano.";
    };
    buttons.forEach((b) => b.addEventListener("click", () => {
      b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
      update();
    }));
  }

  /* ---------- barra fixa no celular ---------- */
  // Aparece depois do hero e some quando a oferta ou o CTA final estão na tela.
  const sticky = document.getElementById("sticky");
  const hero = document.getElementById("topo");
  const hideZones = [document.getElementById("oferta"), document.querySelector(".final")].filter(Boolean);

  if (sticky && hero && "IntersectionObserver" in window) {
    let pastHero = false;
    const zonesVisible = new Set();
    const update = () => sticky.classList.toggle("show", pastHero && zonesVisible.size === 0);

    new IntersectionObserver(([entry]) => {
      pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      update();
    }).observe(hero);

    const zoneObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? zonesVisible.add(e.target) : zonesVisible.delete(e.target)));
      update();
    }, { threshold: 0.15 });
    hideZones.forEach((z) => zoneObserver.observe(z));
  }

  /* ---------- animação de entrada ---------- */
  if (!reduceMotion && "IntersectionObserver" in window) {
    const targets = document.querySelectorAll(
      ".sec h2, .pain li, .cost, .cmp-col, .deep-ui, .mini, .day li, .step, .card-yes, .card-no, .offer, .addon, .faq details"
    );
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });

    targets.forEach((el) => {
      const i = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.transitionDelay = Math.min(i, 6) * 60 + "ms";
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  /* ---------- FAQ: abre uma pergunta por vez ---------- */
  const faqItems = document.querySelectorAll(".faq details");
  faqItems.forEach((d) => {
    d.addEventListener("toggle", () => {
      if (d.open) faqItems.forEach((o) => { if (o !== d) o.open = false; });
    });
  });
})();
