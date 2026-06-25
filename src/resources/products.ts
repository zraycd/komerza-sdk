import { Requester } from "../client.js";
import type { components } from "../generated/schema.js";
import type { Paginated } from "../client.js";

type DisplayProduct = components["schemas"]["DisplayProduct"];

export class ProductsResource {
  constructor(
    private req: Requester,
    private storeId: string,
  ) {}

  list() {
    return this.req<Paginated<DisplayProduct>>(`/stores/${this.storeId}/products`);
  }
  get(productId: string) {
    return this.req<DisplayProduct>(`/stores/${this.storeId}/products/${productId}`);
  }
}
