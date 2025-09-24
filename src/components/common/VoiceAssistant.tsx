import React, { useEffect, useRef } from 'react';

interface VoiceAssistantProps {
  onResult: (text: string) => void;
  lang?: string;
}

export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ onResult, lang = 'en-IN' }) => {
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Sorry, your browser does not support speech recognition.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
      isListeningRef.current = false;
    };
    recognition.onerror = () => {
      isListeningRef.current = false;
    };
    recognition.onend = () => {
      isListeningRef.current = false;
    };
  }, [lang, onResult]);

  const startListening = () => {
    if (recognitionRef.current && !isListeningRef.current) {
      recognitionRef.current.start();
      isListeningRef.current = true;
    }
  };

  return (
    <button
      type="button"
      onClick={startListening}
      className="ml-2 p-2 rounded-full bg-green-100 hover:bg-green-200 border border-green-400 text-green-700 focus:outline-none"
      title="Speak"
      aria-label="Voice Input"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75v1.5m0 0h3.375m-3.375 0H8.625m7.125-7.125a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z" />
      </svg>
    </button>
  );
};
