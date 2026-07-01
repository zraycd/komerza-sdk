import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";

type TicketStatus = components["schemas"]["TicketStatus"];
type PublicTicket = components["schemas"]["PublicTicket"];
type DisplayTicket = components["schemas"]["DisplayTicket"];
type TicketForm = components["schemas"]["TicketForm"];

type ListTicketsQuery = {
  subject?: string;
  status?: TicketStatus;
  customerEmail?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  pageSize?: number;
};

export class TicketsResource {
  private baseUrl: string;
  constructor(
    private t: Transport,
    private storeId: string,
  ) {
    this.baseUrl = `/stores/${this.storeId}/tickets`;
  }
  list(query: ListTicketsQuery = {}) {
    const params = new URLSearchParams();
    if (query.subject !== undefined) params.set("subject", query.subject);
    if (query.status !== undefined) params.set("status", String(query.status));
    if (query.customerEmail !== undefined) params.set("customerEmail", query.customerEmail);
    if (query.dateFrom !== undefined) params.set("dateFrom", query.dateFrom);
    if (query.dateTo !== undefined) params.set("dateTo", query.dateTo);
    if (query.page !== undefined) params.set("Page", String(query.page));
    if (query.pageSize !== undefined) params.set("PageSize", String(query.pageSize));

    const qs = params.toString();
    return this.t.paginated<DisplayTicket>(qs ? `${this.baseUrl}?${qs}` : this.baseUrl);
  }
  filters() {
    return this.t.request<Record<string, number>>(`${this.baseUrl}/filters`);
  }
  get(ticketId: string) {
    return this.t.request<PublicTicket>(`${this.baseUrl}/${ticketId}`);
  }
  update(ticketId: string, form: TicketForm) {
    return this.t.request<PublicTicket>(`${this.baseUrl}/${ticketId}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  delete(ticketId: string) {
    return this.t.request<void>(`${this.baseUrl}/${ticketId}`, { method: "DELETE" });
  }
}
