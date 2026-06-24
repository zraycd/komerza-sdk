type ApiResponse<T> = { success: boolean; message: string | null; code: string | null; data?: T };

interface ClientConfig {
  apiKey: string;
  userAgent: string;
  baseUrl?: string;
}

class KomerzaClient {
  private apiKey: string;
  public userAgent: string;
  public baseUrl: string = "https://api.komerza.com";

  constructor(config: ClientConfig) {
    this.apiKey = config.apiKey;
    this.userAgent = config.userAgent;
    if (config.baseUrl) this.baseUrl = config.baseUrl;
  }

  private async request<T>(path: string, opts: RequestInit = {}) {
    const res = await fetch(this.baseUrl + path, {
      ...opts,
      headers: {
        ...opts.headers,
        Authorization: `Bearer ${this.apiKey}`,
        "User-Agent": this.userAgent,
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as ApiResponse<T>;
    if (!json.success) throw new Error(json.message ?? "request failed");

    return json.data as T;
  }
}
