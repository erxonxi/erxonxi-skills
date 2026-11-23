import { DomainError } from "../../contexts/shared/domain/DomainError.js";

export class InvalidRequestBodyError extends DomainError {
  constructor() {
    super("The request body is not valid JSON");
  }
}
