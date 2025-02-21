import { useState } from "react";
import { sampleQuiz, Question } from "../../utils/quizData";
import QuestionComponent from "../../../component/Question";
import Timer from "../../../component/Timer";
import { withRouter } from "next/router";
import { useRouter } from "next/navigation";

interface QuizHistory {
  score: number;
  date: string;
}
const QuizPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [storeId, setStoreId] = useState<number>(0);
  const [history, setHistory] = useState<any>([]);
  const router = useRouter();

  const handleAnswerSelected = (isCorrect: boolean): void => {
    if (isCorrect) setScore(score + 1);
  };

  const handleTimeOut = (): void => {
    setTimeout(() => {
      if (currentQuestionIndex < sampleQuiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setIsQuizComplete(true);
      }
    }, 0);
  };

  const handleNextQuestion = (): void => {
    if (currentQuestionIndex < sampleQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleTotalScore = (): void => {
    setStoreId(()=>storeId + 1)
    const openRequest = indexedDB.open("Storescore", 2); // Incremented version number

    openRequest.onsuccess = (e: any) => {
      const db = openRequest.result;
      const transaction = db.transaction("Finalscore", "readwrite");
      const storeObject = transaction.objectStore("Finalscore");

      const request = storeObject.add({
        id: storeId,
        scores: score,
      });
      let result = storeObject.getAll()
      result.onsuccess = (e: any) => {
        console.log("Score added:", e.target.result);
        setHistory(e.target.result)
      };
      router.push('result')
    };

    openRequest.onupgradeneeded = (e: any) => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains("Finalscore")) {
        const store = db.createObjectStore("Finalscore", { keyPath: "id" });
        store.createIndex("scores", "scores", { unique: false });
      }
    };

    openRequest.onerror = (e: any) => {
      console.error("Error opening database:", e);
    };
  };



  const handleRestartQuiz = (): void => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsQuizComplete(false);
  };

  if (isQuizComplete) {
    return (
      <div className="w-full max-w-md mx-auto text-center my-64">
        <h2 className="text-4xl font-bold mb-6">Quiz Complete!</h2>
        <p className="text-3xl font-bold mb-6">Your Score: {score} / {sampleQuiz.length}</p>
        <button
          onClick={handleRestartQuiz}
          className="w-full py-3 text-3xl font-bold bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none mt-6"
        >
          Restart Quiz
        </button>
        <button
          onClick={handleTotalScore}
          className="w-full py-3 text-3xl font-bold bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none mt-6"
        >
          Analyze the score
        </button>
      </div>
    );
  }

  const currentQuestion = sampleQuiz[currentQuestionIndex];

  return (
    <div className="mt-8 w-full max-w-md mx-auto text-center">
      <h1 className="text-5xl font-bold mb-6">Quiz</h1>
      <Timer key={currentQuestionIndex} duration={30} onTimeOut={handleTimeOut} />
      <QuestionComponent
        question={currentQuestion.question}
        options={currentQuestion.options}
        correctAnswer={currentQuestion.correctAnswer}
        onAnswerSelected={handleAnswerSelected}
        onNextQuestion={handleNextQuestion}
        count={currentQuestionIndex}
      />
    </div>
  );
};

export default QuizPage;
