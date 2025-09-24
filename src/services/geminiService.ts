// Add back streamChatResponse for chatbot compatibility
import type { ChatMessage } from '../types';

export async function streamChatResponse(
    _history: ChatMessage[],
    newMessage: string,
    onChunk: (text: string) => void
): Promise<void> {
    if (!API_KEY || !ai) {
        // Fallback: just echo the message in chunks
        const text = 'Sorry, AI chat is unavailable. Please set up your Gemini API key.';
        const chunkSize = 40;
        for (let i = 0; i < text.length; i += chunkSize) {
            onChunk(text.slice(i, i + chunkSize));
            await new Promise((r) => setTimeout(r, 15));
        }
        return;
    }
    const system = `You are 'JharkhandConnect', a concise, friendly AI tour guide for Jharkhand.\nAnswer helpfully and avoid fabricating facts.`;
    const prompt = `${system}\n\nUser: ${newMessage}`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 }
            }
        });
        const text = (response.text ?? 'Sorry, I could not find an answer.').trim();
        const chunkSize = 40;
        for (let i = 0; i < text.length; i += chunkSize) {
            onChunk(text.slice(i, i + chunkSize));
            await new Promise((r) => setTimeout(r, 15));
        }
    } catch (e) {
        const text = 'Sorry, AI chat is temporarily unavailable.';
        const chunkSize = 40;
        for (let i = 0; i < text.length; i += chunkSize) {
            onChunk(text.slice(i, i + chunkSize));
            await new Promise((r) => setTimeout(r, 15));
        }
    }
}
// Add back generateItinerary for ItineraryPlanner compatibility
import type { Itinerary } from '../types';

