/* ==========================================================================
   IN VIAGGIO SULLE MIE RUOTE — contenuti da aggiornare
   Questo è l'unico file da toccare (oltre alla pagina del racconto)
   quando si pubblica qualcosa di nuovo.
   ========================================================================== */

/* 1. AUTRICE E SOCIAL -------------------------------------------------------
   L'indirizzo e-mail non compare nel sito: chi vuole scrivere usa la sezione
   «Scrivimi» della home, e i messaggi arrivano ad Anna tramite Netlify.

   social → per ora è vuoto, quindi nel sito non compare niente sui social.
   Quando ci sarà un profilo, scriverlo tra le parentesi quadre, uno per riga:

     social: [
       { nome: "Instagram", url: "https://www.instagram.com/NOME-DEL-PROFILO" },
       { nome: "Facebook",  url: "https://www.facebook.com/NOME-DELLA-PAGINA" }
     ]

   I profili compaiono da soli in fondo a ogni pagina, sotto «Scrivimi».
   -------------------------------------------------------------------------- */
window.SITO = {
  autrice: "Anna Bigazzi",
  social: []
};

/* 2. ELENCO DEI RACCONTI ----------------------------------------------------
   Per aggiungere un racconto: copiare un blocco { ... }, incollarlo in cima
   all'elenco e cambiare i valori. L'ordine non conta: il sito ordina per data.

   sezione → "gite" (Gite fuori porta) · "weekend" (Weekend e soggiorni) · "grandi" (Grandi viaggi)
   data    → il giorno della visita (o il primo giorno), scritto anno-mese-giorno
   pubblicato → facoltativo, di norma NON serve: in home «Gli ultimi racconti»
             mostra i tre viaggi più recenti per data del viaggio.
             Solo se si vuole mettere in evidenza in home un viaggio più vecchio,
             aggiungere pubblicato: "anno-mese-giorno" con la data di messa online.
   cuori   → voto complessivo da 1 a 5
   tag     → quelli che servono fra:
             "bagno"           Bagno accessibile
             "parcheggio"      Parcheggio disabili
             "accompagnatore"  Serve accompagnatore
             "pendenza"        Percorso in pendenza
             "impianti"        Impianti di risalita accessibili
   coordinate → dove mettere il segnaposto sulla «Mappa dei miei viaggi»:
             [latitudine, longitudine], con il punto e non la virgola, per esempio
             coordinate: [43.8430, 10.5050]. Si trovano su Google Maps: clic destro sul
             luogo, poi clic sui due numeri che compaiono (si copiano da soli).
             Senza coordinate il racconto non compare sulla mappa, ma resta nel resto del sito.
   tappe   → facoltativo, per i viaggi con più luoghi: un pallino più piccolo per ogni tappa.
             nome   → come si legge sulla mappa
             giorno → l'id del titolo del racconto a cui porta il pallino (per esempio
                      "giorno-3", cioè <h2 id="giorno-3"> nella pagina). Se non c'è, il
                      pallino porta all'inizio del racconto.
             Esempio:
               tappe: [
                 { nome: "Ortisei", coordinate: [46.5747, 11.6714], giorno: "giorno-4" }
               ]
   -------------------------------------------------------------------------- */
