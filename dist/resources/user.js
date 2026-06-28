export class UserResource {
    t;
    constructor(t) {
        this.t = t;
    }
    get() {
        return this.t.request("/user");
    }
}
//# sourceMappingURL=user.js.map