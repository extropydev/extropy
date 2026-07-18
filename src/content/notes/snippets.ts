import type { NoteSlug } from "./types";

/**
 * Code samples are intentionally short: each one shows the single decision
 * that makes the whole approach safe. Comments are in English in every locale
 * because that is how real code is written.
 */
export const noteSnippets: Record<NoteSlug, string> = {
  payments: `export async function POST(req: Request) {
  // Reject anything Stripe didn't sign.
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature")!,
    env.STRIPE_WEBHOOK_SECRET,
  );

  if (event.type === "checkout.session.completed") {
    await db
      .insert(orders)
      .values(orderFromSession(event.data.object))
      .onConflictDoNothing(); // replayed event ≠ duplicate order
  }

  return Response.json({ received: true });
}`,

  auth: `-- Even if application code slips,
-- the database refuses to answer.
alter table orders enable row level security;

create policy "customers read only their own orders"
  on orders for select
  using (auth.uid() = user_id);

create policy "orders are written by the server only"
  on orders for insert
  with check (auth.role() = 'service_role');`,

  cart: `export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((state) => ({
          items: mergeLine(state.items, item), // instant, 0 ms
        })),
    }),
    { name: "cart" }, // survives refresh, tab close, tomorrow
  ),
);

// At checkout, the server has the last word:
const verified = await revalidateCart(items); // fresh prices, real stock`,

  responsive: `:root {
  /* Type flows between 17px and 21px, no breakpoint jumps */
  --text-body: clamp(1.0625rem, 0.95rem + 0.5vw, 1.3125rem);
}

.product-card {
  container-type: inline-size;
}

/* The card adapts to the space it gets:
   sidebar, grid cell, or full width */
@container (min-width: 28rem) {
  .product-card__layout {
    grid-template-columns: 2fr 3fr;
  }
}`,

  performance: `// This page is finished HTML before any JavaScript wakes up.
export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug); // cached, invalidated on change

  return (
    <article>
      <ProductHero product={product} />
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews productId={product.id} /> {/* streams in when ready */}
      </Suspense>
    </article>
  );
}`,
};
