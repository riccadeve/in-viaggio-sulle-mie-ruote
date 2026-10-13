# In viaggio sulle mie ruote — come funziona il sito

Il sito è fatto di semplici file HTML, CSS e JavaScript: non c'è niente da installare.
Per vederlo basta un doppio clic su `index.html`. Per metterlo online si carica **tutta la cartella** su un qualsiasi spazio web.

## Cosa c'è nella cartella

| File o cartella | A cosa serve |
|---|---|
| `index.html` | La home (hero, chi sono, come leggere i racconti, le tre sezioni, ultimi racconti, «Scrivimi») |
| `gite-fuori-porta.html`, `weekend-e-soggiorni.html`, `grandi-viaggi.html` | Le tre pagine di sezione |
| `racconti/` | Una pagina per ogni racconto, più `_modello.html` da copiare |
| `js/contenuti.js` | **Elenco dei racconti** (e, in cima, autrice e profili social): è il file da aggiornare a ogni pubblicazione |
| `js/sito.js`, `css/stile.css` | Funzionamento e aspetto del sito: di norma non si toccano |
| `privacy.html`, `en/privacy.html` | La pagina privacy nelle due lingue, collegata in fondo a ogni pagina |
| `moduli-netlify.html` | Pagina di servizio per Netlify: **non cancellarla** (vedi «I moduli del sito») |
| `sitemap.xml`, `robots.txt` | L'elenco delle pagine per Google e le indicazioni per i motori di ricerca (vedi «Farsi trovare su Google») |
| `_redirects`, `404.html` | Servono a Netlify: tengono nascosti online i file di lavoro e mostrano la pagina «non trovata». **Non cancellarli** (vedi «File che non devono vedersi online») |
| `apple-touch-icon.png` | L'icona (la ruota del logo su fondo crema) che compare su iPhone e iPad quando si aggiunge il sito alla schermata Home |
| `img/` | Le foto, una cartella per racconto; `img/home/` per le foto della home. In ogni cartella `anteprima.jpg` è la foto che compare quando si condivide il link |

Menu in alto e fondo pagina sono scritti una volta sola (in `js/sito.js`) e compaiono da soli in tutte le pagine.

## Aggiungere un nuovo racconto

1. **Foto.** Creare una cartella in `img/` (per esempio `img/lucca/`) e metterci le foto.
   Nomi semplici, minuscoli, senza spazi né accenti: `piazza-anfiteatro.jpg`.
2. **Pagina.** Nella cartella `racconti/` copiare `_modello.html` e rinominare la copia
   (per esempio `lucca-sulle-mie-ruote.html`).
3. **Testo.** Aprire la copia e sostituire tutto quello che è scritto IN MAIUSCOLO.
   Nel modello ci sono già, pronti da copiare: titoli delle tappe, foto, gallerie, box verde «Accessibilità»,
   box giallo «Da sapere prima di andare» e la scheda finale «Il mio senza sorprese», con una riga di esempio per il voto al cibo.
   Cancellare la riga `<meta name="robots" content="noindex">`.
4. **Elenco.** Aprire `js/contenuti.js`, copiare un blocco `{ ... }` dell'elenco e cambiare i valori.
   Il valore di `id` deve essere uguale a quello scritto nella pagina in `data-racconto="..."`.
5. **Controllo.** Aprire `index.html`: il racconto compare da solo nella sua sezione, nei filtri e nei
   collegamenti «precedente / successivo» degli altri racconti. In home, «Gli ultimi racconti» mostra
   i tre viaggi più recenti per data del viaggio: un viaggio più vecchio (come Miami) lì non compare.
6. **Google e anteprima dei link.** In cima alla pagina riempire titolo, descrizione, indirizzi completi e dati
   strutturati, preparare `anteprima.jpg` e aggiungere la pagina a `sitemap.xml`: i passi sono in «Farsi trovare su Google».

Indice laterale, stelle, cuori, etichette di accessibilità, ingrandimento delle foto e la parte finale
con «Ti è stato utile questo racconto?» e «Lascia un riscontro» si creano da soli.

### Stelle, cuori ed etichette

- Stelle: `<span class="stelle" data-voto="4">4 su 5</span>` (da 1 a 5).
- Voto al cibo (icona delle posate): `<span class="piatti" data-voto="4">4 su 5</span>` (da 1 a 5; in inglese `4 out of 5`).
- Cuori: `<span class="cuori" data-voto="5">5 cuori su 5</span>`; il voto complessivo va scritto uguale in `cuori:` dentro `js/contenuti.js`.
- Etichette per i filtri, in `tag:` dentro `js/contenuti.js`:
  `"bagno"`, `"parcheggio"`, `"accompagnatore"`, `"pendenza"`, `"impianti"`.

