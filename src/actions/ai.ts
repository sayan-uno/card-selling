"use server";

import { suggestPhotoForQuote } from "@/ai/flows/suggest-photo-for-quote";

export async function handleSuggestPhoto(quote: string) {
    if (!quote) {
        throw new Error("Quote cannot be empty.");
    }
    
    try {
        const result = await suggestPhotoForQuote({ quote });
        return result;
    } catch(e) {
        console.error(e);
        throw new Error("Failed to get suggestion from AI");
    }
}
