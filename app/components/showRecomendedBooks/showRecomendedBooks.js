'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import bookInfo from '../../data/booksInfo';

const RecommendedBooksDisplay = ({ recommendedBooks }) => {
    const [enrichedBooks, setEnrichedBooks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (recommendedBooks && recommendedBooks.length > 0) {
            // Hämtar Böckerna baserat på id:et från LLM
            const matchedBooks = recommendedBooks.map(recBook => {
                const fullBook = bookInfo.find(book => book.id === recBook.id);
                if (fullBook) {
                    return {
                        ...fullBook,
                        motivation: recBook.motivation
                    };
                }
                return null;
                // .filter(Boolean) används för att filltrera bort om det fanns vissa böcker som ite existerade ochv i därför fick null istället för en extra bok
            }).filter(Boolean);
            setEnrichedBooks(matchedBooks);
            setCurrentIndex(0);
        } else {
            setEnrichedBooks([]);
        }
    }, [recommendedBooks]);

    const handleNextBook = () => {
        // "% enrichedBooks.length" används för att det ska gå tillbaka till 0 när de översteger gränsen
        setCurrentIndex((prevIndex) => (prevIndex + 1) % enrichedBooks.length);
    };

    const handlePreviousBook = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + enrichedBooks.length) % enrichedBooks.length);
    };

    if (!recommendedBooks || recommendedBooks.length === 0) {
        return (
            <div className="text-center p-8 text-gray-700">
                <p>Inga bokrekommendationer att visa just nu. Vänligen svara på frågorna för att få rekommendationer!</p>
                <button
                    // onClick={onResetQuiz} Not Yet Implemented
                    className="mt-4 px-6 py-3 bg-[#7E57C2] text-white rounded-lg shadow-md hover:bg-[#673AB7] transition-colors"
                >
                    Starta Quiz igen
                </button>
            </div>
        );
    }

    const currentBook = enrichedBooks[currentIndex];

    return (
        <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2A2A2A] mb-8 text-center tracking-tight">
                Din perfekta läsning
            </h2>

            {currentBook && (
                <div className="book-card-sleek bg-white border border-[#E0E0E0] rounded-lg shadow-xl overflow-hidden flex flex-col md:flex-row animate-fade-in transition-transform duration-300 hover:scale-[1.01]">
                    <div className="relative w-full md:w-2/5 aspect-[2/3] overflow-hidden flex-shrink-0">
                        {currentBook.image ? (
                            <Image
                                src={`/images/books/${currentBook.image}`}
                                alt={currentBook.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                                onError={(e) => { e.target.src = 'https://placehold.co/400x600/E0E0E0/4A4A4A?text=No+Image'; }}
                            />
                        ) : (
                            <div className="w-full h-full bg-[#E0E0E0] flex items-center justify-center text-[#4A4A4A] text-center text-sm rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                                Ingen bild tillgänglig
                            </div>
                        )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow md:w-3/5">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#673AB7] mb-2 leading-tight">
                            {currentBook.title}
                        </h3>
                        <p className="text-[#4A4A4A] text-lg mb-4 italic">
                            av {currentBook.author}
                        </p>
                        <p className="text-[#2A2A2A] text-base mb-6 leading-relaxed line-clamp-6">
                            {currentBook.description}
                        </p>
                        <div className="mt-auto pt-4 border-t border-gray-100">
                            <p className="text-[#7E57C2] text-sm italic mb-4">
                                Varför du kommer att gilla den: {currentBook.motivation}
                            </p>
                            <a
                                href={currentBook.amazon_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full text-center px-6 py-3
                                 bg-[#673AB7] text-white font-semibold rounded-md
                                 hover:bg-[#7E57C2] transition-colors duration-200
                                 shadow-md hover:shadow-lg text-lg"
                            >
                                Köp boken på Amazon
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {enrichedBooks.length > 1 && (
                <div className="flex flex-col justify-center items-center mt-10 space-y-6">
                    <button
                        onClick={handlePreviousBook}
                        className="px-5 py-2 bg-[#F0F0F0] text-[#4A4A4A] rounded-full shadow-md
                         hover:bg-[#E0E0E0] transition-colors font-medium flex items-center group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Föregående
                    </button>
                    <span className="text-xl font-bold text-[#2A2A2A]">
                        {currentIndex + 1} / {enrichedBooks.length}
                    </span>
                    <button
                        onClick={handleNextBook}
                        className="px-5 py-2 bg-[#F0F0F0] text-[#4A4A4A] rounded-full shadow-md
                         hover:bg-[#E0E0E0] transition-colors font-medium flex items-center group"
                    >
                        Nästa
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}

            <div className="text-center mt-12">
                <button
                    onClick={() => {window.location.reload();}}
                    className="px-8 py-3 bg-[#4A4A4A] text-white rounded-lg shadow-md
                     hover:bg-[#2A2A2A] transition-colors font-semibold text-lg"
                >
                    Gör quizet igen
                </button>
            </div>
        </div>
    );
};

export default RecommendedBooksDisplay;