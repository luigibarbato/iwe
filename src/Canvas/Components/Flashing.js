import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { Edges } from "@react-three/drei";
import useBeatInFrame from "../../Hooks/useBeatInFrame";

export const Flashing = ({
  children = null,
  position = [0, 1, 0],
  rotation = [0, 0, 0],
  metre = 1,
  freq = "low",
  threshold = 0.8,
  note = 1,
  barLength = 4
}) => {
  const materialRef = useRef();

  useBeatInFrame(
    (_, delta) => {
      easing.dampC(materialRef.current.color, [200, 200, 200], 0, delta);
      easing.damp(materialRef.current, "opacity", 1, 0, delta);
    },
    { metre, freq, threshold, note, barLength }
  );

  useFrame((_, delta) => {
    easing.dampC(materialRef.current.color, [0, 0, 0], 0.15, delta);
    easing.damp(materialRef.current, "opacity", 0, 0.15, delta);
  });

  return (
    <mesh position={position} rotation={rotation}>
      {children}
      <meshStandardMaterial transparent opacity={0} />
      <Edges scale={1} threshold={30}>
        <lineBasicMaterial
          ref={materialRef}
          color={[20, 20, 20]}
          toneMapped={false}
          transparent={true}
        />
      </Edges>
    </mesh>
  );
};
