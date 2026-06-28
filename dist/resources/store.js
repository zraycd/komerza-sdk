import { ProductsResource } from "./products.js";
import { Product } from "./product.js";
import { Category } from "./category.js";
import { CategoriesResource } from "./categories.js";
export class Store {
    t;
    storeId;
    products;
    categories;
    constructor(t, storeId) {
        this.t = t;
        this.storeId = storeId;
        this.products = new ProductsResource(t, storeId);
        this.categories = new CategoriesResource(t, storeId);
    }
    get() {
        return this.t.request(`/stores/${this.storeId}`);
    }
    getPermissions() {
        return this.t.request(`/stores/${this.storeId}/permissions`);
    }
    update(data) {
        return this.t.request(`/stores/${this.storeId}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    }
    toggleMaintenance(form = { reason: "" }) {
        return this.t.request(`/stores/${this.storeId}/maintenance`, {
            method: "PUT",
            body: JSON.stringify(form),
        });
    }
    product(productId) {
        return new Product(this.t, this.storeId, productId);
    }
    category(categoryId) {
        return new Category(this.t, this.storeId, categoryId);
    }
}
//# sourceMappingURL=store.js.map