import "./style/Header.css";
import MenuBar from "./menuBar";

function Header({ HeaderTitle }: { HeaderTitle: string }): JSX.Element {
  return (
    <div className="HeaderContainer">
      <div className="HeaderTitle">{HeaderTitle}</div>
      <MenuBar />
    </div>
  );
}

export default Header;