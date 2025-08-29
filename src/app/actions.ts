"use server";

import { getPersonalizedHalalProductRecommendations } from "@/ai/flows/personalized-halal-product-recommendations";
import { getProductsByIds } from "@/lib/data";

export async function fetchRecommendationsAction(userId: string) {
  try {
    const recommendations = await getPersonalizedHalalProductRecommendations({ userId });
    // In a real app, you would fetch from a database. Here we use our mock data functions.
    // Let's add some default products in case AI returns nothing
    const allProductIds = ["prod-1", "prod-2", "prod-3", "prod-4", "prod-5", "prod-6"];
    const recommendedIds = recommendations.productIds?.length > 0 ? recommendations.productIds : allProductIds.sort(() => 0.5 - Math.random()).slice(0, 4);
    
    const products = await getProductsByIds(recommendedIds);
    return products;
  } catch (error) {
    console.error("Failed to get recommendations:", error);
    // Fallback to some random products
    const fallbackIds = ["prod-1", "prod-2", "prod-3", "prod-4", "prod-5", "prod-6", "prod-7", "prod-8"].sort(() => 0.5 - Math.random()).slice(0, 4);
    const products = await getProductsByIds(fallbackIds);
    return products;
  }
}
