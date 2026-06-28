/// <reference types="node" resolution-mode="require"/>
import { StoresResource } from "./resources/stores.js";
import { UserResource } from "./resources/user.js";
import { Store } from "./resources/store.js";
export declare type Paginated<T> = {
    success: boolean;
    message: string | null;
    code: string | null;
    pages: number;
    data: T[];
};
interface ClientConfig {
    apiKey: string;
    userAgent: string;
    baseUrl?: string;
}
export declare class KomerzaClient {
    private apiKey;
    userAgent: string;
    baseUrl: string;
    private t;
    user: UserResource;
    stores: StoresResource;
    constructor(config: ClientConfig);
    private send;
    private request;
    private requestPaginated;
    store(storeId: string): Store;
}
export interface Transport {
    request: <T>(path: string, opts?: RequestInit) => Promise<T>;
    paginated: <T>(path: string, opts?: RequestInit) => Promise<{
        data: T[];
        pages: number;
    }>;
}
export {};
