export class CategoriesResource {
    t;
    storeId;
    constructor(t, storeId) {
        this.t = t;
        this.storeId = storeId;
    }
    list() {
        return this.t.paginated(`/stores/${this.storeId}/categories`);
    }
    all() {
        return this.t.request(`/stores/${this.storeId}/categories/all`);
    }
    getBySlug(slug) {
        return this.t.request(`/stores/${this.storeId}/categories/slug/${slug}`);
    }
    create(form) {
        return this.t.request(`/stores/${this.storeId}/categories`, {
            method: "POST",
            body: JSON.stringify(form),
        });
    }
    reorder(items) {
        return this.t.request(`/stores/${this.storeId}/categories/order`, {
            method: "PATCH",
            body: JSON.stringify(items),
        });
    }
}
//# sourceMappingURL=categories.js.map