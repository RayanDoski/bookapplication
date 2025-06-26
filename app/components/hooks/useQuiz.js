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
    const isLastStep = currentQuestionIndex === totalQuestions; // Kanske bör vara currentQuestionIndex === totalQuestions -1 för att vara sista frågan om du inte visar en "slut-sida"

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