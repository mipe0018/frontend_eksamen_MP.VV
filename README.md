## NIGHT CLUB

Intern afleveringsplan og arbejdscheckliste
Formål: Intern plan for gruppens arbejde. Skriv den forventede dato ved hvert punkt. Brug dokumentet sammen med de officielle eksamensbeskrivelser. Det erstatter ikke synopsis eller den officielle kravspecifikation.
Teamets aftalte ansvarsfordeling
Område Ansvarlig
Home + Events Vasilisa
Event Page + Book Table + Contact Us Mitzie
Header Mitzie
Footer Vasilisa
Page Hero på alle sider undtagen Home Mitzie
Global CSS, oklch()-farver og Ubuntu-font Mitzie + Vasilisa
API-undersøgelse Mitzie koordinerer; begge har ansvar for egne sider

Responsivitet: Mobile-first, derefter desktop. Teamnoterne angiver breakpoint 799 px og 75 rem til desktop-grid/afstand; kontrollér den præcise CSS-implementering mod Figma.

1. Projektgrundlag og organisering
   Udført Opgave / kontrolpunkt Ansvarlig Forventet dato
   [ ] Bekræft gruppemedlemmer, gruppenavn og ansvarsfordeling. Begge ____ / ____ / ______
   [ ] Aflever Team Canvas på ItsLearning. Begge ____ / ____ / ______
   [ ] Aftal fælles arbejdsproces, interne deadlines og kommunikation. Begge ____ / ____ / ______
   [ ] Aftal branching-strategi og arbejdsgang for stage, commit, push og merge. Mitzie – GitHub-ansvarlig / Begge ____ / ____ / ______
   [ ] Sørg for meningsfulde commits, hvor hvert commit dækker én afgrænset ændring. Begge ____ / ____ / ______
   [ ] Dokumentér konkret, hvem der har arbejdet med hvilke dele af projektet. Begge ____ / ____ / ______

2. Design, global CSS og responsivitet
   Udført Opgave / kontrolpunkt Ansvarlig Forventet dato
   [ ] Følg kundens Figma-design og den visuelle retning; dokumentér begrundede justeringer. Vasilisa – Figma-ansvarlig / Begge ____ / ____ / ______
   [ ] Global CSS: fælles opsætning og koordinering. Mitzie + Vasilisa ____ / ____ / ______
   [ ] Brug oklch() til egne CSS-farver. Mitzie + Vasilisa ____ / ____ / ______
   [ ] Anvend skrifttypen Ubuntu som aftalt i teamnoterne. Mitzie + Vasilisa ____ / ____ / ______
   [ ] Arbejd mobile-first, og tilpas derefter til desktop. Begge ____ / ____ / ______
   [ ] Brug det aftalte breakpoint omkring 799 px; kontrollér den konkrete media-query-grænse i implementeringen. Begge ____ / ____ / ______
   [ ] Afklar og implementér desktop-grid/kolonneafstand som angivet i Figma-noterne (75 rem). Begge ____ / ____ / ______
   [ ] Test små, store og meget store skærme. Begge ____ / ____ / ______
   [ ] Sørg for tydelige fokus-states på links, knapper, formularfelter og andre interaktive elementer. Begge ____ / ____ / ______
   [ ] Optimér billeder/formater, unødvendig JavaScript/CSS, loadingtid og generel performance. Begge ____ / ____ / ______

3. Sider og komponenter – ansvarsfordeling
   Udført Opgave / kontrolpunkt Ansvarlig Forventet dato
   [ ] Home – forside og sidens sektioner. Vasilisa ____ / ____ / ______
   [ ] Events – eventoversigt med maksimalt tre events pr. side og pagination. Vasilisa ____ / ____ / ______
   [ ] Event Page – dynamisk detaljeside for et enkelt event. Mitzie ____ / ____ / ______
   [ ] Book Table – bordoversigt og reservationsformular. Mitzie ____ / ____ / ______
   [ ] Contact Us – kontaktformular. Mitzie ____ / ____ / ______
   [ ] Header – navigation på tværs af sider. Mitzie ____ / ____ / ______
   [ ] Footer – footer på tværs af sider. Vasilisa ____ / ____ / ______
   [ ] Page Hero på alle sider undtagen Home. Mitzie ____ / ____ / ______
   [ ] Fælles gennemgang af komponentintegration og ensartethed på tværs af sider. Begge ____ / ____ / ______

