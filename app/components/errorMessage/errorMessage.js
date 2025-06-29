import React from 'react';

const ErrorMessage = ({ message, onDismiss, title = "Ojdå, något gick fel!" }) => {
    return (
        <div className="fixed top-0 left-0 h-full w-full flex flex-col justify-center items-center bg-black/85 z-[100]">
            <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm sm:max-w-md w-11/12 text-center transform transition-all duration-300 scale-95 opacity-0 animate-scaleIn">
                <div className="mb-4 flex justify-center">
                    <svg
                        className="w-16 h-16 text-red-500" // Använd en stark röd färg för fel
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </div>

                <h3 className="text-2xl font-bold text-black mb-2">
                    {title}
                </h3>

                <p className="text-dark-gray text-base mb-6">
                    {message || "Ett okänt fel har inträffat. Försök igen eller kontakta support om problemet kvarstår."}
                </p>

                <button
                    onClick={onDismiss}
                    className="px-6 py-3 bg-accent-dark bg-black text-white font-semibold rounded-lg shadow-md
                     hover:bg-accent-light transition-colors duration-200
                     focus:outline-none focus:ring-2 focus:ring-accent-dark focus:ring-opacity-75"
                >
                    Förstått
                </button>
            </div>

        </div>
    );
};

export default ErrorMessage;
