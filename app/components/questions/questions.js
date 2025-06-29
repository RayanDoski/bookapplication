'use client';

import React, { useState, useEffect } from 'react';

const Questions = ({ question, options, onAnswerSelected, allAnwers }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`
            flex flex-col items-center justify-center p-4 font-inter text-[var(--black)]
            transition-opacity duration-700 ease-in-out
            ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}>
            <div className="w-full max-w-2xl">

                <h2 className="text-center text-2xl font-bold mb-8">
                    {question}
                </h2>

                <div className="grid grid-cols-2">
                    {options.map((option, index) => {
                        // Har de svarat på frågan innan
                        const isSelected = allAnwers && allAnwers.some(answer =>
                            answer.question === question && answer.option === option
                        );

                        return (
                            <button
                                key={index}
                                onClick={() => {
                                    onAnswerSelected({"option": option, "question": question });
                                }}
                                className={`
                                    flex items-center justify-center h-50 p-6 sm:p-8 md:p-10 lg:p-12
                                    text-sm sm:text-2xl font-semibold text-[var(--white)]
                                    border-1 border-[var(--dark-gray)] shadow-md
                                    transition-all duration-200 ease-in-out transform
                                    ${isSelected
                                        ? 'bg-[var(--accent-dark)] scale-80 border-3'
                                        : [
                                            'bg-red-500 hover:bg-red-600',
                                            'bg-yellow-500 hover:bg-yellow-600',
                                            'bg-blue-500 hover:bg-blue-600',
                                            'bg-green-500 hover:bg-green-600'
                                        ][index] || 'bg-[var(--accent-light)] hover:bg-[var(--accent-dark)]'
                                    }
                                `}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Questions;