4. Forside – funktionelle krav
   Udført Opgave / kontrolpunkt Ansvarlig Forventet dato
   [ ] Hero: fuldskærmsvisning med to baggrundsbilleder, tilfældigt valgt ved hvert page-load. Vasilisa ____ / ____ / ______
   [ ] Hero: logo og tagline med den beskrevne page-load-animation. Vasilisa ____ / ____ / ______
   [ ] Navigation placeres ved bunden af hero og bliver sticky ved scroll. Mitzie – Header / Vasilisa – Home ____ / ____ / ______
   [ ] Welcome-sektion med Night Club, Restaurant og Bar samt hover-/touch-animation. Vasilisa ____ / ____ / ______
   [ ] Featured Events hentes fra API'et med isFeatured: true og viser krævede eventoplysninger samt Book Now. Vasilisa ____ / ____ / ______
   [ ] Gallery hentes fra API'et; billeder animeres ind ved scroll og åbnes i lightbox/modal med frem/tilbage. Vasilisa ____ / ____ / ______
   [ ] Night Club Track: kunstnerbillede, play/pause, volumen, aktuel tid, tracklængde og valg af øvrige tracks. Vasilisa ____ / ____ / ______
   [ ] Latest Video viser de to seneste videoer. Vasilisa ____ / ____ / ______
   [ ] Testimonials hentes fra API'et og vises som slideshow med billede, tekst og SoMe-links. Vasilisa ____ / ____ / ______
   [ ] Nyhedsbrev: e-mailvalidering, POST, succesfeedback og forståelig besked ved HTTP 409/dublet. Vasilisa ____ / ____ / ______

5. Events og eventdetalje
   Udført Opgave / kontrolpunkt Ansvarlig Forventet dato
   [ ] Events-side viser alle events fra API'et. Vasilisa ____ / ____ / ______
   [ ] Pagination: maksimalt tre events pr. side. Vasilisa ____ / ____ / ______
   [ ] Event-cards viser billede, navn, dato, tidspunkt, sted, uddrag og Read More. Vasilisa ____ / ____ / ______
   [ ] Read More fører til eventets detaljeside via slug/route. Vasilisa + Mitzie ____ / ____ / ______
   [ ] Eventdetaljeside viser hero-billede og alle krævede eventoplysninger. Mitzie ____ / ____ / ______
   [ ] Eventdetaljeside indeholder Book Now. Mitzie ____ / ____ / ______
   [ ] Hent og vis kommentarer for det aktuelle event. Mitzie ____ / ____ / ______
   [ ] Kommentarformular valideres og sender eventId, name, content og date via POST. Mitzie ____ / ____ / ______
   [ ] Vis tydelig feedback ved succes og fejl for kommentarer. Mitzie ____ / ____ / ______

6. Book Table og Contact Us
   Udført Opgave / kontrolpunkt Ansvarlig Forventet dato
   [ ] Book Table: visuel oversigt over borde med bordnumre. Mitzie ____ / ____ / ______
   [ ] Klik på et bord indsætter bordnummeret i formularen. Mitzie ____ / ____ / ______
   [ ] Hvis brugeren kommer fra Book Now, forudvælges det relevante event. Mitzie ____ / ____ / ______
   [ ] Hent eventet og brug eventets dato som reservationsdato. Mitzie ____ / ____ / ______
   [ ] Reservation sender navn, e-mail, bord, antal gæster, dato, telefonnummer og eventId. Mitzie ____ / ____ / ______
   [ ] Håndtér optaget bord, succes og fejl med forståelig feedback. Mitzie ____ / ____ / ______
   [ ] Undersøg om optagede borde kan vises, inden brugeren reserverer. Mitzie ____ / ____ / ______
   [ ] Tilpas booking-flowet til mobil, hvor bordoversigten kan give UX-udfordringer. Mitzie ____ / ____ / ______
   [ ] Contact Us: formular med navn, e-mail og besked. Mitzie ____ / ____ / ______
   [ ] Validér kontaktformularen og vis feedback ved manglende/ugyldige felter. Mitzie ____ / ____ / ______
   [ ] Send kontaktbeskeder til POST /contact_messages. Mitzie ____ / ____ / ______

