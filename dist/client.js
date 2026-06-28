import { KomerzaError } from "./errors.js";
import { StoresResource } from "./resources/stores.js";
import { UserResource } from "./resources/user.js";
import { Store } from "./resources/store.js";
function statusToCode(status) {
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
    apiKey;
    userAgent;
    baseUrl = "https://api.komerza.com";
    t;
    user;
    stores;
    constructor(config) {
        this.apiKey = config.apiKey;
        this.userAgent = config.userAgent;
        if (config.baseUrl)
            this.baseUrl = config.baseUrl;
        const transport = {
            request: this.request.bind(this),
            paginated: this.requestPaginated.bind(this),
        };
        this.t = transport;
        this.user = new UserResource(transport);
        this.stores = new StoresResource(transport);
    }
    async send(path, opts = {}) {
        let res;
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
        }
        catch (cause) {
            throw new KomerzaError({
                message: "network request failed",
                code: "NetworkError",
                body: cause,
            });
        }
        if (!res.ok) {
            const body = (await res.json().catch(() => null));
            throw new KomerzaError({
                message: body?.message ?? `HTTP ${res.status}`,
                code: body?.code ?? statusToCode(res.status),
                status: res.status,
                body,
                retryAfter: res.status === 429 ? Number(res.headers.get("Retry-After")) || undefined : undefined,
            });
        }
        const json = (await res.json());
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
    async request(path, opts) {
        const json = await this.send(path, opts);
        return json.data;
    }
    async requestPaginated(path, opts) {
        const json = await this.send(path, opts);
        return { data: json.data, pages: json.pages };
    }
    store(storeId) {
        return new Store(this.t, storeId);
    }
}
//# sourceMappingURL=client.js.map