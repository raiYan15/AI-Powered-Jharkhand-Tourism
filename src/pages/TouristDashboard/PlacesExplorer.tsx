import React from 'react';

export const PlacesExplorer: React.FC = () => {
    const districts = [
        {
            name: 'Ranchi',
            description: 'The capital city known for its waterfalls and scenic beauty.',
            attraction: 'Rock Garden & Kanke Dam',
            attractionDesc: 'Beautiful landscaped gardens with rock sculptures and a serene dam.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Deoghar',
            description: 'Sacred pilgrimage destination famous for its ancient temples.',
            attraction: 'Baidyanath Temple',
            attractionDesc: 'A sacred Jyotirlinga site visited by millions of pilgrims.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Jamshedpur',
            description: 'Industrial city known as the Steel City of India.',
            attraction: 'Jubilee Park',
            attractionDesc: 'Asia\'s largest park with beautiful gardens, lake, and recreational facilities.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Dhanbad',
            description: 'Coal capital of India with rich mining heritage.',
            attraction: 'Maithon Dam',
            attractionDesc: 'One of the first multi-purpose river valley projects with boating facilities.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Bokaro',
            description: 'Steel city with modern infrastructure and scenic surroundings.',
            attraction: 'Bokaro Steel Plant',
            attractionDesc: 'One of India\'s largest steel manufacturing units with guided tours.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Hazaribagh',
            description: 'Famous for wildlife sanctuary and natural beauty.',
            attraction: 'Hazaribagh National Park',
            attractionDesc: 'Rich wildlife sanctuary home to tigers, leopards, and diverse flora.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Giridih',
            description: 'Known for its coal mines and religious sites.',
            attraction: 'Parasnath Hill',
            attractionDesc: 'Highest peak in Jharkhand and important Jain pilgrimage site.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Palamu',
            description: 'Historic district with ancient forts and wildlife.',
            attraction: 'Betla National Park',
            attractionDesc: 'First tiger reserve of Jharkhand with rich biodiversity.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Garhwa',
            description: 'Known for historical monuments and natural beauty.',
            attraction: 'Garhwa Fort',
            attractionDesc: 'Ancient fort ruins showcasing medieval architecture and history.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Singhbhum East',
            description: 'Industrial hub with natural attractions and tribal culture.',
            attraction: 'Dalma Wildlife Sanctuary',
            attractionDesc: 'Elephant reserve with trekking trails and scenic viewpoints.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Singhbhum West',
            description: 'Rich in minerals and home to indigenous communities.',
            attraction: 'Chaibasa',
            attractionDesc: 'District headquarters with tribal museums and cultural centers.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Godda',
            description: 'Known for its thermal power plant and riverside beauty.',
            attraction: 'Ganga River Banks',
            attractionDesc: 'Scenic riverside area perfect for picnics and boat rides.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Sahibganj',
            description: 'Historic district with Mughal heritage and river views.',
            attraction: 'Rajmahal Hills',
            attractionDesc: 'Ancient hills with archaeological significance and panoramic views.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Pakur',
            description: 'Border district known for stone quarrying and rural tourism.',
            attraction: 'Pakur Stone Quarries',
            attractionDesc: 'Unique geological formations and stone quarrying sites.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Dumka',
            description: 'Cultural center of Santal tribe with rich traditions.',
            attraction: 'Masanjor Dam',
            attractionDesc: 'Large reservoir with water sports and fishing opportunities.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Jamtara',
            description: 'Rural district known for agriculture and simplicity.',
            attraction: 'Jamtara Countryside',
            attractionDesc: 'Rural landscapes perfect for experiencing village life and agriculture.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Chatra',
            description: 'District with historical significance and natural beauty.',
            attraction: 'Kauleshwari Devi Temple',
            attractionDesc: 'Ancient temple complex with religious and archaeological importance.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Koderma',
            description: 'Known for mica mining and religious sites.',
            attraction: 'Tilaiya Dam',
            attractionDesc: 'Multi-purpose dam with boating facilities and scenic surroundings.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Gumla',
            description: 'Tribal district with rich cultural heritage.',
            attraction: 'Gumla Church',
            attractionDesc: 'Historic church showcasing colonial architecture and local history.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Lohardaga',
            description: 'Historic district with tribal culture and natural beauty.',
            attraction: 'Netarhat',
            attractionDesc: 'Hill station known as the "Queen of Chotanagpur" with sunrise views.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking',
            secondaryBooking: 'https://www.jharkhandtourism.gov.in/destination/netarhat'
        },
        {
            name: 'Simdega',
            description: 'Scenic district with waterfalls and tribal heritage.',
            attraction: 'Joghra Falls',
            attractionDesc: 'Beautiful waterfall surrounded by dense forests and natural pools.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Khunti',
            description: 'Known for its connection to tribal hero Birsa Munda.',
            attraction: 'Birsa Munda Memorial',
            attractionDesc: 'Memorial dedicated to the legendary tribal freedom fighter.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Seraikela-Kharsawan',
            description: 'Known for Chhau dance and royal heritage.',
            attraction: 'Seraikela Palace',
            attractionDesc: 'Royal palace showcasing traditional architecture and Chhau dance heritage.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        },
        {
            name: 'Ramgarh',
            description: 'Known for coal mining and natural scenery.',
            attraction: 'Ramgarh Lake',
            attractionDesc: 'Scenic lake with boating facilities and peaceful surroundings.',
            bookingUrl: 'https://tourism.jharkhand.gov.in/hotelBooking'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-green-700 mb-8 font-serif">Places Explorer - Jharkhand Districts</h2>
                <p className="text-center text-gray-600 mb-12 text-lg">Discover the hidden gems across all districts of Jharkhand</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {districts.map((district, index) => (
                        <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                            <div className="mb-4">
                                <h3 className="text-2xl font-bold text-green-700 mb-2">{district.name}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{district.description}</p>
                            </div>
                            
                            <div className="mb-6">
                                <h4 className="text-lg font-bold text-blue-600 mb-2">{district.attraction}</h4>
                                <p className="text-gray-700 text-sm leading-relaxed">{district.attractionDesc}</p>
                            </div>
                            
                            <div className="space-y-3">
                                <a
                                    href={district.bookingUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg text-center transition-all duration-200 transform hover:scale-105 shadow-md"
                                >
                                    Book Stay
                                </a>
                                
                                {district.secondaryBooking && (
                                    <a
                                        href={district.secondaryBooking}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-bold py-2 px-6 rounded-lg text-center transition-all duration-200 transform hover:scale-105 shadow-md text-sm"
                                    >
                                        More Info
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="mt-12 text-center">
                    <p className="text-gray-600 text-sm">
                        All bookings are processed through the official Jharkhand Tourism portal
                    </p>
                </div>
            </div>
        </div>
    );
};