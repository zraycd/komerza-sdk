export class StoresResource {
    t;
    constructor(t) {
        this.t = t;
    }
    async list() {
        const data = await this.t.request(`/user`);
        const stores = data.stores;
        return stores;
    }
    create(form) {
        return this.t.request(`/stores`, {
            method: "POST",
            body: JSON.stringify(form),
        });
    }
}
//# sourceMappingURL=stores.js.map