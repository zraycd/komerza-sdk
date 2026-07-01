import { ProductsResource } from "./products.js";
import { components } from "../generated/schema.js";
import { Transport } from "../client.js";
import { Product } from "./product.js";
import { Category } from "./category.js";
import { CategoriesResource } from "./categories.js";
import { CouponsResource } from "./coupons.js";
import { TicketsResource } from "./tickets.js";

type StoreType = components["schemas"]["PublicStoreReference"];
type UpdateStoreDto = components["schemas"]["UpdateStoreForm"];
type StorePermissionsResponse = components["schemas"]["StorePermissionsResponse"];
type MaintenanceModeForm = components["schemas"]["MaintenanceModeForm"];

export class Store {
  public products: ProductsResource;
  public categories: CategoriesResource;
  public coupons: CouponsResource;
  public tickets: TicketsResource;

  constructor(
    private t: Transport,
    public readonly storeId: string,
  ) {
    this.products = new ProductsResource(t, storeId);
    this.categories = new CategoriesResource(t, storeId);
    this.coupons = new CouponsResource(t, storeId);
    this.tickets = new TicketsResource(t, storeId);
  }

  get() {
    return this.t.request<StoreType>(`/stores/${this.storeId}`);
  }
  getPermissions() {
    return this.t.request<StorePermissionsResponse>(`/stores/${this.storeId}/permissions`);
  }
  update(data: UpdateStoreDto) {
    return this.t.request<StoreType>(`/stores/${this.storeId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
  toggleMaintenance(form: MaintenanceModeForm = { reason: "" }) {
    return this.t.request<void>(`/stores/${this.storeId}/maintenance`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }

  product(productId: string): Product {
    return new Product(this.t, this.storeId, productId);
  }

  category(categoryId: string): Category {
    return new Category(this.t, this.storeId, categoryId);
  }
}
