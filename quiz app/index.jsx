import React, { useState } from "react";

export default function App() {
  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "Berlin", isCorrect: false },
        { answerText: "Madrid", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Rome", isCorrect: false },
      ],
    },
    {
      questionText: "Which is the largest planet in our solar system?",
      answerOptions: [
        { answerText: "Earth", isCorrect: false },
        { answerText: "Jupiter", isCorrect: true },
        { answerText: "Mars", isCorrect: false },
        { answerText: "Venus", isCorrect: false },
      ],
    },
    {
      questionText: "Who developed React.js?",
      answerOptions: [
        { answerText: "Google", isCorrect: false },
        { answerText: "Facebook", isCorrect: true },
        { answerText: "Microsoft", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div style={styles.app}>
      <h1 style={styles.title}>Quiz App</h1>
      {showScore ? (
        <div style={styles.scoreSection}>
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <div style={styles.quizSection}>
          <div style={styles.questionSection}>
            <div style={styles.questionCount}>
              Question {currentQuestion + 1}/{questions.length}
            </div>
            <div style={styles.questionText}>
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div style={styles.answerSection}>
            {questions[currentQuestion].answerOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option.isCorrect)}
                style={styles.button}
              >
                {option.answerText}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    marginTop: "50px",
  },
  title: {
    marginBottom: "20px",
    color: "#333",
  },
  quizSection: {
    display: "inline-block",
    textAlign: "left",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
  },
  questionSection: {
    marginBottom: "20px",
  },
  questionCount: {
    marginBottom: "10px",
    fontWeight: "bold",
  },
  questionText: {
    marginBottom: "15px",
  },
  answerSection: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer",
  },
  scoreSection: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#4CAF50",
  },
};
