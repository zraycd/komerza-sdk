import type { Transport } from "../client.js";
import type { components } from "../generated/schema.js";
declare type StoreForm = components["schemas"]["StoreForm"];
export declare class StoresResource {
    private t;
    constructor(t: Transport);
    list(): Promise<{
        id: string;
        dateCreated: string;
        name: string;
        description: string;
        url: string;
        customDomain?: string | null | undefined;
        currencyCode: string;
        prependProductNameToReceipt: boolean;
        isAutomaticReviewsEnabled: boolean;
        rating: number;
        scopes?: string[] | null | undefined;
        domain: string;
        isCustomerBalanceEnabled: boolean;
        maintenanceReason?: string | null | undefined;
        termsOfServiceUrl?: string | null | undefined;
        refundPolicyUrl?: string | null | undefined;
        privacyPolicyUrl?: string | null | undefined;
        affiliateOptions?: {
            isEnabled: boolean;
            defaultReturnPercentage: number;
            defaultPercentageOff?: number | null | undefined;
            canConvertAffiliateBalance: boolean;
            isPublicRegistrationEnabled: boolean;
            isLinkEditingEnabled: boolean;
        } | undefined;
        branding: {
            bannerFileName?: string | null | undefined;
            iconFileName?: string | null | undefined;
            accentColor?: string | null | undefined;
            isAutomaticCurrencyConversionEnabled: boolean;
        };
        isTicketingEnabled: boolean;
        externalSupportUrl?: string | null | undefined;
        externalSupportDescription?: string | null | undefined;
        isInactive: boolean;
        lastOrderAt?: string | null | undefined;
    }[]>;
    create(form: StoreForm): Promise<{
        id: string;
        dateCreated: string;
        name: string;
        description: string;
        url: string;
        customDomain?: string | null | undefined;
        currencyCode: string;
        prependProductNameToReceipt: boolean;
        isAutomaticReviewsEnabled: boolean;
        rating: number;
        scopes?: string[] | null | undefined;
        domain: string;
        isCustomerBalanceEnabled: boolean;
        maintenanceReason?: string | null | undefined;
        termsOfServiceUrl?: string | null | undefined;
        refundPolicyUrl?: string | null | undefined;
        privacyPolicyUrl?: string | null | undefined;
        affiliateOptions?: {
            isEnabled: boolean;
            defaultReturnPercentage: number;
            defaultPercentageOff?: number | null | undefined;
            canConvertAffiliateBalance: boolean;
            isPublicRegistrationEnabled: boolean;
            isLinkEditingEnabled: boolean;
        } | undefined;
        branding: {
            bannerFileName?: string | null | undefined;
            iconFileName?: string | null | undefined;
            accentColor?: string | null | undefined;
            isAutomaticCurrencyConversionEnabled: boolean;
        };
        isTicketingEnabled: boolean;
        externalSupportUrl?: string | null | undefined;
        externalSupportDescription?: string | null | undefined;
        isInactive: boolean;
        lastOrderAt?: string | null | undefined;
    }>;
}
export {};
