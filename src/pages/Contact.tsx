import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MissionSection from "../components/MissionSection"
import { Mail } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send to Formspree
    const res = await fetch("https://formspree.io/f/xblgpezp", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } else {
      alert("There was an error submitting the form. Please try again.");
    }
  };

  return (
    <section>
      <Helmet>
              <title>Contact | Jharkhand Tourism Guide</title>
              <meta name="description" content="Explore Jharkhand's beautiful districts, tourist places, helplines and travel info in one place." />
              <meta name="keywords" content={`Jharkhand, tourism, travel`} />
              <meta name="robots" content="index, follow" />
              
              <meta property="og:title" content="Jharkhand Tourism Guide | Home" />
              <meta property="og:description" content="Explore Jharkhand's beautiful districts, tourist places, helplines and travel info in one place." />
              <meta property="og:image" content="http://jharkhand.sbs/images/places/324231134_183657027598723_50202459.jpeg" />
              <meta property="og:type" content="article" />
              <meta property="og:url" content="https://jharkhand.sbs/" />
              <link rel="canonical" href="https://jharkhand.sbs/" />
            </Helmet>
  <Header />

  <div className="min-h-screen bg-peach-50 px-4 py-12 flex items-center justify-center">
    <div className="flex flex-col lg:flex-row gap-10 max-w-6xl w-full items-center justify-center">
      
      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-xl animate-fade-in-up">
        <h2 className="text-3xl font-bold text-peach-700 mb-6 text-center">Contact Us</h2>

        {submitted ? (
          <div className="text-green-600 text-center font-semibold">Thank you! Your message has been sent.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-peach-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-peach-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-peach-500"
                required
              />
            </div>
            <div>
              <label className="block text-peach-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-peach-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-peach-500"
                required
              />
            </div>
            <div>
              <label className="block text-peach-700 font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full border border-peach-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-peach-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-peach-600 hover:bg-peach-700 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition-all"
            >
              Send Message
            </button>
          </form>
        )}
      </div>

      {/* Email Card */}
      <div className="bg-peach-50 p-6 rounded-2xl shadow-md w-full max-w-sm text-center border border-peach-200 animate-fade-in-up">
        <div className="flex justify-center mb-4">
          <div className="bg-peach-100 p-4 rounded-full shadow-inner">
            <Mail className="text-peach-600 w-8 h-8" />
          </div>
        </div>
        <h3 className="text-2xl font-semibold text-peach-700 mb-2">Email Us Directly</h3>
        <p className="text-peach-600 mb-4">Have questions? Reach out any time:</p>
        <a
          href="mailto:sahilking9202@gmail.com"
          className="text-peach-500 font-medium underline hover:text-peach-600 transition duration-300"
        >
          sahilking9202@gmail.com
        </a>
      </div>

    </div>
  </div>
  <MissionSection />
  <Footer />
</section>

  );
}
