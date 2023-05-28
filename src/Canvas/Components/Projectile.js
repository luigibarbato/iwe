import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";
import useBeatInFrame from "../../Hooks/useBeatInFrame";

export const Projectile = ({
  children = null,
  initialPosition = [-4.25, -3.75, -4.25],
  targetPosition = [-4.25, 0, -4.25],
  initialRotation = [0, 0, 0],
  initialScale = [0, 0, 0],
  metre = 1,
  freq = "low",
  threshold = 0.8,
  note = 1,
  barLength = 4,
  velocity = 4
}) => {
  const meshRef = useRef();
  const isMoving = useRef(false);

  const initialPositionVec = new Vector3(...initialPosition);
  const targetPositionVec = new Vector3(...targetPosition);

  useBeatInFrame(
    (_, delta) => {
      if (!isMoving.current) {
        isMoving.current = true;
      }
    },
    { metre, freq, threshold, note, barLength }
  );

  useFrame((_, delta) => {
    if (isMoving.current) {
      const newPosition = meshRef.current.position.lerp(
        targetPositionVec,
        velocity * delta
      );
      meshRef.current.position.copy(newPosition);

      // Rotate the mesh
      // meshRef.current.rotation.x += Math.PI * delta * 2;
      meshRef.current.rotation.z += Math.PI * delta * 4;

      // Scale the mesh
      if (meshRef.current.scale.x < 1) {
        meshRef.current.scale.x += (1 - initialScale[0]) * delta * 100;
        meshRef.current.scale.y += (1 - initialScale[1]) * delta * 100;
        meshRef.current.scale.z += (1 - initialScale[2]) * delta * 100;
      }

      if (meshRef.current.position.distanceTo(targetPositionVec) < 0.05) {
        meshRef.current.position.copy(initialPositionVec);
        meshRef.current.rotation.set(...initialRotation);
        meshRef.current.scale.set(...initialScale);
        isMoving.current = false;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={initialPositionVec}
      rotation={initialRotation}
      scale={initialScale}
    >
      {children}
    </mesh>
  );
};
