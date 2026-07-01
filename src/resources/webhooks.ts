import { Transport } from "../client.js";
import { components } from "../generated/schema.js";

type WebhookData = components["schemas"]["Webhook"];
type WebhookForm = components["schemas"]["WebhookForm"];
type WebhookCreatedResponse = components["schemas"]["WebhookCreatedResponse"];

export class WebhooksResource {
  private baseUrl: string = `/webhooks`;
  constructor(private t: Transport) {}

  list() {
    return this.t.request<WebhookData[]>(this.baseUrl);
  }
  create(form: WebhookForm) {
    return this.t.request<WebhookCreatedResponse>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
}
