import { PerspectiveCamera, CameraShake } from "@react-three/drei";
import { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMainStore } from "../store";

export const Cameras = () => {
  const cameraRef = useRef();
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const playerState = useMainStore((state) => state.player);

  useFrame((state, delta) => {
    easing.damp3(
      lookAtRef.current,
      playerState === "playing" ? [0, 1.15, 0] : [0, 1.75, 0],
      // playerState === "playing" ? [0, 1.15, 0] : [0, 2.75, 0],
      1.5,
      delta
    );
    easing.damp3(
      cameraRef.current.position,
      playerState === "playing" ? [3.25, 1, 3.25] : [4, 4, 4],
      // playerState === "playing" ? [3.25, 1, 3.25] : [2, 4, 2],
      1.5,
      delta
    );
    cameraRef.current.position.x +=
      Math.sin(state.clock.getElapsedTime() * 2) * 0.005;
    cameraRef.current.position.z +=
      Math.sin(state.clock.getElapsedTime() * 2) * 0.005;
    cameraRef.current.lookAt(lookAtRef.current);
  });

  return (
    <>
      {/* <CameraShake
        // ref={cameraRef}
        maxYaw={0.1} // Max amount camera can yaw in either direction
        maxPitch={0.1} // Max amount camera can pitch in either direction
        maxRoll={0.1} // Max amount camera can roll in either direction
        yawFrequency={0.1} // Frequency of the the yaw rotation
        pitchFrequency={0.1} // Frequency of the pitch rotation
        rollFrequency={0.1} // Frequency of the roll rotation
        intensity={1} // initial intensity of the shake
        decayRate={0.65} // if decay = true this is the rate at which intensity will reduce at />
      /> */}
      <PerspectiveCamera ref={cameraRef} makeDefault position={[4, 1, 4]} />
    </>
  );
};
