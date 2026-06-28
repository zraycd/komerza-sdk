export class Variant {
    t;
    storeId;
    productId;
    variantId;
    baseUrl;
    constructor(t, storeId, productId, variantId) {
        this.t = t;
        this.storeId = storeId;
        this.productId = productId;
        this.variantId = variantId;
        this.baseUrl = `/stores/${storeId}/products/${productId}/variants/${variantId}`;
    }
    update(form) {
        return this.t.request(this.baseUrl, {
            method: "PUT",
            body: JSON.stringify(form),
        });
    }
    delete() {
        return this.t.request(this.baseUrl, { method: "DELETE" });
    }
    updateDelivery(form) {
        return this.t.request(this.baseUrl + "/delivery", {
            method: "PUT",
            body: JSON.stringify(form),
        });
    }
    duplicate(form) {
        return this.t.request(this.baseUrl + "/duplicate", {
            method: "POST",
            body: JSON.stringify(form),
        });
    }
    addImage(image, filename) {
        const form = new FormData();
        form.append("image", image, filename);
        return this.t.request(this.baseUrl + "/images", {
            method: "PATCH",
            body: form,
        });
    }
    deleteImage(fileName) {
        return this.t.request(this.baseUrl + `/images/${encodeURIComponent(fileName)}`, {
            method: "DELETE",
        });
    }
    reorderImages(images) {
        return this.t.request(this.baseUrl + "/images/order", {
            method: "PATCH",
            body: JSON.stringify(images),
        });
    }
    addFile(file, filename) {
        const form = new FormData();
        form.append("file", file, filename);
        return this.t.request(this.baseUrl + "/file", {
            method: "PATCH",
            body: form,
        });
    }
    deleteFile(fileId) {
        return this.t.request(this.baseUrl + `/file/${fileId}`, { method: "DELETE" });
    }
}
//# sourceMappingURL=variant.js.map