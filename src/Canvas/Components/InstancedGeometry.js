import { useFrame } from "@react-three/fiber";
import { useMainStore } from "../../store";

import { useRef } from "react";

import * as THREE from "three";
import { LayerMaterial, Noise, Gradient, Displace } from "lamina";

const o = new THREE.Object3D();

export const Boxes2 = ({ length = 48, ...props }) => {
  const ref = useRef();

  const crv = useRef(
    new THREE.CubicBezierCurve3(
      new THREE.Vector3(-2, -1, 0),
      new THREE.Vector3(-2, 1, -5),
      new THREE.Vector3(2, 4, -4),
      new THREE.Vector3(-2, 7, 0)
    )
  );

  const v0 = useRef(new THREE.Vector3(-2, -1, 0));
  const v1 = useRef(new THREE.Vector3(-2, 1, -5));
  const v2 = useRef(new THREE.Vector3(2, 4, -4));
  const v3 = useRef(new THREE.Vector3(-2, 7, 0));

  let xx = useRef(0);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.5;

    xx.current = THREE.MathUtils.lerp(
      xx.current,
      useMainStore.getState().currentItem,
      0.1
    );

    v1.current.set(-2 + xx.current, 4 / xx.current, -4 + xx.current);
    v2.current.set(2 * xx.current, xx.current, -4 - xx.current);
    v2.current.set(-2 + xx.current, 7 / xx.current, 0);

    crv.current.v0 = v0.current;
    crv.current.v1 = v1.current;
    crv.current.v2 = v2.current;
    crv.current.v3 = v3.current;

    let i = 0;
    for (let j = 0; j < length; j++) {
      const id = i++;

      const point = crv.current.getPoint(j / length);
      const tangent = crv.current.getTangent(j / length);

      const yaw = Math.atan2(tangent.y, tangent.x);
      const pitch = Math.atan2(
        tangent.z,
        Math.sqrt(tangent.x * tangent.x + tangent.y * tangent.y)
      );
      o.position.copy(point);
      o.rotation.set(0, pitch + 0.075 * j, yaw);
      o.rotateX(t * 1.15 + (2 * Math.PI) / length);
      o.scale.x = o.scale.y = o.scale.z =
        0.15 + useMainStore.getState().freq.average / 3;
      o.updateMatrix();
      ref.current.setMatrixAt(id, o.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group {...props}>
      <instancedMesh ref={ref} args={[null, null, length]}>
        <capsuleGeometry args={[0.5, 1.8, 24, 24]} />
        <Material />
      </instancedMesh>
    </group>
  );
};

const Material = () => {
  const materialRef = useRef();
  const colorRef = useRef(1);
  useFrame((state) => {});
  return (
    <LayerMaterial
      lighting="physical"
      color="white"
      transmission={0}
      roughness={0.35}
    >
      <Gradient
        ref={materialRef}
        colorA={"black"}
        colorB={[colorRef.current, colorRef.current, 0.1]}
        alpha={1}
        contrast={1}
        start={-0.5}
        end={3}
        axes={"y"}
      />

      <Noise scale={60} type="pelin" mode="reflect" alpha={0.03} />
      <Displace scale={20} strength={0.0} />
    </LayerMaterial>
  );
};
