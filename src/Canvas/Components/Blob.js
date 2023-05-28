import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useMainStore } from "../../store";
import { MeshTransmissionMaterial } from "../Materials/TransmissionMaterial";

import * as THREE from "three";

export const Blob = () => {
  const materialRef = useRef();
  const meshRef = useRef();

  useFrame((state) => {
    materialRef.current.displacement = THREE.MathUtils.lerp(
      materialRef.current.displacement,
      0.01 + useMainStore.getState().freq.high / 2,
      0.2
    );
    materialRef.current.scale = THREE.MathUtils.lerp(
      materialRef.current.scale,
      0.5 + useMainStore.getState().freq.average * 4,
      0.35
    );
  });

  return (
    <mesh ref={meshRef} position={[0, 1, 0]}>
      <sphereGeometry args={[1, 256, 256]} />
      <MeshTransmissionMaterial
        ref={materialRef}
        samples={16}
        resolution={128}
        transmission={1}
        roughness={0.35}
        thickness={2}
        ior={1.3}
        chromaticAberration={0.1}
        anisotropy={20}
        distortion={1}
        distortionScale={0.1}
        temporalDistortion={0.1}
        transmissionSampler
        color={[3, 3, 3]}
        scale={3}
        displacement={0.1}
        toneMapped={true}
        fog={false}
      />
    </mesh>
  );
};