**Tre voti, ognuno con il suo compito.**

- **Le stelle** misurano la facilità del percorso. Nella tabella «Il mio senza sorprese» si danno **solo a percorsi e accessi**
  (parcheggio, strada, ingresso, bagno, impianti) e seguono la legenda della home:
  5 nessuna difficoltà · 4 percorso generalmente agevole · 3 tratti che richiedono aiuto · 2 difficoltà più marcate · 1 molto impegnativo.
  Il numero e la nota accanto devono dire la stessa cosa: se la nota parla di un aiuto necessario, le stelle non possono essere 5.
- **Le posate** sono il voto al cibo. Il piatto è una riga della stessa tabella, di solito l'ultima, e nella colonna «Voto»
  ha l'icona delle posate al posto delle stelle (nel codice la classe si chiama `piatti`).
  Nei due modelli c'è una riga di esempio già pronta, da «accendere» togliendo il commento:

  ```html
  <tr>
    <th scope="row">Cacciucco e scagliozzi</th>
    <td><span class="piatti" data-voto="5">5 su 5</span></td>
    <td>Cacciucco eccezionale.</td>
  </tr>
  ```
- **I cuori** sono solo per l'esperienza complessiva: uno per racconto, in fondo alla scheda e sulla scheda in home.

La colonna della tabella si chiama «Voto» (in inglese «Rating») proprio perché contiene sia stelle sia posate.
Il disegno dell'icona del cibo sta in `css/stile.css`, nella riga che comincia con `--i-cibo`: per cambiarlo si sostituisce quella riga.

### Dare del tu

In tutto il sito ci si rivolge a chi legge con il **tu** («cerca gli stalli riservati», «controlla la segnaletica», «qui trovi…»),
mai con il voi («cercate», «controllate», «trovate»). Il «noi» resta quello di Anna e di chi viaggia con lei («abbiamo parcheggiato»).
I racconti si scrivono al passato («siamo arrivati», «abbiamo scelto»); resta al presente solo ciò che descrive com'è il luogo oggi
(«il parcheggio è gratuito», «la casa museo chiude alle 17»).

### Le foto

