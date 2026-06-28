export declare type KomerzaErrorCode = "AccessDenied" | "BadToken" | "TwoFactorRequired" | "OAuthLoginRequired" | "ValidationError" | "BadCaptcha" | "NotFound" | "ObjectConflict" | "RateLimited" | "ProductUnavailable" | "NotEnoughFunds" | "VerificationRequired" | "FeatureUnavailable" | "UpgradeRequired" | "UnsupportedRequest" | "UploadFailed" | "InternalServerError" | "NetworkError";
export declare class KomerzaError extends Error {
    readonly code: KomerzaErrorCode | string;
    readonly status?: number;
    readonly body?: unknown;
    readonly retryAfter?: number;
    constructor(opts: {
        message: string;
        code: KomerzaErrorCode | string;
        status?: number;
        body?: unknown;
        retryAfter?: number;
    });
}
