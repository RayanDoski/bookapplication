'use client';

import { useQuiz } from './components/hooks/useQuiz';
import ProgressBar from './components/progressBar/progressBar';
import Navigation from './components/navigation/navigation';
import QuestionCard from './components/questions/questions';
import OpenQuiz from './components/openQuiz/openQuiz';
import FinishQuiz from './components/finishQuiz/finishQuiz';

export default function Home() {
  const {
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
  } = useQuiz();

  // Anpassa main content
  let mainContent;
  if (!quizStarted) {
    mainContent = (
      <div className='flex flex-col justify-center items-center flex-grow'>
        <OpenQuiz start={handleStartQuiz} />
      </div>
    );
  } else if (isLastStep) {
    mainContent = (
      <div className='flex flex-col flex-grow items-center'>
        <ProgressBar
          progress={progress}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastStep}
        />
        <FinishQuiz answers={quizAnswers} allQuestions={totalQuestions} />
      </div>
    );
  } else {
    const currentQuestion = allQuizQuestions[currentQuestionIndex];
    mainContent = (
      <div className='flex flex-col flex-grow items-center gap-16'>
        <ProgressBar
          progress={progress}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastStep}
        />
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          onAnswerSelected={handleAnswerSelected}
          allAnwers={quizAnswers}
        />
      </div>
    );
  }

  return (
    <div className='relative flex flex-col min-h-screen'>

      {mainContent}

      <div className='fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg'>
        <Navigation
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastStep}
        />
      </div>
    </div>
  );
}