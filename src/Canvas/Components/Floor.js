import {} from "@react-three/fiber";
import { Grid } from "@react-three/drei";

export const Floor = () => {
  return (
    <>
      <Grid
        position={[0, -4, 0]}
        cellSize={1 / 2}
        cellThickness={1}
        cellColor={"gray"}
        sectionSize={12}
        sectionThickness={1}
        sectionColor={"gray"}
        followCamera={false}
        infiniteGrid={true}
        fadeDistance={48}
        fadeStrength={8}
      />
    </>
  );
};
