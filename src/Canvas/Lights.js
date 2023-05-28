import { Environment } from "@react-three/drei";

export const Lights = () => {
  return (
    <>
      <color attach="background" args={["black"]} />
      <fogExp2 args={["black", 0.2]} attach={"fog"} />
      <hemisphereLight />
    </>
  );
};
