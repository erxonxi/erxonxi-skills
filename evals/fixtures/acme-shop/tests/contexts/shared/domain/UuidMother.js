import { randomUUID } from "node:crypto";

export class UuidMother {
  static create() {
    return randomUUID();
  }
}