- Lato lungo di 1600 pixel al massimo, formato JPG o WebP: sono più leggere e si caricano in fretta.
- **Peso consigliato per le foto nuove:** se possibile non oltre 250 KB circa per una foto del racconto e 120 KB circa per la copertina
  della scheda (`-card`). Per ottenerlo si parte **sempre dalla foto originale** (quella del telefono o della macchina fotografica):
  salvarla in WebP con qualità intorno a 78 (tra 75 e 80), oppure aprirla su [squoosh.app](https://squoosh.app), scegliere «WebP»,
  qualità 78, e scaricare il risultato. Controllare sempre a occhio che non sia sgranata: la qualità viene prima del peso.
- **Non ricomprimere le foto già pubblicate:** comprimere una seconda volta una foto già compressa la peggiora e fa risparmiare poco.
  Le foto del sito sono quelle originali dei racconti e vanno lasciate così.
- `width` e `height` sono le misure della foto in pixel: servono a non far «saltare» la pagina mentre si carica.
- `alt` descrive la foto a chi non la vede: una frase semplice, senza «foto di».
- La foto di copertina della scheda (`copertina:` in `js/contenuti.js`) va bene larga circa 900 pixel.
- Tutte le foto, tranne la prima in alto, hanno `loading="lazy"`: così da telefono si scaricano solo quando servono.
  Nei modelli è già scritto: basta non toglierlo.

## La versione inglese

La versione inglese sta nella cartella `en/` e usa le stesse foto, lo stesso stile e lo stesso `js/sito.js`.
In alto a destra, in ogni pagina, il pulsante **EN / IT** porta alla stessa pagina nell'altra lingua.

| File | A cosa serve |
|---|---|
| `en/index.html` | La home in inglese |
| `en/day-trips.html`, `en/weekends-and-stays.html`, `en/big-trips.html` | Le tre sezioni in inglese |
| `en/stories/` | I racconti in inglese, più `_template.html` da copiare |
| `js/contenuti-en.js` | I testi inglesi delle schede (titolo, frase, luogo, data). Foto, voti ed etichette restano in `js/contenuti.js` |

**Tradurre un racconto nuovo** (dopo averlo pubblicato in italiano):

1. In `en/stories/` copiare `_template.html` e rinominarlo in inglese (per esempio `lucca-on-my-wheels.html`).
2. Tradurre i testi e, in cima al file, scrivere in `data-racconto` lo stesso nome breve della versione italiana
   e in `data-altra-lingua` il percorso della pagina italiana (`../../racconti/lucca-sulle-mie-ruote.html`).
3. In `js/contenuti-en.js` copiare un blocco e tradurre i testi della scheda.
4. Nella pagina italiana del racconto scrivere in `data-altra-lingua` il percorso della pagina inglese
   (`../en/stories/lucca-on-my-wheels.html`).
5. Riempire anche qui, in cima alla pagina, titolo, descrizione, indirizzi completi e dati strutturati
   (vedi «Farsi trovare su Google») e aggiungere la pagina inglese a `sitemap.xml`.

Finché un racconto non ha il suo blocco in `js/contenuti-en.js`, nella versione inglese semplicemente non compare.

## Farsi trovare su Google e anteprima dei link

L'indirizzo del sito è **https://inviaggiosullemieruote.com**. In cima a ogni pagina (tra `<head>` e `</head>`)
ci sono alcune righe che il lettore non vede, ma che servono a Google e a chi condivide un link.
Nei modelli (`racconti/_modello.html` e `en/stories/_template.html`) sono già pronte: basta sostituire le parti IN MAIUSCOLO.

| Riga | A cosa serve | Regola |
|---|---|---|
| `<title>` | Il titolo che si legge su Google | Meno di 60 caratteri, con le parole che le persone cercano: «Lucca in carrozzina: parcheggio, accessi e bagni» |
| `description` | Le due righe sotto il titolo su Google | Meno di 155 caratteri: luogo, «in carrozzina», parcheggio, accessi, bagni |
| `canonical`, `hreflang`, `og:url` | L'indirizzo della pagina e quello della sua traduzione | Sempre completi, da `https://` in poi |
| `og:title`, `og:description`, `og:image` | Titolo, frase e foto dell'anteprima su WhatsApp, Facebook ecc. | `og:image` è l'indirizzo completo di `anteprima.jpg` |
| blocco `application/ld+json` | I «dati strutturati»: titolo, autrice, data e foto principale, scritti per Google | Cambiare solo i testi tra virgolette, senza togliere virgolette e virgole. La data si scrive anno-mese-giorno |

**La foto di anteprima.** In ogni cartella delle foto c'è `anteprima.jpg`: un ritaglio della foto di copertina,
in formato JPG, largo 1200 pixel e alto 630. Serve solo per l'anteprima dei link (WhatsApp e Facebook
non leggono sempre le foto WebP) e nel sito non compare. Per un racconto nuovo va preparata allo stesso modo
e messa nella sua cartella, per esempio `img/lucca/anteprima.jpg`. Se si cambia la copertina di un racconto,
va rifatta anche questa. L'anteprima della home e delle sezioni è `img/home/anteprima.jpg`.

**L'elenco delle pagine.** `sitemap.xml` elenca tutte le pagine, italiane e inglesi. Per un racconto nuovo:
copiare i due blocchi `<url> ... </url>` di un altro racconto (pagina italiana e pagina inglese), incollarli
prima delle pagine privacy e cambiare gli indirizzi. Finché non c'è la traduzione, mettere solo il blocco italiano
e togliere la riga con `hreflang="en"`. `robots.txt` indica a Google dove si trova la sitemap: non va toccato. La pagina `404.html` e i modelli non vanno nella sitemap.

**Dopo aver pubblicato**, per controllare:

- anteprima dei link: incollare l'indirizzo della pagina in [developers.facebook.com/tools/debug](https://developers.facebook.com/tools/debug/)
  e premere «Scrape Again». WhatsApp e Facebook ricordano a lungo la vecchia anteprima: per un link già condiviso può volerci tempo;
