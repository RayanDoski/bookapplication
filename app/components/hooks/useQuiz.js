'use client';

import { useState } from 'react';
import allQuizQuestions from '@/app/data/quizData.json';

export const useQuiz = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizAnswers, setQuizAnswers] = useState([]);

    const totalQuestions = allQuizQuestions.length;
    const progress = Math.round((currentQuestionIndex / totalQuestions) * 100);
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastStep = currentQuestionIndex === totalQuestions;

    // när de väljer att starta så körs denna funktion
    const handleStartQuiz = () => {
        setQuizStarted(true);
        setCurrentQuestionIndex(0);
        setQuizAnswers([]);
    };


    const handleAnswerSelected = (newAnswer) => {
        setQuizAnswers(currentAnswers => {
            const otherAnswers = currentAnswers.filter(
                answer => answer.question !== newAnswer.question
            );
            return [...otherAnswers, newAnswer];
        });

        // denna timout ligger då de kan se svaret de valt i .25 sekunder innan de först vidare
        setTimeout(() => {
            handleNext();
        }, 250);
    };

    const handleNext = () => {
        setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, totalQuestions));
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    return {
        quizStarted,
        currentQuestionIndex,
        quizAnswers,
        totalQuestions,
        progress,
        isFirstQuestion,
        isLastStep,
        allQuizQuestions,
        handleStartQuiz,
        handleAnswerSelected,
        handleNext,
        handlePrevious,
    };
};