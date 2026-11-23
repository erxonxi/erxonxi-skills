import { createServer } from "node:http";
import { buildRoutes } from "./routes.js";
import { ErrorStatusMapper } from "./ErrorStatusMapper.js";
import { InvalidRequestBodyError } from "./InvalidRequestBodyError.js";

export function createApiServer(container) {
  const routes = buildRoutes(container);
  const errors = new ErrorStatusMapper();

  return createServer(async (request, response) => {
    const url = new URL(request.url, "http://localhost");
    const matched = routes
      .filter((route) => route.method === request.method)
      .map((route) => ({ route, match: route.pattern.exec(url.pathname) }))
      .find(({ match }) => match !== null);

    if (matched === undefined) {
      return send(response, 404, { error: { type: "RouteNotFound", message: `No route for ${request.method} ${url.pathname}` } });
    }

    try {
      const params = Object.fromEntries(matched.route.names.map((name, index) => [name, matched.match[index + 1]]));
      const body = await readJson(request);
      const result = await matched.route.handler({ params, body, query: url.searchParams });
      send(response, result.status, result.body);
    } catch (error) {
      const mapped = errors.map(error);
      send(response, mapped.status, mapped.body);
    }
  });
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) chunks.push(chunk);
  const text = Buffer.concat(chunks).toString("utf8");
  if (text === "") return {};
  try {
    return JSON.parse(text);
  } catch {
    throw new InvalidRequestBodyError();
  }
}

function send(response, status, body) {
  if (body === undefined) {
    response.writeHead(status).end();
    return;
  }
  response.writeHead(status, { "content-type": "application/json" }).end(JSON.stringify(body));
}
