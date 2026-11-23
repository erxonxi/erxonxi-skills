/** Each route parses the input, calls one use case directly and shapes the response. */
export function buildRoutes(container) {
  return [
    route("PUT", "/products/:id", async ({ params, body }) => {
      await container.productCreator.create(params.id, body.name, body.priceCents, body.stock);
      return { status: 201 };
    }),
    route("GET", "/products/:id", async ({ params }) => ({ status: 200, body: await container.productFinder.find(params.id) })),
    route("GET", "/products", async ({ query }) => ({
      status: 200,
      body: await container.productsSearcher.search(query.get("q") ?? ""),
    })),
    route("PUT", "/products/:id/name", async ({ params, body }) => {
      await container.productRenamer.rename(params.id, body.name);
      return { status: 204 };
    }),
    route("PUT", "/products/:id/price", async ({ params, body }) => {
      await container.productPriceChanger.changePrice(params.id, body.priceCents);
      return { status: 204 };
    }),
    route("PUT", "/products/:id/stock", async ({ params, body }) => {
      await container.productStockChanger.changeStock(params.id, body.stock);
      return { status: 204 };
    }),
    route("PUT", "/carts/:id", async ({ params, body }) => {
      await container.cartOpener.open(params.id, body.shopperEmail);
      return { status: 201 };
    }),
    route("PUT", "/carts/:id/items/:itemId", async ({ params, body }) => {
      await container.cartItemAdder.add(params.id, params.itemId, body.quantity);
      return { status: 204 };
    }),
    route("DELETE", "/carts/:id/items/:itemId", async ({ params }) => {
      await container.cartItemRemover.remove(params.id, params.itemId);
      return { status: 204 };
    }),
    route("PUT", "/orders/:id", async ({ params, body }) => {
      await container.orderPlacer.place(params.id, body.cartId);
      return { status: 201 };
    }),
  ];
}

function route(method, path, handler) {
  const names = [...path.matchAll(/:(\w+)/g)].map((match) => match[1]);
  const pattern = new RegExp(`^${path.replace(/:\w+/g, "([^/]+)")}$`);
  return { method, pattern, names, handler };
}
