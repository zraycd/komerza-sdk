import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";

type Product = components["schemas"]["Product"];
type DisplayProduct = components["schemas"]["DisplayProduct"];
type CreateProductForm = components["schemas"]["CreateProductForm"];
type Privacy = components["schemas"]["Privacy"];
type PublicProductReference = components["schemas"]["PublicProductReference"];
type BulkUpdateProductForm = components["schemas"]["BulkUpdateProductForm"];
type OrderedItem = components["schemas"]["OrderedItem"];
type BulkDeleteProductForm = components["schemas"]["BulkDeleteProductForm"];

interface ProductSearchOptions {
  visibility?: Privacy;
  isBestSeller?: boolean;
  shouldBlockVpns?: boolean;
  lowStock?: boolean;
  filters?: string;
  sorts?: string;
  page?: number;
  pageSize?: number;
}

export class ProductsResource {
  constructor(
    private t: Transport,
    private storeId: string,
  ) {}

  list() {
    return this.t.paginated<DisplayProduct>(`/stores/${this.storeId}/products`);
  }
  all() {
    return this.t.request<PublicProductReference[]>(`/stores/${this.storeId}/products/all`);
  }
  getFilters() {
    return this.t.request<Record<string, number>>(`/stores/${this.storeId}/products/filters`);
  }
  getBySlug(slug: string) {
    return this.t.request<Product>(`/stores/${this.storeId}/products/slug/${slug}`);
  }
  create(form: CreateProductForm) {
    return this.t.request<Product>(`/stores/${this.storeId}/products`, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
  deleteBulk(form: BulkDeleteProductForm) {
    return this.t.request<void>(`/stores/${this.storeId}/products`, {
      method: "DELETE",
      body: JSON.stringify(form),
    });
  }
  updateBulk(form: BulkUpdateProductForm) {
    return this.t.request<void>(`/stores/${this.storeId}/products`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  search(query: string, opts: ProductSearchOptions = {}) {
    const qs = new URLSearchParams();
    if (opts.visibility !== undefined) qs.set("Visibility", String(opts.visibility));
    if (opts.isBestSeller !== undefined) qs.set("IsBestSeller", String(opts.isBestSeller));
    if (opts.shouldBlockVpns !== undefined) qs.set("ShouldBlockVpns", String(opts.shouldBlockVpns));
    if (opts.lowStock !== undefined) qs.set("LowStock", String(opts.lowStock));
    if (opts.filters !== undefined) qs.set("Filters", opts.filters);
    if (opts.sorts !== undefined) qs.set("Sorts", opts.sorts);
    if (opts.page !== undefined) qs.set("Page", String(opts.page));
    if (opts.pageSize !== undefined) qs.set("PageSize", String(opts.pageSize));

    const suffix = qs.toString() ? `?${qs}` : "";
    return this.t.paginated<Product>(
      `/stores/${this.storeId}/products/search/${encodeURIComponent(query)}${suffix}`,
    );
  }
  reorder(items: OrderedItem[]) {
    return this.t.request<void>(`/stores/${this.storeId}/products/order`, {
      method: "PATCH",
      body: JSON.stringify(items),
    });
  }
}
