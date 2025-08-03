// components/Spinner/Spinner.jsx
import React from 'react';

const Spinner = ({ message = "Laddar..." }) => {
    return (
        <div className="fixed top-0 left-0 h-full max-h-screen w-full max-w-screen flex flex-col justify-center items-center bg-black/85 z-100">
            <div className="spinner"></div>
            <p className="mt-4 text-lg font-medium text-white">
                {message}
            </p>
        </div>
    );
};

export default Spinner;
