import { randomUUID } from "node:crypto";

export class RandomIdGenerator {
  next() {
    return randomUUID();
  }
}