export async function generateItinerary(preferences: {
    duration: string;
    budget: string;
    interests: string[];
    travelers: string;
}): Promise<Itinerary> {
    // Helper functions for budget-based calculations
    const getBudgetBasedCost = (budgetType: string, days: number): number => {
        const basePerDay = 2500; // Base cost per day for moderate budget
        let multiplier: number;
        
        switch (budgetType.toLowerCase()) {
            case 'economy':
                multiplier = 0.6; // 60% of base cost
                break;
            case 'luxury':
                multiplier = 1.8; // 180% of base cost
                break;
            case 'moderate':
            default:
                multiplier = 1.0; // 100% of base cost
                break;
        }
        
        return Math.round(basePerDay * days * multiplier);
    };

    const getBudgetGuidance = (budgetType: string): string => {
        switch (budgetType.toLowerCase()) {
            case 'economy':
                return 'Focus on budget accommodations (₹800-1500/night), local transport, street food, free attractions, and community experiences. Avoid luxury hotels and expensive activities.';
            case 'luxury':
                return 'Include premium accommodations (₹4000-8000/night), private transport, fine dining, exclusive experiences, spa treatments, and high-end cultural activities.';
            case 'moderate':
            default:
                return 'Balance comfort and cost with mid-range accommodations (₹2000-3500/night), mix of private and public transport, good restaurants, and popular attractions.';
        }
    };

    // Use Gemini API if available, else fallback
    if (!API_KEY || !ai) {
        // Fallback sample so UI never hangs
        const baseCost = getBudgetBasedCost(preferences.budget, parseInt(preferences.duration));
        const days = parseInt(preferences.duration);
        
        const basStops = [
            {
                id: 'ranchi-day1',
                name: 'Ranchi City & Waterfalls',
                coordinates: { latitude: 23.3441, longitude: 85.3096 },
                day: 1,
                activities: ['Visit Rock Garden & Kanke Dam', 'Explore Hundru Falls'],
                estimatedCost: Math.round(baseCost * 0.20),
            },
            {
                id: 'netarhat-day2',
                name: 'Netarhat Hills',
                coordinates: { latitude: 23.4793, longitude: 84.2700 },
                day: 2,
                activities: ['Drive to Netarhat; forest views', 'Sunset Point stroll'],
                estimatedCost: Math.round(baseCost * 0.25),
            },
            {
                id: 'patratu-day3',
                name: 'Patratu Valley & Scenic Views',
                coordinates: { latitude: 23.6776, longitude: 85.2799 },
                day: 3,
                activities: ['Scenic drive and viewpoints', 'Local cuisine tasting'],
                estimatedCost: Math.round(baseCost * 0.20),
            }
        ];
        
        if (days >= 4) {
            basStops.push({
                id: 'rest-day4',
                name: 'Rest Day & Local Exploration',
                coordinates: { latitude: 23.3441, longitude: 85.3096 },
                day: 4,
                activities: ['Local market shopping', 'Leisure and relaxation'],
                estimatedCost: Math.round(baseCost * 0.15),
            });
        }
        
        if (days >= 5) {
            basStops.push({
                id: 'heritage-day5',
                name: 'Birsa Munda Heritage & Cultural Sites',
                coordinates: { latitude: 23.4000, longitude: 85.3100 },
                day: 5,
                activities: ['Birsa Munda museum visit', 'Tribal cultural experience'],
                estimatedCost: Math.round(baseCost * 0.20),
            });
        }
        
        if (days >= 6) {
            basStops.push({
                id: 'adventure-day6',
                name: 'Adventure Sports & Activities',
                coordinates: { latitude: 22.7500, longitude: 85.8500 },
                day: 6,
                activities: ['River rafting adventure', 'Rock climbing and trekking'],
                estimatedCost: Math.round(baseCost * 0.15),
            });
        }
        
        if (days >= 7) {
            basStops.push({
                id: 'wildlife-day7',
                name: 'Wildlife Safari & National Park',
                coordinates: { latitude: 23.8500, longitude: 84.1900 },
                day: 7,
                activities: ['Betla National Park safari', 'Wildlife photography and elephant ride'],
                estimatedCost: Math.round(baseCost * 0.18),
            });
        }
        
        if (days >= 8) {
            basStops.push({
                id: 'spiritual-day8',
                name: 'Spiritual Temples & Pilgrimage',
                coordinates: { latitude: 24.4833, longitude: 86.7000 },
                day: 8,
                activities: ['Baidyanath Dham temple visit', 'Spiritual experience and jyotirlinga darshan'],
                estimatedCost: Math.round(baseCost * 0.16),
            });
        }
        
        if (days >= 9) {
            basStops.push({
                id: 'lakes-day9',
                name: 'Scenic Lakes & Water Sports',
                coordinates: { latitude: 22.7833, longitude: 86.1500 },
                day: 9,
                activities: ['Dimna Lake boating', 'Water sports and lakeside relaxation'],
                estimatedCost: Math.round(baseCost * 0.14),
            });
        }
        
        if (days >= 10) {
            basStops.push({
                id: 'departure-day10',
                name: 'Final Exploration & Departure',
                coordinates: { latitude: 23.3441, longitude: 85.3096 },
                day: 10,
                activities: ['Last minute shopping', 'Departure preparations and final sightseeing'],
                estimatedCost: Math.round(baseCost * 0.12),
            });
        }
        
        return {
            stops: basStops.slice(0, days),
            totalCost: baseCost,
        };
    }

    // Get budget-specific guidance for the AI
    const budgetGuidance = getBudgetGuidance(preferences.budget);
    const estimatedBudget = getBudgetBasedCost(preferences.budget, parseInt(preferences.duration));

    const prompt = `\nCreate a diverse and comprehensive Jharkhand trip plan as JSON only.\nConstraints:\n- Duration: ${preferences.duration} days\n- Budget: ${preferences.budget} (${budgetGuidance})\n- Estimated Total Budget: ₹${estimatedBudget}\n- Interests: ${preferences.interests.join(', ') || 'General'}\n- Travelers: ${preferences.travelers}\n\nBudget Guidelines:\n${budgetGuidance}\n\nIMPORTANT: Create a varied itinerary that includes different themes across days. For extended trips, include these themes in order:\n- Day 1: Ranchi City & Waterfalls (rock garden, kanke dam, hundru falls)\n- Day 2: Netarhat Hills (hill station, forest views, sunset point)\n- Day 3: Patratu Valley (scenic drives, valley viewpoints)\n- Day 4: Rest & Leisure (local markets, shopping, relaxation)\n- Day 5: Cultural Heritage (Birsa Munda museums, tribal culture, heritage sites)\n- Day 6: Adventure Sports (rafting, trekking, camping, zip lining)\n- Day 7: Wildlife Safari (Betla National Park safari, wildlife photography, elephant ride)\n- Day 8: Spiritual Temples (Baidyanath Dham temple, spiritual experience, jyotirlinga darshan)\n- Day 9: Scenic Lakes (Dimna Lake boating, water sports, lakeside relaxation)\n- Day 10+: Final Exploration (last minute shopping, departure preparations, final sightseeing)\n\nFor shorter trips, prioritize based on interests but maintain variety.\n\nOutput strictly matches this TypeScript shape:\n{\n  \"stops\": [\n    {\n      \"id\": string,\n      \"name\": string,\n      \"coordinates\": { \"latitude\": number, \"longitude\": number },\n      \"day\": number,\n      \"activities\": string[],\n      \"estimatedCost\": number\n    }\n  ],\n  \"totalCost\": number\n}\nEnsure totalCost aligns with the ${preferences.budget} budget category. Do not include markdown or explanations—JSON only.\n`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 }
            }
        });
        const jsonText = (response.text ?? '').trim();
        if (!jsonText) throw new Error('Empty response from model.');
        const parsed = JSON.parse(jsonText) as Itinerary;
        if (!Array.isArray(parsed.stops) || typeof parsed.totalCost !== 'number') {
            throw new Error('Invalid itinerary format.');
        }
        return parsed;
    } catch (e) {
        // Fallback sample so UI never hangs
        console.warn('Falling back to sample itinerary:', e);
        const baseCost = getBudgetBasedCost(preferences.budget, parseInt(preferences.duration));
        const days = parseInt(preferences.duration);
        
        const basStops = [
            {
                id: 'ranchi-day1',
                name: 'Ranchi City & Waterfalls',
                coordinates: { latitude: 23.3441, longitude: 85.3096 },
                day: 1,
                activities: ['Visit Rock Garden & Kanke Dam', 'Explore Hundru Falls'],
                estimatedCost: Math.round(baseCost * 0.20),
            },
            {
                id: 'netarhat-day2',
                name: 'Netarhat Hills',
                coordinates: { latitude: 23.4793, longitude: 84.2700 },
                day: 2,
                activities: ['Drive to Netarhat; forest views', 'Sunset Point stroll'],
                estimatedCost: Math.round(baseCost * 0.25),
            },
            {
                id: 'patratu-day3',
                name: 'Patratu Valley & Scenic Views',
                coordinates: { latitude: 23.6776, longitude: 85.2799 },
                day: 3,
                activities: ['Scenic drive and viewpoints', 'Local cuisine tasting'],
                estimatedCost: Math.round(baseCost * 0.20),
            }
        ];
        
        if (days >= 4) {
            basStops.push({
                id: 'rest-day4',
                name: 'Rest Day & Local Exploration',
                coordinates: { latitude: 23.3441, longitude: 85.3096 },
                day: 4,
                activities: ['Local market shopping', 'Leisure and relaxation'],
                estimatedCost: Math.round(baseCost * 0.15),
            });
        }
        
        if (days >= 5) {
            basStops.push({
                id: 'heritage-day5',
                name: 'Birsa Munda Heritage & Cultural Sites',
                coordinates: { latitude: 23.4000, longitude: 85.3100 },
                day: 5,
                activities: ['Birsa Munda museum visit', 'Tribal cultural experience'],
                estimatedCost: Math.round(baseCost * 0.20),
            });
        }
        
        if (days >= 6) {
            basStops.push({
                id: 'adventure-day6',
                name: 'Adventure Sports & Activities',
                coordinates: { latitude: 22.7500, longitude: 85.8500 },
                day: 6,
                activities: ['River rafting adventure', 'Rock climbing and trekking'],
                estimatedCost: Math.round(baseCost * 0.15),
            });
        }
        
        if (days >= 7) {
            basStops.push({
                id: 'wildlife-day7',
                name: 'Wildlife Safari & National Park',
                coordinates: { latitude: 23.8500, longitude: 84.1900 },
                day: 7,
                activities: ['Betla National Park safari', 'Wildlife photography and elephant ride'],
                estimatedCost: Math.round(baseCost * 0.18),
            });
        }
        
        if (days >= 8) {
            basStops.push({
                id: 'spiritual-day8',
                name: 'Spiritual Temples & Pilgrimage',
                coordinates: { latitude: 24.4833, longitude: 86.7000 },
                day: 8,
                activities: ['Baidyanath Dham temple visit', 'Spiritual experience and jyotirlinga darshan'],
                estimatedCost: Math.round(baseCost * 0.16),
            });
        }
        
        if (days >= 9) {
            basStops.push({
                id: 'lakes-day9',
                name: 'Scenic Lakes & Water Sports',
                coordinates: { latitude: 22.7833, longitude: 86.1500 },
                day: 9,
                activities: ['Dimna Lake boating', 'Water sports and lakeside relaxation'],
                estimatedCost: Math.round(baseCost * 0.14),
            });
        }
        
        if (days >= 10) {
            basStops.push({
                id: 'departure-day10',
                name: 'Final Exploration & Departure',
                coordinates: { latitude: 23.3441, longitude: 85.3096 },
                day: 10,
                activities: ['Last minute shopping', 'Departure preparations and final sightseeing'],
                estimatedCost: Math.round(baseCost * 0.12),
            });
        }
        
        return {
            stops: basStops.slice(0, days),
            totalCost: baseCost,
        };
    }
}

