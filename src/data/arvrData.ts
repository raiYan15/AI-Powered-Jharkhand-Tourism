// Sample 360° image data for better VR experiences
// In a real implementation, these would be actual 360° panoramic images

export const panoramicImages = {
  "Netarhat": "/images/9ffc869f0419cc62a4e18896dc9b388b_1000x1000.jpg",
  "Betla National Park": "/images/Palamu.jpg",
  "Hundru Falls": "/images/baghmunda-waterfall.jpg",
  "Dassam Falls": "/images/DJI_0495-1536x2048.jpg",
  "Patratu Valley": "/images/1707898054_213633-3-days-tour-to-jharkhand-slider-image.jpeg",
  "Parasnath Hill": "/images/2018040392-1024x678.jpg",
  "Baidyanath Dham (Deoghar)": "/images/baba-baidyanath-dham-deoghar-odisha-1-attr-hero.jpeg",
  "Jonha Falls": "/images/2018052546-olw6vuniqrwk8ykogjwtfcxe3qte4j46zjdfdprvre.jpg",
  "Maithon Dam": "/images/Dimna-Lake-Jharkhand.jpg",
  "Rajrappa Temple": "/images/Garhwa_fort-_temple.jpg"
};

// Enhanced location data with AR/VR metadata
export const enhancedPlaces = [
  {
    title: "Netarhat",
    description: "The Queen of Chotanagpur - known for its stunning sunsets and cool climate.",
    image: "/images/9ffc869f0419cc62a4e18896dc9b388b_1000x1000.jpg",
    coordinates: { lat: 23.4667, lng: 84.2667 },
    elevation: 1128,
    bestViewingTime: "Sunset (5:30-6:30 PM)",
    vrFeatures: ["360° Sunset Views", "Hill Station Panorama", "Weather Effects"],
    arFeatures: ["Elevation Markers", "Sunset Timer", "Photo Spots"],
    historicalInfo: "Established as a hill station during British era, known for its salubrious climate and scenic beauty."
  },
  {
    title: "Betla National Park",
    description: "A dense forest full of wild animals, waterfalls, and scenic beauty.",
    image: "/images/Palamu.jpg",
    coordinates: { lat: 23.8667, lng: 84.1833 },
    area: "226 sq km",
    bestViewingTime: "Early Morning (6:00-9:00 AM)",
    vrFeatures: ["Wildlife Safari", "Forest Canopy View", "Waterfall Experience"],
    arFeatures: ["Animal Tracking", "Plant Identification", "Trail Maps"],
    historicalInfo: "One of the first national parks created under Project Tiger in 1974."
  },
  {
    title: "Hundru Falls",
    description: "A mesmerizing waterfall and one of the highest in Jharkhand.",
    image: "/images/baghmunda-waterfall.jpg",
    coordinates: { lat: 23.4167, lng: 85.6167 },
    height: "98 meters",
    bestViewingTime: "Post Monsoon (October-December)",
    vrFeatures: ["Waterfall Immersion", "Mist Effects", "Rainbow Views"],
    arFeatures: ["Height Measurement", "Water Flow Data", "Photography Tips"],
    historicalInfo: "Formed by the Subarnarekha River, creates a spectacular cascade during monsoons."
  },
  {
    title: "Dassam Falls",
    description: "A breathtaking waterfall near Ranchi, popular for its scenic surroundings.",
    image: "/images/DJI_0495-1536x2048.jpg",
    coordinates: { lat: 23.3833, lng: 85.5333 },
    height: "44 meters",
    bestViewingTime: "Monsoon Season (July-September)",
    vrFeatures: ["Multi-tier Cascade", "Rock Formation Views", "Natural Pool"],
    arFeatures: ["Geological Info", "Safety Zones", "Best Angles"],
    historicalInfo: "Also known as Dassam Ghagh, famous for its unique rock formations and natural beauty."
  },
  {
    title: "Patratu Valley",
    description: "Known for its picturesque road, lush hills, and serene lake.",
    image: "/images/1707898054_213633-3-days-tour-to-jharkhand-slider-image.jpeg",
    coordinates: { lat: 23.6167, lng: 85.2833 },
    feature: "Man-made Valley",
    bestViewingTime: "All Day (Sunrise to Sunset)",
    vrFeatures: ["Valley Drive", "Lake Reflections", "Hill Panorama"],
    arFeatures: ["Navigation Guide", "Distance Markers", "Viewpoint Locations"],
    historicalInfo: "Created as part of thermal power plant development, now a popular tourist destination."
  },
  {
    title: "Parasnath Hill",
    description: "A famous Jain pilgrimage site and the highest mountain in Jharkhand.",
    image: "/images/2018040392-1024x678.jpg",
    coordinates: { lat: 23.9333, lng: 86.1667 },
    elevation: 1365,
    bestViewingTime: "Early Morning (4:00-7:00 AM)",
    vrFeatures: ["Summit Views", "Temple Complex", "Sunrise Experience"],
    arFeatures: ["Pilgrimage Path", "Temple Information", "Elevation Progress"],
    historicalInfo: "Sacred to Jains as the place where 20 of 24 Tirthankaras attained salvation."
  },
  {
    title: "Baidyanath Dham (Deoghar)",
    description: "One of the twelve Jyotirlingas of Lord Shiva, a major pilgrimage destination.",
    image: "/images/baba-baidyanath-dham-deoghar-odisha-1-attr-hero.jpeg",
    coordinates: { lat: 24.4833, lng: 86.7 },
    significance: "Jyotirlinga Temple",
    bestViewingTime: "Early Morning (5:00-8:00 AM)",
    vrFeatures: ["Temple Architecture", "Ritual Ceremonies", "Pilgrimage Experience"],
    arFeatures: ["Temple History", "Ritual Guide", "Crowd Navigation"],
    historicalInfo: "Ancient temple complex dating back to the Vedic period, major center of Shaivism."
  },
  {
    title: "Jonha Falls",
    description: "Also known as Gautamdhara, this waterfall is surrounded by scenic landscapes.",
    image: "/images/2018052546-olw6vuniqrwk8ykogjwtfcxe3qte4j46zjdfdprvre.jpg",
    coordinates: { lat: 23.4333, lng: 85.4333 },
    height: "43 meters",
    bestViewingTime: "Post Monsoon (October-January)",
    vrFeatures: ["Waterfall Base View", "Surrounding Hills", "Natural Pools"],
    arFeatures: ["Safety Information", "Trekking Paths", "Flora Identification"],
    historicalInfo: "Named after sage Gautama, considered sacred by locals with mythological significance."
  },
  {
    title: "Maithon Dam",
    description: "A huge reservoir on River Barakar, known as the 'Kashmir of Koyalanchal'.",
    image: "/images/Dimna-Lake-Jharkhand.jpg",
    coordinates: { lat: 23.8667, lng: 86.8333 },
    capacity: "15,712 million cubic feet",
    bestViewingTime: "Sunset (5:00-7:00 PM)",
    vrFeatures: ["Dam Structure", "Reservoir Views", "Boating Experience"],
    arFeatures: ["Engineering Data", "Water Level Info", "Boat Routes"],
    historicalInfo: "Constructed in 1957, joint venture between Bengal and Bihar for flood control and power generation."
  },
  {
    title: "Rajrappa Temple",
    description: "A Shakti Peeth dedicated to Goddess Chhinnamasta, located at the confluence of rivers.",
    image: "/images/Garhwa_fort-_temple.jpg",
    coordinates: { lat: 23.6167, lng: 85.7833 },
    significance: "Shakti Peeth",
    bestViewingTime: "Early Morning (6:00-9:00 AM)",
    vrFeatures: ["Temple Complex", "River Confluence", "Spiritual Atmosphere"],
    arFeatures: ["Temple Legend", "River Information", "Ritual Guide"],
    historicalInfo: "Ancient Shakti Peeth where Goddess Sati's chin fell, confluence of Bhera and Damodar rivers."
  }
];

