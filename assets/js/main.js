/* =========================================================
   Organiza SM · scripts da página
   ========================================================= */

/* ---------- CONFIGURAÇÃO: edite só aqui ---------- */
const CONFIG = {
  checkout: {
    // Link do produto principal na Cakto (os order bumps ficam configurados lá dentro).
    // Exemplo: "https://pay.cakto.com.br/XXXXXXX"
    central: "",
  },
  precos: {
    // Quando o ebook "Scripts que fecham" tiver preço, preencha aqui (ex.: "R$ 27,00").
    scripts: "",
  },
};

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- links de checkout ---------- */
  document.querySelectorAll("[data-checkout]").forEach((link) => {
    const url = CONFIG.checkout[link.dataset.checkout];
    if (url) {
      link.href = url;
      link.rel = "noopener";
    } else {
      // Sem link configurado: leva para a oferta em vez de um "#" morto.
      link.href = "#oferta";
    }
  });
  if (!CONFIG.checkout.central) {
    console.warn("[Organiza SM] Falta colar o link da Cakto em CONFIG.checkout.central (assets/js/main.js).");
  }

  /* ---------- preço do ebook ---------- */
  if (CONFIG.precos.scripts) {
    const el = document.querySelector('[data-price="scripts"]');
    if (el) el.textContent = CONFIG.precos.scripts;
  }

  /* ---------- ano no rodapé ---------- */
  const ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

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
      ".sec h2, .pain li, .turn, .cost, .cmp-col, .sector, .shot, .mock, .day li, .step, .card-yes, .card-no, .offer, .addon, .faq details"
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
      // Escalona levemente itens irmãos em grade
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
