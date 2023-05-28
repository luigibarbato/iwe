import { Flashing } from "./Flashing";
import { Projectile } from "./Projectile";
import { Edges } from "@react-three/drei";

export const Planes = () => {
  const config = {
    rotation: [0, Math.PI / 2, 0],
    freq: "low",
    threshold: 0.8,
    metre: 1
  };

  return (
    <>
      <Flashing {...config} position={[2, 1, 0]} note={0}>
        <Geometry />
      </Flashing>
      <Flashing {...config} position={[0, 1, 0]} note={1}>
        <Geometry />
      </Flashing>
      <Flashing {...config} position={[-2, 1, 0]} note={2}>
        <Geometry />
      </Flashing>
      <Flashing {...config} position={[-4, 1, 0]} note={3}>
        <Geometry />
      </Flashing>
      <Projectile
        initialPosition={[0, 1, 1]}
        targetPosition={[0, 1, 4]}
        barLength={2}
      >
        <ProjeGeometry />
      </Projectile>
      <Projectile
        initialPosition={[0, 1, -1]}
        targetPosition={[0, 1, -8]}
        barLength={2}
      >
        <ProjeGeometry />
      </Projectile>
      <Projectile
        initialPosition={[0, 1, 0]}
        targetPosition={[0, 1, 1]}
        barLength={8}
        note={3}
        initialScale={[0, 0, 0]}
      >
        <boxGeometry args={[0.005, 0.005, 20]} />
        <meshBasicMaterial color={"black"} opacity={0} transparent />
        <Edges scale={1} threshold={30}>
          <lineBasicMaterial
            color={[80, 80, 80]}
            toneMapped={false}
            transparent={true}
          />
        </Edges>
      </Projectile>
    </>
  );
};

const Geometry = () => <planeGeometry args={[2, 2]} />;

const ProjeGeometry = () => (
  <>
    <planeGeometry args={[0.15, 0.15]} />
    <meshBasicMaterial color={"black"} opacity={0} transparent />
    <Edges scale={1} threshold={30}>
      <lineBasicMaterial
        color={[40, 40, 40]}
        toneMapped={false}
        transparent={true}
      />
    </Edges>
  </>
);
