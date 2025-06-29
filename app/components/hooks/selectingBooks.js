'use client';

import { useState } from 'react';
import allBooks from '@/app/data/booksInfo.json';

export const selectingBooks = ({ quizAnswers, totalQuestions }) => {

    const [recommendedBooks, setRecommendedBooks] = useState(null);
    const [loadingRecommendations, setLoadingRecommendations] = useState(false);
    const [recommendationError, setRecommendationError] = useState(null);
    const [isError, setIsError] = useState(false)

    // för att visa och stänga felmeddelanden
    const toggleIsError = () => {
        setIsError(!isError)
    }

    // När alla frågor svartas och användaren avslutat quizen så körs denna funktion
    const handleShowResults = async () => {
        if (quizAnswers.length === 0) {
            toggleIsError()
            return;
        } else if (quizAnswers.length < totalQuestions) {
            toggleIsError()
            return;
        }

        setLoadingRecommendations(true);
        setRecommendationError(null);

        try {
            // making a call to the backend
            const response = await fetch('/api/recommend-books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userPreferences: quizAnswers, allBooks: allBooks }),
            });

            // not successful response
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Något gick fel vid hämtning av rekommendationer.');
            }

            // response was successful
            const data = await response.json();
            setRecommendedBooks(data);

        } catch (error) {
            console.error('Error fetching recommendations:', error);
            setRecommendationError(error.message);
            alert(`Fel vid hämtning av rekommendationer: ${error.message}`);
        } finally {
            setLoadingRecommendations(false);
        }
    };

    return {
        handleShowResults,
        recommendedBooks,
        loadingRecommendations,
        recommendationError,
        isError,
        toggleIsError
    };
};