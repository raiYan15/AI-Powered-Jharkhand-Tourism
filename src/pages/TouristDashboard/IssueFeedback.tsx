import React, { useState } from 'react';

export const IssueFeedback: React.FC = () => {
    const [feedback, setFeedback] = useState<string>('');

    const handleSubmitFeedback = () => {
        // Logic to submit feedback
        console.log('Feedback submitted:', feedback);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Issue & Feedback</h2>
            <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Describe your issue or feedback..."
                className="w-full h-40 p-2 border rounded"
            />
            <button onClick={handleSubmitFeedback} className="mt-4 bg-brand-green text-white py-2 px-4 rounded">
                Submit Feedback
            </button>
        </div>
    );
};