import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";

type Coupon = components["schemas"]["Coupon"];
type CouponDto = components["schemas"]["CouponDto"];
type PublicCouponReference = components["schemas"]["PublicCouponReference"];

type ListCouponsQuery = {
  usesFrom?: number;
  usesTo?: number;
  maximumUsesFrom?: number;
  maximumUsesTo?: number;
  percentageFrom?: number;
  percentageTo?: number;
  amountFrom?: number;
  amountTo?: number;
  isEnabled?: boolean;
  page?: number;
  pageSize?: number;
};

export class CouponsResource {
  private baseUrl: string;
  constructor(
    private t: Transport,
    private storeId: string,
  ) {
    this.baseUrl = `/stores/${this.storeId}/coupons`;
  }

  list(query: ListCouponsQuery = {}) {
    const params = new URLSearchParams();
    if (query.usesFrom !== undefined) params.set("UsesFrom", String(query.usesFrom));
    if (query.usesTo !== undefined) params.set("UsesTo", String(query.usesTo));
    if (query.maximumUsesFrom !== undefined)
      params.set("MaximumUsesFrom", String(query.maximumUsesFrom));
    if (query.maximumUsesTo !== undefined) params.set("MaximumUsesTo", String(query.maximumUsesTo));
    if (query.percentageFrom !== undefined)
      params.set("PercentageFrom", String(query.percentageFrom));
    if (query.percentageTo !== undefined) params.set("PercentageTo", String(query.percentageTo));
    if (query.amountFrom !== undefined) params.set("AmountFrom", String(query.amountFrom));
    if (query.amountTo !== undefined) params.set("AmountTo", String(query.amountTo));
    if (query.isEnabled !== undefined) params.set("IsEnabled", String(query.isEnabled));
    if (query.page !== undefined) params.set("Page", String(query.page));
    if (query.pageSize !== undefined) params.set("PageSize", String(query.pageSize));

    const qs = params.toString();
    return this.t.paginated<Coupon>(qs ? `${this.baseUrl}?${qs}` : this.baseUrl);
  }
  all() {
    return this.t.request<PublicCouponReference[]>(`${this.baseUrl}/all`);
  }
  search(query: string, page: number = 0) {
    return this.t.paginated<Coupon>(
      `${this.baseUrl}/search/${encodeURIComponent(query)}?Page=${page}`,
    );
  }
  get(couponId: string) {
    return this.t.request<Coupon>(`${this.baseUrl}/${couponId}`);
  }
  create(form: CouponDto) {
    return this.t.request<Coupon>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
  update(couponId: string, form: CouponDto) {
    return this.t.request<Coupon>(`${this.baseUrl}/${couponId}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  delete(couponId: string) {
    return this.t.request<void>(`${this.baseUrl}/${couponId}`, { method: "DELETE" });
  }
}