7. API, data og Next.js
   Udført Opgave / kontrolpunkt Ansvarlig Forventet dato
   [ ] Læs API'ets README og dokumentation; Mitzie koordinerer den overordnede API-afklaring. Begge gennemgår de endpoints, der bruges på egne sider. Mitzie koordinerer; begge gennemgår egne sider ____ / ____ / ______
   [ ] Start API'et lokalt, og test relevante GET- og POST-endpoints. Mitzie koordinerer; begge tester egne endpoints ____ / ____ / ______
   [ ] GET /events til Home og Events. Vasilisa ____ / ____ / ______
   [ ] GET /events/:id eller /events/:slug samt eventets kommentarer. Mitzie ____ / ____ / ______
   [ ] GET /comments?eventId=:id. Mitzie ____ / ____ / ______
   [ ] GET /gallery og /testimonials til Home. Vasilisa ____ / ____ / ______
   [ ] GET-reservationer efter behov for at undersøge bordtilgængelighed. Mitzie ____ / ____ / ______
   [ ] POST /comments, /reservations og /contact_messages. Mitzie ____ / ____ / ______
   [ ] POST /newsletters. Vasilisa ____ / ____ / ______
   [ ] Husk: Events er read-only i API'et; de hentes med GET. Vasilisa (Home + Events) ____ / ____ / ______
   [ ] Håndtér loading/fallback-UI, netværksfejl, tomme resultater og API-fejl med brugervenlige beskeder. Begge – på egne sider ____ / ____ / ______
   [ ] Validér input client-side før afsendelse og minimum server-side (fx Zod); håndtér API'ets valideringsfejl. Begge – på egne formularer ____ / ____ / ______
   [ ] Hvis Next.js anvendes: hent API-data server-side – ikke i useEffect i Client Components. Begge – på egne sider ____ / ____ / ______
   [ ] Brug Client Components til nødvendige interaktioner, lokal UI-state, formularfeedback og browserfunktionalitet. Begge – på egne sider ____ / ____ / ______
   [ ] Deploy API'et til Render, og opdatér frontendens API-adresse til den deployede backend. Mitzie (API/backend) ____ / ____ / ______
   [ ] Kontrollér at frontend kan afprøves uden en lokal backend. Begge ____ / ____ / ______

8. Test, tilgængelighed og kvalitet
   Udført Opgave / kontrolpunkt Ansvarlig Forventet dato
   [ ] Test alle centrale brugerflows fra start til slut. Begge ____ / ____ / ______
   [ ] Test formularer med manglende, ugyldige og gyldige input. Begge ____ / ____ / ______
   [ ] Test dublettilmelding til nyhedsbrev (409), optaget bord og øvrige relevante API-fejl. Begge ____ / ____ / ______
   [ ] Test loading-, fejl- og tom-tilstande. Begge ____ / ____ / ______
   [ ] Test tastaturbetjening og synlige fokus-states. Begge ____ / ____ / ______
   [ ] Test responsivitet på mobil, tablet, desktop og meget brede skærme. Begge ____ / ____ / ______
   [ ] Gennemgå browserkonsol og terminal for fejl og warnings. Begge ____ / ____ / ______
   [ ] Dokumentér hvad testene viste, og hvilke ændringer de førte til. Begge ____ / ____ / ______

9. Extras og AI-dokumentation
   Udført Opgave / kontrolpunkt Ansvarlig Forventet dato
   [ ] Vælg mindst én extra pr. gruppemedlem, som ikke er gennemgået direkte i undervisningen. Én extra pr. person ____ / ____ / ______
   [ ] Sørg for at hver extra har en reel funktion i projektet. Den enkelte ansvarlige ____ / ____ / ______
   [ ] Dokumentér hvad extraen er, hvorfor den blev valgt, hvordan den er implementeret, hvad I lærte samt fordele og ulemper. Den enkelte ansvarlige ____ / ____ / ______
   [ ] Dokumentér AI-brug, når AI har haft reel betydning; medtag relevante prompts/opsætning og hvordan output blev vurderet, testet og tilpasset. Begge ____ / ____ / ______
   [ ] Hvis AI har bidraget væsentligt til konkret kode, skal det fremgå i koden med en tydelig kommentar om AI-bidraget og jeres efterfølgende arbejde. Den enkelte ansvarlige ____ / ____ / ______
   [ ] Undgå forklarende kommentarer til almindelig, indlysende kode; skriv forståeligt med gode navne og struktur. Begge ____ / ____ / ______

