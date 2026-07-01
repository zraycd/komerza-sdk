import { KomerzaError } from "./errors.js";
import type { KomerzaErrorCode } from "./errors.js";
import { StoresResource } from "./resources/stores.js";
import { UserResource } from "./resources/user.js";
import { Store } from "./resources/store.js";
import { WebhooksResource } from "./resources/webhooks.js";
import { Webhook } from "./resources/webhook.js";

type ApiResponse<T> = { success: boolean; message: string | null; code: string | null; data?: T };
export type Paginated<T> = {
  success: boolean;
  message: string | null;
  code: string | null;
  pages: number;
  data: T[];
};

interface ClientConfig {
  apiKey: string;
  userAgent: string;
  baseUrl?: string;
}

function statusToCode(status: number): KomerzaErrorCode {
  switch (status) {
    case 401:
      return "BadToken";
    case 403:
      return "AccessDenied";
    case 404:
      return "NotFound";
    case 409:
      return "ObjectConflict";
    case 429:
      return "RateLimited";
    default:
      return "InternalServerError";
  }
}

export class KomerzaClient {
  private apiKey: string;
  public userAgent: string;
  public baseUrl: string = "https://api.komerza.com";

  private t: Transport;
  public user: UserResource;
  public stores: StoresResource;
  public webhooks: WebhooksResource;

  constructor(config: ClientConfig) {
    this.apiKey = config.apiKey;
    this.userAgent = config.userAgent;
    if (config.baseUrl) this.baseUrl = config.baseUrl;

    const transport: Transport = {
      request: this.request.bind(this),
      paginated: this.requestPaginated.bind(this),
    };
    this.t = transport;
    this.user = new UserResource(transport);
    this.stores = new StoresResource(transport);
    this.webhooks = new WebhooksResource(transport);
  }

  private async send<E extends { success: boolean; message: string | null; code: string | null }>(
    path: string,
    opts: RequestInit = {},
  ): Promise<E> {
    let res: Response;
    try {
      const isForm = opts.body instanceof FormData;
      res = await fetch(this.baseUrl + path, {
        ...opts,
        headers: {
          ...opts.headers,
          Authorization: `Bearer ${this.apiKey}`,
          "User-Agent": this.userAgent,
          ...(isForm ? {} : { "Content-Type": "application/json" }),
        },
      });
    } catch (cause) {
      throw new KomerzaError({
        message: "network request failed",
        code: "NetworkError",
        body: cause,
      });
    }
    if (!res.ok) {
      const body = (await res.json().catch(() => null)) as ApiResponse<unknown> | null;
      throw new KomerzaError({
        message: body?.message ?? `HTTP ${res.status}`,
        code: body?.code ?? statusToCode(res.status),
        status: res.status,
        body,
        retryAfter:
          res.status === 429 ? Number(res.headers.get("Retry-After")) || undefined : undefined,
      });
    }
    const json = (await res.json()) as E;
    if (!json.success) {
      throw new KomerzaError({
        message: json.message ?? "request failed",
        code: json.code ?? "InternalServerError",
        status: res.status,
        body: json,
      });
    }
    return json;
  }

  private async request<T>(path: string, opts?: RequestInit): Promise<T> {
    const json = await this.send<ApiResponse<T>>(path, opts);
    return json.data as T;
  }

  private async requestPaginated<T>(
    path: string,
    opts?: RequestInit,
  ): Promise<{ data: T[]; pages: number }> {
    const json = await this.send<Paginated<T>>(path, opts);
    return { data: json.data, pages: json.pages };
  }

  store(storeId: string): Store {
    return new Store(this.t, storeId);
  }

  webhook(webhookId: string): Webhook {
    return new Webhook(this.t, webhookId);
  }
}

export interface Transport {
  request: <T>(path: string, opts?: RequestInit) => Promise<T>;
  paginated: <T>(path: string, opts?: RequestInit) => Promise<{ data: T[]; pages: number }>;
}
