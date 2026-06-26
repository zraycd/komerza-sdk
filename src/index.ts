import { KomerzaClient } from "./client.js";
import { Store } from "./resources/store.js";

const client = new KomerzaClient({ apiKey: process.env.API_KEY!, userAgent: "komerza-sdk/0.1" });
const store = client.store("c45e0472-d8bf-49dc-87f1-5622c74ee23e");
let form = {
  variants: [
    {
      name: "test",
      cost: 50,
      minimumQuantity: 1,
      maximumQuantity: 10,
      order: 5,
      type: 0,
      stock: 50,
      deliveryTypes: ["a", "b", "c"],
      stockMode: 1,
      disableVolumeDiscountOnCoupon: true,
    },
  ],
  name: "test",
  description: "test",
  isBestSeller: true,
};
const resp = await store.products.update("7e40a0ae-ed7d-428a-97c3-7ad3dc6a917c", {
  name: "test2",
  description: "new",
  isBestSeller: false,
  visibility: 3,
});
console.log(resp);
