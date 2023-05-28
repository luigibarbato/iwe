import { BottomBar } from "./Bottombar";
import { Inpulse } from "./Impulse";
import { Title } from "./Title";

export const Overlay = () => {
  return (
    <div className="overlay">
      <Inpulse />
      <Title />
      <BottomBar />
    </div>
  );
};
