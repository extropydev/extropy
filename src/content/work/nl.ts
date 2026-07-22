import type {WorkDictionary} from "./types";

export const workNl: WorkDictionary = {
    clothes: {
        type: "E-commerce",
        tagline:
            "Een complete webshop: catalogus, winkelwagen, checkout, accounts en een volledig retourproces.",
        overview: [
            "Een prototype van een grote fashion outlet, gebouwd volgens productiestandaarden. Dames- en herenafdelingen, merkpagina's, seizoenscollecties, promocampagnes en honderden producten.",
            "Dit is mijn meest complete fullstack-project. Alles wat je van een echte winkel verwacht werkt hier: bladeren en filteren, inloggen, een wagen vullen, afrekenen en zelfs een retour aanvragen vanuit je account.",
        ],
        built: [
            {
                title: "Catalogus met echte filters",
                body: "Categorieën, merken, maten, kleuren, patronen, prijs en kortingen. Filters combineren en leven in de URL, dus elke gefilterde weergave is deelbaar met een link.",
            },
            {
                title: "Winkelwagen en checkout",
                body: "De wagen overleeft verversen en versmelt met het account na het inloggen. Vlak voor de betaling controleert de server prijzen en voorraad opnieuw, zodat de klant nooit op verouderde data afrekent.",
            },
            {
                title: "Accounts en OAuth",
                body: "Inloggen met Google, Facebook of e-mail. Sessies leven in httpOnly-cookies en de database dwingt row-level security af op elke tabel.",
            },
            {
                title: "Retourproces",
                body: "Klanten maken een retour aan, kiezen de artikelen en volgen de status in hun account, van aangevraagd tot terugbetaald.",
            },
            {
                title: "Verlanglijst en promo's",
                body: "Favorieten, promobanners en kortingscodes. De alledaagse commerce-functies die stilletjes het verkopen doen.",
            },
        ],
        craft: [
            {
                title: "Snel op gewone telefoons",
                body: "Servercomponenten en strikte beeldoptimalisatie houden de catalogus vlot op echte apparaten, niet alleen op een ontwikkelaarslaptop.",
            },
            {
                title: "State die zich gedraagt",
                body: "Zustand beheert de wagen, React Query de serverdata. Twee kleine tools die elk hun eigen taak goed doen.",
            },
        ],
        captions: {
            "clothes-catalog": "Categoriepagina met combineerbare filters",
            "clothes-auth": "Inloggen met e-mail of OAuth op één scherm",
        },
        note: "De productfoto's in dit prototype zijn stockbeelden. De techniek eronder is echt.",
    },

    cosmetology: {
        type: "Boekingsplatform",
        tagline:
            "Een boekingsplatform voor een beautystudio: zeven stappen van account tot bevestigde afspraak.",
        overview: [
            "Een complete website voor een studio voor permanente make-up: diensten met prijzen, voor-en-na-vergelijkingen, een FAQ en een volledig online boekingsproces.",
            "De boekingswizard is het hart. Een klant registreert zich, bevestigt het account, kiest een dienst, beantwoordt een korte vragenlijst, krijgt een aanbeveling, kiest een datum en bevestigt. Zeven stappen die moeiteloos voelen.",
        ],
        built: [
            {
                title: "Boekingswizard in zeven stappen",
                body: "Elke stap valideert voordat de volgende opent, de voortgang is altijd zichtbaar en er gaat niets verloren als de klant teruggaat om een antwoord te wijzigen.",
            },
            {
                title: "Accounts met verificatie",
                body: "Boeken kan alleen als geregistreerde klant. Dat beschermt de agenda van de studio tegen spamafspraken.",
            },
            {
                title: "Vragenlijst en aanbeveling",
                body: "De wizard stelt een paar vragen en stelt de juiste behandeling voor, nog voordat de klant een datum kiest.",
            },
            {
                title: "Voor-en-na-galerij",
                body: "Interactieve vergelijkingssliders laten bezoekers het resultaat van elke behandeling met eigen ogen beoordelen.",
            },
            {
                title: "Twee talen",
                body: "De hele site, inclusief de boekingswizard, werkt in het Engels en Russisch met één schakelaar.",
            },
        ],
        craft: [
            {
                title: "Een rustige beeldtaal",
                body: "Zachte crème- en kleitinten, veel ruimte, ronde vormen. De site oogt zoals de studio aanvoelt.",
            },
            {
                title: "Formulieren zonder frustratie",
                body: "Invoermaskers, directe validatie en duidelijke foutmeldingen. Het hele proces werkt comfortabel met één duim op een telefoon.",
            },
        ],
        captions: {
            "cosmetology-booking": "Stap één van de boekingswizard",
            "cosmetology-results": "Voor-en-na-sliders in de resultatensectie",
        },
    },

    sushi: {
        type: "Restaurant & bezorging",
        tagline:
            "Een luxe sushibezorging: menu, boxbuilder en winkelwagen in twee talen.",
        overview: [
            "Een premium prototype voor sushibezorging in Parijs. Donker interface, gouden details en serif-typografie brengen de taal van een topzaak naar het online bestellen.",
            "Achter de looks zit een werkende winkel. Het menu filtert per categorie, gerechten gaan in een wagen, een boxbuilder stelt eigen platters samen en elk woord bestaat in het Frans en Engels.",
        ],
        built: [
            {
                title: "Menu met categorieën",
                body: "Signatures, nigiri, maki's, platters, desserts. Filteren is direct en de wagen telt mee richting het bezorgminimum.",
            },
            {
                title: "Boxbuilder",
                body: "Een begeleide flow om stuk voor stuk een eigen platter samen te stellen in plaats van te kiezen uit vaste sets.",
            },
            {
                title: "Frans en Engels",
                body: "Een volledig tweetalig interface achter één schakelaar, tot aan de gerechtbeschrijvingen toe.",
            },
            {
                title: "Een entree, geen laadscherm",
                body: "Een preloader in huisstijl en een gefaseerde onthulling zetten de toon nog voor de eerste scroll.",
            },
        ],
        craft: [
            {
                title: "Typografie doet de luxe",
                body: "Een serif-displayletter met een cursief accent draagt het merk. Goud verschijnt alleen waar het telt.",
            },
            {
                title: "Discipline in het donker",
                body: "Diepe donkere tinten met warme accenten, zo afgesteld dat het eten op foto's smakelijk blijft op elk scherm.",
            },
        ],
        captions: {
            "sushi-menu": "Het menu met categoriefilters en winkelwagen",
            "sushi-story": "Verhaalsectie in het Engels, het Frans is één klik verder",
        },
    },

    saas: {
        type: "Marketingsite",
        tagline:
            "Een strakke productlanding: dashboard-hero, statistieken, merklogo's en een wereldkaart.",
        overview: [
            "Een marketingpagina voor een analyticsproduct, pixelperfect gebouwd in een moderne SaaS-stijl: zwevende dashboardkaarten, een statistiekenrij, merklogo's en een gestippelde wereldkaart.",
            "Bij zulke pagina's draait alles om afwerking en snelheid. De lay-out overleeft elke schermbreedte, de pagina blijft licht en de eerste indruk landt direct.",
        ],
        built: [
            {
                title: "Samengestelde hero",
                body: "Gelaagde dashboardkaarten die lezen als een productscreenshot en scherp blijven op elke resolutie.",
            },
            {
                title: "Vertrouwenssignalen",
                body: "Statistieken, beoordelingen en een rij merklogo's precies waar bezoekers als eerste kijken.",
            },
            {
                title: "Wereldwijde schaal",
                body: "Een gestippelde wereldkaart met uitgelichte markten die het groeiverhaal ondersteunt.",
            },
            {
                title: "Leadformulier",
                body: "Een e-mailformulier gekoppeld aan een mailinglijst, met de duidelijke belofte dat er geen spam komt.",
            },
        ],
        craft: [
            {
                title: "Pixeldiscipline",
                body: "Witruimte, uitlijning en typografische schaal volgen één raster. Die consistentie maakt een pagina duur om te zien.",
            },
        ],
        captions: {
            "saas-map": "Sectie wereldwijde schaal met gestippelde wereldkaart",
        },
    },

    houseDecor: {
        type: "Webshop",
        tagline:
            "Een volwaardige webwinkel: catalogus, winkelwagen, afrekenen, accounts en retourzendingen.",
        overview: [
            "Een volledig werkend prototype van een webshop voor woondecoratie"
        ],
        built: [
            {
                title: "Catalogus met echte filters",
                body: "Categorieën, maten, kleuren, patronen, prijzen en kortingen. Filters kunnen worden gecombineerd en worden opgeslagen in de URL, zodat je elke gefilterde weergave eenvoudig kunt delen via een link.",
            },
            {
                title: "Winkelwagen & afrekenen",
                body: "De winkelwagen blijft behouden na het vernieuwen van de pagina en synchroniseert met het account na het inloggen. Vóór de betaling controleert de server de prijzen en voorraad opnieuw, zodat de klant nooit betaalt op basis van verouderde gegevens.",
            },
            {
                title: "Accounts & OAuth",
                body: "Inloggen via Google, Facebook of e-mail. Sessies worden opgeslagen in httpOnly-cookies en de database past row-level security toe op elke tabel.",
            },
            {
                title: "Favorieten & promo's",
                body: "Verlanglijstjes, banneradvertenties en kortingscodes. Alledaagse functies die ongemerkt de verkoop stimuleren.",
            },
        ],
        craft: [
            {
                title: "Snel op gemiddelde telefoons",
                body: "Server components en strikte afbeeldingoptimalisatie houden de catalogus snel op echte apparaten, niet alleen op de laptop van de ontwikkelaar.",
            },
            {
                title: "State die zich netjes gedraagt",
                body: "Zustand beheert de winkelwagen, React Query de servergegevens. Twee compacte tools die elk hun werk goed doen.",
            },
        ],
        captions: {
            "decor-about": "Sectie over de winkel",
            "decor-catalog": "Volledig werkende catalogus met filteropties",
            "decor-product-page": "Handige productpagina waar je alle informatie over een specifiek product kunt bekijken",
        },

        note: "Productfoto's in het prototype zijn afkomstig uit stock-bibliotheken. De techniek erachter is echt.",
    },
};