import { GoogleGenAI } from "@google/genai";


const API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("VITE_GEMINI_API_KEY environment variable not set. AI features will not work.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const generateProductDescription = async (productName: string, category: string): Promise<string> => {
    if (!API_KEY || !ai) {
        return Promise.resolve(`This is a sample description for ${productName}. Please set your Gemini API key to generate a real one.`);
    }

    const prompt = `
        You are an expert in marketing tribal handicrafts from Jharkhand, India.
        Your goal is to write a captivating, brief, and SEO-friendly product description.
        The description should be around 40-60 words.
        Highlight the traditional art form and the artisan's skill.
        Do not use markdown or special formatting. Return only the plain text description.

        Product Name: ${productName}
        Category: ${category}
        
        Generate the description now.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              thinkingConfig: { thinkingBudget: 0 }
            }
        });
        return (response.text ?? '').trim();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate description from AI.");
    }
};

export const generateEcotourismImage = async (packageName: string, itinerary: string): Promise<string> => {
    if (!API_KEY || !ai) {
       return Promise.resolve(`https://picsum.photos/seed/${packageName.replace(/\s+/g, '-')}/400`);
    }

    const prompt = `
        Create a vibrant, photorealistic promotional image for an ecotourism package in Jharkhand, India.
        Package Name: "${packageName}"
        Itinerary Highlights: "${itinerary}"
        The image should be beautiful, inviting, and capture the essence of Jharkhand's natural beauty (like waterfalls, forests, hills) and adventure.
        Style: Professional, high-quality photograph, landscape orientation.
        Avoid putting any text or logos on the image.
    `;

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9',
            },
        });
        const imgArr = response.generatedImages ?? [];
        const base64ImageBytes = imgArr[0]?.image?.imageBytes;
        if (!base64ImageBytes) {
            throw new Error("No image generated by Gemini API.");
        }
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    } catch (error) {
        console.error("Error calling Gemini Image API:", error);
        throw new Error("Failed to generate image from AI.");
    }
};

