import { buildContainer } from "./container.js";
import { createApiServer } from "./createApiServer.js";

const port = Number(process.env.PORT ?? 3000);
createApiServer(buildContainer()).listen(port, () => console.log(`acme-shop api listening on ${port}`));
