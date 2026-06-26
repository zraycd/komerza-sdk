import { Transport } from "../client.js";
import { components } from "../generated/schema.js";

type ProductData = components["schemas"]["Product"];
type UpdateProductSecurityForm = components["schemas"]["UpdateProductSecurityForm"];
type UpdateProductForm = components["schemas"]["UpdateProductForm"];
type ProductPaymentForm = components["schemas"]["ProductPaymentForm"];
type DuplicateProductForm = components["schemas"]["DuplicateProductForm"];
type UpdateProductAffiliateDiscountForm =
  components["schemas"]["UpdateProductAffiliateDiscountForm"];
type PublicProduct = components["schemas"]["PublicProduct"];

export class Product {
  constructor(
    private t: Transport,
    public readonly storeId: string,
    public readonly productId: string,
  ) {}

  get() {
    return this.t.request<ProductData>(`/stores/${this.storeId}/products/${this.productId}`);
  }
  addImage(image: Blob | File, filename?: string) {
    const form = new FormData();
    form.append("image", image, filename);
    return this.t.request<string>(`/stores/${this.storeId}/products/${this.productId}/images`, {
      method: "PATCH",
      body: form,
    });
  }
  delete() {
    return this.t.request<void>(`/stores/${this.storeId}/products/${this.productId}`, {
      method: "DELETE",
    });
  }
  deleteImage(fileName: string) {
    return this.t.request<PublicProduct>(
      `/stores/${this.storeId}/products/${this.productId}/images/${encodeURIComponent(fileName)}`,
      { method: "DELETE" },
    );
  }
  update(form: UpdateProductForm) {
    return this.t.request<void>(`/stores/${this.storeId}/products/${this.productId}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  updatePaymentSettings(form: ProductPaymentForm) {
    return this.t.request<void>(`/stores/${this.storeId}/products/${this.productId}/payment`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  updateAffiliateDiscount(form: UpdateProductAffiliateDiscountForm) {
    return this.t.request<void>(
      `/stores/${this.storeId}/products/${this.productId}/affiliateDiscount`,
      {
        method: "PUT",
        body: JSON.stringify(form),
      },
    );
  }
  updateSecurity(form: UpdateProductSecurityForm) {
    return this.t.request<void>(`/stores/${this.storeId}/products/${this.productId}/security`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  reorderImages(images: Record<string, number>) {
    return this.t.request<void>(`/stores/${this.storeId}/products/${this.productId}/images/order`, {
      method: "PATCH",
      body: JSON.stringify(images),
    });
  }
  duplicate(form: DuplicateProductForm) {
    return this.t.request<ProductData>(
      `/stores/${this.storeId}/products/${this.productId}/duplicate`,
      {
        method: "POST",
        body: JSON.stringify(form),
      },
    );
  }
}
