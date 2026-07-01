import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";
import { AffiliatePayoutsResource } from "./payouts.js";

type AffiliateForm = components["schemas"]["AffiliateForm"];
type AffiliateDto = components["schemas"]["AffiliateDto"];
type PublicOrder = components["schemas"]["PublicOrder"];

export class Affiliate {
  private baseUrl: string;
  constructor(
    private t: Transport,
    private storeId: string,
    private customerId: string,
  ) {
    this.baseUrl = `/stores/${this.storeId}/affiliates/${this.customerId}`;
  }
  enroll(form: AffiliateForm) {
    return this.t.request<AffiliateDto>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
  update(form: AffiliateForm) {
    return this.t.request<AffiliateDto>(this.baseUrl, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  delete() {
    return this.t.request<void>(this.baseUrl, { method: "DELETE" });
  }
  blacklist() {
    return this.t.request<void>(`${this.baseUrl}/blacklist`, { method: "POST" });
  }
  orders(page: number = 1, limit: number = 20) {
    return this.t.paginated<PublicOrder>(`${this.baseUrl}/orders/${page}?limit=${limit}`);
  }
  payouts(): AffiliatePayoutsResource {
    return new AffiliatePayoutsResource(this.t, this.baseUrl + "/payouts");
  }
}
