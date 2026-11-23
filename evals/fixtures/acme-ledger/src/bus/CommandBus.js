import { fail } from "../shared/result.js";

export class CommandBus {
  #handlers = new Map();

  register(name, handler) {
    this.#handlers.set(name, handler);
  }

  async dispatch(name, payload) {
    const handler = this.#handlers.get(name);
    if (!handler) return fail("UNKNOWN_COMMAND");
    return handler.execute(payload);
  }
}
