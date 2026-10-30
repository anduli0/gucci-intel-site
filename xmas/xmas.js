/* GUCCI x CHRISTMAS EDITION — behaviour (snow, header art, Horsebit, sleigh scrollbar, candy cane, signature).
   Loaded by index.html; does nothing unless the switch says so. See app/ui/xmas/README.md. */
(function(){
  // Single switch: window.GI_XMAS (set in index.html; scripts/xmas_toggle.py on|off flips it).
  // ?theme=xmas / ?theme=classic previews either state without changing the switch.
  const cfg = window.GI_XMAS || {};
  const q = new URLSearchParams(location.search).get('theme');
  const on = q ? q === 'xmas' : (cfg.enabled !== false && Date.now() <= Date.parse(cfg.until || '2027-01-06T23:59:59+09:00'));
  if(!on) return;
  const root = document.documentElement;
  root.classList.add('xmas');
  const G = '#dcb871';
  // --- Horsebit: two stirrup rings (flattened ovals, open at the bar) joined by a bar with a centre link.
  const BIT = '<svg viewBox="0 0 120 52" aria-hidden="true">'
    + '<defs><linearGradient id="xmGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7e6b0"/><stop offset=".5" stop-color="#d8ae5f"/><stop offset="1" stop-color="#9a7633"/></linearGradient>'
    + '<linearGradient id="xmGoldH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b08a42"/><stop offset=".5" stop-color="#f3dc9a"/><stop offset="1" stop-color="#b08a42"/></linearGradient></defs>'
    + '<rect x="43" y="22.75" width="34" height="6.5" rx=".9" fill="url(#xmGoldH)" stroke="#56411a" stroke-width=".7"/>'
    + '<path fill-rule="evenodd" fill="url(#xmGold)" stroke="#56411a" stroke-width=".7" stroke-linejoin="miter" d="M46 6v40H40A20 20 0 0 1 40 6H46zM46 12.5H40A13.5 13.5 0 0 0 40 39.5H46z"/>'
    + '<path fill-rule="evenodd" fill="url(#xmGold)" stroke="#56411a" stroke-width=".7" stroke-linejoin="miter" d="M74 6v40h6A20 20 0 0 0 80 6H74zM74 12.5h6a13.5 13.5 0 0 1 0 27H74z"/>'
    + '<rect x="53" y="17" width="14" height="18" rx="4" fill="url(#xmGold)" stroke="#56411a" stroke-width=".8"/>'
    + '<rect x="56.3" y="20.3" width="7.4" height="11.4" rx="2.4" fill="#2a1114" stroke="#56411a" stroke-width=".6"/>'
    + '<path d="M29.5 18c1.8-4.2 5.2-7.4 9.5-8.6M90.5 18c-1.8-4.2-5.2-7.4-9.5-8.6" fill="none" stroke="#fff9e6" stroke-width="1.3" stroke-linecap="round" opacity=".85"/>'
    + '<path d="M46.8 9v34M73.2 9v34" stroke="#fff9e6" stroke-width=".8" opacity=".45"/>'
    + '</svg>';
  // --- Line-art ornaments (1px gold engraving style)
  const S = 'fill="none" stroke="' + G + '" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"';
  const TREE = '<svg viewBox="0 0 60 76" ' + S + '>'
    + '<path d="M30 9l-9 12h5l-9 11h6l-10 12h34L37 32h6l-9-11h5z"/>'                      // three tiers (under the star)
    + '<path d="M26 42v8h8v-8"/><rect x="24" y="50" width="12" height="4" rx="1" fill="#7a0e14" stroke="#7a0e14"/>'  // trunk + pot
    + '<path d="M30 .8l1.55 3.25 3.55.45-2.6 2.45.7 3.55L30 8.8l-3.2 1.7.7-3.55-2.6-2.45 3.55-.45z" fill="' + G + '" stroke="' + G + '" stroke-width=".6" stroke-linejoin="round"/>'  // five-point star
    + '<path d="M22 19c4 2 12 2 16 0M18 30c6 3 18 3 24 0M14 41c8 4 24 4 32 0" stroke-dasharray="2.2 2.6" opacity=".8"/>'  // garland swags
    + '<circle cx="27" cy="23" r="1.6" fill="#d41f2a" stroke="#d41f2a"/><circle cx="35" cy="34" r="1.6" fill="' + G + '"/><circle cx="23" cy="36" r="1.5" fill="#fbf6ee" stroke="#fbf6ee"/><circle cx="33" cy="14" r="1.3" fill="' + G + '"/>'
    + '<rect x="12" y="54" width="9" height="7" rx="1" fill="#d41f2a" stroke="#7a0e14"/><path d="M16.5 54v7M12 57.5h9" stroke="' + G + '" stroke-width="1"/>'   // gifts under the tree
    + '<rect x="38" y="55" width="11" height="6" rx="1" fill="#175e3d" stroke="#0e3a29"/><path d="M43.5 55v6M38 58h11" stroke="' + G + '" stroke-width="1"/>'
    + '</svg>';
  const GIFT = '<svg viewBox="0 0 44 44" ' + S + '><rect x="6" y="16" width="32" height="24" rx="1.5"/><path d="M4 11h36v6H4z"/><path d="M22 11v29M6 28h32" opacity=".6"/><path d="M22 11c-6 0-9-3-9-6 0-2.5 3-3 5 0 1.6 2.4 4 6 4 6s2.4-3.6 4-6c2-3 5-2.5 5 0 0 3-3 6-9 6Z"/></svg>';
  const SOCK = '<svg viewBox="0 0 34 44" ' + S + '><path d="M9 3h16v9H9z"/><path d="M11 12v15c0 3-1 4-4 6s-4 6 0 8 10 2 13-2 4-7 4-10V12"/><path d="M11 18h13M11 22h13" opacity=".55" stroke-dasharray="2 2"/><circle cx="12" cy="36" r="1.2"/></svg>';
  const SANTA_SLEIGH_H = '<svg viewBox="0 0 150 40" ' + S + '>'
    + '<path d="M8 30c4 3 10 3 14 0M20 30h40v-7c0-5 4-9 9-9h6l5 16h20"/><path d="M60 30c4 3 10 3 14 0M80 30c4 3 10 3 14 0" opacity=".7"/>'   // sleigh runners + body
    + '<circle cx="42" cy="16" r="4"/><path d="M38 20c-4 1-6 4-6 7h16c0-3-2-6-6-7M38 13c0-4 3-6 6-5l-1 5" stroke-width="1.1"/>'  // Santa head/hat/body
    + '<path d="M60 22c8-2 20-3 30-2" stroke-dasharray="2 3" opacity=".6"/>'                                                       // reins
    + '<path d="M96 30l6-9 6 1 4-7 10 2 4 7 8 1 4 7M102 21l-2 9M118 15l-5 15M112 15l3-9m-3 9l-6-6M127 17l2-9m-2 9l6-6" stroke="#b07a44" />'           // reindeer (brown)
    + '<circle cx="133" cy="19" r="2" fill="#c8202c" stroke="none"/><circle cx="133" cy="19" r="2.6"/>'                             // Rudolph nose
    + '</svg>';
  // vertical sleigh for the page scrollbar: Rudolph at the top, Santa below, 30x92 box
  // vertical sleigh thumb (36x116), BIRD'S-EYE VIEW heading up the page: Rudolph seen from above
  // (antlers spreading forward/up, red nose at the tip, back + four legs), reins, then the sleigh
  // from above (curved dash, runners both sides, Santa's hat crown + shoulders, sack behind).
  const SLEIGH_V = '<svg viewBox="0 0 36 116" aria-hidden="true">'
    + '<g fill="none" stroke="#5c3a17" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M14 14c-4-3-7-7-7-12M14 14c-2-2-6-3-9-2M14 14c-1-3-4-6-5-9"/><path d="M22 14c4-3 7-7 7-12M22 14c2-2 6-3 9-2M22 14c1-3 4-6 5-9"/>'  // antlers (dark brown)
    + '</g>'
    + '<g fill="#8a5a2b" stroke="#5c3a17" stroke-width=".6" stroke-linejoin="round">'
    + '<path d="M18 7c-3.2 0-5.5 2.6-5.5 6.2 0 2.4 1 4.2 2.5 5.3V22h6v-3.5c1.5-1.1 2.5-2.9 2.5-5.3C23.5 9.6 21.2 7 18 7z"/>'   // head, brown
    + '<path d="M12 23h12l1.5 20h-15z"/>'                                                                                   // back, brown
    + '<path d="M14 26h8l1 14h-10z" fill="#b07a44" stroke="none" opacity=".7"/>'                                             // lighter dorsal stripe
    + '<path d="M11.5 25l-4 2M24.5 25l4 2M11.5 41l-4 2M24.5 41l4 2" stroke="#5c3a17" stroke-width="2.6" stroke-linecap="round" fill="none"/>'  // legs
    + '<circle cx="18" cy="7.5" r="3.2" fill="#d41f2a" stroke="#7a0e14"/><circle cx="17" cy="6.6" r=".9" fill="#fff" opacity=".7"/>'  // red nose + glint
    + '</g>'
    + '<g fill="' + G + '" stroke="#2a0b0d" stroke-width=".6" stroke-linejoin="round">'
    + '<path d="M18 44v8" stroke="' + G + '" stroke-width="1.2" stroke-dasharray="1.6 1.6" fill="none"/>'                  // reins
    + '<path d="M7 56c0-4 4-5 11-5s11 1 11 5v44c0 4-4 6-11 6S7 104 7 100z"/>'                                               // sleigh seen from above
    + '<path d="M2.5 54v48c0 3 1.5 5 4 5M33.5 54v48c0 3-1.5 5-4 5" fill="none" stroke="' + G + '" stroke-width="2" stroke-linecap="round"/>'  // runners L/R
    + '<path d="M9 56c3 3 15 3 18 0" fill="none" stroke="#2a0b0d" stroke-width=".9" opacity=".6"/>'                          // dash curve
    + '</g>'
    + '<g>'   // Santa from above: hat crown (red circle, white pompom), shoulders (red) with belt line
    + '<ellipse cx="18" cy="76" rx="8.5" ry="6" fill="#d41f2a" stroke="#7a0e14" stroke-width=".6"/>'
    + '<ellipse cx="18" cy="73" rx="8.5" ry="2.2" fill="#fbf6ee" opacity=".9"/>'
    + '<circle cx="18" cy="68" r="4.6" fill="#d41f2a" stroke="#7a0e14" stroke-width=".6"/><circle cx="18" cy="63.5" r="1.9" fill="#fbf6ee"/>'
    + '<rect x="10.5" y="80" width="15" height="2" rx="1" fill="#2a0b0d"/><rect x="16.8" y="79.6" width="2.4" height="2.8" fill="' + G + '"/>'
    // stacked gift boxes behind Santa (seen from above): three boxes, ribbon crosses, slight offsets
    + '<rect x="9.5" y="85" width="10" height="9" rx="1" fill="#175e3d" stroke="#0e3a29" stroke-width=".6"/><path d="M14.5 85v9M9.5 89.5h10" stroke="' + G + '" stroke-width="1.1"/>'
    + '<rect x="19" y="87" width="8" height="8" rx="1" fill="#d41f2a" stroke="#7a0e14" stroke-width=".6"/><path d="M23 87v8M19 91h8" stroke="#fbf6ee" stroke-width="1"/>'
    + '<rect x="12.5" y="95" width="11" height="8" rx="1" fill="#fbf6ee" stroke="#a98a4e" stroke-width=".6"/><path d="M18 95v8M12.5 99h11" stroke="#d41f2a" stroke-width="1.1"/>'
    + '<circle cx="14.5" cy="89.5" r="1.4" fill="' + G + '"/><circle cx="23" cy="91" r="1.2" fill="#fbf6ee"/><circle cx="18" cy="99" r="1.4" fill="#d41f2a"/>'  // bows
    + '</g></svg>';
  const FLAKES = [
    // six-fold crystal, 3 variants
    '<svg viewBox="0 0 24 24"><g><path d="M12 1v22M2.5 6.5l19 11M2.5 17.5l19-11"/><path d="M12 4l-2.2 2.2M12 4l2.2 2.2M12 20l-2.2-2.2M12 20l2.2-2.2M4.9 8l3 .3M4.9 8l.3-3M19.1 16l-3-.3M19.1 16l-.3 3M4.9 16l3-.3M4.9 16l.3 3M19.1 8l-3 .3M19.1 8l-.3-3"/></g></svg>',
    '<svg viewBox="0 0 24 24"><g><path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7"/><circle cx="12" cy="12" r="2.4"/><path d="M12 5.5l-1.6 1.6 1.6 1.6 1.6-1.6zM12 15.3l-1.6 1.6 1.6 1.6 1.6-1.6z"/></g></svg>',
    '<svg viewBox="0 0 24 24"><g><path d="M12 1.5v21M2.9 6.75l18.2 10.5M2.9 17.25l18.2-10.5"/><path d="M12 7l-3 1.7M12 7l3 1.7M12 17l-3-1.7M12 17l3-1.7M7.7 9.5l.1-3.4M7.7 14.5l.1 3.4M16.3 9.5l-.1-3.4M16.3 14.5l-.1 3.4"/></g></svg>'
  ];
  const GARLAND = encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="26">'
    + '<path d="M0 3 Q30 15 60 3 T120 3" fill="none" stroke="' + G + '" stroke-width="1" opacity=".75"/>'
    + '<path d="M14 6v3M46 6v3M90 6v3" stroke="' + G + '" stroke-width=".8"/>'
    + '<circle cx="14" cy="12.5" r="3.6" fill="#a3121c"/><circle cx="14" cy="12.5" r="3.6" fill="none" stroke="' + G + '" stroke-width=".6"/>'
    + '<circle cx="46" cy="13" r="3.2" fill="' + G + '"/>'
    + '<circle cx="90" cy="12.5" r="3.6" fill="#175e3d"/><circle cx="90" cy="12.5" r="3.6" fill="none" stroke="' + G + '" stroke-width=".6"/>'
    + '<circle cx="12.8" cy="11.3" r=".9" fill="#fff" opacity=".55"/><circle cx="88.8" cy="11.3" r=".9" fill="#fff" opacity=".5"/>'
    + '</svg>');
  const dataUri = s => "url(\"data:image/svg+xml," + encodeURIComponent(s) + "\")";
  root.style.setProperty('--xm-garland', 'url("data:image/svg+xml,' + GARLAND + '")');
  root.style.setProperty('--xm-tree', dataUri(TREE.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')));
  root.style.setProperty('--xm-gift', dataUri(GIFT.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')));
  root.style.setProperty('--xm-bit', dataUri(BIT.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ')));

  const h1 = document.querySelector('header h1');
  if(h1){ const b = document.createElement('span'); b.className = 'xm-badge'; b.innerHTML = BIT + 'CHRISTMAS EDITION'; h1.after(b); }
  const hdr = document.querySelector('header');
  if(hdr){
    const l = document.createElement('div'); l.className = 'xm-hdr-art l'; l.innerHTML = SOCK; hdr.appendChild(l);
    const r = document.createElement('div'); r.className = 'xm-hdr-art r'; r.innerHTML = SANTA_SLEIGH_H; hdr.appendChild(r);
  }
  const nav = document.querySelector('nav');
  if(nav){ const g = document.createElement('div'); g.className = 'xm-garland'; nav.after(g); }
  // script font for the signature (loaded only in the edition)
  const lf = document.createElement('link'); lf.rel = 'stylesheet';
  lf.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap'; document.head.appendChild(lf);
  const foot = document.querySelector('footer');
  if(foot){
    const a = document.createElement('div'); a.className = 'xm-foot-art'; a.innerHTML = TREE.replace('<svg ', '<svg style="height:54px;width:auto;vertical-align:bottom;margin-right:18px" ') + SANTA_SLEIGH_H.replace('viewBox', 'style="height:30px;vertical-align:bottom" viewBox'); foot.prepend(a);
    const sig = document.createElement('span'); sig.className = 'xm-sig';
    sig.innerHTML = 'MRK <svg viewBox="0 0 24 22" aria-hidden="true"><path d="M12 21s-8.5-5.6-10.6-10.4C-.4 6.3 2.4 1.5 6.8 1.5c2.3 0 4 1.3 5.2 3 1.2-1.7 2.9-3 5.2-3 4.4 0 7.2 4.8 5.4 9.1C20.5 15.4 12 21 12 21z" fill="#c8202c" stroke="#7a0e14" stroke-width=".8"/><path d="M5.2 6.2c.6-1.4 1.8-2.3 3.1-2.4" fill="none" stroke="#fff" stroke-width="1.1" stroke-linecap="round" opacity=".7"/></svg>';
    a.appendChild(sig);
    const f = document.createElement('span'); f.className = 'xm-foot'; f.textContent = 'BUON NATALE · GUCCI INTELLIGENCE CHRISTMAS EDITION'; foot.prepend(f);
  }
  // snow crystals
  const snow = document.createElement('div'); snow.className = 'xm-snow';
  for(let i = 0; i < 18; i++){
    const w = document.createElement('div'); w.innerHTML = FLAKES[i % 3]; const s = w.firstChild;
    const z = 9 + Math.random() * 11;
    s.style.cssText = 'left:' + (Math.random() * 100).toFixed(1) + '%;width:' + z + 'px;height:' + z + 'px;animation-duration:' + (14 + Math.random() * 14).toFixed(1) + 's;animation-delay:' + (-Math.random() * 28).toFixed(1) + 's;opacity:0';
    snow.appendChild(s);
  }
  document.body.prepend(snow);

  // ---- Page scrollbar: Santa's sleigh + Rudolph (vertical). Replaces the native bar. ----
  (function(){
    const track = document.createElement('div'); track.className = 'xm-sleigh-track';
    const sl = document.createElement('div'); sl.className = 'xm-sleigh'; sl.innerHTML = SLEIGH_V;
    track.appendChild(sl); document.body.appendChild(track);
    const se = document.scrollingElement || document.documentElement;
    let H = 0, L = 0;
    function sync(){
      const max = se.scrollHeight - window.innerHeight;
      track.classList.toggle('none', max <= 2);
      H = window.innerHeight - 24; L = sl.offsetHeight;
      sl.style.top = (12 + (max > 0 ? (H - L) * se.scrollTop / max : 0)) + 'px';
    }
    window.addEventListener('scroll', sync, {passive:true}); window.addEventListener('resize', sync);
    new MutationObserver(() => requestAnimationFrame(sync)).observe(document.body, {childList:true, subtree:true});
    let dy = null, top0 = 0;
    sl.addEventListener('pointerdown', e => { dy = e.clientY; top0 = parseFloat(sl.style.top) || 12; sl.setPointerCapture(e.pointerId); e.preventDefault(); });
    sl.addEventListener('pointermove', e => {
      if(dy === null) return;
      const max = se.scrollHeight - window.innerHeight, room = H - L;
      const t = Math.min(room, Math.max(0, top0 - 12 + e.clientY - dy));
      window.scrollTo(0, room > 0 ? t / room * max : 0);
    });
    const end = () => { dy = null; };
    sl.addEventListener('pointerup', end); sl.addEventListener('pointercancel', end);
    sync();
  })();

  // ---- Brief viewer: candy cane (hook + diagonal-striped stick); drag / track-click / touch ----
  // one continuous cane: hook + stick are a single SVG path, so the stripes run unbroken around the
  // bend and there is no seam. Cream arc under a red dashed arc (no <pattern>: fails on Samsung Internet).
  function caneSvg(total){
    const h = Math.max(total, 40), d = `M20 ${h - 4.5}V11.5A7.5 7.5 0 0 0 5 11.5V15`;
    return '<svg class="hook" viewBox="0 -5 26 ' + h + '" width="26" height="' + (h + 5) + '" aria-hidden="true">'
      + '<path d="' + d + '" fill="none" stroke="#fbf6ee" stroke-width="9" stroke-linecap="round"/>'
      + '<path d="' + d + '" fill="none" stroke="#c8202c" stroke-width="9" stroke-dasharray="6 7"/>'
      + '<path d="M23.2 ' + (h - 4.5) + 'V11.5" stroke="rgba(0,0,0,.18)" stroke-width="2"/></svg>';
  }
  function cane(el){
    if(el.dataset.cane) return; el.dataset.cane = '1';
    const wrap = document.createElement('div'); wrap.className = 'xm-canewrap';
    el.parentNode.insertBefore(wrap, el); wrap.appendChild(el);
    const track = document.createElement('div'); track.className = 'xm-track';
    const c = document.createElement('div'); c.className = 'xm-cane';
    c.innerHTML = caneSvg(70);
    track.appendChild(c); wrap.appendChild(track);
    let drawn = 0;
    let L = 0, H = 0;
    function sync(){
      const max = el.scrollHeight - el.clientHeight;
      track.classList.toggle('none', max <= 2);
      track.style.top = (el.offsetTop + 10) + 'px';
      track.style.height = (el.clientHeight - 20) + 'px';
      H = track.clientHeight;
      L = Math.max(70, Math.min(H, H * el.clientHeight / Math.max(el.scrollHeight, 1)));
      const Li = Math.round(L); if(Li !== drawn){ drawn = Li; c.innerHTML = caneSvg(Li); }
      c.style.top = (max > 0 ? (H - L) * el.scrollTop / max : 0) + 'px';
    }
    el.addEventListener('scroll', sync, {passive:true});
    window.addEventListener('resize', sync);
    if(window.ResizeObserver) new ResizeObserver(sync).observe(el);
    new MutationObserver(() => requestAnimationFrame(sync)).observe(el, {childList:true, subtree:true});
    let dragY = null, dragTop = 0;
    c.addEventListener('pointerdown', e => { dragY = e.clientY; dragTop = parseFloat(c.style.top) || 0; c.setPointerCapture(e.pointerId); e.preventDefault(); e.stopPropagation(); });
    c.addEventListener('pointermove', e => {
      if(dragY === null) return;
      const max = el.scrollHeight - el.clientHeight, room = H - L;
      const top = Math.min(room, Math.max(0, dragTop + e.clientY - dragY));
      el.scrollTop = room > 0 ? top / room * max : 0;
    });
    const end = () => { dragY = null; };
    c.addEventListener('pointerup', end); c.addEventListener('pointercancel', end);
    track.addEventListener('pointerdown', e => {
      if(e.target.closest('.xm-cane')) return;
      const r = c.getBoundingClientRect();
      el.scrollBy({top: (e.clientY < r.top ? -1 : 1) * el.clientHeight * 0.9, behavior:'smooth'});
    });
    sync();
  }
  function scan(){ document.querySelectorAll('.repview').forEach(cane); }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan); else scan();
  new MutationObserver(scan).observe(document.body, {childList:true, subtree:true});
})();
