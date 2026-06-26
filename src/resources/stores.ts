import type { Transport } from "../client.js";
import type { components } from "../generated/schema.js";

type UserResponse = components["schemas"]["UserResponse"];
type StoreForm = components["schemas"]["StoreForm"];
type PublicStoreReference = components["schemas"]["PublicStoreReference"];

export class StoresResource {
  constructor(private t: Transport) {}

  async list() {
    const data = await this.t.request<UserResponse>(`/user`);
    const stores = data.stores;
    return stores;
  }
  create(form: StoreForm) {
    return this.t.request<PublicStoreReference>(`/stores`, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
}
