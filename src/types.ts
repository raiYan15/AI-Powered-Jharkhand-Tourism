export interface ItineraryStop {
    id: string;
    name: string;
    coordinates: { latitude: number; longitude: number };
    day: number;
    activities: string[];
    estimatedCost: number; // in INR
}

export interface Itinerary {
    stops: ItineraryStop[];
    totalCost: number;
}
export interface Location {
    latitude: number;
    longitude: number;
    accuracy: number;
}

export interface Route {
    id: string;
    name: string;
    destination: string;
    arrivesInMinutes: number;
}

export interface TransportStop {
    id: string;
    name: string;
    type: 'Bus' | 'Train' | 'Airport';
    bookingUrl: string;
    location: Location;
    routes: Route[];
}

export interface TransportData {
    stops: TransportStop[];
}

export interface DirectionsStep {
    instruction: string;
    location: Location;
}

export interface DirectionsSummary {
    totalDistance: string;
    totalTime: string;
}

export interface Directions {
    summary: DirectionsSummary;
    steps: DirectionsStep[];
    routePath: Location[];
}

export interface TransportAnalysis {
    transportType: string;
    description: string;
    routes: Route[];
}
export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
} 

export interface Product {
     id: string;
     name: string;
     category: string;
     price: number;
     stock: number;
     imageUrl: string;
     description: string;
     createdAt: string;
}

export interface Order {
     id: string;
     productName: string;
     customerName: string;
     date: string;
     amount: number;
     status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface EcotourismPackage {
     id: string;
     name: string;
     duration: string;
     price: number;
     imageUrl: string;
     itinerary: string;
     inclusions: string;
     exclusions: string;
     createdAt: string;
}

export interface Homestay {
     id: string;
     name: string;
     location: string;
     pricePerNight: number;
     imageUrl: string;
     description: string;
     amenities: string;
     createdAt: string;
}

export interface Event {
     id: string;
     name: string;
     date: string;
     location: string;
     price: number;
     imageUrl: string;
     description: string;
     createdAt: string;
}
