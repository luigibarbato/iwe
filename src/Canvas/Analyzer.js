import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useMainStore } from "../store";
import { freqSlice } from "../Helpers/math";

export const Analyzer = ({ sound }) => {
  const analyser = useRef();
  const setFreq = useMainStore((state) => state.setFreq);

  useEffect(() => {
    void (analyser.current = new THREE.AudioAnalyser(sound.current, 4096));
  }, [sound]);

  useFrame(({ clock }, dt) => {
    if (analyser.current) {
      const freqData = analyser.current.getFrequencyData();

      setFreq(
        freqSlice(freqData, 0, 512),
        freqSlice(freqData, 0, 6),
        freqSlice(freqData, 64, 64),
        freqSlice(freqData, 164, 24)
      );
    }
  });

  return <></>;
};
