# AI-Powered Jharkhand Tourism Plus

A Smart India Hackathon 2025 project by Team VU-HACKITECTS

## Problem Statement

**Title:** Development of a Smart Digital Platform to Promote Eco Cultural Tourism in Jharkhand

**Theme:** Travel and Tourism  
**Category:** Software Solution  
**Problem Statement ID:** 25032

## Overview

Jharkhand, with its rich biodiversity, ancient heritage, and vibrant tribal culture, is a treasure trove for tourists and history enthusiasts. The state boasts lush forests, majestic waterfalls, and culturally significant destinations such as Betla, Hundru, Dassam, Patratu, Parasnath, Baidyanath Dham, Jonha, Maithon, and Rajrappa. Despite its immense potential, the region faces challenges in digital engagement and awareness among prospective travelers. This project aims to address that gap with an innovative, AI-enhanced tourism platform.

## Proposed Solution

The project delivers a user-friendly web platform integrating:
- AI-powered personalized recommendation engine for destinations, activities, and itineraries
- Interactive landing page with dynamic content highlights of top eco-cultural spots
- Emergency helpline access and essential information (UX standards: 112, 1363, rail139)
- Multilingual interfaces for diverse accessibility
- Integration of local art, culture, and event updates to foster immersive experiences  
- Comprehensive compendium of tourism services for seamless trip planning

## Technical Approach

- Responsive web application using modern front-end frameworks
- Backend with scalable cloud architecture for AI modules
- API integration for tourism data, maps, emergency contacts, and event updates
- Focus on accessibility (multilingual UI, mobile-first design)
- KPIs and governance dashboards aligned with state tourism survey and award guidelines

## Impact and Benefits

- Enhanced tourist engagement and satisfaction
- Increased visibility for lesser-known destinations and local artisans
- Real-time, AI-driven assistance for safer, smarter travel
- Scalable foundation supporting future smart tourism initiatives

## Reference Destinations

- Netarhat
- Betla
- Hundru
- Dassam
- Patratu
- Parasnath
- Baidyanath Dham
- Jonha
- Maithon
- Rajrappa

## References

- [Jharkhand Tourism Official Portal](https://tourism.jharkhand.gov.in/historic-jharkhand)
- [Pickyourtrail Guide to Jharkhand Tourism](https://pickyourtrail.com/indian-tourism/jharkhand)
- [Jharkhand Tourism Gallery](https://tourism.jharkhand.gov.in/gallery)
- Emergency Contact Standards: 112 (national), 1363 (tourist helpline), rail139



[![React](https://img.shields.io/badge/React-18.0+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-AR/VR-green.svg)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4.svg)](https://tailwindcss.com/)

An immersive AI-powered eco-cultural tourism platform showcasing the breathtaking destinations of Jharkhand with cutting-edge **360° Augmented Reality** and **Virtual Reality** experiences.

## 🚀 Features

### 🌟 Core Features
- 🗺️ **Interactive Tourism Map** - Explore all 24 districts of Jharkhand
- 📍 **Destination Discovery** - Detailed information about tourist attractions
- 🌐 **Multi-language Support** - Hindi and English localization
- 📱 **Responsive Design** - Optimized for mobile, tablet, and desktop
- 🎨 **Modern UI/UX** - Beautiful animations and glass morphism design

### 🎯 Advanced AR/VR Features
- 🌐 **360° Panoramic Views** - Immersive spherical experiences of destinations
- 📷 **Augmented Reality Camera** - Overlay digital content in real space
- 🎯 **Interactive 3D Hotspots** - Clickable information points in 3D space
- 📱 **Device Motion Controls** - Gyroscope and accelerometer support
- 🥽 **WebXR Support** - Compatible with VR headsets
- ⚡ **Three.js Integration** - High-performance 3D rendering

## 🛠️ Technology Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + Custom CSS
- **3D Graphics:** Three.js + @react-three/fiber + @react-three/drei
- **AR/VR:** WebXR API + Device Orientation API
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Internationalization:** react-i18next
- **Routing:** React Router DOM
- **Build Tool:** Vite
- **Package Manager:** npm

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Modern web browser with WebGL support
- Camera access for AR features (optional)

### Installation

1. **Navigate to project directory**
   ```bash
   cd jharkhand-tourism
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
npm run preview
```

## 📱 Device Compatibility

- **📱 Mobile Devices:** Full AR and 360° support with device orientation
- **💻 Desktop/Laptop:** 360° panoramic views with mouse controls
- **📟 VR Headsets:** Enhanced immersive experience with WebXR
- **🔗 Web Browsers:** Chrome, Firefox, Safari, Edge (WebGL support required)

## 🎮 360° AR Experience

### AR Camera Mode
1. Click "AR View" on any destination image
2. Allow camera permissions when prompted
3. Point camera at a flat surface
4. Tap on hotspots for information and bookings

### 360° Panoramic Mode
1. Click "360° View" on any destination image
2. Drag to look around the panoramic view
3. Scroll to zoom in and out
4. Click blue hotspots for detailed information

## 🌍 Featured Destinations

- **Netarhat** - The Queen of Chotanagpur
- **Betla National Park** - Wildlife sanctuary
- **Hundru Falls** - Majestic waterfalls
- **Dassam Falls** - Breathtaking waterfall near Ranchi
- **Patratu Valley** - Scenic landscapes
- **Parasnath Hill** - Jain pilgrimage site
- **Baidyanath Dham** - Spiritual destination
- **Jonha Falls** - Also known as Gautamdhara
- **Maithon Dam** - Engineering marvel
- **Rajrappa** - Historic and religious significance

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── arvr/           # AR/VR specific components
│   │   ├── ARViewer.tsx
│   │   ├── PanoramicViewer.tsx
│   │   └── ImmersiveExperience.tsx
│   ├── common/         # Common components
│   ├── maps/           # Map components
│   └── ...
├── data/               # Static data and configurations
│   ├── arvrData.ts     # AR/VR location data
│   ├── places.json     # Tourism places data
│   └── districts.json  # District information
├── pages/              # Route pages
│   ├── ARDemo.tsx      # AR/VR demo showcase
│   ├── Explore.tsx     # Main exploration page
│   └── ...
├── hooks/              # Custom React hooks
├── services/           # API services
├── styles/             # CSS styles
└── utils/              # Utility functions
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Team

**Team ID:** 111  
**Team Name:** VU-HACKITECTS


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Jharkhand Tourism Department** - For destination information
- **Three.js Community** - For amazing 3D graphics library
- **React Community** - For the excellent framework
- **Open Source Contributors** - For various tools and libraries

---

<div align="center">
  <p>Made with ❤️ for the beautiful state of Jharkhand</p>
  <p>🚀 <strong>Experience tourism like never before with 360° AR technology!</strong> 🚀</p>
</div>
