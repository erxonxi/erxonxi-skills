import { Clock } from "../domain/Clock.js";

export class SystemClock extends Clock {
  now() {
    return new Date();
  }
}
