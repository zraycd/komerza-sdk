import type { Transport } from "../client.js";
import type { components } from "../generated/schema.js";

type UserResponse = components["schemas"]["UserResponse"];

export class UserResource {
  constructor(private t: Transport) {}

  get() {
    return this.t.request<UserResponse>("/user");
  }
}