// Utility function to get enhanced data for a place
export const getEnhancedPlaceData = (title: string) => {
  return enhancedPlaces.find(place => place.title === title) || null;
};

// Function to generate context-aware hotspots
export const generateContextualHotspots = (placeData: any) => {
  if (!placeData) return [];

  const baseHotspots = [
    {
      id: 'info-historical',
      position: [20, 25] as [number, number],
      title: 'Historical Significance',
      description: placeData.historicalInfo,
      type: 'info' as const,
      link: 'https://jharkhand.gov.in/tourism'
    },
    {
      id: 'guide-local',
      position: [75, 35] as [number, number],
      title: 'Expert Local Guide',
      description: `Get insider knowledge about ${placeData.title} from experienced local guides who know the best spots and hidden gems.`,
      type: 'guide' as const,
      link: '/booking?service=guide&location=' + encodeURIComponent(placeData.title)
    },
    {
      id: 'ticket-booking',
      position: [50, 75] as [number, number],
      title: 'Book Experience',
      description: `Reserve your visit to ${placeData.title}. Best viewing time: ${placeData.bestViewingTime}`,
      type: 'ticket' as const,
      link: '/booking?service=tickets&location=' + encodeURIComponent(placeData.title)
    }
  ];

  // Add location-specific hotspots
  if (placeData.elevation) {
    baseHotspots.push({
      id: 'info-elevation',
      position: [80, 15] as [number, number],
      title: 'Elevation Info',
      description: `${placeData.title} stands at ${placeData.elevation} meters above sea level, offering spectacular panoramic views.`,
      type: 'info' as const,
      link: '#'
    });
  }

  if (placeData.height) {
    baseHotspots.push({
      id: 'info-height',
      position: [30, 80] as [number, number],
      title: 'Waterfall Height',
      description: `This magnificent waterfall cascades from a height of ${placeData.height}, creating a breathtaking natural spectacle.`,
      type: 'info' as const,
      link: '#'
    });
  }

  return baseHotspots;
};