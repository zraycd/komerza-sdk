export class KomerzaError extends Error {
    code;
    status;
    body;
    retryAfter;
    constructor(opts) {
        super(opts.message);
        this.name = "KomerzaError";
        this.code = opts.code;
        this.status = opts.status;
        this.body = opts.body;
        this.retryAfter = opts.retryAfter;
        Object.setPrototypeOf(this, KomerzaError.prototype);
    }
}
//# sourceMappingURL=errors.js.map