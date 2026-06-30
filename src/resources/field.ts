import { Transport } from "../client.js";
import { components } from "../generated/schema.js";
import { OptionsResource } from "./options.js";

type CustomFieldForm = components["schemas"]["CustomFieldForm"];
type CustomField = components["schemas"]["CustomField"];

export class Field {
  public options: OptionsResource;
  constructor(
    private t: Transport,
    private baseUrl: string,
    private fieldId: string,
  ) {
    this.baseUrl = `${this.baseUrl}/fields/${this.fieldId}`;
    this.options = new OptionsResource(this.t, this.baseUrl);
  }
  update(form: CustomFieldForm) {
    return this.t.request<CustomField>(this.baseUrl, { method: "PUT", body: JSON.stringify(form) });
  }
  delete() {
    return this.t.request<void>(this.baseUrl, { method: "DELETE" });
  }
}
