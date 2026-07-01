import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";

type PublicCustomerReference = components["schemas"]["PublicCustomerReference"];
type Customer = components["schemas"]["Customer"];
type PublicCustomer = components["schemas"]["PublicCustomer"];
type CreateCustomerForm = components["schemas"]["CreateCustomerForm"];
type UpdateBalanceForm = components["schemas"]["UpdateBalanceForm"];

type ListCustomersQuery = {
  email?: string;
  ipAddress?: string;
  balanceFrom?: number;
  balanceTo?: number;
  stripeCustomerId?: string;
  affiliateCode?: string;
  page?: number;
  pageSize?: number;
};

export class CustomersResource {
  private baseUrl: string;
  constructor(
    private t: Transport,
    private storeId: string,
  ) {
    this.baseUrl = `/stores/${this.storeId}/customers`;
  }
  list(query: ListCustomersQuery = {}) {
    const params = new URLSearchParams();
    if (query.email !== undefined) params.set("email", query.email);
    if (query.ipAddress !== undefined) params.set("ipAddress", query.ipAddress);
    if (query.balanceFrom !== undefined) params.set("balanceFrom", String(query.balanceFrom));
    if (query.balanceTo !== undefined) params.set("balanceTo", String(query.balanceTo));
    if (query.stripeCustomerId !== undefined)
      params.set("stripeCustomerId", query.stripeCustomerId);
    if (query.affiliateCode !== undefined) params.set("affiliateCode", query.affiliateCode);
    if (query.page !== undefined) params.set("Page", String(query.page));
    if (query.pageSize !== undefined) params.set("PageSize", String(query.pageSize));

    const qs = params.toString();
    return this.t.paginated<PublicCustomerReference>(qs ? `${this.baseUrl}?${qs}` : this.baseUrl);
  }
  filters() {
    return this.t.request<Record<string, number>>(`${this.baseUrl}/filters`);
  }
  search(query: string, page: number = 0) {
    return this.t.paginated<PublicCustomerReference>(
      `${this.baseUrl}/search/${encodeURIComponent(query)}?Page=${page}`,
    );
  }
  get(customerId: string) {
    return this.t.request<PublicCustomer>(`${this.baseUrl}/${customerId}`);
  }
  getByEmail(email: string) {
    return this.t.request<PublicCustomer>(`${this.baseUrl}/${encodeURIComponent(email)}/email`);
  }
  create(form: CreateCustomerForm) {
    return this.t.request<Customer>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
  updateBalance(customerId: string, form: UpdateBalanceForm) {
    return this.t.request<void>(`${this.baseUrl}/${customerId}/balance`, {
      method: "PATCH",
      body: JSON.stringify(form),
    });
  }
}
