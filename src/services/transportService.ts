import { GoogleGenAI, Type } from "@google/genai";
import type { TransportData, TransportStop, Directions, Location, TransportAnalysis } from "../types";

export class TransportService {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async fetchTransportData(lat: number, lon: number): Promise<TransportData> {
    const transportSchema = {
      type: Type.OBJECT,
      properties: {
        stops: {
          type: Type.ARRAY,
          description: "List of nearby transport stops.",
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "A unique identifier for the stop." },
              name: { type: Type.STRING, description: "The name of the transport stop." },
              type: { type: Type.STRING, enum: ['Bus', 'Train', 'Airport'], description: "The type of transport (Bus, Train, or Airport)." },
              bookingUrl: { type: Type.STRING, description: "A plausible, fictional URL to book a ticket for this stop or its primary service (e.g., a city transit website, national rail carrier, or major airline)." },
              location: {
                type: Type.OBJECT,
                properties: {
                  latitude: { type: Type.NUMBER, description: "The absolute latitude of the stop." },
                  longitude: { type: Type.NUMBER, description: "The absolute longitude of the stop." },
                },
                required: ['latitude', 'longitude']
              },
              routes: {
                type: Type.ARRAY,
                description: "List of routes serving this stop. For airports, this could be different airlines or terminals.",
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING, description: "A unique identifier for the route." },
                    name: { type: Type.STRING, description: "The name or number of the route (e.g., '54A', 'Red Line', 'Terminal 2', 'Flight UA288')." },
                    destination: { type: Type.STRING, description: "A brief, user-friendly description of the route's destination or direction (e.g., 'Downtown', 'Northbound', 'International Departures')." },
                    arrivesInMinutes: { type: Type.INTEGER, description: "Estimated arrival/departure time in minutes from now. Can be 0 for airports." },
                  }
                }
              }
            }
          }
        }
      }
    };

    const prompt = `
      You are an expert urban transit data provider. Based on the user's location at latitude ${lat} and longitude ${lon}, generate a list of 5 nearby public transport hubs.
      These hubs can be Bus stops, Train stations, or Airports.
      It is CRUCIAL that you provide their precise, real-world geographic coordinates as accurate latitude and longitude values.
      The stops must be realistically located within a plausible radius of the user's coordinates, simulating a dense urban or suburban environment with major transit infrastructure.
      Do not invent fictional coordinates; base them on a plausible and verifiable layout of a city map.
      For each hub, provide a unique ID, its name, type (Bus, Train, or Airport), its absolute latitude and longitude, and a list of 3-4 routes that service it.
      For each hub, also provide a plausible but fictional 'bookingUrl' for its main service (e.g., a city transit authority website for a bus stop, a national rail carrier for a train station, or a major airline for an airport).
      For each route, provide a unique ID, a short name (e.g., '54A', 'Red Line', 'Terminal B'), a brief 'destination' description (e.g., 'Downtown', 'Northbound'), and an estimated arrival time in minutes from now (between 1 and 20 minutes, or 0 for an airport terminal).
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: transportSchema,
        },
      });

      const jsonText = response.text.trim();
      const parsedData = JSON.parse(jsonText);

      if (!parsedData.stops || !Array.isArray(parsedData.stops)) {
        throw new Error("AI response is missing 'stops' array.");
      }

      return parsedData as TransportData;
    } catch (error) {
      console.error("Error fetching or parsing transport data from AI:", error);
      throw new Error("Failed to get transport data from the AI service. Please try again.");
    }
  }
}
