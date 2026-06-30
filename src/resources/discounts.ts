import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";

type PublicVolumeDiscount = components["schemas"]["PublicVolumeDiscount"];
type VolumeDiscountForm = components["schemas"]["VolumeDiscountForm"];

export class DiscountsResource {
  private baseUrl: string;
  constructor(
    private t: Transport,
    private storeId: string,
    private productId: string,
    private variantId: string,
  ) {
    this.baseUrl = `/stores/${this.storeId}/products/${this.productId}/variants/${this.variantId}/discounts`;
  }
  list() {
    return this.t.request<PublicVolumeDiscount[]>(this.baseUrl);
  }
  create(form: VolumeDiscountForm) {
    return this.t.request<PublicVolumeDiscount>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
  setAll(forms: VolumeDiscountForm[]) {
    return this.t.request<PublicVolumeDiscount[]>(this.baseUrl, {
      method: "PUT",
      body: JSON.stringify(forms),
    });
  }
  update(discountId: string, form: VolumeDiscountForm) {
    return this.t.request<PublicVolumeDiscount>(`${this.baseUrl}/${discountId}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  delete(discountId: string) {
    return this.t.request<void>(`${this.baseUrl}/${discountId}`, { method: "DELETE" });
  }
}
