import { KomerzaClient } from "./client.js";
const client = new KomerzaClient({ apiKey: process.env.API_KEY, userAgent: "komerza-sdk/0.1" });
const store = client.store("c45e0472-d8bf-49dc-87f1-5622c74ee23e");
const resp = await store.product("7e40a0ae-ed7d-428a-97c3-7ad3dc6a917c").update({
    name: "test2",
    description: "new",
    isBestSeller: false,
    visibility: 3,
});
console.log(resp);
//# sourceMappingURL=index.js.map