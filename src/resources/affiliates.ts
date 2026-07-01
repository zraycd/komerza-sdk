import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";
import { Affiliate } from "./affiliate.js";

type DisplayAffiliate = components["schemas"]["DisplayAffiliate"];
type AffiliateDashboardStats = components["schemas"]["AffiliateDashboardStats"];
type AffiliateOptionsDto = components["schemas"]["AffiliateOptionsDto"];
type InviteAffiliateForm = components["schemas"]["InviteAffiliateForm"];
type AffiliateDto = components["schemas"]["AffiliateDto"];

type ListAffiliatesQuery = {
  query?: string;
  isEnabled?: boolean;
  email?: string;
  link?: string;
  balanceFrom?: number;
  balanceTo?: number;
  returnPercentageFrom?: number;
  returnPercentageTo?: number;
  percentageOffFrom?: number;
  percentageOffTo?: number;
  referredOrdersFrom?: number;
  referredOrdersTo?: number;
  allTimeEarnedFrom?: number;
  allTimeEarnedTo?: number;
  payoutCountFrom?: number;
  payoutCountTo?: number;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  pageSize?: number;
};

export class AffiliatesResource {
  private baseUrl: string;
  constructor(
    private t: Transport,
    private storeId: string,
  ) {
    this.baseUrl = `/stores/${this.storeId}/affiliates`;
  }
  list(query: ListAffiliatesQuery = {}) {
    const params = new URLSearchParams();
    if (query.query !== undefined) params.set("query", query.query);
    if (query.isEnabled !== undefined) params.set("isEnabled", String(query.isEnabled));
    if (query.email !== undefined) params.set("email", query.email);
    if (query.link !== undefined) params.set("link", query.link);
    if (query.balanceFrom !== undefined) params.set("balanceFrom", String(query.balanceFrom));
    if (query.balanceTo !== undefined) params.set("balanceTo", String(query.balanceTo));
    if (query.returnPercentageFrom !== undefined)
      params.set("returnPercentageFrom", String(query.returnPercentageFrom));
    if (query.returnPercentageTo !== undefined)
      params.set("returnPercentageTo", String(query.returnPercentageTo));
    if (query.percentageOffFrom !== undefined)
      params.set("percentageOffFrom", String(query.percentageOffFrom));
    if (query.percentageOffTo !== undefined)
      params.set("percentageOffTo", String(query.percentageOffTo));
    if (query.referredOrdersFrom !== undefined)
      params.set("referredOrdersFrom", String(query.referredOrdersFrom));
    if (query.referredOrdersTo !== undefined)
      params.set("referredOrdersTo", String(query.referredOrdersTo));
    if (query.allTimeEarnedFrom !== undefined)
      params.set("allTimeEarnedFrom", String(query.allTimeEarnedFrom));
    if (query.allTimeEarnedTo !== undefined)
      params.set("allTimeEarnedTo", String(query.allTimeEarnedTo));
    if (query.payoutCountFrom !== undefined)
      params.set("payoutCountFrom", String(query.payoutCountFrom));
    if (query.payoutCountTo !== undefined) params.set("payoutCountTo", String(query.payoutCountTo));
    if (query.dateFrom !== undefined) params.set("dateFrom", query.dateFrom);
    if (query.dateTo !== undefined) params.set("dateTo", query.dateTo);
    if (query.page !== undefined) params.set("Page", String(query.page));
    if (query.pageSize !== undefined) params.set("PageSize", String(query.pageSize));

    const qs = params.toString();
    return this.t.paginated<DisplayAffiliate>(qs ? `${this.baseUrl}?${qs}` : this.baseUrl);
  }
  search(query: string, page: number = 0) {
    const params = new URLSearchParams();
    params.set("query", query);
    params.set("Page", String(page));
    return this.t.paginated<DisplayAffiliate>(`${this.baseUrl}/search?${params}`);
  }
  stats() {
    return this.t.request<AffiliateDashboardStats>(`${this.baseUrl}/stats`);
  }
  configure(form: AffiliateOptionsDto) {
    return this.t.request<void>(`${this.baseUrl}/configure`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  invite(form: InviteAffiliateForm) {
    return this.t.request<AffiliateDto>(`${this.baseUrl}/invite`, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }

  affiliate(customerId: string): Affiliate {
    return new Affiliate(this.t, this.storeId, customerId);
  }
}
