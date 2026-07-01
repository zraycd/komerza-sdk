import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";

type PublicCategoryReference = components["schemas"]["PublicCategoryReference"];
type PublicCategory = components["schemas"]["PublicCategory"];
type CategoryForm = components["schemas"]["CategoryForm"];
type OrderedItem = components["schemas"]["OrderedItem"];

type ListCategoriesQuery = {
  page?: number;
  pageSize?: number;
};

export class CategoriesResource {
  constructor(
    private t: Transport,
    private storeId: string,
  ) {}

  list(query: ListCategoriesQuery = {}) {
    const params = new URLSearchParams();
    if (query.page !== undefined) params.set("Page", String(query.page));
    if (query.pageSize !== undefined) params.set("PageSize", String(query.pageSize));

    const qs = params.toString();
    return this.t.paginated<PublicCategoryReference>(
      qs ? `/stores/${this.storeId}/categories?${qs}` : `/stores/${this.storeId}/categories`,
    );
  }
  all() {
    return this.t.request<PublicCategoryReference[]>(`/stores/${this.storeId}/categories/all`);
  }
  getBySlug(slug: string) {
    return this.t.request<PublicCategory>(`/stores/${this.storeId}/categories/slug/${slug}`);
  }
  create(form: CategoryForm) {
    return this.t.request<PublicCategory>(`/stores/${this.storeId}/categories`, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
  reorder(items: OrderedItem[]) {
    return this.t.request<void>(`/stores/${this.storeId}/categories/order`, {
      method: "PATCH",
      body: JSON.stringify(items),
    });
  }
}
