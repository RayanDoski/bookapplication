'use client';

import { useQuiz } from './components/hooks/useQuiz';
import { selectingBooks } from './components/hooks/selectingBooks';
import ProgressBar from './components/progressBar/progressBar';
import Navigation from './components/navigation/navigation';
import QuestionCard from './components/questions/questions';
import OpenQuiz from './components/openQuiz/openQuiz';
import FinishQuiz from './components/finishQuiz/finishQuiz';
import Spinner from './components/spinner/spinner'
import ShowRecomendedBooks from './components/showRecomendedBooks/showRecomendedBooks'
import ErrorMessage from './components/errorMessage/errorMessage';

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

  const {
    handleShowResults,
    recommendedBooks,
    loadingRecommendations,
    recommendationError,
    isError,
    toggleIsError
  } = selectingBooks({ quizAnswers, totalQuestions });

  console.log("quizAnswers inside Home: ", quizAnswers)
  console.log("totalQuestions inside Home ", totalQuestions)

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
        {!recommendedBooks ? (
          <>
            <ProgressBar
              progress={progress}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isFirstQuestion={isFirstQuestion}
              isLastQuestion={isLastStep}
            />
            <FinishQuiz handleShowResults={handleShowResults} />
          </>
        ) : (
          <ShowRecomendedBooks recommendedBooks={recommendedBooks} />
        )}
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
    <>
      {isError && <ErrorMessage message={'Du har inte svarat på allt, gå tillbaka och dubellkolla alla dina svar, Tack!'} onDismiss={toggleIsError} />}
      {loadingRecommendations && <Spinner message={'Laddar...'} />}
      <div className='relative flex flex-col min-h-screen'>

        {mainContent}

        {/* <Navigation
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirstQuestion={isFirstQuestion}
          isLastQuestion={isLastStep}
        /> */}
      </div>
    </>
  );
}