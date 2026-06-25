import { ProductsResource } from "./products.js";
import { components } from "../generated/schema.js";
import { Requester } from "../client.js";

type StoreType = components["schemas"]["PublicStoreReference"];
type UpdateStoreDto = components["schemas"]["UpdateStoreForm"];
type StorePermissionsResponse = components["schemas"]["StorePermissionsResponse"];
type MaintenanceModeForm = components["schemas"]["MaintenanceModeForm"];

export class Store {
  public products: ProductsResource;

  constructor(
    private req: Requester,
    public readonly storeId: string,
  ) {
    this.products = new ProductsResource(req, storeId);
  }

  get() {
    return this.req<StoreType>(`/stores/${this.storeId}`);
  }
  getPermissions() {
    return this.req<StorePermissionsResponse>(`/stores/${this.storeId}/permissions`);
  }
  update(data: UpdateStoreDto) {
    return this.req<StoreType>(`/stores/${this.storeId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }
  toggleMaintenance(form: MaintenanceModeForm = { reason: "" }) {
    return this.req<unknown>(`/stores/${this.storeId}/maintenance`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
}
