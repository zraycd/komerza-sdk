import { KomerzaError } from "./errors.js";
import type { KomerzaErrorCode } from "./errors.js";
import { UserResource } from "./resources/user.js";
type ApiResponse<T> = { success: boolean; message: string | null; code: string | null; data?: T };

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

  constructor(config: ClientConfig) {
    this.apiKey = config.apiKey;
    this.userAgent = config.userAgent;
    if (config.baseUrl) this.baseUrl = config.baseUrl;
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
  public user = new UserResource(this.request.bind(this));
}

export type Requester = <T>(path: string, opts?: RequestInit) => Promise<T>;
