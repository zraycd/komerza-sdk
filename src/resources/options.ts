import { Transport } from "../client.js";
import { components } from "../generated/schema.js";

type CustomFieldOptionForm = components["schemas"]["CustomFieldOptionForm"];
type CustomFieldOption = components["schemas"]["CustomFieldOption"];

export class OptionsResource {
  constructor(
    private t: Transport,
    private baseUrl: string,
  ) {
    this.baseUrl = this.baseUrl + "/options";
  }

  create(form: CustomFieldOptionForm) {
    return this.t.request<CustomFieldOption>(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(form),
    });
  }
  update(optionId: string, form: CustomFieldOptionForm) {
    return this.t.request<CustomFieldOption>(`${this.baseUrl}/${optionId}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
  }
  delete(optionId: string) {
    return this.t.request<void>(`${this.baseUrl}/${optionId}`, { method: "DELETE" });
  }
}
