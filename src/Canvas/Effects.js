import { EffectComposer, Bloom, Noise } from "@react-three/postprocessing";

export const Effects = () => {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={1} intensity={0.7} levels={10} mipmapBlur />
      <Noise opacity={0.9} premultiply />
      <Noise opacity={0.1} />
    </EffectComposer>
  );
};
