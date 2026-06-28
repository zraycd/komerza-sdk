export class ProductsResource {
    t;
    storeId;
    constructor(t, storeId) {
        this.t = t;
        this.storeId = storeId;
    }
    list() {
        return this.t.paginated(`/stores/${this.storeId}/products`);
    }
    all() {
        return this.t.request(`/stores/${this.storeId}/products/all`);
    }
    getFilters() {
        return this.t.request(`/stores/${this.storeId}/products/filters`);
    }
    getBySlug(slug) {
        return this.t.request(`/stores/${this.storeId}/products/slug/${slug}`);
    }
    create(form) {
        return this.t.request(`/stores/${this.storeId}/products`, {
            method: "POST",
            body: JSON.stringify(form),
        });
    }
    deleteBulk(form) {
        return this.t.request(`/stores/${this.storeId}/products`, {
            method: "DELETE",
            body: JSON.stringify(form),
        });
    }
    updateBulk(form) {
        return this.t.request(`/stores/${this.storeId}/products`, {
            method: "PUT",
            body: JSON.stringify(form),
        });
    }
    search(query, opts = {}) {
        const qs = new URLSearchParams();
        if (opts.visibility !== undefined)
            qs.set("Visibility", String(opts.visibility));
        if (opts.isBestSeller !== undefined)
            qs.set("IsBestSeller", String(opts.isBestSeller));
        if (opts.shouldBlockVpns !== undefined)
            qs.set("ShouldBlockVpns", String(opts.shouldBlockVpns));
        if (opts.lowStock !== undefined)
            qs.set("LowStock", String(opts.lowStock));
        if (opts.filters !== undefined)
            qs.set("Filters", opts.filters);
        if (opts.sorts !== undefined)
            qs.set("Sorts", opts.sorts);
        if (opts.page !== undefined)
            qs.set("Page", String(opts.page));
        if (opts.pageSize !== undefined)
            qs.set("PageSize", String(opts.pageSize));
        const suffix = qs.toString() ? `?${qs}` : "";
        return this.t.paginated(`/stores/${this.storeId}/products/search/${encodeURIComponent(query)}${suffix}`);
    }
    reorder(items) {
        return this.t.request(`/stores/${this.storeId}/products/order`, {
            method: "PATCH",
            body: JSON.stringify(items),
        });
    }
}
//# sourceMappingURL=products.js.map