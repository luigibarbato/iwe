import { Blob } from "./Components/Blob";
import { Circles } from "./Components/Circles";
import { Planes } from "./Components/Planes";
import { Impulse } from "./Components/Impulses";
import { Floor } from "./Components/Floor";
import { Cameras } from "./Camera";
import { Effects } from "./Effects";

export const Scene = () => {
  return (
    <>
      <Effects />
      <Cameras />
      <Planes />
      <Blob />
      <Circles />
      <Floor />
      <Impulse signal={1} />
      <Impulse signal={2} />
      <Impulse signal={3} />
      <Impulse signal={4} />
    </>
  );
};
