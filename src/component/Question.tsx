import React, { useEffect, useState } from "react";
import { Question as QuestionType } from ".././app/utils/quizData";

interface QuestionProps extends QuestionType {
  onAnswerSelected: (isCorrect: boolean) => void;
  onNextQuestion: () => void;
  count: number;
}

const Question: React.FC<QuestionProps> = ({
  question,
  options,
  correctAnswer,
  onAnswerSelected,
  onNextQuestion,
  count,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [saveText, setSaveText] = useState<string>("");
  const [isOption, setIsOption] = useState<boolean>(true);

  useEffect(() => {
    setSelectedAnswer(null); // Reset the selected answer when the question changes
    setFeedback(""); // Reset feedback
  }, [question]);

  const handleAnswerSelection = (answer: string | number) => {
    if (count > 4) {
      setSelectedAnswer(saveText);
    }
    else {
      setSelectedAnswer(answer);
    }
    if (answer === correctAnswer) {
      setFeedback("Correct!");
      onAnswerSelected(true);
    } else {
      setFeedback("Incorrect!");
      onAnswerSelected(false);
    }
  };
  const handleNextQuestion = () => {
    setSaveText("")
    onNextQuestion();
    if (count === 4) {
      setIsOption(false)
    }
  };

  const handleChange = (e: any) => {
    setSaveText(e.target.value)
  }

  const handleClick = () => {
    handleAnswerSelection(saveText);
  }

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <h3 className="text-3xl font-bold mb-6">{question}</h3>
      <div className="space-y-4">
        {isOption ? (
          options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelection(option)}
              disabled={selectedAnswer !== null}
              className="w-3/4 py-3 text-3xl flex flex-col font-bold bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none disabled:bg-gray-400"
            >
              {option}
            </button>
          ))
        ) : (
          <>
          <input
            onChange={handleChange}
            type="text"
            className="w-3/4 py-3 text-3xl text-center font-bold mb-4 bg-blue-500 text-red rounded-lg"
          />
          <button onClick={handleClick} className="w-1/3 py-3 text-3xl text-center font-bold mb-4 bg-blue-500 text-red rounded-lg">
            Click
          </button>
          </>
        )}
      </div>
      <div className={`mt-4 text-3xl font-bold ${feedback === "Correct!" ? "text-green-500" : "text-red-500"}`}>{feedback}</div>
      {(
        <button
          onClick={handleNextQuestion}
          className="w-3/4 py-3 text-3xl font-bold bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none mt-6"
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default Question;
