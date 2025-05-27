import { browser } from "$app/environment";

export function goBack() {
    if (browser) window.history.back();
}