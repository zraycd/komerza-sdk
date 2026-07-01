import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";

type AffiliatePayout = components["schemas"]["AffiliatePayout"];
type CreateAffiliatePayoutForm = components["schemas"]["CreateAffiliatePayoutForm"];
type VoidAffiliatePayoutForm = components["schemas"]["VoidAffiliatePayoutForm"];

export class AffiliatePayoutsResource {
  constructor(
    private t: Transport,
    private baseUrl: string,
  ) {}
  list(page: number = 1, limit: number = 20) {
    return this.t.paginated<AffiliatePayout>(`${this.baseUrl}/${page}?limit=${limit}`);
  }
  create(form: CreateAffiliatePayoutForm) {
    return this.t.request<AffiliatePayout>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
  voidPayout(payoutId: string, form: VoidAffiliatePayoutForm) {
    return this.t.request<AffiliatePayout>(`${this.baseUrl}/${payoutId}`, {
      method: "PATCH",
      body: JSON.stringify(form),
    });
  }
}
