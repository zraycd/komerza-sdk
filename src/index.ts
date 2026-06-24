import { KomerzaClient } from "./client.js";

const client = new KomerzaClient({ apiKey: process.env.API_KEY!, userAgent: "komerza-sdk/0.1" });
const user = await client.user.get();
console.log(user.email, user.stores.length);
