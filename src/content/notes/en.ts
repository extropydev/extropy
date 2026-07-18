import type { NoteDictionary } from "./types";

export const notesEn: NoteDictionary = {
  payments: {
    title: "Payments that can't lose money",
    tagline:
      "What happens between “Pay” and “Paid”, and why nothing gets lost in the middle.",
    worry:
      "What if a customer pays and the order never shows up? What if someone gets charged twice?",
    reality: {
      heading: "Why this actually happens",
      body: [
        "A payment isn't one moment. It's a conversation between the browser, your server and the bank, and any leg of it can drop. The customer closes the tab during the redirect. Their connection dies right after the charge succeeds. The bank asks for 3-D Secure and the flow forks.",
        "Most broken checkouts share one root cause: they treat the browser coming back from the payment page as proof of payment. It isn't. It's the least reliable signal in the whole chain, and building on it is how stores end up with paid but missing orders and support inboxes full of screenshots.",
      ],
    },
    approach: {
      heading: "How I build it instead",
      intro:
        "The system is designed so that the fragile parts are allowed to fail, and the money still adds up.",
      items: [
        {
          title: "The webhook is the source of truth",
          body: "An order is confirmed by Stripe's cryptographically signed webhook event, server to server, never by the browser redirect. The customer's tab can crash mid-checkout and the order still lands in the database.",
        },
        {
          title: "Idempotency everywhere",
          body: "Stripe retries webhooks, users double-click buttons, networks replay requests. Every mutation is keyed so that running it twice changes nothing: no double charges and no duplicate orders, by construction rather than by hope.",
        },
        {
          title: "Orders are a state machine",
          body: "Pending, paid, fulfilled, refunded. Every transition is explicit and recorded. When a customer asks where their money went, the answer is one query away, with timestamps.",
        },
        {
          title: "Failure gets designed too",
          body: "Declined cards, expired sessions, 3-D Secure challenges. Each has its own screen with a way forward. A failed payment should feel like a speed bump, not a wall.",
        },
      ],
    },
    code: {
      caption:
        "The heart of it: a signed webhook plus an idempotent write. Two decisions that make double-charging structurally impossible.",
    },
    bottomLine: {
      heading: "The bottom line",
      body: "You don't have to trust me to be careful. The system is built so carelessness has nowhere to happen. The unreliable parts are allowed to fail, and the money still reconciles.",
    },
  },

  auth: {
    title: "Auth without the leaks",
    tagline:
      "User accounts shouldn't feel like a liability. Defense in layers, each one assuming the previous failed.",
    worry:
      "If we store user accounts, we can be breached. What if someone gets into data that isn't theirs?",
    reality: {
      heading: "Why this actually happens",
      body: [
        "Real-world auth breaches rarely look like a hacker movie. They look like a forgotten check: an API endpoint that trusts whatever ID the client sends, a database query with no ownership filter, a session token sitting in localStorage where any injected script can read it.",
        "The pattern behind almost all of them is the same: security enforced in exactly one place. When that one place has a bug, and every codebase eventually does, there is nothing behind it.",
      ],
    },
    approach: {
      heading: "How I build it instead",
      intro:
        "Layers. Each layer assumes the one before it has already been breached.",
      items: [
        {
          title: "Sessions the platform manages",
          body: "Supabase Auth with httpOnly cookies: tokens never touch localStorage, refresh happens server-side, and XSS has nothing to steal. I don't hand-roll cryptography. I configure a system maintained by a security team.",
        },
        {
          title: "Row Level Security as the last wall",
          body: "Every table carries RLS policies enforced by PostgreSQL itself. Even if application code slips and queries the wrong thing, the database refuses to return another user's rows. A bug in my code cannot become a leak of your data.",
        },
        {
          title: "Guards at the edge",
          body: "Protected routes are checked in the proxy layer before any page code runs. The UI hiding a button is a courtesy. The server enforcing the rule is the actual security.",
        },
        {
          title: "Boring, proven flows",
          body: "Email links, OAuth providers, rate-limited endpoints. Standard flows users already trust, not clever custom ones. In auth, “creative” is a bug, not a feature.",
        },
      ],
    },
    code: {
      caption:
        "The last line of defense: policies that live in the database. This holds even if every line of my application code is wrong.",
    },
    bottomLine: {
      heading: "The bottom line",
      body: "One bug should never equal one breach. By the time an attacker gets past the edge, past the session layer, and into a query, the database itself still says no.",
    },
  },

  cart: {
    title: "A cart that survives everything",
    tagline:
      "Refresh, tab close, tomorrow, another device. The cart is still there, and the prices in it are still true.",
    worry:
      "A customer fills a cart, comes back tomorrow. Is it empty? And if prices changed overnight, what gets charged?",
    reality: {
      heading: "Why this actually happens",
      body: [
        "A cart looks trivial and is secretly distributed state: it lives on a device, then on several devices, while prices and stock shift underneath it. Most implementations pick one extreme. Purely local is fast but dies with the browser and never syncs. Purely server-side survives, but every click waits for a round trip and guests get nothing.",
        "The failure modes are familiar: the cart that empties itself, the guest cart that vanishes at login, and the worst one, a checkout that silently charges yesterday's price for an item that went out of stock an hour ago.",
      ],
    },
    approach: {
      heading: "How I build it instead",
      intro: "Local speed, server truth, in that order.",
      items: [
        {
          title: "Local-first, instant",
          body: "Add-to-cart writes to a persisted Zustand store: zero milliseconds, works offline, survives refresh and tab close. The interface never makes the customer wait for a server to acknowledge a click.",
        },
        {
          title: "Merged, not replaced",
          body: "At login, the guest cart merges with the account cart, quantities reconciled line by line. Nobody loses the three items they picked before deciding to sign in. React Query keeps every open device on the same state.",
        },
        {
          title: "Revalidated at the money moment",
          body: "The instant before payment, the server re-checks every line against live prices and stock. Changes are shown to the customer, like an item that got cheaper or one that sold out, and never silently charged.",
        },
      ],
    },
    code: {
      caption:
        "Two layers in one file: the persisted store that makes the UI instant, and the server call that makes the checkout honest.",
    },
    bottomLine: {
      heading: "The bottom line",
      body: "The cart is a promise to the customer. Keeping it means being fast where speed matters, at the click, and strict where truth matters: the charge.",
    },
  },

  responsive: {
    title: "One site, every screen",
    tagline:
      "Not “it also opens on a phone”. Designed from a 360-pixel screen up, so nothing is a shrunken afterthought.",
    worry:
      "It looks great in the presentation. Then a customer opens it on a three-year-old Android. Does it fall apart?",
    reality: {
      heading: "Why this actually happens",
      body: [
        "Most “responsive” sites are desktop sites that got squeezed: three breakpoints, some hidden columns, done. Then reality arrives. A 360-pixel viewport, a text zoom setting, a foldable, a browser toolbar eating the bottom of the screen. The layout was never designed for any of it.",
        "The deeper mistake is thinking in pages instead of components. A product card tuned for the desktop grid breaks in the mobile drawer, because it only ever knew about the whole screen and not about the space it actually sits in.",
      ],
    },
    approach: {
      heading: "How I build it instead",
      intro:
        "More than half of your visitors are on phones. That's the version I build first.",
      items: [
        {
          title: "Fluid by default",
          body: "Type and spacing interpolate smoothly with clamp() instead of jumping at breakpoints. There is no width at which the site looks wrong, because there is no width it wasn't designed for.",
        },
        {
          title: "Components respond to their container",
          body: "With container queries, a card adapts to the space it's given: sidebar, grid cell, or full width. Layouts stop being a matrix of special cases and become composition.",
        },
        {
          title: "Real devices, real hands",
          body: "Touch targets of at least 44 pixels, safe-area insets around notches and home bars, no hover-only affordances, reduced motion respected. Tested on actual hardware, not just a resized browser window.",
        },
      ],
    },
    code: {
      caption:
        "Fluid type plus a container query: the two techniques that replace a pile of breakpoint special cases.",
    },
    bottomLine: {
      heading: "The bottom line",
      body: "This very site is the demo. Open it on a phone, a tablet, a laptop. Resize it mid-scroll. That behaviour is what your project gets.",
    },
  },

  performance: {
    title: "Speed is a feature",
    tagline:
      "Every extra second of loading is customers quietly leaving. Speed isn't an optimization pass. It's the architecture.",
    worry:
      "Slow sites lose customers. What stops ours from becoming one of those five-second spinners?",
    reality: {
      heading: "Why this actually happens",
      body: [
        "Slow sites aren't slow because of one big mistake. They're slow by a thousand cuts. A client-side framework that ships the whole app before showing anything. Data fetching that waterfalls four requests deep. A hero image at full camera resolution. Each choice costs 200 milliseconds, and nobody notices until the total is four seconds.",
        "The uncomfortable truth: performance can't be bolted on at the end. Where rendering happens, when data loads, what JavaScript ships. Those are day-one architecture decisions, and retrofitting them costs more than the original build.",
      ],
    },
    approach: {
      heading: "How I build it instead",
      intro: "Fast by architecture, verified by measurement.",
      items: [
        {
          title: "Server-first rendering",
          body: "Pages arrive as finished HTML. React Server Components render on the server, and JavaScript ships only where real interactivity lives. The customer reads content while other sites are still showing spinners.",
        },
        {
          title: "Streaming and honest caching",
          body: "The shell of the page appears instantly and slower data streams in with Suspense. Caches have explicit invalidation: data is fresh when it must be, cached when it can be, and never stale by accident.",
        },
        {
          title: "The heavy assets, disciplined",
          body: "Images sized to their container in modern formats, fonts self-hosted and subset, zero layout shift while things load. The boring details are where most of the seconds hide.",
        },
        {
          title: "Measured, not guessed",
          body: "Core Web Vitals checked on every significant change, against a budget, not vibes on a fast laptop with fibre. If it regresses, it doesn't ship.",
        },
      ],
    },
    code: {
      caption:
        "Server rendering plus streaming: content is visible immediately, and the slow part arrives without blocking anything.",
    },
    bottomLine: {
      heading: "The bottom line",
      body: "Speed compounds: better retention, better conversion, better search ranking. It's not a luxury tier. It's how I build everything, including the page you're reading.",
    },
  },
};
