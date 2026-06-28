import { Transport } from "../client.js";
import { components } from "../generated/schema.js";

type VariantData = components["schemas"]["Variant"];
type UpdateVariantForm = components["schemas"]["UpdateVariantForm"];
type VariantDeliveryForm = components["schemas"]["VariantDeliveryForm"];
type DuplicateVariantForm = components["schemas"]["DuplicateVariantForm"];

export class Variant {
  private baseUrl: string;
  constructor(
    private t: Transport,
    public readonly storeId: string,
    public readonly productId: string,
    public readonly variantId: string,
  ) {
    this.baseUrl = `/stores/${storeId}/products/${productId}/variants/${variantId}`;
  }

  update(form: UpdateVariantForm) {
    return this.t.request<VariantData>(this.baseUrl, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  delete() {
    return this.t.request<VariantData>(this.baseUrl, { method: "DELETE" });
  }
  updateDelivery(form: VariantDeliveryForm) {
    return this.t.request<VariantData>(this.baseUrl + "/delivery", {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  duplicate(form: DuplicateVariantForm) {
    return this.t.request<VariantData>(this.baseUrl + "/duplicate", {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
  addImage(image: Blob | File, filename?: string) {
    const form = new FormData();
    form.append("image", image, filename);
    return this.t.request<string>(this.baseUrl + "/images", {
      method: "PATCH",
      body: form,
    });
  }
  deleteImage(fileName: string) {
    return this.t.request<VariantData>(this.baseUrl + `/images/${encodeURIComponent(fileName)}`, {
      method: "DELETE",
    });
  }
  reorderImages(images: Record<string, number>) {
    return this.t.request<void>(this.baseUrl + "/images/order", {
      method: "PATCH",
      body: JSON.stringify(images),
    });
  }
  addFile(file: Blob | File, filename?: string) {
    const form = new FormData();
    form.append("file", file, filename);
    return this.t.request<VariantData>(this.baseUrl + "/file", {
      method: "PATCH",
      body: form,
    });
  }
  deleteFile(fileId: string) {
    return this.t.request<VariantData>(this.baseUrl + `/file/${fileId}`, { method: "DELETE" });
  }
}
