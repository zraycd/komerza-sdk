/// <reference types="node" resolution-mode="require"/>
import { Transport } from "../client.js";
import { components } from "../generated/schema.js";
declare type CategoryForm = components["schemas"]["CategoryForm"];
declare type OrderedItem = components["schemas"]["OrderedItem"];
export declare class Category {
    private t;
    readonly storeId: string;
    readonly categoryId: string;
    constructor(t: Transport, storeId: string, categoryId: string);
    get(): Promise<{
        id: string;
        dateCreated: string;
        name: string;
        visibility: 0 | 1 | 2 | 3;
        slug?: string | null | undefined;
        imageName?: string | null | undefined;
        order: number;
        storeId: string;
        products: {
            id: string;
            dateCreated: string;
            name: string;
            description: string;
            imageNames: string[];
            rating: number;
            order: number;
            visibility: 0 | 1 | 2 | 3;
            storeId: string;
            slug?: string | null | undefined;
            variants: {
                id: string;
                dateCreated: string;
                name: string;
                productId: string;
                storeId: string;
                cost: number;
                minimumQuantity: number;
                maximumQuantity: number;
                order: number;
                requireDiscordAuthorization: boolean;
                type: 0 | 1;
                billingInterval?: 0 | 1 | 2 | 3 | 4 | undefined;
                customIntervalDays?: number | null | undefined;
                deliveryTypes: string[];
                imageNames: string[];
                stock: number;
                stockMode: 0 | 1 | 2;
                customFields: {
                    id: string;
                    variantId: string;
                    label: string;
                    identifier: string;
                    placeholder?: string | null | undefined;
                    type: string;
                    isRequired: boolean;
                    hint?: string | null | undefined;
                    options: {
                        id: string;
                        customFieldId: string;
                        label: string;
                        value: string;
                        order: number;
                    }[];
                }[];
                volumeDiscounts: {
                    id: string;
                    variantId: string;
                    quantity: number;
                    discountType: 0 | 1 | 2;
                    discountValue: number;
                }[];
                disableVolumeDiscountOnCoupon: boolean;
            }[];
            isBestSeller: boolean;
            metadata?: string | null | undefined;
            affiliateDiscountMode: number;
            customAffiliateDiscountPercentage?: number | null | undefined;
        }[];
    }>;
    update(form: CategoryForm): Promise<void>;
    delete(): Promise<void>;
    addImage(image: Blob | File, filename?: string): Promise<string>;
    deleteImage(): Promise<void>;
    reorderProducts(items: OrderedItem[]): Promise<void>;
}
export {};