export const generateHomestayDescription = async (homestayName: string, location: string, amenities: string): Promise<string> => {
    if (!API_KEY || !ai) {
        return Promise.resolve(`A sample description for ${homestayName}. Set your Gemini API key to generate a real one.`);
    }

    const prompt = `
        You are a travel writer specializing in unique, rustic accommodations in Jharkhand, India.
        Write an inviting and brief description (50-70 words) for a tribal homestay.
        Focus on the authentic experience, natural surroundings, and warm hospitality.
        Do not use markdown or special formatting. Return only the plain text description.

        Homestay Name: ${homestayName}
        Location: ${location}
        Key Amenities: ${amenities}

        Generate the description now.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 }
            }
        });
        return (response.text ?? '').trim();
    } catch (error) {
        console.error("Error calling Gemini API for homestay description:", error);
        throw new Error("Failed to generate homestay description from AI.");
    }
};

export const generateEventDescription = async (eventName: string, date: string, location: string): Promise<string> => {
    if (!API_KEY || !ai) {
        return Promise.resolve(`A sample description for ${eventName}. Set your Gemini API key to generate a real one.`);
    }

    const prompt = `
        You are a copywriter for cultural events in Jharkhand, India.
        Write an exciting and brief description (50-70 words) for a local event.
        Highlight the cultural significance and what attendees can expect.
        Do not use markdown or special formatting. Return only the plain text description.

        Event Name: ${eventName}
        Date: ${date}
        Location: ${location}

        Generate the description now.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 }
            }
        });
        return (response.text ?? '').trim();
    } catch (error) {
        console.error("Error calling Gemini API for event description:", error);
        throw new Error("Failed to generate event description from AI.");
    }
};