import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../../types';
import { streamChatResponse } from '../../services/geminiService';
import { Card } from '../../components/common/Card';
import { VoiceAssistant } from '../../components/common/VoiceAssistant';
import { useTranslation } from 'react-i18next';

export const JharkhandChatbot: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [history, setHistory] = useState<ChatMessage[]>([
        { sender: 'ai', text: t('chatbot.greeting') }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
        // Speak the latest AI message
        if (history.length > 0) {
            const lastMsg = history[history.length - 1];
            if (lastMsg.sender === 'ai' && lastMsg.text) {
                const synth = window.speechSynthesis;
                if (synth) {
                    // Cancel any ongoing speech
                    synth.cancel();
                    const utter = new SpeechSynthesisUtterance(lastMsg.text);
                    utter.lang = i18n.language === 'hi' ? 'hi-IN' : 'en-IN';
                    synth.speak(utter);
                }
            }
        }
    }, [history, i18n.language]);

    // Update greeting when language changes
    useEffect(() => {
        setHistory((prev) => {
            if (prev.length === 1 && prev[0].sender === 'ai') {
                return [{ sender: 'ai', text: t('chatbot.greeting') }];
            }
            return prev;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const newUserMessage: ChatMessage = { sender: 'user', text: input };
        setHistory(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);

        const aiResponsePlaceholder: ChatMessage = { sender: 'ai', text: '' };
        setHistory(prev => [...prev, aiResponsePlaceholder]);

        try {
            await streamChatResponse(history, input, (chunk) => {
                setHistory(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage && lastMessage.sender === 'ai') {
                        const updatedMessage = { ...lastMessage, text: lastMessage.text + chunk };
                        return [...prev.slice(0, -1), updatedMessage];
                    }
                    return prev;
                });
            });
        } catch (error) {
            setHistory(prev => {
                const lastMessage = prev[prev.length - 1];
                const updatedMessage = { ...lastMessage, text: t('chatbot.error') };
                return [...prev.slice(0, -1), updatedMessage];
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#e3ffe6] to-[#ffe9d6] py-8">
            <Card className="w-full max-w-2xl flex flex-col h-[70vh] shadow-2xl border border-green-400/40 bg-white/95">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-gradient-to-r from-green-700 to-green-500 rounded-t-lg px-6 py-4 flex items-center gap-3 shadow-md">
                    <span className="text-3xl">🤖</span>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide">
                        {t('chatbot.assistantTitle')}
                    </h2>
                    <div className="ml-auto flex gap-2">
                        <button onClick={() => i18n.changeLanguage('en')} className={`px-2 py-1 rounded text-xs font-semibold ${i18n.language === 'en' ? 'bg-white text-green-700' : 'bg-green-600 text-white'}`}>EN</button>
                        <button onClick={() => i18n.changeLanguage('hi')} className={`px-2 py-1 rounded text-xs font-semibold ${i18n.language === 'hi' ? 'bg-white text-green-700' : 'bg-green-600 text-white'}`}>हिंदी</button>
                    </div>
                </div>
                {/* Chat History */}
                <div
                    ref={chatContainerRef}
                    className="flex-grow overflow-y-auto px-4 py-6 space-y-4 bg-gradient-to-b from-white/90 to-[#e3ffe6]/60"
                >
                    {history.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`relative max-w-[80%] px-5 py-3 rounded-2xl shadow text-base font-medium
                                    ${msg.sender === 'user'
                                        ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-br-none'
                                        : 'bg-gradient-to-r from-green-700 to-green-500 text-white rounded-bl-none border border-green-400/20'}
                                `}
                            >
                                {msg.sender === 'ai' && (
                                    <span className="absolute -top-5 left-0 text-green-700 text-lg">🌳</span>
                                )}
                                {msg.text || <span className="animate-pulse">...</span>}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Input */}
                <div className="flex items-center border-t border-green-400/20 px-4 py-3 bg-white/90 rounded-b-lg">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={t('chatbot.placeholder')}
                        className="flex-grow p-3 rounded-l-lg border-2 border-green-400/40 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-green-900 text-base"
                        disabled={isLoading}
                    />
                    <VoiceAssistant onResult={setInput} lang={i18n.language === 'hi' ? 'hi-IN' : 'en-IN'} />
                    <button
                        onClick={handleSend}
                        disabled={isLoading}
                        className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-r-lg hover:from-orange-600 hover:to-yellow-500 transition-colors disabled:bg-gray-400 flex items-center gap-2"
                        aria-label={t('chatbot.send')}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                        {t('chatbot.send')}
                    </button>
                </div>
            </Card>
        </div>
    );
};