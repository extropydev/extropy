import type { NoteDictionary } from "./types";

export const notesNl: NoteDictionary = {
  payments: {
    title: "Betalingen die geen geld verliezen",
    tagline:
      "Wat er gebeurt tussen “Betalen” en “Betaald” — en waarom er onderweg niets verloren gaat.",
    worry:
      "Wat als een klant betaalt en de bestelling nooit verschijnt? Wat als iemand dubbel wordt afgeschreven?",
    reality: {
      heading: "Waarom dit echt gebeurt",
      body: [
        "Een betaling is geen moment — het is een gesprek tussen de browser, jouw server en de bank, en elke schakel kan wegvallen. De klant sluit het tabblad tijdens de redirect. De verbinding valt weg vlak nadat de afschrijving is gelukt. De bank vraagt om 3-D Secure en de flow splitst zich.",
        "Bijna elke kapotte checkout heeft dezelfde oorzaak: de terugkeer van de browser vanaf de betaalpagina wordt gezien als bewijs van betaling. Dat is het niet. Het is het minst betrouwbare signaal in de hele keten — en daarop bouwen levert webshops op met betaalde maar verdwenen bestellingen en een supportinbox vol screenshots.",
      ],
    },
    approach: {
      heading: "Hoe ik het in plaats daarvan bouw",
      intro:
        "Het systeem is zo ontworpen dat de kwetsbare delen mogen falen — en het geld toch klopt.",
      items: [
        {
          title: "De webhook is de bron van waarheid",
          body: "Een bestelling wordt bevestigd door Stripes cryptografisch ondertekende webhook — server naar server — nooit door de browser-redirect. Het tabblad van de klant mag midden in de checkout crashen; de bestelling belandt alsnog in de database.",
        },
        {
          title: "Idempotentie overal",
          body: "Stripe herhaalt webhooks, gebruikers dubbelklikken, netwerken versturen verzoeken opnieuw. Elke mutatie heeft een sleutel waardoor twee keer uitvoeren niets verandert: geen dubbele afschrijvingen, geen dubbele bestellingen — door constructie, niet door hoop.",
        },
        {
          title: "Bestellingen zijn een toestandsmachine",
          body: "pending → paid → fulfilled → refunded. Elke overgang is expliciet en vastgelegd. Vraagt een klant “waar is mijn geld?”, dan is het antwoord één query verderop, met tijdstempels.",
        },
        {
          title: "Ook falen is ontworpen",
          body: "Geweigerde kaarten, verlopen sessies, 3-D Secure-checks — elk geval krijgt een eigen scherm met een duidelijke volgende stap. Een mislukte betaling moet voelen als een drempel, niet als een muur.",
        },
      ],
    },
    code: {
      caption:
        "De kern: een ondertekende webhook plus een idempotente schrijfactie. Twee beslissingen die dubbel afschrijven structureel onmogelijk maken.",
    },
    bottomLine: {
      heading: "Waar het op neerkomt",
      body: "Je hoeft niet te vertrouwen op mijn zorgvuldigheid. Het systeem is zo gebouwd dat slordigheid nergens kan plaatsvinden — de onbetrouwbare delen mogen falen, en het geld klopt alsnog.",
    },
  },

  auth: {
    title: "Authenticatie zonder lekken",
    tagline:
      "Gebruikersaccounts horen geen risico te zijn. Verdediging in lagen — elke laag gaat ervan uit dat de vorige al is doorbroken.",
    worry:
      "Als we accounts opslaan, kunnen we gehackt worden. Wat als iemand bij data komt die niet van hem is?",
    reality: {
      heading: "Waarom dit echt gebeurt",
      body: [
        "Echte datalekken lijken zelden op een hackerfilm. Ze lijken op een vergeten controle: een API-endpoint dat elk ID uit de request vertrouwt, een databasequery zonder eigenaarsfilter, een sessietoken in localStorage waar elk geïnjecteerd script bij kan.",
        "Achter bijna al die lekken zit hetzelfde patroon — beveiliging die op precies één plek is geregeld. Zodra die ene plek een bug bevat (en elke codebase krijgt er ooit een), staat er niets meer achter.",
      ],
    },
    approach: {
      heading: "Hoe ik het in plaats daarvan bouw",
      intro: "In lagen. Elke laag gaat ervan uit dat de vorige al is doorbroken.",
      items: [
        {
          title: "Sessies beheerd door het platform",
          body: "Supabase Auth met httpOnly-cookies: tokens raken localStorage nooit aan, verversen gebeurt server-side, en XSS heeft niets te stelen. Ik knutsel geen eigen cryptografie — ik configureer een systeem dat door een securityteam wordt onderhouden.",
        },
        {
          title: "Row Level Security als laatste muur",
          body: "Elke tabel heeft RLS-policies die PostgreSQL zelf afdwingt. Zelfs als applicatiecode uitglijdt en het verkeerde opvraagt, weigert de database andermans rijen terug te geven. Een bug in mijn code kan geen lek van jouw data worden.",
        },
        {
          title: "Controles aan de rand",
          body: "Beschermde routes worden in de proxylaag gecontroleerd vóór er ook maar één regel paginacode draait. Een knop verbergen in de interface is beleefdheid; de regel die de server afdwingt is de echte beveiliging.",
        },
        {
          title: "Saaie, bewezen flows",
          body: "E-maillinks, OAuth-providers, rate-limited endpoints — standaardflows die gebruikers al vertrouwen, geen slimme eigen vondsten. In authenticatie is “creatief” een bug, geen feature.",
        },
      ],
    },
    code: {
      caption:
        "De laatste verdedigingslinie: policies die in de database zelf leven. Dit houdt stand, zelfs als elke regel van mijn applicatiecode fout is.",
    },
    bottomLine: {
      heading: "Waar het op neerkomt",
      body: "Eén bug mag nooit gelijkstaan aan één datalek. Tegen de tijd dat een aanvaller langs de rand, langs de sessielaag en tot een query komt — zegt de database zelf nog steeds nee.",
    },
  },

  cart: {
    title: "Een winkelwagen die alles overleeft",
    tagline:
      "Verversen, tabblad dicht, morgen, een ander apparaat — de wagen staat er nog. En de prijzen erin kloppen nog.",
    worry:
      "Een klant vult een winkelwagen en komt morgen terug — is die dan leeg? En als prijzen 's nachts veranderen, wat wordt er afgerekend?",
    reality: {
      heading: "Waarom dit echt gebeurt",
      body: [
        "Een winkelwagen oogt triviaal maar is stiekem gedistribueerde state: hij leeft op een apparaat, daarna op meerdere apparaten, terwijl prijzen en voorraad eronder verschuiven. De meeste implementaties kiezen één uiterste — puur lokaal (snel, maar sterft met de browser en synct nooit) of puur server-side (overleeft, maar elke klik wacht op een rondreis en gasten krijgen niets).",
        "De faalscenario's zijn bekend: de wagen die zichzelf leegt, de gastwagen die verdwijnt bij het inloggen, en de ergste — een checkout die stilletjes de prijs van gisteren rekent voor een product dat een uur geleden uitverkocht raakte.",
      ],
    },
    approach: {
      heading: "Hoe ik het in plaats daarvan bouw",
      intro: "Lokale snelheid, servertruth — in die volgorde.",
      items: [
        {
          title: "Lokaal eerst, direct",
          body: "Toevoegen aan de wagen schrijft naar een persistente Zustand-store: nul milliseconden, werkt offline, overleeft verversen en het sluiten van het tabblad. De interface laat de klant nooit wachten tot een server een klik bevestigt.",
        },
        {
          title: "Samengevoegd, niet vervangen",
          body: "Bij het inloggen wordt de gastwagen samengevoegd met de accountwagen — aantallen regel voor regel afgestemd. Niemand verliest de drie producten die hij koos vóór hij besloot in te loggen. React Query houdt elk open apparaat in dezelfde staat.",
        },
        {
          title: "Opnieuw gecontroleerd op het geldmoment",
          body: "Vlak voor de betaling controleert de server elke regel tegen actuele prijzen en voorraad. Wijzigingen worden aan de klant getoond — “dit product is nu €2 goedkoper”, “dit is uitverkocht” — en nooit stilletjes afgerekend.",
        },
      ],
    },
    code: {
      caption:
        "Twee lagen in één bestand: de persistente store die de interface direct maakt, en de servercall die de checkout eerlijk houdt.",
    },
    bottomLine: {
      heading: "Waar het op neerkomt",
      body: "De winkelwagen is een belofte aan de klant. Die nakomen betekent snel zijn waar snelheid telt — de klik — en streng waar waarheid telt: de afschrijving.",
    },
  },

  responsive: {
    title: "Eén site, elk scherm",
    tagline:
      "Niet “hij opent ook op een telefoon”, maar ontworpen vanaf een scherm van 360 pixels omhoog — niets is een gekrompen bijzaak.",
    worry:
      "In de presentatie ziet het er prachtig uit. Dan opent een klant het op een drie jaar oude Android — valt het dan uit elkaar?",
    reality: {
      heading: "Waarom dit echt gebeurt",
      body: [
        "De meeste “responsive” sites zijn desktopsites die zijn samengeperst: drie breakpoints, wat verborgen kolommen, klaar. Dan komt de realiteit — een viewport van 360 pixels, een tekstzoom-instelling, een vouwtelefoon, een browserbalk die de onderkant van het scherm opeet — en de lay-out was op niets daarvan ontworpen.",
        "De diepere fout is denken in pagina's in plaats van componenten. Een productkaart die is afgesteld op het desktopgrid breekt in de mobiele drawer, omdat hij alleen het hele scherm kende — niet de ruimte waarin hij werkelijk staat.",
      ],
    },
    approach: {
      heading: "Hoe ik het in plaats daarvan bouw",
      intro:
        "Meer dan de helft van je bezoekers zit op een telefoon. Die versie bouw ik als eerste.",
      items: [
        {
          title: "Vloeiend als standaard",
          body: "Typografie en witruimte interpoleren soepel met clamp() in plaats van te springen bij breakpoints. Er is geen breedte waarop de site er verkeerd uitziet, omdat er geen breedte is waarvoor hij niet is ontworpen.",
        },
        {
          title: "Componenten reageren op hun container",
          body: "Met container queries past een kaart zich aan aan de ruimte die hij krijgt — zijbalk, gridcel of volledige breedte. Lay-outs zijn geen matrix van uitzonderingen meer, maar compositie.",
        },
        {
          title: "Echte apparaten, echte handen",
          body: "Aanraakdoelen van minstens 44 pixels, safe-area-marges rond notches en gestenbalken, geen functies die alleen met hover werken, respect voor reduced motion. Getest op echte hardware, niet alleen in een versmald browservenster.",
        },
      ],
    },
    code: {
      caption:
        "Vloeiende typografie plus een container query: de twee technieken die een stapel breakpoint-uitzonderingen vervangen.",
    },
    bottomLine: {
      heading: "Waar het op neerkomt",
      body: "Deze site zelf is de demo. Open hem op een telefoon, tablet of laptop — verander de breedte halverwege het scrollen. Precies dat gedrag krijgt jouw project.",
    },
  },

  performance: {
    title: "Snelheid is een feature",
    tagline:
      "Elke extra seconde laadtijd zijn klanten die stilletjes vertrekken. Snelheid is geen optimalisatieronde — het is de architectuur.",
    worry:
      "Trage sites verliezen klanten. Wat voorkomt dat de onze zo'n spinner van vijf seconden wordt?",
    reality: {
      heading: "Waarom dit echt gebeurt",
      body: [
        "Trage sites zijn niet traag door één grote fout — ze sterven aan duizend sneden. Een client-side framework dat de hele app verstuurt voordat er iets te zien is. Datafetching die vier verzoeken diep watervalt. Een hero-afbeelding op volledige cameraresolutie. Elke keuze kost 200 milliseconden, en niemand merkt het totdat het totaal vier seconden is.",
        "De ongemakkelijke waarheid: performance kun je er niet achteraf opschroeven. Waar het renderen gebeurt, wanneer data laadt, welke JavaScript wordt verstuurd — dat zijn architectuurbeslissingen van dag één, en ze achteraf herstellen kost meer dan de oorspronkelijke bouw.",
      ],
    },
    approach: {
      heading: "Hoe ik het in plaats daarvan bouw",
      intro: "Snel door architectuur, bevestigd door metingen.",
      items: [
        {
          title: "Server-first renderen",
          body: "Pagina's komen aan als afgewerkte HTML — React Server Components renderen op de server, en JavaScript gaat alleen naar waar echte interactie leeft. De klant leest content terwijl andere sites nog spinners tonen.",
        },
        {
          title: "Streaming en eerlijk cachen",
          body: "Het skelet van de pagina verschijnt direct; tragere data stroomt binnen via Suspense. Caches hebben expliciete invalidatie — data is vers wanneer het moet, gecachet wanneer het kan, en nooit per ongeluk verouderd.",
        },
        {
          title: "De zware assets, gedisciplineerd",
          body: "Afbeeldingen op containerformaat in moderne formaten, fonts zelf gehost en gesubset, nul layoutverschuiving tijdens het laden. In de saaie details schuilen de meeste seconden.",
        },
        {
          title: "Gemeten, niet gegokt",
          body: "Core Web Vitals worden bij elke betekenisvolle wijziging getoetst aan een budget — niet aan gevoel op een snelle laptop met glasvezel. Gaat er iets achteruit, dan gaat het niet live.",
        },
      ],
    },
    code: {
      caption:
        "Serverrendering plus streaming: content is direct zichtbaar, en het trage deel komt binnen zonder iets te blokkeren.",
    },
    bottomLine: {
      heading: "Waar het op neerkomt",
      body: "Snelheid rendeert samengesteld: betere retentie, betere conversie, betere vindbaarheid. Het is geen luxepakket — het is hoe ik alles bouw, inclusief de pagina die je nu leest.",
    },
  },
};
