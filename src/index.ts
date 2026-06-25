import { KomerzaClient } from "./client.js";
import { Store } from "./resources/store.js";

const client = new KomerzaClient({ apiKey: process.env.API_KEY!, userAgent: "komerza-sdk/0.1" });
const store = client.store("c45e0472-d8bf-49dc-87f1-5622c74ee23e");

const resp = await store.products.list();
console.log(resp);
