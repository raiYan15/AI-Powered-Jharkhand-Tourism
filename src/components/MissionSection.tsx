import React from "react";

const logos = [
  { src: "https://amritkaal.nic.in/writereaddata/portal/images/Amritkaal-Logo-03.png", alt: "Amrit Kaal" },
  { src: "https://cdn.digitalindiacorporation.in/wp-content/themes/di-child/assets/images/digital-india.svg.gzip", alt: "Digital India" },
  { src: "https://utsav.gov.in/public/images/logo/Incredible_Logo_1.png", alt: "Incredible India" },
  { src: "http://www.g20.in/en/images/home/g20-logo.png", alt: "G20 India" },
  { src: "https://www.incredibleindia.gov.in/content/dam/incredible-india/images/tfl/Badge.png", alt: "Travel for FiFE" },
  { src: "https://tourism.jharkhand.gov.in/app-assets/image/logo_1.png", alt: "Jharkhand Tourism" },
  { src: "https://utsav.gov.in/public/images/landing-logo2.png.png", alt: "Utsav" },
  { src: "https://cdnbbsr.s3waas.gov.in/s34c144c47ecba6f8318128703ca9e2601/uploads/2020/10/2020100877.jpg", alt: "Beti Bachao Beti Padhao" },
  { src: "https://swachhbharatmission.ddws.gov.in/themes/custom/repo-theme-master/images/swach-bharat.png", alt: "Swachh Bharat Mission" },
];

export default function FooterWithGovtLogos() {
  return (
    <div className="bg-[#fffdf9] border-t border-peach-300">
      <div className="relative overflow-hidden bg-white py-4 shadow-inner">
      <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

      <div className="whitespace-nowrap animate-scroll-x flex w-max ">
        {[...logos, ...logos].map((logo, idx) => (
          <div key={idx} className="flex items-center justify-center px-8">
            <img src={logo.src} alt={logo.alt} className="h-14 w-auto" />
          </div>
        ))}
      </div>
    </div>

      <div className="text-center text-sm px-4 py-6 text-gray-700 space-y-4 max-w-4xl mx-auto">
        <h5 className="text-3xl font-bold text-peach-600">About the Website</h5>
        <p>
          This website is a tourism and awareness initiative <strong></strong>,
          developed to promote <br/> the cultural, natural, and historical heritage of Jharkhand.
        </p>

        <p>
          All government logos used (Azadi Ka Amrit Mahotsav, Digital India, etc.) are the
          property of their respective departments. They are used here under fair usage for
          awareness and informational purposes only.
        </p>

        <p>
          Images used from third-party or government sources belong to their rightful owners.
          <br/>For any copyright concerns, please contact us for removal.
        </p>
      </div>
    </div>
  );
}
