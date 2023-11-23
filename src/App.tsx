import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { PlayQuiz, ReviewQuiz } from "./pages";
import { reviewQuizzesIndex } from "./assets/reviewQuizzes";

function App() {
  // 復習が必要な問題を数字で管理する、そのために問題を解くページには更新関数を与えてる
  const [reviewQuizzes, setReviewQuizzes] =
    useState<number[]>(reviewQuizzesIndex);

  const [QuizIndex, setQuizIndex] = useState<number>(0);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PlayQuiz
              setReviewQuizzes={setReviewQuizzes}
              QuizIndex={QuizIndex}
              setQuizIndex={setQuizIndex}
            />
          }
        />

        <Route
          path="/ReviewQuiz"
          element={
            <ReviewQuiz
              reviewQuizzes={reviewQuizzes}
              setReviewQuizzes={setReviewQuizzes}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