10. Synopsis og afleveringsmateriale
    Udført Opgave / kontrolpunkt Ansvarlig Forventet dato
    [ ] Synopsis-forside: gruppemedlemmer, gruppenavn og dato. Begge ____ / ____ / ______
    [ ] Synopsis-links: GitHub, deployet site, screencasts og Figma eller tilsvarende. Begge ____ / ____ / ______
    [ ] Introduktion/koncept: idé, målgruppe og central funktionalitet. Begge ____ / ____ / ______
    [ ] Tech stack og tekniske valg: framework, libraries, packages, API'er, hosting og begrundelser. Begge ____ / ____ / ______
    [ ] Implementeringsovervejelser: design til kode, komponentstruktur, state, data, routing, API'er, responsive layouts, styling og udfordringer. Begge ____ / ____ / ______
    [ ] Git og samarbejde: branch-strategi og arbejdsproces. Mitzie – GitHub / Begge ____ / ____ / ______
    [ ] Projektstruktur: beskriv og begrund de vigtigste valg. Begge ____ / ____ / ______
    [ ] Hvem lavede hvad: konkrete individuelle bidrag. Begge ____ / ____ / ______
    [ ] Extras: beskriv hver extra og læringen fra den. Begge ____ / ____ / ______
    [ ] Brug af AI og lignende: beskriv relevant brug. Begge ____ / ____ / ______
    [ ] Mangler i den endelige løsning: beskriv kort det, der ikke nåede med. Begge ____ / ____ / ______
    [ ] Fokuspunkter frem mod mundtlig eksamen: beskriv planlagte tests. Begge ____ / ____ / ______
    [ ] Aflever den endelige kode før minification som ZIP-fil. Begge ____ / ____ / ______
    [ ] Minificér relevante JS-, CSS- og andre filer i den deployede version; behold original kode før minification til aflevering. Begge ____ / ____ / ______
    [ ] Lav én screencast pr. gruppemedlem, maksimalt 3 minutter, hvor I forklarer en essentiel del af koden, I har arbejdet med. Én pr. person ____ / ____ / ______
    [ ] Kontrollér at alle links virker, og at ZIP-filen kan åbnes. Begge ____ / ____ / ______

11. Mundtlig eksamen og efter aflevering
    Udført Opgave / kontrolpunkt Ansvarlig Forventet dato
    [ ] Forbered projektdemonstration: afleveret flow, koncept/målgruppe, proces, UI/UX-valg, tekniske valg, testresultater og forbedringsforslag. Begge ____ / ____ / ______
    [ ] Forbered individuel forklaring af eget bidrag og projektets helhed. Én pr. person ____ / ____ / ______
    [ ] Kunne navigere i koden og forklare/begrunde centrale faglige og metodiske valg. Én pr. person ____ / ____ / ______
    [ ] Forbered jer på at vurdere et foreslået løsningsforslag eller en kodeændring og forklare konsekvenserne. Én pr. person ____ / ____ / ______
    [ ] Efter afleveringsfristen: ændr ikke den afleverede version eller det afleverede GitHub-repository. Begge ____ / ____ / ______
    [ ] Hvis I vil videreudvikle eller teste forbedringer efter aflevering, så arbejd i en fork af det afleverede repository. Begge ____ / ____ / ______
    [ ] Hvis seed-data ændres eller testdata skal kunne genskabes, så sørg for at relevant db.json er committet i backend-repoet eller afleveret som kopi. API-ansvarlig / Begge ____ / ____ / ______

12. Links og praktiske oplysninger
    GitHub-repository:  
    Deployet frontend (Vercel):  
    Deployet API/backend (Render):  
    Figma:  
    Screencast – Vasilisa:  
    Screencast – Mitzie:  
    Vigtige officielle afleveringsrammer

- Synopsis, endelig kode før minification som ZIP samt links til relevante ressourcer indgår i afleveringen.
- Hvert gruppemedlem laver sin egen screencast på maksimalt 3 minutter.
- Den deployede version skal være optimeret; den oprindelige kode før minification skal også afleveres.
- Efter afleveringsfristen må den afleverede version og det afleverede GitHub-repository ikke ændres. Brug en fork til videre arbejde.
- Indhold fra internet eller andre kilder må kun anvendes, når nødvendige rettigheder/tilladelser er på plads.
  Gruppens egne aftaler og noter
  Interne deadlines / møder:
  Extras – Vasilisa:
  Extras – Mitzie:
  Testplan efter aflevering:

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
