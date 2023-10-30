import { useState, useEffect } from "react";
import "../style/video.css"; // CSSをインポート
import { quizzes } from "../../../assets/quizzes";
import { useVideo, useClickSide } from "../hooks";
import { StartVideoBtn, StopVideoBtn } from "./VideoBtn";
import QuizChoices from "./QuizChoices ";
import QuizWord from "./QuizWord";
import DarkOverlay from "./DarkOverlay";
import BreakTime from "./BreakTime";
import { hideComponentForFixedTime } from "../api";
import { returnNextQuizIndex } from "../../../api";

type Quiz = {
  question: string;
  choices: string[];
  answer: string;
};

function Video() {
  const { videoRef, isVideoPlaying, startVideo, stopVideo } = useVideo();
  const [QuizIndex, setQuizIndex] = useState(0);
  const quizSize: number = quizzes.length;
  const quiz: Quiz = quizzes[QuizIndex];
  const questionWord: string = quiz.question;
  const choices: string[] = quiz.choices;
  const answer: string = quiz.answer;

  // 休憩を入れることに関するコード
  const breakTimeDuration: number = 1000;
  const breakTimePerQuiz: number = 7;
  //解かれた問題の数を管理する
  const [solvedQuizzes, setSolvedQuizzes] = useState(0);
  const [isComponentsVisible, setIsComponentsVisible] = useState(true);

  //クリックされた画面の場所によって発動する関数を選べるフックを呼んでいる
  const { handleClick } = useClickSide({
    onLeftEdgeClick: () =>
      setQuizIndex(returnNextQuizIndex(QuizIndex, quizSize, -1)),
    onRightEdgeClick: () =>
      setQuizIndex(returnNextQuizIndex(QuizIndex, quizSize, 1)),
  });

  //ブレークタイムを入れるタイミングを図る
  useEffect(() => {
    if (solvedQuizzes === breakTimePerQuiz) {
      setSolvedQuizzes(0);
      hideComponentForFixedTime(breakTimeDuration, setIsComponentsVisible);
    }
  }, [solvedQuizzes]);

  return (
    <div
      id="videoContainer"
      // スワイプ機能を割り当ててる
      onClick={handleClick}
    >
      {/* ここにあるコンポーネントは常に表示される */}
      <video ref={videoRef} autoPlay muted playsInline id="video"></video>
      <div
        className="videoBtn"
        onClick={isVideoPlaying ? stopVideo : startVideo}
      >
        {isVideoPlaying ? <StopVideoBtn /> : <StartVideoBtn />}
      </div>
      {/* 以下のコンポーネントはブレークタイムの時とプレイの時で表示するコンポーネントが変わる */}
      {isComponentsVisible ? (
        <div className="componentsWithPlaying">
          <DarkOverlay />
          <div>
            {/* 選択肢のボックスから、正解不正解を判定する関数を読んでるから、アンサーをこのコンポーネントに渡す */}
            <QuizChoices
              choices={choices}
              answer={answer}
              setQuizIndex={setQuizIndex}
              quizSize={quizSize}
              quizIndex={QuizIndex}
              setSolvedQuizzes={setSolvedQuizzes}
            />
          </div>
          <div>
            <QuizWord questionWord={questionWord} />
          </div>
        </div>
      ) : (
        <BreakTime />
      )}
    </div>
  );
}

export default Video;
