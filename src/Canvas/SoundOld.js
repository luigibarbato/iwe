import * as THREE from "three";
import { useRef, useEffect, useState } from "react";
import { useThree, useLoader } from "@react-three/fiber";
import { Analyzer } from "./Analyzer";
import { useMainStore } from "../store";
import { guess } from "web-audio-beat-detector";

export const Sound = () => {
  const sound = useRef();

  const data = useMainStore((state) => state.data);
  const currentItem = useMainStore((state) => state.currentItem);
  const player = useMainStore((state) => state.player);
  const stopControl = useMainStore((state) => state.stop);
  const setBpm = useMainStore((state) => state.setBpm);

  const prevTrack = useMainStore((state) => state.prevTrack);
  const nextTrack = useMainStore((state) => state.nextTrack);
  const play = useMainStore((state) => state.play);
  const setSoundRef = useMainStore((state) => state.setSoundRef);

  const urls = data.map((track) => track.audio);
  const buffers = useLoader(THREE.AudioLoader, [...urls]);

  const camera = useThree(({ camera }) => camera);
  const [listener] = useState(() => new THREE.AudioListener());

  useEffect(() => {
    sound.current.setBuffer(buffers[currentItem]);

    guess(buffers[currentItem])
      .then((tempo) => {
        setBpm(tempo.bpm);
      })
      .catch((err) => {
        console.log(err);
      });

    camera.add(listener);
    listener.setMasterVolume(1);

    setSoundRef(sound.current);

    // if (sound.current.isPlaying) {
    //   sound.current.stop();
    //   sound.current.play();
    // }

    sound.current.onEnded = () => {
      stopControl();
    };

    return () => camera.remove(listener);
  }, [currentItem]);

  // useEffect(() => {
  //   if (sound.current.isPlaying && player === "stop") {
  //     sound.current.stop();
  //   }
  //   if (!sound.current.isPlaying && player === "playing") {
  //     sound.current.play();
  //   }
  // }, [player]);

  return (
    <>
      <audio ref={sound} args={[listener]} />
      <Analyzer sound={sound} />
    </>
  );
};

export default Sound;
