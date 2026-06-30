import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";

type ProductItems = components["schemas"]["ProductItems"];
type LicenseKeySearchResult = components["schemas"]["LicenseKeySearchResult"];

export class ItemsResource {
  constructor(
    private t: Transport,
    private baseUrl: string,
  ) {
    this.baseUrl = this.baseUrl + "/items";
  }
  add(keys: ProductItems) {
    return this.t.request<void>(this.baseUrl, {
      method: "PUT",
      body: JSON.stringify(keys),
    });
  }
  remove(keys: ProductItems) {
    return this.t.request<void>(this.baseUrl, { method: "DELETE", body: JSON.stringify(keys) });
  }
  clear() {
    return this.t.request<void>(this.baseUrl + "/clear", { method: "DELETE" });
  }
  search(query: string, page: number = 0) {
    return this.t.paginated<LicenseKeySearchResult>(
      this.baseUrl + `/search/${encodeURIComponent(query)}?Page=${page}`,
    );
  }
  getPage(page: number) {
    return this.t.paginated<string>(this.baseUrl + `/${page}`);
  }
}
