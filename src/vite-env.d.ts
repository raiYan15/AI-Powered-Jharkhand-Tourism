/// <reference types="vite/client" />
/// <reference types="@react-three/fiber/native" />

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  // add more env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extend @react-three/fiber for Three.js JSX elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      group: any;
      mesh: any;
      sphereGeometry: any;
      ringGeometry: any;
      meshBasicMaterial: any;
      ambientLight: any;
      directionalLight: any;
    }
  }
}
