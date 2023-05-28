import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useMainStore } from "../store";
import { freqSlice } from "../Helpers/math";

export const Analyzer = ({ sound }) => {
  const analyser = useRef();

  const setSignalLow = useMainStore((state) => state.setSignalLow);
  const setSignalHigh = useMainStore((state) => state.setSignalHigh);
  const setFreq = useMainStore((state) => state.setFreq);

  useEffect(() => {
    void (analyser.current = new THREE.AudioAnalyser(sound.current, 4096));
  }, [sound]);

  const lowLock = useRef(false);
  const highLock = useRef(false);

  const handleSignalToImpulse = (lock, slice, threshold, setter) => {
    if (slice > threshold && !lock.current) {
      lock.current = true;
      setter();
    } else if (slice <= threshold && lock.current) {
      lock.current = false;
    }
  };

  useFrame(({ clock }, dt) => {
    if (analyser.current) {
      const freqData = analyser.current.getFrequencyData();

      setFreq(
        freqSlice(freqData, 0, 512),
        freqSlice(freqData, 0, 6),
        freqSlice(freqData, 64, 64),
        freqSlice(freqData, 164, 24)
      );

      handleSignalToImpulse(
        lowLock,
        freqSlice(freqData, 0, 6),
        0.85,
        setSignalLow
      );
      handleSignalToImpulse(
        highLock,
        freqSlice(freqData, 128, 64),
        0.6,
        setSignalHigh
      );
    }
  });

  return <></>;
};
