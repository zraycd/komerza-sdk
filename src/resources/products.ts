import type { components } from "../generated/schema.js";
import type { Paginated, Transport } from "../client.js";

type Product = components["schemas"]["Product"];
type DisplayProduct = components["schemas"]["DisplayProduct"];
type CreateProductForm = components["schemas"]["CreateProductForm"];
type Privacy = components["schemas"]["Privacy"];
type PublicProductReference = components["schemas"]["PublicProductReference"];
type UpdateProductForm = components["schemas"]["UpdateProductForm"];
type ProductPaymentForm = components["schemas"]["ProductPaymentForm"];
type BulkUpdateProductForm = components["schemas"]["BulkUpdateProductForm"];
type OrderedItem = components["schemas"]["OrderedItem"];
type DuplicateProductForm = components["schemas"]["DuplicateProductForm"];
type UpdateProductAffiliateDiscountForm =
  components["schemas"]["UpdateProductAffiliateDiscountForm"];
type BulkDeleteProductForm = components["schemas"]["BulkDeleteProductForm"];
type UpdateProductSecurityForm = components["schemas"]["UpdateProductSecurityForm"];

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
  get(productId: string) {
    return this.t.request<Product>(`/stores/${this.storeId}/products/${productId}`);
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
  addImage(productId: string, image: Blob | File, filename?: string) {
    const form = new FormData();
    form.append("image", image, filename);
    return this.t.request<string>(`/stores/${this.storeId}/products/${productId}/images`, {
      method: "PATCH",
      body: form,
    });
  }
  delete(productId: string) {
    return this.t.request<void>(`/stores/${this.storeId}/products/${productId}`, {
      method: "DELETE",
    });
  }
  deleteBulk(form: BulkDeleteProductForm) {
    return this.t.request<void>(`/stores/${this.storeId}/products`, {
      method: "PATCH",
      body: JSON.stringify(form),
    });
  }
  deleteImage(productId: string, fileName: string) {
    return this.t.request<void>(
      `/stores/${this.storeId}/products/${productId}/images/${fileName}`,
      { method: "DELETE" },
    );
  }
  update(productId: string, form: UpdateProductForm) {
    return this.t.request<void>(`/stores/${this.storeId}/products/${productId}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  updatePaymentSettings(productId: string, form: ProductPaymentForm) {
    return this.t.request<void>(`/stores/${this.storeId}/products/${productId}/payment`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  updateBulk(form: BulkUpdateProductForm) {
    return this.t.request<void>(`/stores/${this.storeId}/products`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  updateAffiliateDiscount(productId: string, form: UpdateProductAffiliateDiscountForm) {
    return this.t.request<void>(`/stores/${this.storeId}/products/${productId}/affiliateDiscount`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  updateSecurity(productId: string, form: UpdateProductSecurityForm) {
    return this.t.request<void>(`/stores/${this.storeId}/products/${productId}/security`, {
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
  reorderImages(productId: string, images: Record<string, number>) {
    return this.t.request<void>(`/stores/${this.storeId}/products/${productId}/images/order`, {
      method: "PATCH",
      body: JSON.stringify(images),
    });
  }
  duplicate(productId: string, form: DuplicateProductForm) {
    return this.t.request<Product>(`/stores/${this.storeId}/products/${productId}/duplicate`, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
}
