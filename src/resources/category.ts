import { Transport } from "../client.js";
import { components } from "../generated/schema.js";

type PublicCategory = components["schemas"]["PublicCategory"];
type CategoryForm = components["schemas"]["CategoryForm"];
type OrderedItem = components["schemas"]["OrderedItem"];

export class Category {
  constructor(
    private t: Transport,
    public readonly storeId: string,
    public readonly categoryId: string,
  ) {}

  get() {
    return this.t.request<PublicCategory>(`/stores/${this.storeId}/categories/${this.categoryId}`);
  }
  update(form: CategoryForm) {
    return this.t.request<void>(`/stores/${this.storeId}/categories/${this.categoryId}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  delete() {
    return this.t.request<void>(`/stores/${this.storeId}/categories/${this.categoryId}`, {
      method: "DELETE",
    });
  }
  addImage(image: Blob | File, filename?: string) {
    const form = new FormData();
    form.append("image", image, filename);
    return this.t.request<string>(`/stores/${this.storeId}/categories/${this.categoryId}/image`, {
      method: "POST",
      body: form,
    });
  }
  deleteImage() {
    return this.t.request<void>(`/stores/${this.storeId}/categories/${this.categoryId}/image`, {
      method: "DELETE",
    });
  }
  reorderProducts(items: OrderedItem[]) {
    return this.t.request<void>(
      `/stores/${this.storeId}/categories/${this.categoryId}/products/order`,
      {
        method: "PATCH",
        body: JSON.stringify(items),
      },
    );
  }
}
