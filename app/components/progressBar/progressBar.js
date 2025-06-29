const ProgressBar = ({ progress, onNext, onPrevious, isFirstQuestion, isLastQuestion }) => {
    return (
        <div className="w-full max-w-lg p-6 mx-auto">
            <h2 className="text-center text-2xl font-semibold mb-6 text-[var(--black)]">
                {progress}% Klar
            </h2>
            <div className="flex items-center w-full">
                <button
                    onClick={onPrevious}
                    className="flex items-center justify-center p-2 rounded-full bg-[var(--black)] text-[var(--white)] hover:bg-[var(--accent-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isFirstQuestion}
                    aria-label="Föregående fråga"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                <div className="flex-grow mx-4 h-6 bg-[var(--light-gray)] rounded-full overflow-hidden border border-[var(--dark-gray)]">
                    <div
                        className="h-full bg-[var(--accent-light)] rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                        role="progressbar"
                        aria-valuenow={progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                    ></div>
                </div>
                <button
                    onClick={onNext}
                    className="flex items-center justify-center p-2 rounded-full bg-[var(--black)] text-[var(--white)] hover:bg-[var(--accent-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-light)] focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLastQuestion}
                    aria-label="Nästa fråga"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ProgressBar;