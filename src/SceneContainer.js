import { Suspense } from "react";
import { Sound } from "./Canvas/Sound";
import { Lights } from "./Canvas/Lights";
import { Canvas } from "@react-three/fiber";
import { Overlay } from "./Overlay/Overlay";
import { Scene } from "./Canvas/Scene";
import { Loader } from "@react-three/drei";

export const SceneContainer = () => {
  return (
    <div className="sceneContainer">
      <Overlay />
      <Canvas dpr={2} gl={{ preserveDrawingBuffer: true }}>
        <Suspense fallback={null}>
          <Lights />
          <Sound />
          <Scene />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
};
