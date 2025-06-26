'use client';

import { useState, useEffect } from 'react';

const openQuiz = ({ start }) => {

    const [isVisible, setIsVisible] = useState(false);

    // Använd useEffect för att ändra opaciteten efter att komponenten har monterats
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

                <h2 className="text-center text-2xl font-bold mb-8">Ta en 40 sekunder QUiz o får reda på vilke book som passar just Dig!</h2>

                <div className='flex justify-center'>
                    <button
                        onClick={start}
                        className="
                                px-8 py-4 rounded-full text-xl font-semibold 
                                bg-[var(--accent-light)] text-[var(--white)] 
                                border-2 border-[var(--dark-gray)] shadow-md
                                transition-all duration-300 transform hover:scale-105 hover:bg-[var(--accent-dark)]
                                focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] focus:ring-opacity-75
                            "
                    >
                        Påbörja Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default openQuiz;