import { Transport } from "../client.js";
import { components } from "../generated/schema.js";
import { WebhookLogsResource } from "./webhookLogs.js";

type WebhookData = components["schemas"]["Webhook"];
type WebhookForm = components["schemas"]["WebhookForm"];

export class Webhook {
  private baseUrl: string;
  public logs: WebhookLogsResource;
  constructor(
    private t: Transport,
    private webhookId: string,
  ) {
    this.baseUrl = `/webhooks/${this.webhookId}`;
    this.logs = new WebhookLogsResource(this.t, this.baseUrl + "/logs");
  }
  get() {
    return this.t.request<WebhookData>(this.baseUrl);
  }
  update(form: WebhookForm) {
    return this.t.request<WebhookData>(this.baseUrl, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  delete() {
    return this.t.request<void>(this.baseUrl, { method: "DELETE" });
  }
}
