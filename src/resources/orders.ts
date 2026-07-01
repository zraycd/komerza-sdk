import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";

type PageOrder = components["schemas"]["PageOrder"];
type OrderResponse = components["schemas"]["OrderResponse"];
type PublicOrder = components["schemas"]["PublicOrder"];
type CreateDashboardOrderForm = components["schemas"]["CreateDashboardOrderForm"];
type RefundOrderForm = components["schemas"]["RefundOrderForm"];
type Refund = components["schemas"]["Refund"];

type ListOrdersQuery = {
  dateFrom?: string;
  dateTo?: string;
  status?: string;
  gateway?: string;
  email?: string;
  discord?: string;
  page?: number;
  pageSize?: number;
};

export class OrdersResource {
  private baseUrl: string;
  constructor(
    private t: Transport,
    private storeId: string,
  ) {
    this.baseUrl = `/stores/${this.storeId}/orders`;
  }
  list(query: ListOrdersQuery = {}) {
    const params = new URLSearchParams();
    if (query.dateFrom !== undefined) params.set("dateFrom", query.dateFrom);
    if (query.dateTo !== undefined) params.set("dateTo", query.dateTo);
    if (query.status !== undefined) params.set("status", query.status);
    if (query.gateway !== undefined) params.set("gateway", query.gateway);
    if (query.email !== undefined) params.set("email", query.email);
    if (query.discord !== undefined) params.set("discord", query.discord);
    if (query.page !== undefined) params.set("Page", String(query.page));
    if (query.pageSize !== undefined) params.set("PageSize", String(query.pageSize));

    const qs = params.toString();
    return this.t.paginated<PageOrder>(qs ? `${this.baseUrl}?${qs}` : this.baseUrl);
  }
  filters() {
    return this.t.request<Record<string, number>>(`${this.baseUrl}/filters`);
  }
  search(query: string, page: number = 0) {
    return this.t.paginated<PageOrder>(
      `${this.baseUrl}/search/${encodeURIComponent(query)}?Page=${page}`,
    );
  }
  get(orderId: string) {
    return this.t.request<OrderResponse>(`${this.baseUrl}/${orderId}`);
  }
  create(form: CreateDashboardOrderForm) {
    return this.t.request<PublicOrder>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
  deliver(orderId: string) {
    return this.t.request<void>(`${this.baseUrl}/${orderId}/deliver`, { method: "PUT" });
  }
  redeliver(orderId: string) {
    return this.t.request<void>(`${this.baseUrl}/${orderId}/redeliver`, { method: "PUT" });
  }
  refund(orderId: string, form: RefundOrderForm) {
    return this.t.request<Refund>(`${this.baseUrl}/${orderId}/refund`, {
      method: "DELETE",
      body: JSON.stringify(form),
    });
  }
}
