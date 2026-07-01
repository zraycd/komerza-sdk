import { Transport } from "../client.js";
import { components } from "../generated/schema.js";

type WebhookExecutionLog = components["schemas"]["WebhookExecutionLog"];

type ListWebhookLogsQuery = {
  responseCode?: number;
  success?: boolean;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
};

export class WebhookLogsResource {
  constructor(
    private t: Transport,
    private baseUrl: string,
  ) {}
  list(query: ListWebhookLogsQuery = {}) {
    const params = new URLSearchParams();
    if (query.responseCode !== undefined) params.set("ResponseCode", String(query.responseCode));
    if (query.success !== undefined) params.set("Success", String(query.success));
    if (query.from !== undefined) params.set("From", query.from);
    if (query.to !== undefined) params.set("To", query.to);
    if (query.page !== undefined) params.set("Page", String(query.page));
    if (query.pageSize !== undefined) params.set("PageSize", String(query.pageSize));

    const qs = params.toString();
    return this.t.paginated<WebhookExecutionLog>(qs ? `${this.baseUrl}?${qs}` : this.baseUrl);
  }
  search(query: string, page: number = 1) {
    return this.t.paginated<WebhookExecutionLog>(
      `${this.baseUrl}/search/${encodeURIComponent(query)}?Page=${page}`,
    );
  }
  resend(executionLogId: string) {
    return this.t.request<void>(`${this.baseUrl}/${executionLogId}/resend`, { method: "POST" });
  }
}
