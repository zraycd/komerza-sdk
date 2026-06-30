import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";

type CustomFieldForm = components["schemas"]["CustomFieldForm"];
type CustomField = components["schemas"]["CustomField"];

export class FieldsResource {
  private baseUrl: string;
  constructor(
    private t: Transport,
    private storeId: string,
    private productId: string,
    private variantId: string,
  ) {
    this.baseUrl = `/stores/${this.storeId}/products/${this.productId}/variants/${this.variantId}/fields`;
  }
  create(form: CustomFieldForm) {
    return this.t.request<CustomField>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
}
