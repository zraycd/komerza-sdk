import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";
declare type CreateVariantForm = components["schemas"]["CreateVariantForm"];
declare type OrderedItem = components["schemas"]["OrderedItem"];
export declare class VariantsResource {
    private t;
    private storeId;
    private productId;
    private baseUrl;
    constructor(t: Transport, storeId: string, productId: string);
    get(): Promise<{
        id: string;
        dateCreated: string;
        name: string;
        productId: string;
        storeId: string;
        cost: number;
        deliveryTypes: string[];
        files: {
            id: string;
            dateCreated: string;
            friendlyName: string;
            ipAddress: string;
            userId: string;
        }[];
        dynamicUrl?: string | null | undefined;
        deliveryMessage?: string | null | undefined;
        minimumQuantity: number;
        maximumQuantity: number;
        order: number;
        imageNames: string[];
        stock: number;
        stockMode: 0 | 1 | 2;
        customFields: {
            id: string;
            dateCreated: string;
            variantId: string;
            label: string;
            identifier: string;
            placeholder?: string | null | undefined;
            type: string;
            isRequired: boolean;
            hint?: string | null | undefined;
            options: {
                id: string;
                dateCreated: string;
                customFieldId: string;
                label: string;
                value: string;
                order: number;
            }[];
        }[];
        volumeDiscounts: {
            id: string;
            dateCreated: string;
            variantId: string;
            quantity: number;
            discountType: 0 | 1 | 2;
            discountValue: number;
        }[];
        disableVolumeDiscountOnCoupon: boolean;
        metadata?: string | null | undefined;
        billingInterval?: 0 | 1 | 2 | 3 | 4 | undefined;
        customIntervalDays?: number | null | undefined;
    }>;
    create(form: CreateVariantForm): Promise<{
        id: string;
        dateCreated: string;
        name: string;
        productId: string;
        storeId: string;
        cost: number;
        deliveryTypes: string[];
        files: {
            id: string;
            dateCreated: string;
            friendlyName: string;
            ipAddress: string;
            userId: string;
        }[];
        dynamicUrl?: string | null | undefined;
        deliveryMessage?: string | null | undefined;
        minimumQuantity: number;
        maximumQuantity: number;
        order: number;
        imageNames: string[];
        stock: number;
        stockMode: 0 | 1 | 2;
        customFields: {
            id: string;
            dateCreated: string;
            variantId: string;
            label: string;
            identifier: string;
            placeholder?: string | null | undefined;
            type: string;
            isRequired: boolean;
            hint?: string | null | undefined;
            options: {
                id: string;
                dateCreated: string;
                customFieldId: string;
                label: string;
                value: string;
                order: number;
            }[];
        }[];
        volumeDiscounts: {
            id: string;
            dateCreated: string;
            variantId: string;
            quantity: number;
            discountType: 0 | 1 | 2;
            discountValue: number;
        }[];
        disableVolumeDiscountOnCoupon: boolean;
        metadata?: string | null | undefined;
        billingInterval?: 0 | 1 | 2 | 3 | 4 | undefined;
        customIntervalDays?: number | null | undefined;
    }>;
    reorder(items: OrderedItem[]): Promise<void>;
}
export {};
