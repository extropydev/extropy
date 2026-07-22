import type {WorkDictionary} from "./types";

export const workEn: WorkDictionary = {
    clothes: {
        type: "E-commerce",
        tagline:
            "A complete online store: catalog, cart, checkout, accounts and a full returns flow.",
        overview: [
            "A prototype of a large fashion outlet built to production standards. Women's and men's departments, brand pages, seasonal collections, promo campaigns and hundreds of products.",
            "This is my most complete fullstack project. Everything you expect from a real store works here: you can browse and filter, sign in, fill a cart, check out and even request a return from your account.",
        ],
        built: [
            {
                title: "Catalog with real filtering",
                body: "Categories, brands, sizes, colours, patterns, price and discounts. Filters combine and live in the URL, so any filtered view can be shared with a link.",
            },
            {
                title: "Cart and checkout",
                body: "The cart survives refreshes and merges into the account after login. Before payment the server rechecks prices and stock, so the customer is never charged for stale data.",
            },
            {
                title: "Accounts and OAuth",
                body: "Sign in with Google, Facebook or email. Sessions live in httpOnly cookies and the database enforces row-level security on every table.",
            },
            {
                title: "Returns flow",
                body: "Customers create a return, pick the items and follow the status in their account, from requested all the way to refunded.",
            },
            {
                title: "Wishlist and promos",
                body: "Favourites, promo banners and discount codes. The everyday commerce features that quietly do the selling.",
            },
        ],
        craft: [
            {
                title: "Fast on mid-range phones",
                body: "Server components and strict image optimization keep the catalog quick on real devices, not just on a developer laptop.",
            },
            {
                title: "State that behaves",
                body: "Zustand handles the cart, React Query handles server data. Two small tools, each doing one job well.",
            },
        ],
        captions: {
            "clothes-catalog": "Category page with combinable filters",
            "clothes-auth": "Sign in with email or OAuth in one screen",
        },
        note: "Product photos in this prototype are stock placeholders. The engineering underneath is the real thing.",
    },

    cosmetology: {
        type: "Booking platform",
        tagline:
            "A booking platform for a beauty studio: seven steps from account to confirmed appointment.",
        overview: [
            "A complete website for a permanent makeup studio: services with prices, before and after comparisons, an FAQ and a full online booking flow.",
            "The booking wizard is the heart of it. A client signs up, verifies the account, picks a service, answers a short survey, gets a recommendation, chooses a date and confirms. Seven steps that feel effortless.",
        ],
        built: [
            {
                title: "Seven-step booking wizard",
                body: "Every step validates before the next one unlocks, progress is always visible, and nothing gets lost when the client goes back to change an answer.",
            },
            {
                title: "Accounts with verification",
                body: "Booking is open to registered clients only, which protects the studio's calendar from spam appointments.",
            },
            {
                title: "Survey and recommendation",
                body: "The wizard asks a few questions and suggests the right procedure before the client commits to a date.",
            },
            {
                title: "Before and after gallery",
                body: "Interactive comparison sliders let visitors judge results for each procedure with their own eyes.",
            },
            {
                title: "Two languages",
                body: "The whole site, including the booking wizard, works in English and Russian with a single switch.",
            },
        ],
        craft: [
            {
                title: "A calm visual language",
                body: "Soft cream and clay tones, generous spacing, rounded forms. The site looks the way the studio feels.",
            },
            {
                title: "Forms without frustration",
                body: "Input masks, inline validation and clear error states. The whole flow is comfortable with one thumb on a phone.",
            },
        ],
        captions: {
            "cosmetology-booking": "Step one of the booking wizard",
            "cosmetology-results": "Before and after sliders in the results section",
        },
    },

    sushi: {
        type: "Restaurant & delivery",
        tagline:
            "A luxury sushi delivery experience: menu, box builder and cart in two languages.",
        overview: [
            "A premium sushi delivery prototype for Paris. Dark interface, gold details and serif display type carry the language of a high-end restaurant into online ordering.",
            "Behind the looks it is a working shop front. The menu filters by category, dishes go to a cart, a build-your-own-box flow composes custom platters, and every word exists in French and English.",
        ],
        built: [
            {
                title: "Menu with categories",
                body: "Signatures, nigiri, makis, platters, desserts. Filtering is instant and the cart keeps a running total towards the delivery minimum.",
            },
            {
                title: "Box builder",
                body: "A guided flow for composing a custom platter piece by piece instead of picking from fixed sets.",
            },
            {
                title: "French and English",
                body: "A full bilingual interface behind a single toggle, right down to the dish descriptions.",
            },
            {
                title: "An entrance, not a loading screen",
                body: "A branded preloader and a staged reveal set the tone before the first scroll.",
            },
        ],
        craft: [
            {
                title: "Typography does the luxury",
                body: "A serif display face with an italic accent carries the brand. Gold appears only where it matters.",
            },
            {
                title: "Dark theme discipline",
                body: "Deep darks with warm accents, tuned so the food photography stays appetizing on any screen.",
            },
        ],
        captions: {
            "sushi-menu": "The menu with category filters and cart",
            "sushi-story": "Story section in English, one toggle away from French",
        },
    },

    saas: {
        type: "Marketing site",
        tagline:
            "A crisp product landing: dashboard hero, stats, brand logos and a global reach section.",
        overview: [
            "A marketing page for an analytics product, built pixel-perfect in a modern SaaS design language: floating dashboard cards, a stats row, brand logos and a dotted world map.",
            "Pages like this are about polish and speed. The layout survives any screen width, the page stays lightweight, and the first impression lands instantly.",
        ],
        built: [
            {
                title: "Composed hero",
                body: "Layered dashboard cards that read like a product screenshot while staying sharp on every resolution.",
            },
            {
                title: "Trust signals",
                body: "Stats, ratings and a brand logo row placed exactly where visitors look first.",
            },
            {
                title: "Global scale section",
                body: "A dotted world map with highlighted markets that supports the growth story.",
            },
            {
                title: "Lead capture",
                body: "An email form wired for a mailing list, with a clear promise that there will be no spam.",
            },
        ],
        craft: [
            {
                title: "Pixel discipline",
                body: "Spacing, alignment and type scale follow one grid. That consistency is what makes a page feel expensive.",
            },
        ],
        captions: {
            "saas-map": "Global scale section with a dotted world map",
        },
    },
    houseDecor: {
        type: "E-commerce store",
        tagline:
            "A full-fledged online store: catalog, cart, checkout, user accounts, and returns.",
        overview: [
            "A fully functional web store prototype for home decor"
        ],
        built: [
            {
                title: "Catalog with real filters",
                body: "Categories, sizes, colors, patterns, prices, and discounts. Filters can be combined and are stored in the URL, making it easy to share any filtered view via a direct link.",
            },
            {
                title: "Cart & checkout",
                body: "The cart persists across page refreshes and syncs with the user's account upon logging in. Before payment, the server re-checks prices and stock levels so customers never pay based on outdated data.",
            },
            {
                title: "User accounts & OAuth",
                body: "Log in via Google, Facebook, or email. Sessions are stored in httpOnly cookies, and the database enforces row-level security across every table.",
            },
            {
                title: "Favorites & promo",
                body: "Wishlists, promo banners, and discount codes. Everyday mechanics that subtly drive sales.",
            },
        ],
        craft: [
            {
                title: "Fast on mid-range phones",
                body: "Server components and strict image optimization keep the catalog fast on real-world devices, not just on a developer's laptop.",
            },
            {
                title: "State that behaves predictably",
                body: "Zustand handles the shopping cart, React Query handles server data. Two lightweight tools, each doing its job well.",
            },
        ],
        captions: {
            "clothes-catalog": "Category page with combinable filters",
            "clothes-auth": "Login via email or OAuth on a single screen",
        },
        note: "Product photos in the prototype are stock images. The engineering behind them is real.",
    },
};
