import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string; // Optional className for additional styling
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
    return (
        <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
            {children}
        </div>
    );
};