- dati strutturati: incollare l'indirizzo in [search.google.com/test/rich-results](https://search.google.com/test/rich-results);
- Google: in [Search Console](https://search.google.com/search-console) aggiungere il sito e, alla voce **Sitemap**,
  scrivere `sitemap.xml`. Si fa una volta sola.

## File che non devono vedersi online

Il sito si pubblica trascinando **tutta la cartella** su Netlify: dentro ci sono anche file che servono solo a chi lavora
sul sito (questo `LEGGIMI.md` e i due modelli dei racconti). Per non farli aprire a chiunque:

- **`_redirects`** dice a Netlify di rispondere «pagina non trovata» a chi cerca `/LEGGIMI.md`, `/racconti/_modello.html`
  e `/en/stories/_template.html` (anche scritti senza `.html`). Se un giorno si aggiunge un altro file di lavoro,
  basta copiare una riga e cambiare l'indirizzo. In locale (doppio clic sui file) questo file non ha effetto: è normale.
- **`404.html`** è la pagina che il visitatore vede in quei casi e ogni volta che apre un indirizzo che non esiste:
  ha il menu, il fondo pagina e i collegamenti alla home e alle tre sezioni. Dentro, i percorsi cominciano tutti con `/`
  (`/css/…`, `/js/…`): è voluto, perché la pagina può comparire a qualsiasi indirizzo. Per questo, aperta con un doppio clic
  dal computer, si vede senza grafica: online è a posto.

Nessuno dei due va cancellato o rinominato. Dopo ogni pubblicazione si può controllare aprendo
`https://inviaggiosullemieruote.com/LEGGIMI.md`: deve comparire la pagina «Pagina non trovata».

**L'icona per iPhone.** `apple-touch-icon.png` (180×180 pixel, senza trasparenza) è collegata in cima a ogni pagina con
`<link rel="apple-touch-icon" href="…">`, subito sotto la favicon e con lo stesso percorso (`../` nei racconti, `../../` nei racconti inglesi).
Nei modelli la riga c'è già.

## I moduli del sito: «Mi è stato utile», riscontri e «Scrivimi» (Netlify Forms)

Il sito ha tre moduli, che aggiunge da solo `js/sito.js`.

In fondo a ogni racconto, dopo la scheda «Il mio senza sorprese»:

- il pulsante **«❤️ Sì, mi è stato utile»**: ogni clic arriva a Netlify nel modulo `utile`
  (racconto, lingua, pagina; nessun nome). Sul sito non compare nessun numero;
- il modulo **«Lascia un riscontro»**: i messaggi arrivano a Netlify nel modulo `domande`
  (nome, e-mail se indicata, messaggio, racconto, lingua).

In fondo alla home, e raggiungibile da ogni pagina con la voce **Contatti** del menu e con «Scrivimi» a fondo pagina:

- la sezione **«Scrivimi»**: i messaggi arrivano a Netlify nel modulo `contatti`
  (nome, e-mail, argomento, messaggio, lingua). Qui l'e-mail è obbligatoria, perché serve per rispondere.

**Niente di quello che i lettori scrivono viene pubblicato sul sito**: i messaggi dei tre moduli si leggono solo
nel pannello di Netlify (e negli avvisi via e-mail, se attivati). I messaggi di «Scrivimi» stanno in un modulo tutto loro,
separati dai riscontri dei racconti.

Non servono database né altri servizi: il sito si continua a pubblicare trascinando la cartella su Netlify.

### Da fare una volta sola su Netlify

1. Entrare in [app.netlify.com](https://app.netlify.com), aprire il sito e andare su **Forms**.
2. Premere **Enable form detection**.
3. Pubblicare di nuovo il sito (trascinando la cartella): Netlify riconosce i moduli solo dalla pubblicazione
   successiva. In **Forms** devono comparire tre moduli: `utile`, `domande` e `contatti`.
4. Sul sito pubblicato premere «Sì, mi è stato utile» in un racconto, inviare un riscontro di prova
   e un messaggio di prova da «Scrivimi»: dopo qualche secondo si devono vedere in **Forms**.

Finché non si fanno i passi 2 e 3, sul sito il pulsante e i moduli mostrano un messaggio di errore al momento dell'invio.
Lo stesso vale ogni volta che si aggiunge un modulo nuovo: Netlify lo riconosce solo dopo una nuova pubblicazione.

### Dove si leggono le risposte

- **Forms** → clic su `contatti`: i messaggi arrivati da «Scrivimi», dal più recente, con nome, e-mail e argomento.
- **Forms** → clic su `domande`: i riscontri lasciati in fondo ai racconti. Con **Download as CSV** si scaricano tutti.
- **Forms** → clic su `utile`: una riga per ogni clic. Per sapere quali racconti piacciono di più conviene
  scaricare il CSV e contare le righe per racconto.
- Sopra l'elenco c'è un menu per passare da **Verified submissions** a **Spam submissions**:
  ogni tanto vale la pena guardare se un messaggio vero è finito tra lo spam.
- Per cancellare un messaggio: spuntarlo e premere **Delete submission**.

### Avvisi via e-mail

Perché i messaggi arrivino anche nella casella di posta di Anna, l'indirizzo va scritto **solo su Netlify**
(mai nei file del sito, che sono pubblici):

1. **Forms** → **Submission notifications** → aggiungere una notifica via e-mail.
2. Scegliere il modulo **`contatti`** e scrivere l'indirizzo a cui mandare l'avviso.
3. Ripetere per il modulo **`domande`**. Non scegliere «tutti i moduli», altrimenti arriva una mail a ogni clic su «utile».
4. La mail riporta tutti i campi del messaggio. L'oggetto previsto è «Nuovo messaggio dal blog: argomento scelto»
   per «Scrivimi» e «Nuovo riscontro dal blog: titolo del racconto» per i riscontri
   (se non compare così, si può scrivere a mano nello stesso riquadro delle notifiche).
   Per rispondere al lettore basta premere **Rispondi**: la risposta va all'indirizzo che ha lasciato.

### Se si cambia qualcosa

- I testi (in italiano e in inglese) sono in `js/sito.js`, nell'oggetto `T`: per i racconti le voci che iniziano con
  `utile`, `domanda`, `err`; per «Scrivimi» le voci `contatti`, `scrivimi`, `contattiInvito`, `argomento`, `argomenti`,
  `inviaMessaggio` e `grazie`.
- Gli argomenti del menu a tendina di «Scrivimi» sono in `argomenti`: in ogni coppia la prima scritta è quella
  che arriva ad Anna (sempre in italiano), la seconda è quella che vede il lettore.
- Se in `js/sito.js` si aggiunge o si rinomina un campo di un modulo, va fatto anche in `moduli-netlify.html`,
  poi si pubblica di nuovo: Netlify accetta solo i campi che trova in quella pagina.
- Chi ha già premuto «Sì, mi è stato utile» su un racconto vede «Grazie! ❤️»: il browser se lo ricorda, così non arrivano doppioni.
- La pagina privacy (`privacy.html` e `en/privacy.html`) descrive i tre moduli: se cambiano i dati raccolti, va aggiornata.

## Contatti e profili social

Nel sito non compaiono né un indirizzo e-mail né profili social: chi vuole scrivere usa la sezione «Scrivimi».
La voce **Contatti** del menu e il collegamento «Scrivimi» a fondo pagina portano lì da ogni pagina.

Quando ci saranno dei profili social, basta aggiungerli in cima a `js/contenuti.js`, nella lista `social`
(lì accanto c'è un esempio pronto da copiare):

```js
social: [
  { nome: "Instagram", url: "https://www.instagram.com/NOME-DEL-PROFILO" },
  { nome: "Facebook",  url: "https://www.facebook.com/NOME-DELLA-PAGINA" }
]
```

Compariranno da soli a fondo pagina, sotto «Scrivimi», in tutte le pagine. Con la lista vuota (`social: []`)
sul sito non compare niente che riguardi i social.

## Cambiare le foto della home

Sostituire i file in `img/home/` lasciando lo stesso nome:
`hero.webp`, `chi-sono-1.webp`, `chi-sono-2.webp`, `chi-sono-3.webp`, `sezione-gite.webp`, `sezione-weekend.webp`, `sezione-grandi-viaggi.webp`.
(`sezione-grandi-viaggi.svg` è invece il disegno che compare nel riquadro «Prossimamente» delle sezioni ancora vuote: non va cancellato.)
Se cambia il soggetto, aggiornare anche la descrizione `alt` in `index.html`.

## Accessibilità: le regole da non rompere

- Ogni foto ha la sua descrizione `alt`.
- I titoli vanno in ordine: `<h2>` per le tappe, `<h3>` per i sottotitoli, `<h4>` per i titoli dei box dentro un sottotitolo.
- Le informazioni importanti non stanno solo in un colore o in un'icona: c'è sempre anche il testo.

## Da sapere

- I caratteri (Fraunces e Atkinson Hyperlegible Next) arrivano da Google Fonts: senza connessione il sito usa caratteri simili già presenti nel dispositivo.
- Su telefono il nome del sito in alto va su due righe («In viaggio» / «sulle mie ruote»); sugli schermi più stretti di 360 pixel
  resta solo la ruota del logo, per lasciare posto ai pulsanti EN, A+ e Menu.
- Una sezione mostra «Prossimamente» finché in `js/contenuti.js` non c'è almeno un racconto con quella `sezione`.
- In home «Gli ultimi racconti» e, in fondo ai racconti, «precedente / successivo» seguono la data del viaggio.
  Solo se si vuole mettere in evidenza in home un viaggio più vecchio, in `js/contenuti.js` si può aggiungere
  al suo blocco `pubblicato: "anno-mese-giorno"` con la data di messa online.
- Per un racconto di più giorni con molte foto (come `racconti/miami-sulle-mie-ruote.html`, 12 giorni e 106 foto) conviene copiare da lì:
  titoli dei giorni, gallerie da 2 o 3 foto e, nella scheda finale, i riquadri `nota` con un elenco di informazioni da ricordare.
