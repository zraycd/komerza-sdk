import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";

type Variant = components["schemas"]["Variant"];
type CreateVariantForm = components["schemas"]["CreateVariantForm"];
type OrderedItem = components["schemas"]["OrderedItem"];

export class VariantsResource {
  private baseUrl: string;
  constructor(
    private t: Transport,
    private storeId: string,
    private productId: string,
  ) {
    this.baseUrl = `/stores/${this.storeId}/products/${this.productId}/variants`;
  }

  get() {
    return this.t.request<Variant>(this.baseUrl);
  }
  create(form: CreateVariantForm) {
    return this.t.request<Variant>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
  reorder(items: OrderedItem[]) {
    return this.t.request<void>(this.baseUrl + `/order`, {
      method: "PATCH",
      body: JSON.stringify(items),
    });
  }
}
