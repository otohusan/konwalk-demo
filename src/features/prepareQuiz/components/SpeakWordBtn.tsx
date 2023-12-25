import { BsSoundwave } from "react-icons/bs";
import { speakWord } from "../../../api";
import "../style/SpeakWordBtn.css";

function SpeakWordBtn(props: { questionWord: string }) {
  return (
    <div className="SpeakWordBtn" onClick={() => speakWord(props.questionWord)}>
      <BsSoundwave size={"4vw"} />
    </div>
  );
}

export default SpeakWordBtn;
