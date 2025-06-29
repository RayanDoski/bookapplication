'use client';

import { useState, useEffect } from 'react';

const OpenQuiz = ({ start }) => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className={`
            flex flex-col items-center justify-center p-4 font-inter text-black
            transition-opacity duration-700 ease-in-out
            ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}>
            <div className="w-full max-w-2xl">

                <h2 className="text-center text-2xl font-bold mb-8">
                    Hitta din nästa favoritbok på bara 30 sekunder!
                </h2>

                <div className='flex justify-center'>
                    <button
                        onClick={start}
                        className="
                                px-8 py-4 rounded-full text-xl font-semibold
                                bg-accent-light text-white bg-purple-800
                                border-2 border-dark-gray shadow-md
                                transition-all duration-300 transform hover:scale-105 hover:bg-accent-dark
                                focus:outline-none focus:ring-2 focus:ring-accent-light focus:ring-opacity-75
                            "
                    >
                        Starta bokresan nu!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OpenQuiz;