import React from "react";

const helplines = [
  {
    label: "Tourist Information Center",
    phone: "0651-2400496",
  },
  {
    label: "Jharkhand Tourism Office",
    phone: "0651-2331828",
  },
  {
    label: "Emergency Services (Dial 112)",
    phone: "112",
  },
  {
    label: "Police Helpline",
    phone: "100",
  },
  {
    label: "Ambulance",
    phone: "102",
  },
  {
    label: "Railway Enquiry",
    phone: "139",
  },
];

const Helplines = () => {
  return (
    <section className="py-12 bg-peach-100">
      <h2 className="text-3xl font-bold text-center text-peach-600 mb-8">Emergency & Tourism Helplines</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 px-6">
        {helplines.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-peach-300 rounded-xl p-6 shadow hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-peach-800">{item.label}</h3>
            <a
              href={`tel:${item.phone}`}
              className="text-peach-600 hover:text-peach-600 mt-2 inline-block"
            >
              📞 {item.phone}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Helplines;
