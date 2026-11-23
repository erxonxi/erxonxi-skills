import { EmailSender } from "../domain/EmailSender.js";

export class InMemoryEmailSender extends EmailSender {
  constructor() {
    super();
    this.sent = [];
  }

  async send(to, subject, body) {
    this.sent.push({ to, subject, body });
  }
}
