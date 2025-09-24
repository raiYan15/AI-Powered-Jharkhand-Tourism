import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from "../components/Header"; // Ensure this path is correct
import Footer from "../components/Footer"; // Ensure this path is correct

const translations = {
    en: {
        loginTab: "Login",
        signupTab: "Sign Up",
        email: "Enter your email",
        password: "Enter your password",
        loginBtn: "🔐 Login",
        noAccount: "Don't have an account?",
        toSignup: "Sign up here",
        name: "Enter your full name",
        confirmPass: "Confirm your password",
        phone: "Enter your phone number",
        altphone: "Alternative phone number",
        address: "Enter your full address",
        city: "Enter your city",
        country: "Enter your country",
        aadhaar: "Aadhaar Number (Optional)",
        photo: "Upload Photo for Face Authentication:",
        signupBtn: "✅ Sign Up",
        alreadyAccount: "Already have an account?",
        toLogin: "Login here"
    },
    hi: {
        loginTab: "लॉगिन",
        signupTab: "साइन अप करें",
        email: "ईमेल",
        password: "पासवर्ड",
        loginBtn: "लॉग इन करें",
        noAccount: "क्या आपके पास खाता नहीं है?",
        toSignup: "यहां साइन अप करें",
        name: "पूरा नाम",
        confirmPass: "पासवर्ड की पुष्टि करें",
        phone: "फोन नंबर",
        altphone: "वैकल्पिक फोन",
        address: "पता",
        city: "शहर",
        country: "देश",
        dob: "जन्म तिथि",
        aadhaar: "आधार संख्या",
        photo: "प्रोफ़ाइल फ़ोटो",
        signupBtn: "पंजीकरण करें",
        alreadyAccount: "क्या आपके पास पहले से एक खाता है?",
        toLogin: "यहां लॉगिन करें",
    },
    // Add other languages here...
};

const TouristSignup: React.FC = () => {
    const [formType, setFormType] = useState<'login' | 'signup'>('login');
    const [language, setLanguage] = useState('en');
    const [t, setT] = useState(translations.en);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        setT({ ...translations.en, ...(translations[language] || {}) });
    }, [language]);

    const showLogin = () => setFormType('login');
    const showSignup = () => setFormType('signup');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically validate the credentials
        // For now, we will just redirect to the dashboard
        navigate('/dashboard'); // Redirect to the dashboard
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement signup logic here
        // For now, we will just redirect to the dashboard
        navigate('/dashboard'); // Redirect to the dashboard after signup
    };

    const FormInput: React.FC<{ id: string; type?: string; placeholder: string; required?: boolean }> = ({ id, type = 'text', placeholder, required = true }) => (
        <div className="mb-3 text-left">
            <input 
                type={type} 
                id={id} 
                placeholder={placeholder} 
                required={required} 
                className="w-full p-2.5 border border-gray-400 rounded-md bg-white/80 focus:ring-2 focus:ring-brand-green-light focus:outline-none"
            />
        </div>
    );
    
    return (
        <div className="bg-[#fdf8f3] min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-lg bg-green-50 p-10 rounded-2xl shadow-xl text-center border border-green-200">
                    <h2 className="text-3xl font-bold font-serif text-brand-green mb-6">🌳 Tourist Portal</h2>
                    <div className="my-4">
                        <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)} className="p-2 rounded-md bg-gray-100 border border-gray-300">
                            <option value="en">English</option>
                            <option value="hi">हिन्दी</option>
                            <option value="te">తెలుగు</option>
                            <option value="ta">தமிழ்</option>
                            <option value="ml">മലയാളം</option>
                            <option value="kn">ಕನ್ನಡ</option>
                            <option value="bn">বাংলা</option>
                            <option value="mr">मराठी</option>
                        </select>
                    </div>
                    <div className="flex mb-6 rounded-lg overflow-hidden border border-gray-300">
                        <button 
                            onClick={showLogin} 
                            className={`flex-1 py-3 font-bold transition-colors duration-300 ${formType === 'login' ? 'bg-brand-green-light text-white' : 'bg-gray-100 text-brand-green hover:bg-gray-200'}`}
                        >
                            {t.loginTab}
                        </button>
                        <button 
                            onClick={showSignup}
                            className={`flex-1 py-3 font-bold transition-colors duration-300 ${formType === 'signup' ? 'bg-brand-green-light text-white' : 'bg-gray-100 text-brand-green hover:bg-gray-200'}`}
                        >
                            {t.signupTab}
                        </button>
                    </div>
                    {formType === 'login' ? (
                        <form onSubmit={handleLogin}> {/* Add onSubmit handler */}
                            <FormInput id="login-email" type="email" placeholder={t.email} />
                            <FormInput id="login-pass" type="password" placeholder={t.password} />
                            <div className="flex gap-4">
                                <button type="submit" className="flex-1 bg-brand-green-light text-white py-3 rounded-md font-bold hover:bg-brand-green transition-colors">{t.loginBtn || "Login"}</button>
                                <button type="reset" className="flex-1 bg-gray-200 text-brand-green py-3 rounded-md font-bold hover:bg-gray-300 transition-colors">Reset</button>
                            </div>
                            <div className="mt-4 text-sm">
                                <span>{t.noAccount} </span>
                                <a href="#" onClick={showSignup} className="font-bold text-brand-green hover:underline">{t.toSignup}</a>
                            </div>
                        </form>
                    ) : (
                        <form onSubmit={handleSignup}> {/* Add onSubmit handler for signup */}
                            <FormInput id="name" placeholder={t.name} />
                            <FormInput id="email" type="email" placeholder={t.email} />
                            <FormInput id="pass" type="password" placeholder={t.password} />
                            <FormInput id="cpass" type="password" placeholder={t.confirmPass} />
                            <FormInput id="phone" type="tel" placeholder={t.phone} />
                            <FormInput id="altphone" type="tel" placeholder={t.altphone} required={false} />
                            <FormInput id="address" placeholder={t.address} />
                            <FormInput id="city" placeholder={t.city} />
                            <FormInput id="country" placeholder={t.country} />
                            <FormInput id="dob" type="date" placeholder="" />
                            <div className="mb-3 text-left">
                                <select id="tour" className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-100 focus:ring-2 focus:ring-brand-green-light focus:outline-none">
                                    <option value="">Select preferred tour type</option>
                                    <option>Adventure</option>
                                    <option>Historical</option>
                                    <option>Nature</option>
                                    <option>Cultural</option>
                                </select>
                            </div>
                            <FormInput id="aadhaar" placeholder={t.aadhaar} required={false} />
                            <div className="mb-3 text-left">
                                <label className="text-sm text-brand-green font-medium mb-1 block">{t.photo}</label>
                                <input type="file" className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-sand file:text-brand-green hover:file:bg-brand-earth/50"/>
                            </div>
                            <div className="flex gap-4">
                                <button type="submit" className="flex-1 bg-brand-green-light text-white py-3 rounded-md font-bold hover:bg-brand-green transition-colors">{t.signupBtn || "Sign Up"}</button>
                                <button type="reset" className="flex-1 bg-gray-200 text-brand-green py-3 rounded-md font-bold hover:bg-gray-300 transition-colors">Reset</button>
                            </div>
                            <div className="mt-4 text-sm">
                                <span>{t.alreadyAccount} </span>
                                <a href="#" onClick={showLogin} className="font-bold text-brand-green hover:underline">{t.toLogin}</a>
                            </div>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TouristSignup;

