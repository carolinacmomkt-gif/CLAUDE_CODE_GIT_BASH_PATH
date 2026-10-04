/* ============ ÍCONES (traço fino) ============ */
const IC={
 home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
 route:'<circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h8a3 3 0 0 0 0-6H8a3 3 0 0 1 0-6h8"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
 list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
 pen:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
 grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
 chart:'<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
 circle:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/>',
 compass:'<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
 rocket:'<path d="M5 15c-1.5 1-2 4-2 6 2 0 5-.5 6-2"/><path d="M9 15l-3-3c1-4 4-8 10-9 0 6-4 9-8 10z"/><circle cx="15" cy="9" r="1.5"/>',
 mega:'<path d="M3 11v3a1 1 0 0 0 1 1h3l6 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M17 9a4 4 0 0 1 0 6"/>',
 book:'<path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-4a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h5z"/>',
 moon:'<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 down:'<path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>',up:'<path d="M12 21V9M7 14l5-5 5 5M5 3h14"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',check:'<path d="M5 12l5 5L20 7"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
 alert:'<path d="M12 9v4M12 17h.01"/><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/>',
 spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
 play:'<path d="M7 4l13 8-13 8z"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',
};
const ic=(n,s)=>`<svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"${s?` style="width:${s}px;height:${s}px"`:''}>${IC[n]||''}</svg>`;