window.RACCONTI = [
  {
    id: "ferrara",
    pagina: "racconti/ferrara-sulle-mie-ruote.html",
    titolo: "Ferrara sulle mie ruote",
    sommario: "Una giornata tra piazze, strade medievali e meraviglie del Rinascimento, nella città delle biciclette.",
    sezione: "gite",
    luogo: "Ferrara",
    regione: "Emilia-Romagna",
    data: "2026-10-17",
    dataTesto: "Sabato 17 ottobre 2026",
    copertina: "img/ferrara/castello-estense-card.webp",
    copertinaAlt: "Anna e il suo accompagnatore sorridono in un selfie davanti al Castello Estense di Ferrara.",
    copertinaFuoco: "center 80%",
    cuori: 5,
    tag: ["bagno"],
    coordinate: [44.8353, 11.6200]
  },
  {
    id: "miami",
    pagina: "racconti/miami-sulle-mie-ruote.html",
    titolo: "Miami e i Caraibi sulle mie ruote",
    sommario: "Qualche giorno a Miami e una crociera nei Caraibi a bordo di MSC World America.",
    sezione: "grandi",
    luogo: "Miami e i Caraibi",
    regione: "Florida · Honduras · Messico · Bahamas",
    data: "2026-04-21",
    dataTesto: "21 aprile – 3 maggio 2026",
    copertina: "img/miami/copertina-card.webp",
    copertinaAlt: "Anna e il suo accompagnatore sorridono in un selfie davanti a un murale coloratissimo di Wynwood, a Miami.",
    cuori: 5,
    tag: ["bagno", "parcheggio", "accompagnatore", "pendenza"],
    coordinate: [25.7617, -80.1918],
    tappe: [
      { nome: "Everglades (Shark Valley)", coordinate: [25.7575, -80.7664], giorno: "giorno-3" },
      { nome: "Key West",                  coordinate: [24.5551, -81.7800], giorno: "giorno-4" },
      { nome: "Roatán",                    coordinate: [16.3175, -86.5390], giorno: "giorno-7" },
      { nome: "Costa Maya / Mahahual",     coordinate: [18.7139, -87.7105], giorno: "giorno-8" },
      { nome: "Chacchoben",                coordinate: [19.0007, -88.2312], giorno: "giorno-8" },
      { nome: "Cozumel",                   coordinate: [20.5014, -86.9436], giorno: "giorno-9" },
      { nome: "Ocean Cay",                 coordinate: [25.4209, -79.2067], giorno: "giorno-11" }
    ]
  },
  {
    id: "modena",
    pagina: "racconti/modena-sulle-mie-ruote.html",
    titolo: "Modena sulle mie ruote",
    sommario: "Una giornata tra Aceto Balsamico, bollito e centro storico.",
    sezione: "gite",
    luogo: "Modena",
    regione: "Emilia-Romagna",
    data: "2026-03-01",
    dataTesto: "Domenica 1 marzo 2026",
    copertina: "img/modena/piazza-grande-card.webp",
    copertinaAlt: "Piazza Grande a Modena, con la torre Ghirlandina e il Duomo.",
    cuori: 5,
    tag: ["bagno", "parcheggio"],
    coordinate: [44.6458, 10.9256]
  },
  {
    id: "bologna",
    pagina: "racconti/bologna-sulle-mie-ruote.html",
    titolo: "Bologna sulle mie ruote",
    sommario: "Una giornata tra portici, storia e cucina bolognese.",
    sezione: "gite",
    luogo: "Bologna",
    regione: "Emilia-Romagna",
    data: "2026-10-03",
    dataTesto: "Sabato 3 ottobre 2026",
    copertina: "img/bologna/piazza-maggiore-triride-card.webp",
    copertinaAlt: "Anna sorridente sul suo Triride in Piazza Maggiore, davanti a Palazzo d’Accursio.",
    copertinaFuoco: "center bottom",     // facoltativo: quale parte della foto tenere nel ritaglio
    cuori: 5,
    tag: ["bagno", "parcheggio"],
    coordinate: [44.4938, 11.3426]
  },
  {
    id: "livorno",
    pagina: "racconti/livorno-sulle-mie-ruote.html",
    titolo: "Livorno sulle mie ruote",
    sommario: "Cacciucco, fossi, fortezze e mare: una giornata da vivere con il Triride.",
    sezione: "gite",
    luogo: "Livorno",
    regione: "Toscana",
    data: "2026-09-19",
    dataTesto: "Sabato 19 settembre 2026",
    copertina: "img/livorno/terrazza-mascagni-card.webp",
    copertinaAlt: "Il gazebo della Terrazza Mascagni dietro la balaustra, con il pavimento a scacchiera in primo piano.",
    cuori: 5,
    tag: ["bagno", "parcheggio", "accompagnatore"],
    coordinate: [43.5485, 10.3106]
  },
  {
    id: "fie",
    pagina: "racconti/fie-allo-sciliar.html",
    titolo: "Fiè allo Sciliar: ritrovare la montagna, con le mie ruote",
    sommario: "Sei giorni tra laghetti, malghe, cabinovie e rifugi dell’Alpe di Siusi.",
    sezione: "weekend",
    luogo: "Fiè allo Sciliar",
    regione: "Alto Adige",
    data: "2026-08-30",
    dataTesto: "30 agosto – 4 settembre 2026 · 6 giorni",
    copertina: "img/fie/discesa-compaccio-card.webp",
    copertinaAlt: "Anna con la carrozzina e il Triride su una strada tra i prati, con le Dolomiti tra le nuvole.",
    cuori: 5,
    tag: ["bagno", "parcheggio", "accompagnatore", "pendenza", "impianti"],
    coordinate: [46.5166, 11.5006],
    tappe: [
      { nome: "Alpe di Siusi / Compaccio", coordinate: [46.5404, 11.6163], giorno: "giorno-3" },
      { nome: "Ortisei",                   coordinate: [46.5747, 11.6714], giorno: "giorno-4" },
      { nome: "Val d’Anna",                coordinate: [46.5830, 11.6900], giorno: "giorno-5" },
      { nome: "Monte Pana",                coordinate: [46.5506, 11.7180], giorno: "giorno-6" }
    ]
  }
];
