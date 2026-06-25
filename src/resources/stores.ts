import type { Requester } from "../client.js";
import type { components } from "../generated/schema.js";

type UserResponse = components["schemas"]["UserResponse"];
type StoreForm = components["schemas"]["StoreForm"];
type PublicStoreReference = components["schemas"]["PublicStoreReference"];

export class StoresResource {
  constructor(private req: Requester) {}

  async list() {
    const data = await this.req<UserResponse>(`/user`);
    const stores = data.stores;
    return stores;
  }
  create(form: StoreForm) {
    return this.req<PublicStoreReference>(`/stores`, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
}
