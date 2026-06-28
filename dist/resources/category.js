export class Category {
    t;
    storeId;
    categoryId;
    constructor(t, storeId, categoryId) {
        this.t = t;
        this.storeId = storeId;
        this.categoryId = categoryId;
    }
    get() {
        return this.t.request(`/stores/${this.storeId}/categories/${this.categoryId}`);
    }
    update(form) {
        return this.t.request(`/stores/${this.storeId}/categories/${this.categoryId}`, {
            method: "PUT",
            body: JSON.stringify(form),
        });
    }
    delete() {
        return this.t.request(`/stores/${this.storeId}/categories/${this.categoryId}`, {
            method: "DELETE",
        });
    }
    addImage(image, filename) {
        const form = new FormData();
        form.append("image", image, filename);
        return this.t.request(`/stores/${this.storeId}/categories/${this.categoryId}/image`, {
            method: "POST",
            body: form,
        });
    }
    deleteImage() {
        return this.t.request(`/stores/${this.storeId}/categories/${this.categoryId}/image`, {
            method: "DELETE",
        });
    }
    reorderProducts(items) {
        return this.t.request(`/stores/${this.storeId}/categories/${this.categoryId}/products/order`, {
            method: "PATCH",
            body: JSON.stringify(items),
        });
    }
}
//# sourceMappingURL=category.js.map