import { writable } from "svelte/store";

// logged app user
export const admin = writable({});

export function setAdmin(model) {
    admin.set(model || {});
}
