import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useMainStore } from "../../store";
import * as THREE from "three";

import { LayerMaterial, Gradient } from "lamina";

export const Impulse = ({ signal = 1 }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  const materialRef2 = useRef();
  const signalRef = useRef(false);
  const signalCounter = useRef(0);

  useFrame(({ clock }, dt) => {
    if (useMainStore.getState().signalLowCounter === signal) {
      signalRef.current = true;
    } else {
      signalCounter.current = 0;
    }

    if (signalRef.current === true && signalCounter.current === 0) {
      meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = THREE.MathUtils.lerp(
        meshRef.current.scale.x,
        1.1,
        0.025
      );
      materialRef2.current.alpha = THREE.MathUtils.lerp(
        materialRef2.current.alpha,
        -0.1,
        0.025
      );
    }

    if (meshRef.current.scale.x > 1 && materialRef2.current.alpha < 0) {
      signalRef.current = false;
      signalCounter.current = 1;
      meshRef.current.scale.x = 0.25;
      meshRef.current.scale.y = 0.25;
      meshRef.current.scale.z = 0.25;
      materialRef2.current.alpha = 1;
    }
  });
  return (
    <mesh
      ref={meshRef}
      position={[0, 1, 0]}
      rotation={[Math.PI / 2, 0, 0]}
      scale={[0, 0, 0]}
    >
      <torusGeometry args={[2, 0.005, 3, 128]} />
      <meshBasicMaterial ref={materialRef} color={[2, 2, 2]} opacity={0} />
      <LayerMaterial
        ref={materialRef2}
        lighting="physical"
        transmission={0}
        roughness={0}
        metalness={0}
        transparent
      >
        <Gradient
          colorA={"black"}
          colorB={"white"}
          contrast={0.5}
          alpha={1}
          start={-0.1}
          end={0.4}
          axes={"y"}
        />
      </LayerMaterial>
    </mesh>
  );
};
