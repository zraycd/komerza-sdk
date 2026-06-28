import { Variant } from "./variant.js";
import { VariantsResource } from "./variants.js";
export class Product {
    t;
    storeId;
    productId;
    variants;
    constructor(t, storeId, productId) {
        this.t = t;
        this.storeId = storeId;
        this.productId = productId;
        this.variants = new VariantsResource(t, storeId, productId);
    }
    get() {
        return this.t.request(`/stores/${this.storeId}/products/${this.productId}`);
    }
    addImage(image, filename) {
        const form = new FormData();
        form.append("image", image, filename);
        return this.t.request(`/stores/${this.storeId}/products/${this.productId}/images`, {
            method: "PATCH",
            body: form,
        });
    }
    delete() {
        return this.t.request(`/stores/${this.storeId}/products/${this.productId}`, {
            method: "DELETE",
        });
    }
    deleteImage(fileName) {
        return this.t.request(`/stores/${this.storeId}/products/${this.productId}/images/${encodeURIComponent(fileName)}`, { method: "DELETE" });
    }
    update(form) {
        return this.t.request(`/stores/${this.storeId}/products/${this.productId}`, {
            method: "PUT",
            body: JSON.stringify(form),
        });
    }
    updatePaymentSettings(form) {
        return this.t.request(`/stores/${this.storeId}/products/${this.productId}/payment`, {
            method: "PUT",
            body: JSON.stringify(form),
        });
    }
    updateAffiliateDiscount(form) {
        return this.t.request(`/stores/${this.storeId}/products/${this.productId}/affiliateDiscount`, {
            method: "PUT",
            body: JSON.stringify(form),
        });
    }
    updateSecurity(form) {
        return this.t.request(`/stores/${this.storeId}/products/${this.productId}/security`, {
            method: "PUT",
            body: JSON.stringify(form),
        });
    }
    reorderImages(images) {
        return this.t.request(`/stores/${this.storeId}/products/${this.productId}/images/order`, {
            method: "PATCH",
            body: JSON.stringify(images),
        });
    }
    duplicate(form) {
        return this.t.request(`/stores/${this.storeId}/products/${this.productId}/duplicate`, {
            method: "POST",
            body: JSON.stringify(form),
        });
    }
    variant(variantId) {
        return new Variant(this.t, this.storeId, this.productId, variantId);
    }
}
//# sourceMappingURL=product.js.map