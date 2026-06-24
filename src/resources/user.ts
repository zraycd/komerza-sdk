import type { Requester } from "../client.js";
import type { components } from "../generated/schema.js";

type UserResponse = components["schemas"]["UserResponse"];

export class UserResource {
  constructor(private request: Requester) {}

  get() {
    return this.request<UserResponse>("/user");
  }
}
