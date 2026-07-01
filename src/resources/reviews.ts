import type { components } from "../generated/schema.js";
import type { Transport } from "../client.js";

type DisplayReview = components["schemas"]["DisplayReview"];
type ReviewAnalyticsResponse = components["schemas"]["ReviewAnalyticsResponse"];
type FlagReviewForm = components["schemas"]["FlagReviewForm"];
type ReviewReplyForm = components["schemas"]["ReviewReplyForm"];

type ListReviewsQuery = {
  rating?: number;
  emailAddress?: string;
  hasReply?: boolean;
  dateRangeFrom?: string;
  dateRangeTo?: string;
  page?: number;
  pageSize?: number;
};

export class ReviewsResource {
  private baseUrl: string;
  constructor(
    private t: Transport,
    private storeId: string,
  ) {
    this.baseUrl = `/stores/${this.storeId}/reviews`;
  }
  list(query: ListReviewsQuery = {}) {
    const params = new URLSearchParams();
    if (query.rating !== undefined) params.set("rating", String(query.rating));
    if (query.emailAddress !== undefined) params.set("emailAddress", query.emailAddress);
    if (query.hasReply !== undefined) params.set("hasReply", String(query.hasReply));
    if (query.dateRangeFrom !== undefined) params.set("dateRangeFrom", query.dateRangeFrom);
    if (query.dateRangeTo !== undefined) params.set("dateRangeTo", query.dateRangeTo);
    if (query.page !== undefined) params.set("Page", String(query.page));
    if (query.pageSize !== undefined) params.set("PageSize", String(query.pageSize));

    const qs = params.toString();
    return this.t.paginated<DisplayReview>(qs ? `${this.baseUrl}?${qs}` : this.baseUrl);
  }
  analytics() {
    return this.t.request<ReviewAnalyticsResponse>(`${this.baseUrl}/analytics`);
  }
  filters() {
    return this.t.request<Record<string, number>>(`${this.baseUrl}/filters`);
  }
  reply(reviewId: string, form: ReviewReplyForm) {
    return this.t.request<void>(`${this.baseUrl}/${reviewId}/reply`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  flag(reviewId: string, form: FlagReviewForm) {
    return this.t.request<void>(`${this.baseUrl}/${reviewId}/flag`, {
      method: "DELETE",
      body: JSON.stringify(form),
    });
  }
  unflag(reviewId: string) {
    return this.t.request<void>(`${this.baseUrl}/${reviewId}/unflag`, { method: "DELETE" });
  }
}
