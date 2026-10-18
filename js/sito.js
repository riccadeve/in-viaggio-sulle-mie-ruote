/* ==========================================================================
   IN VIAGGIO SULLE MIE RUOTE — comportamenti del sito
   Per pubblicare un racconto NON serve modificare questo file:
   basta copiare racconti/_modello.html e aggiornare js/contenuti.js
   (per la versione inglese: en/stories/_template.html e js/contenuti-en.js)
   ========================================================================== */
(function () {
  'use strict';

  const html = document.documentElement;
  const EN = (html.getAttribute('lang') || 'it').toLowerCase().startsWith('en');
  const R = html.getAttribute('data-radice') || '';           // cartella principale del sito: foto, css, js
  const P = html.hasAttribute('data-pagine') ? html.getAttribute('data-pagine') : R;   // cartella delle pagine della lingua
  const SITO = window.SITO || {};
  const pocoMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* In inglese: i dati comuni (foto, data, voto, etichette) arrivano da contenuti.js,
     i testi tradotti da contenuti-en.js. Compaiono solo i racconti già tradotti. */
  const RACCONTI = EN
    ? (window.RACCONTI || []).filter((r) => (window.RACCONTI_EN || {})[r.id]).map((r) => Object.assign({}, r, window.RACCONTI_EN[r.id]))
    : (window.RACCONTI || []).slice();

  html.classList.add('js');

  /* ---------- testi dell'interfaccia, nelle due lingue ---------- */
  const T = EN ? {
    nomeSito: 'Travelling on my wheels', nomeRighe: ['Travelling', 'on my wheels'], motto: 'no surprises', home: 'Home', paginaIniziale: ', home page',
    chiSono: 'About me', menuPrincipale: 'Main menu', menu: 'Menu', chiudi: 'Close',
    livelli: ['normal', 'large', 'extra large'],
    testoPiu: 'Larger text', testoAncora: 'Even larger text', testoNormale: 'Normal text',
    dimAttuale: (n) => `current size: ${n}`, dimTesto: (n) => `Text size: ${n}`,
    conta: (n) => (n === 1 ? '1 story' : `${n} stories`),
    voto: (n, cuori) => `${n} ${cuori ? (n === 1 ? 'heart' : 'hearts') : (n === 1 ? 'star' : 'stars')} out of 5`,
    votoGusto: (n) => `${n} out of 5 for taste`,
    dove: 'Where: ', quando: 'When: ', esperienza: 'Experience', esperienzaComplessiva: 'Overall experience',
    accessibilita: 'Accessibility', leggi: 'Read the story',
    footerFrase: 'Real trips, tried on my own wheels, to help wheelchair users set off without nasty surprises.',
    mieiViaggi: 'My trips', sezioniBlog: 'Blog sections', comeLeggere: 'How to read the stories', contatti: 'Contact', scrivimi: 'Write to me',
    avviso: 'Services, access and parking conditions can change: always check the latest information for each place.',
    provati: 'Stories tested with a wheelchair and Triride.',
    prossimamente: 'Coming soon', togli: 'Clear filters',
    nessuno: 'No story in this section has all the features you chose yet.',
    statoFiltri: (v, tot, nomi) => `${v} of ${tot} ${tot === 1 ? 'story' : 'stories'} with: ${nomi}.`,
    statoTutti: (tot) => `${T.conta(tot)} in this section.`,
    indice: 'In this story', prec: 'Previous story', succ: 'Next story', tornaSezione: 'Back to the section', tutti: 'All stories',
    primo: 'This is the first story', recente: 'This is the latest story',
    fotoGrande: 'Enlarged photo', precedente: 'Previous', successiva: 'Next', fotoDi: (a, b) => `Photo ${a} of ${b}`,
    apriFoto: ' (open the enlarged photo)', tornaSu: 'Back to the top of the page',
    altraLingua: 'IT', altraLinguaCodice: 'it', altraLinguaVoce: 'Leggi questa pagina in italiano',
    /* in fondo ai racconti: «utile» e «domande» */
    privacy: 'Privacy', fbZona: 'Your feedback and your questions',
    utileTitolo: 'Was this story helpful?', utileBottone: 'Yes, it helped me', utileGrazie: 'Thank you!',
    utileVoce: 'Thank you! Anna has been told this story helped you.',
    utileErrore: 'Sorry, that didn’t go through. Please try again in a moment.',
    domandaTitolo: 'Leave feedback',
    nome: 'Name', email: 'Email', messaggio: 'Message', obbligatorio: 'required', emailNota: 'optional: if you’d like a reply',
    consenso: 'I agree to the details I have entered here being used so that Anna can read my message and reply to me.',
    privacyLeggi: 'Read the privacy notice', invia: 'Send', invio: 'Sending…',
    grazie: 'Thank you! I’ll reply as soon as I can.', grazieSenzaEmail: 'Thank you! Your message has arrived.',
    errNome: 'Please enter your name.', errMessaggio: 'Please write your message.',
    errEmail: 'This email address doesn’t look right. Check it, or leave the field empty.',
    errConsenso: 'To send your message we need your consent: please tick the box.',
    errRiepilogo: 'Something is missing: please check the fields marked above.',
    errInvio: 'Sorry, your message could not be sent. Please try again in a moment',
    trappola: 'Leave this field empty',
    /* home: sezione «Scrivimi» (i valori degli argomenti restano in italiano: sono quelli che legge Anna) */
    contattiInvito: 'Got a question about a trip, some advice to ask, or an accessible place to suggest? Write to me: I read everything and I’m happy to reply.',
    emailNotaContatti: 'required: I need it to reply to you', argomento: 'Topic',
    argomenti: [['Domanda su un racconto', 'A question about a story'], ['Segnalazione di un luogo', 'Suggesting a place'], ['Altro', 'Something else']],
    inviaMessaggio: 'Send message',
    errEmailManca: 'Please enter your email address: I need it to reply to you.',
    errEmailSbagliata: 'This email address doesn’t look right. Please check it.',
    /* «My travel map»: map page, home preview and the list of places */
    mappa: 'Map', mappaTitolo: 'My travel map', paginaMappa: 'map.html',
    mappaVoce: 'Interactive map of my trips',
    mappaTastiera: 'With the keyboard: the arrow keys move the map, + and − zoom in and out, Tab goes from one place to the next and Enter opens its card.',
    mappaCarica: 'Loading the map…',
    mappaErrore: 'Sorry, the map could not be loaded. You can find all the places in the list below.',
    mappaErroreHome: 'Sorry, the map could not be loaded. On the map page you will also find a list of all the places.',
    datiDa: 'Data from',
    spostaMappa: 'Move the map', italia: 'Italy', mondo: 'World', zoomPiu: 'Zoom in', zoomMeno: 'Zoom out', chiudiScheda: 'Close the card',
    dueDita: 'Use two fingers to move the map', oppureTocca: 'or tap it once to unlock it',
    mappaSbloccata: 'Map unlocked: you can now move it with one finger.',
    legendaFiltri: 'Key and filters', legenda: 'Key',
    filtriMappa: 'Tap one or more sections: only their places stay on the map.',
    simboloPin: 'Pin with the wheelchair: a story', simboloTappa: 'Small dot: a stop on the trip', simboloGruppo: 'Circle with a number: places close together, tap to see them',
    statoMappaTutti: (n) => (n === 1 ? 'The map shows 1 story.' : `The map shows all ${n} stories.`),
    statoMappaFiltri: (v, tot, nomi) => `The map shows ${v} of ${tot} ${tot === 1 ? 'story' : 'stories'}: ${nomi}.`,
    tappa: 'Stop', tappaVoce: (nome, titolo) => `${nome}: a stop in the story “${titolo}”`,
    giorno: (n) => `Day ${n}`, vaiGiorno: 'Go to this day of the story', vaiPunto: 'Go to this part of the story',
    gruppo: (n) => `${n} places close together: open to zoom in`,
    tappeDi: (luogo) => `Stops on the trip: ${luogo}`
  } : {
    nomeSito: 'In viaggio sulle mie ruote', nomeRighe: ['In viaggio', 'sulle mie ruote'], motto: 'senza sorprese', home: 'Home', paginaIniziale: ', pagina iniziale',
    chiSono: 'Chi sono', menuPrincipale: 'Menu principale', menu: 'Menu', chiudi: 'Chiudi',
    livelli: ['normale', 'grande', 'molto grande'],
    testoPiu: 'Testo più grande', testoAncora: 'Testo ancora più grande', testoNormale: 'Testo normale',
    dimAttuale: (n) => `dimensione attuale: ${n}`, dimTesto: (n) => `Dimensione del testo: ${n}`,
    conta: (n) => (n === 1 ? '1 racconto' : `${n} racconti`),
    voto: (n, cuori) => `${n} ${cuori ? (n === 1 ? 'cuore' : 'cuori') : (n === 1 ? 'stella' : 'stelle')} su 5`,
    votoGusto: (n) => `${n} su 5 per il gusto`,
    dove: 'Dove: ', quando: 'Quando: ', esperienza: 'Esperienza', esperienzaComplessiva: 'Esperienza complessiva',
    accessibilita: 'Accessibilità', leggi: 'Leggi il racconto',
    footerFrase: 'Viaggi veri, provati con le mie ruote, per aiutare chi viaggia in carrozzina a partire senza brutte sorprese.',
    mieiViaggi: 'I miei viaggi', sezioniBlog: 'Sezioni del blog', comeLeggere: 'Come leggere i racconti', contatti: 'Contatti', scrivimi: 'Scrivimi',
    avviso: 'Servizi, accessi e condizioni di sosta possono cambiare: controlla sempre le informazioni aggiornate dei luoghi.',
    provati: 'Racconti provati con carrozzina e Triride.',
    prossimamente: 'Prossimamente', togli: 'Togli i filtri',
    nessuno: 'Per ora nessun racconto di questa sezione ha tutte le caratteristiche scelte.',
    statoFiltri: (v, tot, nomi) => `${T.conta(v)} su ${tot} con: ${nomi}.`,
    statoTutti: (tot) => `${T.conta(tot)} in questa sezione.`,
    indice: 'Indice del racconto', prec: 'Racconto precedente', succ: 'Racconto successivo', tornaSezione: 'Torna alla sezione', tutti: 'Tutti i racconti',
    primo: 'Questo è il primo racconto', recente: 'Questo è il racconto più recente',
    fotoGrande: 'Foto ingrandita', precedente: 'Precedente', successiva: 'Successiva', fotoDi: (a, b) => `Foto ${a} di ${b}`,
    apriFoto: ' (apri la foto ingrandita)', tornaSu: 'Torna all’inizio della pagina',
    altraLingua: 'EN', altraLinguaCodice: 'en', altraLinguaVoce: 'Read this page in English',
    /* in fondo ai racconti: «utile» e «domande» */
    privacy: 'Privacy', fbZona: 'Il tuo parere e le tue domande',
    utileTitolo: 'Ti è stato utile questo racconto?', utileBottone: 'Sì, mi è stato utile', utileGrazie: 'Grazie!',
    utileVoce: 'Grazie! Anna saprà che questo racconto ti è stato utile.',
    utileErrore: 'Non sono riuscita a registrare il tuo clic. Riprova tra poco.',
    domandaTitolo: 'Lascia un riscontro',
    nome: 'Nome', email: 'E-mail', messaggio: 'Messaggio', obbligatorio: 'obbligatorio', emailNota: 'facoltativa: se vuoi una risposta',
    consenso: 'Acconsento all’uso dei dati che ho scritto qui, perché Anna possa leggere il messaggio e rispondermi.',
    privacyLeggi: 'Leggi l’informativa sulla privacy', invia: 'Invia', invio: 'Invio in corso…',
    grazie: 'Grazie! Ti risponderò appena possibile.', grazieSenzaEmail: 'Grazie! Il tuo messaggio è arrivato.',
    errNome: 'Scrivi il tuo nome.', errMessaggio: 'Scrivi il tuo messaggio.',
    errEmail: 'Questo indirizzo e-mail non sembra corretto. Controllalo, oppure lascia il campo vuoto.',
    errConsenso: 'Per inviare il messaggio serve il tuo consenso: spunta la casella.',
    errRiepilogo: 'Manca qualcosa: controlla i campi segnati qui sopra.',
    errInvio: 'Non sono riuscita a inviare il messaggio. Riprova tra poco',
    trappola: 'Non compilare questo campo',
    /* home: sezione «Scrivimi» */
    contattiInvito: 'Hai una domanda su un viaggio, un consiglio da chiedermi o un luogo accessibile da segnalarmi? Scrivimi: leggo tutto e ti rispondo volentieri.',
    emailNotaContatti: 'obbligatoria: mi serve per risponderti', argomento: 'Argomento',
    argomenti: [['Domanda su un racconto', 'Domanda su un racconto'], ['Segnalazione di un luogo', 'Segnalazione di un luogo'], ['Altro', 'Altro']],
    inviaMessaggio: 'Invia il messaggio',
    errEmailManca: 'Scrivi il tuo indirizzo e-mail: mi serve per risponderti.',
    errEmailSbagliata: 'Questo indirizzo e-mail non sembra corretto. Controllalo.',
    /* «La mappa dei miei viaggi»: pagina della mappa, anteprima in home ed elenco dei luoghi */
    mappa: 'Mappa', mappaTitolo: 'La mappa dei miei viaggi', paginaMappa: 'mappa.html',
    mappaVoce: 'Mappa interattiva dei miei viaggi',
    mappaTastiera: 'Con la tastiera: le frecce spostano la mappa, + e − la ingrandiscono e la rimpiccioliscono, Tab passa da un luogo all’altro e Invio ne apre la scheda.',
    mappaCarica: 'Sto caricando la mappa…',
    mappaErrore: 'Non è stato possibile caricare la mappa. Trovi tutti i luoghi nell’elenco qui sotto.',
    mappaErroreHome: 'Non è stato possibile caricare la mappa. Nella pagina della mappa trovi anche l’elenco di tutti i luoghi.',
    datiDa: 'Dati da',
    spostaMappa: 'Sposta la mappa', italia: 'Italia', mondo: 'Mondo', zoomPiu: 'Ingrandisci', zoomMeno: 'Rimpicciolisci', chiudiScheda: 'Chiudi la scheda',
    dueDita: 'Usa due dita per spostare la mappa', oppureTocca: 'oppure toccala una volta per sbloccarla',
    mappaSbloccata: 'Mappa sbloccata: ora si sposta anche con un dito.',
    legendaFiltri: 'Legenda e filtri', legenda: 'Legenda',
    filtriMappa: 'Tocca una o più sezioni: sulla mappa restano solo i loro luoghi.',
    simboloPin: 'Segnaposto con la carrozzina: un racconto', simboloTappa: 'Pallino piccolo: una tappa del viaggio', simboloGruppo: 'Cerchio con il numero: luoghi vicini, toccalo per vederli',
    statoMappaTutti: (n) => (n === 1 ? 'Sulla mappa c’è 1 racconto.' : `Sulla mappa ci sono tutti i ${n} racconti.`),
    statoMappaFiltri: (v, tot, nomi) => `Sulla mappa: ${T.conta(v)} su ${tot}, ${nomi}.`,
    tappa: 'Tappa', tappaVoce: (nome, titolo) => `${nome}: tappa del racconto «${titolo}»`,
    giorno: (n) => `Giorno ${n}`, vaiGiorno: 'Vai a questo giorno del racconto', vaiPunto: 'Vai a questo punto del racconto',
    gruppo: (n) => `${n} luoghi vicini: aprilo per ingrandire`,
    tappeDi: (luogo) => `Le tappe del viaggio: ${luogo}`
  };

  /* Dimensione del testo scelta l'ultima volta (subito, per evitare salti) */
  const LIVELLI = ['', 'testo-1', 'testo-2'];
  let livello = 0;
  try { livello = parseInt(localStorage.getItem('ivr-testo'), 10) || 0; } catch (e) { /* memoria non disponibile */ }
  if (LIVELLI[livello]) html.classList.add(LIVELLI[livello]); else livello = 0;

  const SEZIONI = EN ? {
    gite:    { nome: 'Day trips',            pagina: 'day-trips.html',            icona: 'sole' },
    weekend: { nome: 'Weekends and stays',   pagina: 'weekends-and-stays.html',   icona: 'luna' },
    grandi:  { nome: 'Big trips',            pagina: 'big-trips.html',            icona: 'globo' }
  } : {
    gite:    { nome: 'Gite fuori porta',    pagina: 'gite-fuori-porta.html',    icona: 'sole' },
    weekend: { nome: 'Weekend e soggiorni', pagina: 'weekend-e-soggiorni.html', icona: 'luna' },
    grandi:  { nome: 'Grandi viaggi',       pagina: 'grandi-viaggi.html',       icona: 'globo' }
  };
  const TAG = EN ? {
    bagno:          { nome: 'Accessible toilet',         icona: 'bagno' },
    parcheggio:     { nome: 'Disabled parking',          icona: 'parcheggio' },
    accompagnatore: { nome: 'Companion needed',          icona: 'accompagnatore' },
    pendenza:       { nome: 'Slopes on the route',       icona: 'pendenza' },
    impianti:       { nome: 'Accessible cable cars',     icona: 'impianti' }
  } : {
    bagno:          { nome: 'Bagno accessibile',                icona: 'bagno' },
    parcheggio:     { nome: 'Parcheggio disabili',              icona: 'parcheggio' },
    accompagnatore: { nome: 'Serve accompagnatore',             icona: 'accompagnatore' },
    pendenza:       { nome: 'Percorso in pendenza',             icona: 'pendenza' },
    impianti:       { nome: 'Impianti di risalita accessibili', icona: 'impianti' }
  };

  const RUOTA = '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false"><circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" stroke-width="4.5"/><g stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M24 7v34M7 24h34M12 12l24 24M36 12L12 36"/></g><circle cx="24" cy="24" r="5" fill="currentColor"/></svg>';

  /* ---------- piccoli aiuti ---------- */
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icona = (nome, extra) => `<span class="icona i-${nome}${extra ? ' ' + extra : ''}" aria-hidden="true"></span>`;
  const conta = T.conta;
  const dalPiuRecente = (a, b) => (a.data < b.data ? 1 : a.data > b.data ? -1 : 0);
  const annuncia = (testo) => { const a = document.getElementById('annuncio'); if (a) a.textContent = testo; };
  const raccontoAttuale = () => RACCONTI.find((r) => r.id === html.getAttribute('data-racconto'));

  function votoHTML(n, tipo, etichetta) {
    n = Math.max(0, Math.min(5, Math.round(Number(n) || 0)));
    /* voto al cibo: cinque icone (disegno in css/stile.css, variabile --i-cibo), quelle oltre il voto restano sbiadite.
       Chi usa un lettore di schermo sente solo l'etichetta */
    if (tipo === 'piatti') {
      let piatti = '';
      for (let i = 1; i <= 5; i++) piatti += `<span class="piatto${i <= n ? '' : ' vuoto'}" aria-hidden="true"></span>`;
      const gusto = `${etichetta ? etichetta + ': ' : ''}${T.votoGusto(n)}`;
      return `<span class="voto piatti" role="img" aria-label="${esc(gusto)}"><span class="voto-icone">${piatti}</span><span class="voto-num">${n}/5</span></span>`;
    }
    const cuori = tipo === 'cuori';
    let icone = '';
    for (let i = 1; i <= 5; i++) {
      const nome = cuori ? (i <= n ? 'cuore' : 'cuore-vuoto') : (i <= n ? 'stella' : 'stella-vuota');
      icone += `<span class="icona i-${nome}" style="--n:${i}"></span>`;
    }
    const voce = `${etichetta ? etichetta + ': ' : ''}${T.voto(n, cuori)}`;
    return `<span class="voto ${cuori ? 'cuori' : 'stelle'}" role="img" aria-label="${esc(voce)}"><span class="voto-icone">${icone}</span><span class="voto-num">${n}/5</span></span>`;
  }

  function tagHTML(elenco) {
    return (elenco || []).filter((t) => TAG[t]).map((t) => `<li><span class="tag">${icona(TAG[t].icona)}${esc(TAG[t].nome)}</span></li>`).join('');
  }

  function schedaHTML(r, titolo) {
    const sez = SEZIONI[r.sezione] || SEZIONI.gite;
    const h = titolo || 'h3';
    return `<article class="scheda">
      <div class="scheda-foto">
        <img src="${R}${esc(r.copertina)}" alt="${esc(r.copertinaAlt)}" loading="lazy" decoding="async"${r.copertinaFuoco ? ` style="object-position:${esc(r.copertinaFuoco)}"` : ''}>
        <span class="scheda-sezione">${icona(sez.icona)}${esc(sez.nome)}</span>
      </div>
      <div class="scheda-corpo">
        <${h} class="scheda-titolo"><a href="${P}${esc(r.pagina)}">${esc(r.titolo)}</a></${h}>
        <ul class="scheda-meta">
          <li>${icona('luogo')}<span><span class="vh">${T.dove}</span>${esc(r.luogo)} · ${esc(r.regione)}</span></li>
          <li>${icona('calendario')}<span><span class="vh">${T.quando}</span>${esc(r.dataTesto)}</span></li>
        </ul>
        <p class="scheda-testo">${esc(r.sommario)}</p>
        <p class="scheda-voto"><span aria-hidden="true">${T.esperienza}</span> ${votoHTML(r.cuori, 'cuori', T.esperienzaComplessiva)}</p>
        <ul class="tag-lista" aria-label="${T.accessibilita}">${tagHTML(r.tag)}</ul>
        <span class="scheda-leggi" aria-hidden="true">${T.leggi} ${icona('freccia')}</span>
      </div>
    </article>`;
  }

  /* ---------- testata e fondo pagina: scritti una volta sola, qui ---------- */
  function paginaAttuale() {
    const r = raccontoAttuale();
    return r ? r.sezione : (html.getAttribute('data-pagina') || '');
  }

  class TestataSito extends HTMLElement {
    connectedCallback() {
      if (this.firstChild) return;
      const qui = paginaAttuale();
      const voci = [['home', T.home, 'index.html']]
        .concat(Object.keys(SEZIONI).map((k) => [k, SEZIONI[k].nome, SEZIONI[k].pagina]))
        .concat([['mappa', T.mappa, T.paginaMappa], ['chi', T.chiSono, 'index.html#chi-sono'], ['contatti', T.contatti, 'index.html#contatti']]);
      const altra = html.getAttribute('data-altra-lingua');
      const lingua = altra
        ? `<a class="btn-strumento btn-lingua" href="${esc(altra)}" hreflang="${T.altraLinguaCodice}" lang="${T.altraLinguaCodice}" aria-label="${T.altraLinguaVoce}" title="${T.altraLinguaVoce}">${icona('globo')}<span>${T.altraLingua}</span></a>`
        : '';
      this.innerHTML = `<header class="testata">
        <div class="testata-interno">
          <a class="logo" href="${P}index.html">
            <span class="logo-ruota">${RUOTA}</span>
            <span><span class="logo-nome"><span>${T.nomeRighe[0]}</span> <span>${T.nomeRighe[1]}</span></span><span class="logo-motto">${T.motto}</span><span class="vh">${T.paginaIniziale}</span></span>
          </a>
          <nav class="nav" id="menu" aria-label="${T.menuPrincipale}">
            <ul>${voci.map(([k, nome, href]) => `<li><a href="${P}${href}"${k === qui ? ' aria-current="page"' : ''}>${nome}</a></li>`).join('')}</ul>
          </nav>
          <div class="strumenti">
            ${lingua}
            <button type="button" class="btn-strumento btn-testo">${icona('testo')}<span class="btn-etichetta">${T.testoPiu}</span></button>
            <button type="button" class="btn-strumento btn-menu" aria-expanded="false" aria-controls="menu">${icona('menu')}<span class="btn-etichetta">${T.menu}</span></button>
          </div>
        </div>
      </header>
      <p class="vh" id="annuncio" role="status" aria-live="polite"></p>`;
    }
  }

  class FondoSito extends HTMLElement {
    connectedCallback() {
      if (this.firstChild) return;
      const social = (SITO.social || []).map((s) => {
        const nome = String(s.nome || '');
        const ic = { instagram: 'instagram', facebook: 'facebook' }[nome.toLowerCase()] || 'globo';
        return `<li><a href="${esc(s.url)}" rel="me noopener">${icona(ic)}${esc(nome)}</a></li>`;
      }).join('');
      this.innerHTML = `<footer class="fondo">
        <div class="contenitore">
          <div class="fondo-griglia">
            <div>
              <div class="fondo-logo">${RUOTA}<span><strong>${T.nomeSito}</strong><em>${T.motto}</em></span></div>
              <p>${T.footerFrase}</p>
            </div>
            <nav aria-label="${T.sezioniBlog}">
              <h2>${T.mieiViaggi}</h2>
              <ul>${Object.keys(SEZIONI).map((k) => `<li><a href="${P}${SEZIONI[k].pagina}">${icona(SEZIONI[k].icona)}${SEZIONI[k].nome}</a></li>`).join('')}
                <li><a href="${P}${T.paginaMappa}">${icona('luogo')}${T.mappaTitolo}</a></li>
                <li><a href="${P}index.html#come-leggere">${icona('stella')}${T.comeLeggere}</a></li>
              </ul>
            </nav>
            <div>
              <h2>${T.contatti}</h2>
              <ul>
                <li><a href="${P}index.html#contatti">${icona('mail')}${T.scrivimi}</a></li>
                ${social}
              </ul>
            </div>
          </div>
          <div class="fondo-avviso">${icona('info')}<p>${T.avviso}</p></div>
          <div class="fondo-basso">
            <p>© ${new Date().getFullYear()} ${esc(SITO.autrice || '')} · ${T.nomeSito}</p>
            <p>${T.provati}</p>
            <p><a href="${P}privacy.html">${T.privacy}</a></p>
          </div>
        </div>
      </footer>`;
    }
  }

  if (window.customElements) {
    customElements.define('testata-sito', TestataSito);
    customElements.define('fondo-sito', FondoSito);
  }

  /* ---------- testata: si compatta, menu a comparsa, testo più grande ---------- */
  function avviaTestata() {
    const testata = document.querySelector('.testata');
    if (!testata) return;
    const interno = testata.querySelector('.testata-interno');
    const nav = testata.querySelector('.nav');
    const btnMenu = testata.querySelector('.btn-menu');
    const btnTesto = testata.querySelector('.btn-testo');
    const ruota = testata.querySelector('.logo-ruota');
    const logo = testata.querySelector('.logo');
    const nome = testata.querySelector('.logo-nome');

    function chiudiMenu(riportaFuoco) {
      if (!nav.classList.contains('aperto')) return;
      nav.classList.remove('aperto');
      btnMenu.setAttribute('aria-expanded', 'false');
      btnMenu.querySelector('.btn-etichetta').textContent = T.menu;
      btnMenu.querySelector('.icona').className = 'icona i-menu';
      if (riportaFuoco) btnMenu.focus();
    }
    btnMenu.addEventListener('click', () => {
      if (nav.classList.contains('aperto')) return chiudiMenu();
      nav.classList.add('aperto');
      btnMenu.setAttribute('aria-expanded', 'true');
      btnMenu.querySelector('.btn-etichetta').textContent = T.chiudi;
      btnMenu.querySelector('.icona').className = 'icona i-chiudi';
    });
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) chiudiMenu(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') chiudiMenu(true); });
    document.addEventListener('click', (e) => { if (!testata.contains(e.target)) chiudiMenu(); });

    /* il menu in riga resta finché ci sta; se manca poco spazio il pulsante del testo
       resta con la sola icona; se non basta, il menu diventa il pulsante «Menu» */
    function adatta() {
      testata.classList.remove('nav-mobile', 'nav-stretta');
      const nonCiSta = () => interno.scrollWidth > interno.clientWidth + 1;
      let stretto = window.innerWidth < 640;
      if (!stretto && nonCiSta()) {
        testata.classList.add('nav-stretta');
        stretto = nonCiSta();
        if (stretto) testata.classList.remove('nav-stretta');
      }
      testata.classList.toggle('nav-mobile', stretto);
      if (!stretto) chiudiMenu();
      /* su telefono il nome sta su due righe; se nemmeno così entra accanto ai pulsanti,
         resta la sola ruota (il nome rimane per i lettori di schermo) */
      nome.classList.remove('vh');
      if (stretto && logo.scrollWidth > logo.clientWidth + 1) nome.classList.add('vh');
    }

    /* testata compatta + ruota del logo che gira con lo scroll */
    let inAttesa = false;
    function suScroll() {
      inAttesa = false;
      const y = window.scrollY;
      if (y > 48) testata.classList.add('compatta'); else if (y < 12) testata.classList.remove('compatta');
      if (!pocoMovimento.matches) ruota.style.setProperty('--giro', `${Math.round(y * 0.28)}deg`);
    }
    window.addEventListener('scroll', () => { if (!inAttesa) { inAttesa = true; requestAnimationFrame(suScroll); } }, { passive: true });

    const misura = () => html.style.setProperty('--alt-testata', `${testata.offsetHeight}px`);
    if (window.ResizeObserver) new ResizeObserver(misura).observe(testata);
    window.addEventListener('resize', () => { adatta(); misura(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { adatta(); misura(); });

    /* pulsante «Testo più grande»: normale → grande → molto grande → normale */
    function aggiornaTesto(parla) {
      LIVELLI.forEach((c) => c && html.classList.remove(c));
      if (LIVELLI[livello]) html.classList.add(LIVELLI[livello]);
      const prossimo = livello === 2 ? T.testoNormale : livello === 1 ? T.testoAncora : T.testoPiu;
      btnTesto.querySelector('.btn-etichetta').textContent = prossimo;
      btnTesto.setAttribute('aria-label', `${prossimo} (${T.dimAttuale(T.livelli[livello])})`);
      btnTesto.title = prossimo;
      if (parla) annuncia(T.dimTesto(T.livelli[livello]));
      adatta(); misura();
    }
    btnTesto.addEventListener('click', () => {
      livello = (livello + 1) % LIVELLI.length;
      try { localStorage.setItem('ivr-testo', String(livello)); } catch (e) { /* pazienza */ }
      aggiornaTesto(true);
    });

    aggiornaTesto(false);
    suScroll();
  }

  /* ---------- elenchi di racconti (home e pagine di sezione) ---------- */
  function preparaImmagini(radice) {
    (radice || document).querySelectorAll('img[loading="lazy"]:not(.caricata)').forEach((img) => {
      const fatto = () => img.classList.add('caricata');
      if (img.complete) fatto(); else { img.addEventListener('load', fatto, { once: true }); img.addEventListener('error', fatto, { once: true }); }
    });
  }

  function riempiConteggi() {
    document.querySelectorAll('[data-conteggio]').forEach((el) => {
      const n = RACCONTI.filter((r) => r.sezione === el.getAttribute('data-conteggio')).length;
      el.textContent = n ? conta(n) : T.prossimamente;
    });
  }

  function riempiUltimi() {
    document.querySelectorAll('[data-ultimi]').forEach((el) => {
      const quanti = parseInt(el.getAttribute('data-ultimi'), 10) || 3;
      /* in home contano i racconti pubblicati per ultimi: se c'è, vale la data «pubblicato», altrimenti quella del viaggio */
      const uscita = (r) => r.pubblicato || r.data;
      const ultimi = RACCONTI.slice().sort((a, b) => (uscita(a) < uscita(b) ? 1 : uscita(a) > uscita(b) ? -1 : 0));
      el.innerHTML = ultimi.slice(0, quanti).map((r) => schedaHTML(r, 'h3')).join('');
    });
  }

  function avviaSezione() {
    const griglia = document.querySelector('[data-racconti]');
    if (!griglia) return;
    const tutti = RACCONTI.filter((r) => r.sezione === griglia.getAttribute('data-racconti')).sort(dalPiuRecente);
    const filtri = document.querySelector('.filtri');
    const lista = document.querySelector('[data-filtri]');
    const stato = document.querySelector('[data-stato]');
    const vuoto = document.querySelector('[data-prossimamente]');

    if (!tutti.length) {                       /* sezione ancora vuota: «Prossimamente» */
      if (filtri) filtri.hidden = true;
      griglia.hidden = true;
      if (vuoto) vuoto.hidden = false;
      return;
    }

    const scelti = new Set();
    lista.innerHTML = Object.keys(TAG).map((k) =>
      `<button type="button" class="filtro" aria-pressed="false" data-tag="${k}">${icona('spunta')}${icona(TAG[k].icona)}<span>${TAG[k].nome}</span></button>`
    ).join('') + `<button type="button" class="filtro filtro-azzera" data-azzera hidden>${icona('chiudi')}<span>${T.togli}</span></button>`;

    function disegna(parla) {
      const visibili = tutti.filter((r) => Array.from(scelti).every((t) => (r.tag || []).includes(t)));
      griglia.innerHTML = visibili.length
        ? visibili.map((r) => schedaHTML(r, 'h3')).join('')
        : `<div class="nessuno"><p>${T.nessuno}</p><button type="button" class="btn btn-chiaro" data-azzera>${T.togli}</button></div>`;
      const nomi = Array.from(scelti).map((t) => TAG[t].nome.toLowerCase()).join(', ');
      stato.textContent = scelti.size ? T.statoFiltri(visibili.length, tutti.length, nomi) : T.statoTutti(tutti.length);
      lista.querySelector('[data-azzera]').hidden = !scelti.size;
      lista.querySelectorAll('[data-tag]').forEach((b) => b.setAttribute('aria-pressed', String(scelti.has(b.getAttribute('data-tag')))));
      preparaImmagini(griglia);
      if (parla) annuncia(stato.textContent);
    }

    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-tag], [data-azzera]');
      if (!b) return;
      if (b.hasAttribute('data-azzera')) {
        scelti.clear();
        disegna(true);
        const primo = lista.querySelector('[data-tag]');
        if (primo) primo.focus();
        return;
      }
      const t = b.getAttribute('data-tag');
      if (scelti.has(t)) scelti.delete(t); else scelti.add(t);
      disegna(true);
    });
    disegna(false);
  }

  /* ---------- pagina racconto: indice, etichette, precedente/successivo ---------- */
  function avviaRacconto() {
    const articolo = document.querySelector('.racconto-testo');
    if (!articolo) return;
    const racconto = raccontoAttuale();

    /* etichette di accessibilità sotto il titolo */
    const zonaTag = document.querySelector('[data-tag-racconto]');
    if (zonaTag && racconto) zonaTag.innerHTML = tagHTML(racconto.tag);

    /* foto verticali riconosciute da sole */
    articolo.querySelectorAll('figure.foto img[width][height]').forEach((img) => {
      if (Number(img.getAttribute('height')) > Number(img.getAttribute('width')) * 1.1) img.closest('figure').classList.add('verticale');
    });

    /* tabelle: restano tabelle per i lettori di schermo anche quando su telefono vanno a capo */
    document.querySelectorAll('.tabella-voti').forEach((t) => {
      t.setAttribute('role', 'table');
      t.querySelectorAll('thead, tbody').forEach((g) => g.setAttribute('role', 'rowgroup'));
      t.querySelectorAll('tr').forEach((r) => r.setAttribute('role', 'row'));
      t.querySelectorAll('thead th').forEach((c) => c.setAttribute('role', 'columnheader'));
      t.querySelectorAll('tbody th').forEach((c) => c.setAttribute('role', 'rowheader'));
      t.querySelectorAll('td').forEach((c) => c.setAttribute('role', 'cell'));
    });

    avviaIndice(articolo);
    avviaVicini(racconto);
  }

  function avviaIndice(articolo) {
    const zona = document.querySelector('[data-indice]');
    const titoli = Array.from(articolo.querySelectorAll('h2'));
    if (!zona || titoli.length < 2) { if (zona) zona.hidden = true; return; }

    const voci = titoli.map((h, i) => {
      const copia = h.cloneNode(true);
      copia.querySelectorAll('.giorno, .icona, .vh').forEach((n) => n.remove());
      const testo = (h.getAttribute('data-indice') || copia.textContent).trim();
      const giorno = h.querySelector('.giorno b');
      if (!h.id) h.id = `tappa-${i + 1}`;
      return { id: h.id, testo, breve: giorno ? giorno.textContent.trim() : '' };
    });

    zona.innerHTML = `<details class="indice-box" open>
      <summary>${icona('elenco')}<span>${T.indice}</span><span class="indice-dove"></span>${icona('freccia-giu', 'indice-freccia')}</summary>
      <ol>${voci.map((v) => `<li><a href="#${esc(v.id)}">${v.breve ? `<small>${esc(v.breve)}</small>` : ''}<span>${esc(v.testo)}</span></a></li>`).join('')}</ol>
    </details>`;
    const box = zona.querySelector('details');
    const sommario = box.querySelector('summary');
    const dove = box.querySelector('.indice-dove');
    const link = Array.from(box.querySelectorAll('a'));

    /* su schermi larghi l'indice è sempre aperto a lato; su telefono è una barra che si apre */
    const stretto = window.matchMedia('(max-width: 60em)');
    const imposta = () => { box.open = !stretto.matches; sommario.tabIndex = stretto.matches ? 0 : -1; };
    imposta();
    if (stretto.addEventListener) stretto.addEventListener('change', imposta); else stretto.addListener(imposta);
    box.addEventListener('toggle', () => { if (!stretto.matches && !box.open) box.open = true; });
    box.addEventListener('click', (e) => { if (e.target.closest('a') && stretto.matches) box.open = false; });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && stretto.matches && box.open) { box.open = false; sommario.focus(); } });

    let attuale = -1, inAttesa = false;
    function spia() {
      inAttesa = false;
      const soglia = (parseFloat(getComputedStyle(html).getPropertyValue('--alt-testata')) || 80) + (stretto.matches ? 110 : 60);
      let i = 0;
      titoli.forEach((h, n) => { if (h.getBoundingClientRect().top <= soglia) i = n; });
      if (i === attuale) return;
      attuale = i;
      link.forEach((a, n) => { if (n === i) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); });
      dove.textContent = ` · ${voci[i].breve || voci[i].testo}`;
      /* nei racconti lunghi l'indice a lato scorre da solo, così la tappa attuale resta in vista */
      if (!stretto.matches && zona.scrollHeight > zona.clientHeight) zona.scrollTop = Math.max(0, link[i].offsetTop - zona.clientHeight / 2 + link[i].offsetHeight / 2);
    }
    window.addEventListener('scroll', () => { if (!inAttesa) { inAttesa = true; requestAnimationFrame(spia); } }, { passive: true });
    spia();
  }

  function avviaVicini(racconto) {
    const zona = document.querySelector('[data-vicini]');
    if (!zona || !racconto) return;
    const inOrdine = RACCONTI.slice().sort(dalPiuRecente).reverse();
    const i = inOrdine.indexOf(racconto);
    const sez = SEZIONI[racconto.sezione];
    const carta = (r, verso) => r
      ? `<a class="vicino ${verso}" href="${P}${esc(r.pagina)}"><small>${verso === 'prec' ? icona('freccia-sx') + T.prec : T.succ + icona('freccia')}</small><strong>${esc(r.titolo)}</strong><span class="dove">${esc(r.luogo)} · ${esc(r.dataTesto)}</span></a>`
      : `<a class="vicino ${verso}" href="${P}${sez.pagina}"><small>${verso === 'prec' ? icona('freccia-sx') + T.tornaSezione : T.tutti + icona('freccia')}</small><strong>${esc(sez.nome)}</strong><span class="dove">${verso === 'prec' ? T.primo : T.recente}</span></a>`;
    zona.innerHTML = carta(inOrdine[i - 1], 'prec') + carta(inOrdine[i + 1], 'succ');
  }

  /* ---------- stelle, cuori e piatti scritti nelle pagine: <span class="stelle" data-voto="4"> ---------- */
  function avviaVoti() {
    document.querySelectorAll('span.stelle[data-voto], span.cuori[data-voto], span.piatti[data-voto]').forEach((el) => {
      const tipo = el.classList.contains('cuori') ? 'cuori' : el.classList.contains('piatti') ? 'piatti' : 'stelle';
      el.outerHTML = votoHTML(el.getAttribute('data-voto'), tipo, el.getAttribute('data-etichetta'));
    });
  }

  /* ---------- foto: dissolvenza al caricamento e lightbox ---------- */
  function avviaLightbox() {
    const foto = Array.from(document.querySelectorAll('.racconto-testo figure.foto img'));
    if (!foto.length || !window.HTMLDialogElement) return;

    const finestra = document.createElement('dialog');
    finestra.className = 'lightbox';
    finestra.setAttribute('aria-label', T.fotoGrande);
    finestra.innerHTML = `<div class="lightbox-interno">
      <div class="lightbox-alto">
        <p class="lightbox-conta" aria-live="polite"></p>
        <button type="button" data-chiudi>${icona('chiudi')}<span>${T.chiudi}</span></button>
      </div>
      <figure><img alt=""><figcaption></figcaption></figure>
      <div class="lightbox-comandi">
        <button type="button" data-passo="-1">${icona('freccia-sx')}<span>${T.precedente}</span></button>
        <button type="button" data-passo="1"><span>${T.successiva}</span>${icona('freccia')}</button>
      </div>
    </div>`;
    document.body.appendChild(finestra);
    const grande = finestra.querySelector('img');
    const didascalia = finestra.querySelector('figcaption');
    const contatore = finestra.querySelector('.lightbox-conta');
    let n = 0, origine = null;

    function mostra(i) {
      n = (i + foto.length) % foto.length;
      const img = foto[n];
      const dida = img.closest('figure').querySelector('figcaption');
      grande.src = img.currentSrc || img.src;
      grande.alt = img.alt;
      if (img.getAttribute('width')) { grande.width = img.getAttribute('width'); grande.height = img.getAttribute('height'); }
      didascalia.textContent = dida ? dida.textContent : '';
      contatore.textContent = T.fotoDi(n + 1, foto.length);
    }

    foto.forEach((img, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'foto-apri';
      img.parentNode.insertBefore(b, img);
      b.appendChild(img);
      b.insertAdjacentHTML('beforeend', `<span class="vh">${T.apriFoto}</span><span class="foto-lente" aria-hidden="true">${icona('lente')}</span>`);
      b.addEventListener('click', () => { origine = b; mostra(i); html.style.overflow = 'hidden'; finestra.showModal(); });
    });

    finestra.addEventListener('click', (e) => {
      const passo = e.target.closest('[data-passo]');
      if (passo) return mostra(n + Number(passo.getAttribute('data-passo')));
      if (e.target.closest('[data-chiudi]') || !e.target.closest('img, figcaption, button')) finestra.close();
    });
    finestra.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') mostra(n + 1);
      if (e.key === 'ArrowLeft') mostra(n - 1);
    });
    finestra.addEventListener('close', () => { html.style.overflow = ''; if (origine) origine.focus(); });
  }

  /* ---------- moduli inviati a Netlify Forms: "utile", "domande" (riscontri) e "contatti" ----------
     Netlify li riconosce grazie alla pagina moduli-netlify.html: se qui si aggiunge
     o si rinomina un campo, va fatto anche là.
     I messaggi restano privati: si leggono solo nel pannello di Netlify e non compaiono mai sul sito. */
  const inviaNetlify = (campi) => fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(campi).toString()
  }).then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); });

  const EMAIL_VALIDA = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const campoHTML = (pref, nome, etichetta, nota, controllo) => `<div class="campo">
          <label for="${pref}-${nome}">${etichetta} <span class="campo-nota">(${nota})</span></label>
          ${controllo}
          <p class="campo-errore" id="${pref}-${nome}-err" hidden></p>
        </div>`;

  /* controlli, messaggi di errore e invio in background: uguali per «Lascia un riscontro» e «Scrivimi» */
  function gestisciModulo(modulo, grazie, regole, testoGrazie, testoInvia) {
    const avviso = modulo.querySelector('.modulo-avviso');
    const btnInvia = modulo.querySelector('button[type="submit"]');
    const controlla = ([el, prova]) => {
      const messaggio = prova();
      const err = modulo.querySelector(`#${el.id}-err`);
      if (messaggio) { err.innerHTML = `${icona('attenzione')}<span>${messaggio}</span>`; el.setAttribute('aria-invalid', 'true'); }
      else { err.textContent = ''; el.removeAttribute('aria-invalid'); }
      err.hidden = !messaggio;
      return !messaggio;
    };
    /* un errore già segnalato sparisce appena il campo viene corretto */
    regole.forEach((regola) => {
      const ricontrolla = () => { if (regola[0].hasAttribute('aria-invalid') && controlla(regola)) avviso.hidden = true; };
      regola[0].addEventListener('input', ricontrolla);
      regola[0].addEventListener('change', ricontrolla);
    });

    modulo.addEventListener('submit', (e) => {
      e.preventDefault();
      if (btnInvia.disabled) return;
      const sbagliati = regole.filter((regola) => !controlla(regola));
      if (sbagliati.length) {
        avviso.textContent = T.errRiepilogo;
        avviso.hidden = false;
        sbagliati[0][0].focus();
        return;
      }
      avviso.hidden = true;
      btnInvia.disabled = true;
      btnInvia.querySelector('.invia-testo').textContent = T.invio;
      const ringraziamento = testoGrazie();
      inviaNetlify(new FormData(modulo))
        .then(() => {
          modulo.hidden = true;
          grazie.innerHTML = `${icona('spunta')}<span>${ringraziamento}</span>`;
          grazie.hidden = false;
          grazie.focus();
          annuncia(grazie.textContent);
        })
        .catch(() => {
          avviso.textContent = `${T.errInvio}.`;
          avviso.hidden = false;
          btnInvia.disabled = false;
          btnInvia.querySelector('.invia-testo').textContent = testoInvia;
          btnInvia.focus();
        });
    });
  }

  /* ---------- home: sezione «Scrivimi» (id="contatti") ----------
     Titolo, frase e modulo si scrivono qui, con i testi dell'oggetto T.
     I messaggi arrivano a Netlify nel modulo "contatti", separato da quello dei racconti. */
  function avviaContatti() {
    const sez = document.querySelector('[data-contatti]');
    if (!sez) return;
    const oggetto = (argomento) => `Nuovo messaggio dal blog: ${argomento}`;
    sez.innerHTML = `<div class="contenitore contatti">
        <div class="intestazione">
          <p class="occhiello">${T.contatti}</p>
          <h2 id="titolo-contatti">${T.scrivimi}</h2>
          <p>${T.contattiInvito}</p>
        </div>
        <div class="feedback-card feedback-domanda" data-rivela>
          <form class="modulo" name="contatti" method="POST" action="/" novalidate aria-labelledby="titolo-contatti">
            <input type="hidden" name="form-name" value="contatti">
            <input type="hidden" name="subject" value="${esc(oggetto(T.argomenti[0][0]))}">
            <input type="hidden" name="lingua" value="${EN ? 'en' : 'it'}">
            <p class="vh" aria-hidden="true"><label>${T.trappola} <input type="text" name="bot-field" tabindex="-1" autocomplete="off"></label></p>
            ${campoHTML('c', 'nome', T.nome, T.obbligatorio, '<input type="text" id="c-nome" name="nome" autocomplete="name" maxlength="80" required aria-describedby="c-nome-err">')}
            ${campoHTML('c', 'email', T.email, T.emailNotaContatti, '<input type="email" id="c-email" name="email" autocomplete="email" inputmode="email" maxlength="120" required aria-describedby="c-email-err">')}
            <div class="campo">
              <label for="c-argomento">${T.argomento}</label>
              <select id="c-argomento" name="argomento">${T.argomenti.map(([valore, nome]) => `<option value="${esc(valore)}">${esc(nome)}</option>`).join('')}</select>
            </div>
            ${campoHTML('c', 'messaggio', T.messaggio, T.obbligatorio, '<textarea id="c-messaggio" name="messaggio" rows="6" maxlength="3000" required aria-describedby="c-messaggio-err"></textarea>')}
            <div class="campo campo-consenso">
              <input type="checkbox" id="c-consenso" name="consenso" value="si" required aria-describedby="c-consenso-err">
              <label for="c-consenso">${T.consenso}</label>
              <p class="consenso-link"><a href="${P}privacy.html">${T.privacyLeggi}</a></p>
              <p class="campo-errore" id="c-consenso-err" hidden></p>
            </div>
            <p class="modulo-avviso" role="alert" hidden></p>
            <button type="submit" class="btn btn-primario"><span class="invia-testo">${T.inviaMessaggio}</span>${icona('freccia')}</button>
          </form>
          <p class="modulo-grazie" tabindex="-1" hidden></p>
        </div>
      </div>`;

    const modulo = sez.querySelector('.modulo');
    const c = modulo.elements;
    c.argomento.addEventListener('change', () => { c.subject.value = oggetto(c.argomento.value); });
    gestisciModulo(modulo, sez.querySelector('.modulo-grazie'), [
      [c.nome, () => !c.nome.value.trim() && T.errNome],
      [c.email, () => (!c.email.value.trim() && T.errEmailManca) || (!EMAIL_VALIDA.test(c.email.value.trim()) && T.errEmailSbagliata)],
      [c.messaggio, () => !c.messaggio.value.trim() && T.errMessaggio],
      [c.consenso, () => !c.consenso.checked && T.errConsenso]
    ], () => T.grazie, T.inviaMessaggio);

    /* arrivando da un'altra pagina con «#contatti» la sezione viene riempita dopo: riporto lì la vista */
    const vaiQui = () => { if (location.hash === '#contatti') sez.scrollIntoView(); };
    vaiQui();
    window.addEventListener('load', vaiQui);
  }

  /* ---------- in fondo a ogni racconto: «Ti è stato utile?» e «Lascia un riscontro» ---------- */
  function avviaFeedback() {
    const id = html.getAttribute('data-racconto');
    const articolo = document.querySelector('.racconto-testo');
    if (!id || !articolo) return;
    const lingua = EN ? 'en' : 'it';
    const originale = (window.RACCONTI || []).find((r) => r.id === id);      // titolo italiano, per l'oggetto dell'avviso ad Anna
    const chiave = `ivr-utile-${id}`;
    const giaDetto = () => { try { return localStorage.getItem(chiave) === '1'; } catch (e) { return false; } };
    const ricordaDetto = () => { try { localStorage.setItem(chiave, '1'); } catch (e) { /* memoria non disponibile */ } };

    const campo = (nome, etichetta, nota, controllo) => campoHTML('d', nome, etichetta, nota, controllo);

    const sez = document.createElement('section');
    sez.className = 'feedback';
    sez.setAttribute('aria-label', T.fbZona);
    sez.innerHTML = `<div class="feedback-card feedback-utile">
        <h2 id="utile-titolo">${T.utileTitolo}</h2>
        <button type="button" class="btn btn-utile" aria-describedby="utile-titolo"><span class="utile-cuore" aria-hidden="true">❤️</span><span class="utile-testo">${T.utileBottone}</span></button>
        <p class="feedback-nota" role="alert" hidden></p>
      </div>
      <div class="feedback-card feedback-domanda">
        <h2 id="domanda-titolo">${T.domandaTitolo}</h2>
        <form class="modulo" name="domande" method="POST" action="/" novalidate aria-labelledby="domanda-titolo">
          <input type="hidden" name="form-name" value="domande">
          <input type="hidden" name="subject" value="${esc(`Nuovo riscontro dal blog: ${originale ? originale.titolo : id}`)}">
          <input type="hidden" name="racconto" value="${esc(id)}">
          <input type="hidden" name="lingua" value="${lingua}">
          <p class="vh" aria-hidden="true"><label>${T.trappola} <input type="text" name="bot-field" tabindex="-1" autocomplete="off"></label></p>
          ${campo('nome', T.nome, T.obbligatorio, '<input type="text" id="d-nome" name="nome" autocomplete="name" maxlength="80" required aria-describedby="d-nome-err">')}
          ${campo('email', T.email, T.emailNota, '<input type="email" id="d-email" name="email" autocomplete="email" inputmode="email" maxlength="120" aria-describedby="d-email-err">')}
          ${campo('messaggio', T.messaggio, T.obbligatorio, '<textarea id="d-messaggio" name="messaggio" rows="5" maxlength="2000" required aria-describedby="d-messaggio-err"></textarea>')}
          <div class="campo campo-consenso">
            <input type="checkbox" id="d-consenso" name="consenso" value="si" required aria-describedby="d-consenso-err">
            <label for="d-consenso">${T.consenso}</label>
            <p class="consenso-link"><a href="${P}privacy.html">${T.privacyLeggi}</a></p>
            <p class="campo-errore" id="d-consenso-err" hidden></p>
          </div>
          <p class="modulo-avviso" role="alert" hidden></p>
          <button type="submit" class="btn btn-primario"><span class="invia-testo">${T.invia}</span>${icona('freccia')}</button>
        </form>
        <p class="modulo-grazie" tabindex="-1" hidden></p>
      </div>`;
    const scheda = articolo.querySelector('.senza-sorprese');
    if (scheda) scheda.insertAdjacentElement('afterend', sez); else articolo.appendChild(sez);

    /* 1. «Sì, mi è stato utile» */
    const btnUtile = sez.querySelector('.btn-utile');
    const notaUtile = sez.querySelector('.feedback-nota');
    const ringrazia = (anima) => {
      btnUtile.innerHTML = `<span class="utile-testo">${T.utileGrazie}</span><span class="utile-cuore" aria-hidden="true">❤️</span>`;
      btnUtile.setAttribute('aria-disabled', 'true');
      if (anima && !pocoMovimento.matches) btnUtile.classList.add('batte');
    };
    if (giaDetto()) ringrazia(false);
    btnUtile.addEventListener('click', () => {
      if (btnUtile.getAttribute('aria-disabled') === 'true' || btnUtile.getAttribute('aria-busy') === 'true') return;
      btnUtile.setAttribute('aria-busy', 'true');
      notaUtile.hidden = true;
      inviaNetlify({ 'form-name': 'utile', racconto: id, lingua, pagina: location.pathname, 'bot-field': '' })
        .then(() => { ricordaDetto(); ringrazia(true); annuncia(T.utileVoce); })
        .catch(() => { notaUtile.textContent = T.utileErrore; notaUtile.hidden = false; })
        .then(() => btnUtile.removeAttribute('aria-busy'));
    });

    /* 2. «Lascia un riscontro» */
    const modulo = sez.querySelector('.modulo');
    const grazie = sez.querySelector('.modulo-grazie');
    const c = { nome: modulo.elements.nome, email: modulo.elements.email, messaggio: modulo.elements.messaggio, consenso: modulo.elements.consenso };
    const regole = [
      [c.nome, () => !c.nome.value.trim() && T.errNome],
      [c.email, () => c.email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c.email.value.trim()) && T.errEmail],
      [c.messaggio, () => !c.messaggio.value.trim() && T.errMessaggio],
      [c.consenso, () => !c.consenso.checked && T.errConsenso]
    ];
    gestisciModulo(modulo, grazie, regole, () => (c.email.value.trim() ? T.grazie : T.grazieSenzaEmail), T.invia);
  }

  /* ---------- «La mappa dei miei viaggi»: pagina della mappa e anteprima in home ----------
     Funziona con Leaflet e Leaflet.markercluster; la mappa di sfondo è OpenFreeMap, stile «Positron»,
     fatta con i dati di OpenStreetMap: gratuita, senza chiavi né account. Per disegnarla servono anche
     MapLibre e il suo collegamento a Leaflet. Tutte le librerie hanno una versione fissa (cdnjs e unpkg)
     e sono controllate con il codice «integrity»: se si cambia versione, vanno cambiati insieme indirizzo e codice.
     I segnaposti arrivano da js/contenuti.js (coordinate e tappe): un racconto nuovo con le coordinate compare da solo. */
  const LIBRERIE = {
    stileLeaflet:  ['https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css', 'sha384-sHL9NAb7lN7rfvG5lfHpm643Xkcjzp4jFvuavGOndn6pjVqS6ny56CAt3nsEVT4H'],
    stileMaplibre: ['https://cdnjs.cloudflare.com/ajax/libs/maplibre-gl/5.24.0/maplibre-gl.css', 'sha384-uTttxo/aOKbdE5RlD/SPzSDoDmNvGlUYPjONi2MN/b7c9HPSvW07OIuyP7uL6jxK'],
    leaflet:       ['https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js', 'sha384-cxOPjt7s7Iz04uaHJceBmS+qpjv2JkIHNVcuOrM+YHwZOmJGBXI00mdUXEq65HTH'],
    gruppi:        ['https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.js', 'sha384-eXVCORTRlv4FUUgS/xmOyr66XBVraen8ATNLMESp92FKXLAMiKkerixTiBvXriZr'],
    maplibre:      ['https://cdnjs.cloudflare.com/ajax/libs/maplibre-gl/5.24.0/maplibre-gl.js', 'sha384-5+cfbwT0iiub6VsQAdn6yz16nr6sDiQoHx6tm4O8OVYXHYOxcffFmCJBL0dgdvGp'],
    ponte:         ['https://unpkg.com/@maplibre/maplibre-gl-leaflet@0.1.4/leaflet-maplibre-gl.js', 'sha384-tXYNKOHx4T02jMP7YYCtBxPIv1B5gaA5mcVPBzqMp6d7VzWzxJgI2aWF/nJLrQdS']
  };
  const STILE_MAPPA = 'https://tiles.openfreemap.org/styles/positron';
  const CREDITI = `<a href="https://openfreemap.org">OpenFreeMap</a> <a href="https://www.openmaptiles.org/">© OpenMapTiles</a> ${T.datiDa} <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>`;
  const ITALIA = [[36.6, 6.6], [47.1, 18.6]];
  const COLORI = { gite: 'var(--terracotta)', weekend: 'var(--bosco)', grandi: 'var(--miele-scuro)' };   /* come le card delle sezioni */

  let leafletInArrivo = null;
  function caricaLeaflet() {
    if (leafletInArrivo) return leafletInArrivo;
    const carica = (tag, [indirizzo, impronta]) => new Promise((fatto, errore) => {
      const el = document.createElement(tag);
      el.integrity = impronta;
      el.crossOrigin = 'anonymous';
      el.onload = fatto;
      el.onerror = errore;
      if (tag === 'link') {
        el.rel = 'stylesheet';
        el.href = indirizzo;
        /* prima di stile.css, così colori e caratteri del sito vincono su quelli standard di Leaflet */
        const nostro = document.querySelector('link[href$="css/stile.css"]');
        if (nostro) nostro.parentNode.insertBefore(el, nostro); else document.head.appendChild(el);
      } else {
        el.src = indirizzo;
        document.head.appendChild(el);
      }
    });
    const leaflet = carica('script', LIBRERIE.leaflet);
    const maplibre = carica('script', LIBRERIE.maplibre);
    leafletInArrivo = Promise.all([
      carica('link', LIBRERIE.stileLeaflet),
      carica('link', LIBRERIE.stileMaplibre),
      leaflet.then(() => carica('script', LIBRERIE.gruppi).catch(() => null)),   /* senza i gruppi la mappa funziona lo stesso */
      Promise.all([leaflet, maplibre]).then(() => carica('script', LIBRERIE.ponte))
    ]);
    return leafletInArrivo;
  }

  const coordinateValide = (c) => Array.isArray(c) && c.length === 2 && c.every((n) => typeof n === 'number' && isFinite(n));
  const sezioneDi = (r) => (SEZIONI[r.sezione] ? r.sezione : 'gite');
  const nomeTappa = (r, t) => (r.nomiTappe && r.nomiTappe[t.nome]) || t.nome;
  const numeroGiorno = (id) => { const m = /^giorno-(\d+)$/.exec(id || ''); return m ? Number(m[1]) : 0; };
  const tappeDi = (r) => (r.tappe || []).filter((t) => t && coordinateValide(t.coordinate));
  const indirizzoTappa = (r, t) => `${P}${esc(r.pagina)}${t.giorno ? '#' + esc(t.giorno) : ''}`;

  function schedaMappaHTML(r) {
    const k = sezioneDi(r);
    return `<div class="mappa-scheda">
        <img class="mappa-scheda-foto" src="${R}${esc(r.copertina)}" alt="${esc(r.copertinaAlt)}" width="400" height="200"${r.copertinaFuoco ? ` style="object-position:${esc(r.copertinaFuoco)}"` : ''}>
        <div class="mappa-scheda-corpo">
          <p class="mappa-scheda-sezione"><span class="mappa-segno sez-${k}" aria-hidden="true"></span>${esc(SEZIONI[k].nome)}</p>
          <p class="mappa-scheda-titolo">${esc(r.titolo)}</p>
          <ul class="scheda-meta">
            <li>${icona('luogo')}<span><span class="vh">${T.dove}</span>${esc(r.luogo)} · ${esc(r.regione)}</span></li>
            <li>${icona('calendario')}<span><span class="vh">${T.quando}</span>${esc(r.dataTesto)}</span></li>
          </ul>
          <p class="scheda-voto"><span aria-hidden="true">${T.esperienza}</span> ${votoHTML(r.cuori, 'cuori', T.esperienzaComplessiva)}</p>
          <a class="btn btn-primario" href="${P}${esc(r.pagina)}">${T.leggi} ${icona('freccia')}</a>
        </div>
      </div>`;
  }

  function schedaTappaHTML(r, t) {
    const n = numeroGiorno(t.giorno);
    return `<div class="mappa-scheda mappa-scheda-tappa">
        <div class="mappa-scheda-corpo">
          <p class="mappa-scheda-sezione"><span class="mappa-pallino-segno sez-${sezioneDi(r)}" aria-hidden="true"></span>${T.tappa} · ${esc(r.luogo)}</p>
          <p class="mappa-scheda-titolo">${esc(nomeTappa(r, t))}</p>
          ${n ? `<p class="mappa-scheda-giorno">${icona('calendario')}<span>${T.giorno(n)}</span></p>` : ''}
          <a class="btn btn-primario" href="${indirizzoTappa(r, t)}">${t.giorno ? (n ? T.vaiGiorno : T.vaiPunto) : T.leggi} ${icona('freccia')}</a>
        </div>
      </div>`;
  }

  /* sotto la mappa: legenda dei colori; nella pagina della mappa i colori sono anche i filtri per sezione */
  function legendaMappaHTML(racconti, completa) {
    const sezioni = Object.keys(SEZIONI).filter((k) => racconti.some((r) => sezioneDi(r) === k));
    const simboli = `<ul class="mappa-simboli">
        <li><span class="mappa-segno" aria-hidden="true"></span>${T.simboloPin}</li>
        <li><span class="mappa-pallino-segno" aria-hidden="true"></span>${T.simboloTappa}</li>
        <li><span class="mappa-gruppo-segno" aria-hidden="true">3</span>${T.simboloGruppo}</li>
      </ul>`;
    if (!completa) {
      return `<div class="mappa-legenda statica">
          <p class="mappa-legenda-titolo">${T.legenda}</p>
          <ul class="mappa-colori">${sezioni.map((k) => `<li><span class="mappa-segno sez-${k}" aria-hidden="true"></span>${SEZIONI[k].nome}</li>`).join('')}</ul>
          ${simboli}
        </div>`;
    }
    return `<section class="filtri mappa-legenda" aria-labelledby="titolo-legenda">
        <h2 class="filtri-titolo" id="titolo-legenda">${icona('filtro')}${T.legendaFiltri}</h2>
        <p class="filtri-aiuto">${T.filtriMappa}</p>
        <div class="filtri-lista">${sezioni.map((k) => {
          const n = racconti.filter((r) => sezioneDi(r) === k).length;
          return `<button type="button" class="filtro" aria-pressed="false" data-sezione="${k}">${icona('spunta')}<span class="mappa-segno sez-${k}" aria-hidden="true"></span><span>${SEZIONI[k].nome}</span><span class="mappa-conta" aria-hidden="true">${n}</span></button>`;
        }).join('')}<button type="button" class="filtro filtro-azzera" data-azzera-mappa hidden>${icona('chiudi')}<span>${T.togli}</span></button></div>
        <p class="filtri-stato" data-stato-mappa></p>
        ${simboli}
      </section>`;
  }

  function avviaMappe() {
    document.querySelectorAll('[data-mappa]').forEach((zona, i) => {
      const completa = zona.getAttribute('data-mappa') === 'completa';
      const racconti = RACCONTI.filter((r) => coordinateValide(r.coordinate)).sort(dalPiuRecente);
      const id = `mappa-${i + 1}`;
      zona.classList.add('mappa-zona');
      zona.innerHTML = `<div class="mappa-barra" role="group" aria-label="${T.spostaMappa}">
          <button type="button" class="btn btn-chiaro mappa-vai" data-vai="italia" aria-controls="${id}">${icona('luogo')}<span>${T.italia}</span></button>
          <button type="button" class="btn btn-chiaro mappa-vai" data-vai="mondo" aria-controls="${id}">${icona('globo')}<span>${T.mondo}</span></button>
        </div>
        <div class="mappa-riquadro">
          <div class="mappa" id="${id}" role="region" aria-label="${T.mappaVoce}" aria-describedby="${id}-aiuto"></div>
          <p class="vh" id="${id}-aiuto">${T.mappaTastiera}</p>
          <p class="mappa-stato" data-carica>${T.mappaCarica}</p>
          <p class="mappa-avviso" aria-hidden="true"><span>${T.dueDita}</span><small>${T.oppureTocca}</small></p>
        </div>
        ${legendaMappaHTML(racconti, completa)}`;

      const disegna = () => caricaLeaflet()
        .then(() => disegnaMappa(zona, racconti, completa))
        .catch(() => {
          let stato = zona.querySelector('[data-carica]');
          if (!stato) {
            stato = document.createElement('p');
            stato.className = 'mappa-stato';
            zona.querySelector('.mappa-riquadro').appendChild(stato);
          }
          stato.textContent = completa ? T.mappaErrore : T.mappaErroreHome;
          stato.classList.add('errore');
          zona.querySelector('.mappa-barra').hidden = true;
        });
      /* in home Leaflet e le mappe si scaricano solo quando ci si avvicina all'anteprima */
      if (completa || !window.IntersectionObserver) return disegna();
      const oss = new IntersectionObserver((voci) => {
        if (!voci.some((v) => v.isIntersecting)) return;
        oss.disconnect();
        disegna();
      }, { rootMargin: '400px 0px' });
      oss.observe(zona);
    });
  }

  function disegnaMappa(zona, racconti, completa) {
    const L = window.L;
    const div = zona.querySelector('.mappa');
    const riquadro = zona.querySelector('.mappa-riquadro');
    const fermo = pocoMovimento.matches;
    const tocco = window.matchMedia('(pointer: coarse)').matches;   /* telefono o tablet */

    const mappa = L.map(div, {
      zoomControl: false, scrollWheelZoom: false, dragging: !tocco, worldCopyJump: true,
      minZoom: 1, maxZoom: 18, zoomSnap: 0.5, keyboardPanDelta: 120,
      zoomAnimation: !fermo, fadeAnimation: !fermo, markerZoomAnimation: !fermo
    });
    mappa.attributionControl.setPrefix('<a href="https://leafletjs.com" hreflang="en">Leaflet</a>');
    L.control.zoom({ position: 'bottomright', zoomInTitle: T.zoomPiu, zoomOutTitle: T.zoomMeno }).addTo(mappa);   /* in basso: in alto coprirebbe la × delle schede */
    /* la mappa di sfondo (se il dispositivo non sa disegnarla, compare il messaggio di errore).
       Appena arriva lo stile: nella pagina italiana i nomi di paesi, città e mari diventano italiani (quando la mappa
       li conosce) e nei filtri dello stile i confronti con un dato che manca valgono «no», senza avvisi in console */
    const sfondo = L.maplibreGL({ style: STILE_MAPPA, attributionControl: { customAttribution: CREDITI } });
    const traduci = (v) => (!Array.isArray(v) ? v
      : v[0] === 'coalesce' && JSON.stringify(v).includes('"name_en"') ? ['coalesce', ['get', 'name:it']].concat(v.slice(1))
      : v.map(traduci));
    const ripara = (v) => {
      if (!Array.isArray(v)) return v;
      const confronto = { '<': 1e9, '<=': 1e9, '>': -1e9, '>=': -1e9 }[v[0]];
      if (confronto !== undefined && Array.isArray(v[1]) && v[1][0] === 'get' && typeof v[2] === 'number') return [v[0], ['coalesce', v[1], confronto], v[2]];
      return v.map(ripara);
    };
    sfondo.once('add', () => {
      const gl = sfondo.getMaplibreMap();
      gl.once('style.load', () => gl.getStyle().layers.forEach((strato) => {
        const testo = strato.type === 'symbol' && strato.layout && strato.layout['text-field'];
        if (testo && !EN) gl.setLayoutProperty(strato.id, 'text-field', traduci(testo));
        if (strato.filter && JSON.stringify(ripara(strato.filter)) !== JSON.stringify(strato.filter)) gl.setFilter(strato.id, ripara(strato.filter));
      }));
    });
    sfondo.addTo(mappa);
    zona.querySelector('[data-carica]').remove();

    /* segnaposti: goccia con la carrozzina per il racconto, pallino per le tappe, cerchio con il numero per i gruppi */
    const opzioniScheda = () => {
      const larga = Math.max(200, Math.min(280, div.clientWidth - 64));
      return { maxWidth: larga, minWidth: Math.min(260, larga), autoPanPadding: [16, 16], className: 'mappa-popup' };
    };
    const goccia = (k) => L.divIcon({ className: `mappa-pin sez-${k}`, html: `<span class="mappa-goccia" aria-hidden="true">${icona('carrozzina')}</span>`, iconSize: [44, 48], iconAnchor: [22, 44], popupAnchor: [0, -40] });
    const pallino = (k) => L.divIcon({ className: `mappa-tappa sez-${k}`, html: '<span class="mappa-pallino" aria-hidden="true"></span>', iconSize: [36, 36], iconAnchor: [18, 18], popupAnchor: [0, -12] });
    const cerchio = (gruppo) => {
      const figli = gruppo.getAllChildMarkers();
      const quanti = {};
      figli.forEach((m) => { quanti[m.options.sezione] = (quanti[m.options.sezione] || 0) + 1; });
      let da = 0;
      const fette = Object.keys(COLORI).filter((k) => quanti[k]).map((k) => {
        const a = da + (quanti[k] / figli.length) * 100;
        const fetta = `${COLORI[k]} ${da.toFixed(1)}% ${a.toFixed(1)}%`;
        da = a;
        return fetta;
      });
      return L.divIcon({
        className: 'mappa-gruppo', iconSize: [48, 48],
        html: `<span class="mappa-gruppo-cerchio" style="--anello:conic-gradient(${fette.join(', ')})"><span aria-hidden="true">${figli.length}</span><span class="vh">${esc(T.gruppo(figli.length))}</span></span>`
      });
    };

    let aperto = null, daTastiera = false;
    const segni = [];
    const aggiungi = (latlng, opzioni, scheda) => {
      const m = L.marker(latlng, opzioni);
      m.bindPopup(scheda, opzioniScheda());
      m.on('popupopen', () => { aperto = m; });
      /* Invio apre la scheda già con Leaflet; qui anche la barra spaziatrice, come per i pulsanti */
      m.on('keydown', (e) => {
        const tasto = e.originalEvent;
        if (tasto.key !== ' ' && tasto.key !== 'Spacebar') return;
        tasto.preventDefault();
        daTastiera = true;
        m.togglePopup();
      });
      segni.push(m);
    };
    racconti.forEach((r) => {
      const k = sezioneDi(r);
      aggiungi(r.coordinate, { icon: goccia(k), title: `${r.titolo} · ${SEZIONI[k].nome}`, riseOnHover: true, zIndexOffset: 500, sezione: k }, () => schedaMappaHTML(r));
      tappeDi(r).forEach((t) => {
        aggiungi(t.coordinate, { icon: pallino(k), title: T.tappaVoce(nomeTappa(r, t), r.titolo), sezione: k }, () => schedaTappaHTML(r, t));
      });
    });

    /* i luoghi vicini si raggruppano con un numero e si separano ingrandendo */
    const gruppo = L.markerClusterGroup
      ? L.markerClusterGroup({
          maxClusterRadius: 48, showCoverageOnHover: false, spiderfyOnMaxZoom: true, animate: !fermo, iconCreateFunction: cerchio,
          spiderLegPolylineOptions: { weight: 2, color: '#213b2c', opacity: 0.6 }
        })
      : L.layerGroup();
    const mostra = (scelti) => {
      gruppo.clearLayers();
      if (gruppo.addLayers) gruppo.addLayers(scelti); else scelti.forEach((m) => gruppo.addLayer(m));
    };
    mostra(segni);
    gruppo.addTo(mappa);

    const inquadra = (scelti, animata) => {
      if (!scelti.length) return mappa.setView([25, 0], 2, { animate: animata });
      mappa.fitBounds(L.latLngBounds(scelti.map((m) => m.getLatLng())), { paddingTopLeft: [40, 64], paddingBottomRight: [40, 28], maxZoom: 11, animate: animata });
    };
    inquadra(segni, false);
    if (window.ResizeObserver) new ResizeObserver(() => mappa.invalidateSize()).observe(div);

    /* schede: testi nella lingua della pagina; con la tastiera il fuoco entra nella scheda e poi torna al segnaposto */
    div.addEventListener('keydown', (e) => { if (e.key === 'Enter') daTastiera = true; }, true);
    div.addEventListener('pointerdown', () => { daTastiera = false; }, true);
    mappa.on('popupopen', (e) => {
      const el = e.popup.getElement();
      const chiudi = el.querySelector('.leaflet-popup-close-button');
      if (chiudi) { chiudi.setAttribute('aria-label', T.chiudiScheda); chiudi.title = T.chiudiScheda; }
      const link = el.querySelector('.btn');
      if (daTastiera && link) link.focus({ preventScroll: true });
    });
    mappa.on('popupclose', (e) => {
      const el = e.popup.getElement();
      const attivo = document.activeElement;
      const segno = aperto && aperto.getElement();
      if (segno && (!attivo || attivo === document.body || (el && el.contains(attivo)))) segno.focus({ preventScroll: true });
      aperto = null;
    });
    div.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape' || !aperto) return;
      e.stopPropagation();
      mappa.closePopup();
    });

    /* rotellina del mouse: ingrandisce solo dopo un clic sulla mappa, così non blocca lo scorrimento della pagina */
    mappa.on('click focus', () => mappa.scrollWheelZoom.enable());
    div.addEventListener('mouseleave', () => mappa.scrollWheelZoom.disable());

    /* su telefono la mappa non blocca lo scorrimento: si sposta con due dita, oppure con un dito dopo averla toccata una volta */
    if (tocco) {
      let sbloccata = false, partenza = null, attesa = 0;
      const avvisa = () => {
        riquadro.classList.add('mostra-avviso');
        clearTimeout(attesa);
        attesa = setTimeout(() => riquadro.classList.remove('mostra-avviso'), 1800);
      };
      div.addEventListener('touchstart', (e) => {
        partenza = e.touches.length === 1 ? [e.touches[0].clientX, e.touches[0].clientY] : null;
        if (e.touches.length > 1) riquadro.classList.remove('mostra-avviso');
      }, { passive: true });
      div.addEventListener('touchmove', (e) => {
        if (sbloccata || !partenza || e.touches.length !== 1) return;
        const t = e.touches[0];
        if (Math.abs(t.clientX - partenza[0]) + Math.abs(t.clientY - partenza[1]) > 12) { partenza = null; avvisa(); }
      }, { passive: true });
      mappa.on('click', () => {
        if (sbloccata) return;
        sbloccata = true;
        mappa.dragging.enable();
        riquadro.classList.add('sbloccata');
        riquadro.classList.remove('mostra-avviso');
        annuncia(T.mappaSbloccata);
      });
      document.addEventListener('touchstart', (e) => {
        if (!sbloccata || riquadro.contains(e.target)) return;
        sbloccata = false;
        mappa.dragging.disable();
        riquadro.classList.remove('sbloccata');
      }, { passive: true });
    }

    /* pulsanti «Italia» e «Mondo» */
    const scelte = new Set();
    const visibili = () => segni.filter((m) => !scelte.size || scelte.has(m.options.sezione));
    zona.querySelector('[data-vai="italia"]').addEventListener('click', () => mappa.fitBounds(ITALIA, { padding: [8, 8], animate: !fermo }));
    zona.querySelector('[data-vai="mondo"]').addEventListener('click', () => inquadra(visibili(), !fermo));

    /* filtri per sezione (solo nella pagina della mappa) */
    const stato = zona.querySelector('[data-stato-mappa]');
    if (!stato) return;
    const azzera = zona.querySelector('[data-azzera-mappa]');
    function filtra(parla) {
      const scelti = visibili();
      mostra(scelti);
      const quanti = racconti.filter((r) => !scelte.size || scelte.has(sezioneDi(r))).length;
      zona.querySelectorAll('[data-sezione]').forEach((b) => b.setAttribute('aria-pressed', String(scelte.has(b.getAttribute('data-sezione')))));
      azzera.hidden = !scelte.size;
      stato.textContent = scelte.size
        ? T.statoMappaFiltri(quanti, racconti.length, Array.from(scelte).map((k) => SEZIONI[k].nome.toLowerCase()).join(', '))
        : T.statoMappaTutti(racconti.length);
      if (!parla) return;
      mappa.closePopup();
      inquadra(scelti, !fermo);
      annuncia(stato.textContent);
    }
    zona.addEventListener('click', (e) => {
      const b = e.target.closest('[data-sezione], [data-azzera-mappa]');
      if (!b) return;
      if (b.hasAttribute('data-azzera-mappa')) {
        scelte.clear();
        filtra(true);
        const primo = zona.querySelector('[data-sezione]');
        if (primo) primo.focus();
        return;
      }
      const k = b.getAttribute('data-sezione');
      if (scelte.has(k)) scelte.delete(k); else scelte.add(k);
      filtra(true);
    });
    filtra(false);
  }

  /* ---------- pagina della mappa: tutti i luoghi in un elenco, divisi per sezione ----------
     per chi usa un lettore di schermo e per chi preferisce non usare la mappa */
  function avviaLuoghi() {
    const zona = document.querySelector('[data-luoghi]');
    if (!zona) return;
    const ordinati = RACCONTI.slice().sort(dalPiuRecente);
    const voce = (r) => {
      const tappe = tappeDi(r);
      return `<li>
          <a class="link" href="${P}${esc(r.pagina)}">${esc(r.titolo)}</a>
          <span class="luoghi-dove">${esc(r.luogo)} · ${esc(r.regione)} · ${esc(r.dataTesto)}</span>
          ${tappe.length ? `<ul class="luoghi-tappe" aria-label="${esc(T.tappeDi(r.luogo))}">${tappe.map((t) => {
            const n = numeroGiorno(t.giorno);
            return `<li><a href="${indirizzoTappa(r, t)}">${esc(nomeTappa(r, t))}</a>${n ? ` <span class="luoghi-giorno">· ${T.giorno(n)}</span>` : ''}</li>`;
          }).join('')}</ul>` : ''}
        </li>`;
    };
    zona.innerHTML = `<div class="luoghi-griglia">${Object.keys(SEZIONI).map((k) => {
      const qui = ordinati.filter((r) => sezioneDi(r) === k);
      return `<section class="luoghi-sezione sez-${k}" aria-labelledby="luoghi-${k}">
          <h3 id="luoghi-${k}"><span class="mappa-segno sez-${k}" aria-hidden="true"></span><a class="link" href="${P}${SEZIONI[k].pagina}">${esc(SEZIONI[k].nome)}</a></h3>
          ${qui.length ? `<ul class="luoghi-lista">${qui.map(voce).join('')}</ul>` : `<p class="luoghi-vuoto">${T.prossimamente}</p>`}
        </section>`;
    }).join('')}</div>`;
  }

  /* ---------- comparsa graduale durante lo scroll ---------- */
  function avviaRivela() {
    const voti = Array.from(document.querySelectorAll('.voto'));
    if (pocoMovimento.matches || !window.IntersectionObserver) return;

    const scelti = Array.from(document.querySelectorAll(
      '[data-rivela], .intestazione, .chi-sono > *, .guida-card, .sezione-card, .scheda, .prossimamente, ' +
      '.racconto-testo .box, .racconto-testo figure.foto, .racconto-testo .galleria, .senza-sorprese, .vicino'
    )).filter((el) => !(el.matches('figure.foto') && el.closest('.galleria')));

    const oss = new IntersectionObserver((voci) => {
      voci.forEach((v) => {
        if (!v.isIntersecting) return;
        const el = v.target;
        oss.unobserve(el);
        if (el.classList.contains('voto')) { el.classList.remove('attesa'); el.classList.add('anima'); return; }
        el.classList.add('visibile');
        /* a comparsa finita tolgo le classi: così non disturbano gli effetti al passaggio del mouse */
        setTimeout(() => { el.classList.remove('rivela', 'visibile'); el.style.transitionDelay = ''; }, 1100);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    scelti.forEach((el) => {
      const fratelli = el.parentElement ? Array.from(el.parentElement.children).filter((f) => scelti.includes(f)) : [];
      if (fratelli.length > 1) el.style.transitionDelay = `${Math.min(fratelli.indexOf(el), 3) * 90}ms`;
      el.classList.add('rivela');
      oss.observe(el);
    });
    voti.forEach((v) => { v.classList.add('attesa'); oss.observe(v); });
  }

  /* ---------- pulsante «torna su» ---------- */
  function avviaTornaSu() {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'torna-su';
    b.innerHTML = `${icona('freccia-su')}<span class="vh">${T.tornaSu}</span>`;
    document.body.appendChild(b);
    b.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: pocoMovimento.matches ? 'auto' : 'smooth' });
      const salta = document.querySelector('.salta');
      if (salta) salta.focus({ preventScroll: true });
    });
    const aggiorna = () => b.classList.toggle('visibile', window.scrollY > window.innerHeight * 1.2);
    window.addEventListener('scroll', aggiorna, { passive: true });
    aggiorna();
  }

  document.addEventListener('DOMContentLoaded', () => {
    avviaTestata();
    riempiConteggi();
    riempiUltimi();
    avviaSezione();
    avviaRacconto();
    avviaVoti();
    avviaLightbox();
    avviaFeedback();
    avviaContatti();
    avviaMappe();
    avviaLuoghi();
    preparaImmagini(document);
    avviaRivela();
    avviaTornaSu();
  });
})();
