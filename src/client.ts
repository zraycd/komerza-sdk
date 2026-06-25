import { KomerzaError } from "./errors.js";
import type { KomerzaErrorCode } from "./errors.js";
import { StoresResource } from "./resources/stores.js";
import { UserResource } from "./resources/user.js";
import { Store } from "./resources/store.js";

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

  private req: Requester;
  public user: UserResource;
  public stores: StoresResource;

  constructor(config: ClientConfig) {
    this.apiKey = config.apiKey;
    this.userAgent = config.userAgent;
    if (config.baseUrl) this.baseUrl = config.baseUrl;

    this.req = this.request.bind(this);
    this.user = new UserResource(this.req);
    this.stores = new StoresResource(this.req);
  }

  private async request<T>(path: string, opts: RequestInit = {}) {
    let res: Response;
    try {
      res = await fetch(this.baseUrl + path, {
        ...opts,
        headers: {
          ...opts.headers,
          Authorization: `Bearer ${this.apiKey}`,
          "User-Agent": this.userAgent,
          "Content-Type": "application/json",
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
    const json = (await res.json()) as ApiResponse<T>;

    if (!json.success) {
      throw new KomerzaError({
        message: json.message ?? "request failed",
        code: json.code ?? "InternalServerError",
        status: res.status,
        body: json,
      });
    }
    return json.data as T;
  }
  store(storeId: string): Store {
    return new Store(this.req, storeId);
  }
}

export type Requester = <T>(path: string, opts?: RequestInit) => Promise<T>;
