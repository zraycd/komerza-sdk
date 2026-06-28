export class VariantsResource {
    t;
    storeId;
    productId;
    baseUrl;
    constructor(t, storeId, productId) {
        this.t = t;
        this.storeId = storeId;
        this.productId = productId;
        this.baseUrl = `/stores/${this.storeId}/products/${this.productId}/variants`;
    }
    get() {
        return this.t.request(this.baseUrl);
    }
    create(form) {
        return this.t.request(this.baseUrl, {
            method: "POST",
            body: JSON.stringify(form),
        });
    }
    reorder(items) {
        return this.t.request(this.baseUrl + `/order`, {
            method: "PATCH",
            body: JSON.stringify(items),
        });
    }
}
//# sourceMappingURL=variants.js.map