import { useRef, useEffect } from "react";
import { useMainStore } from "../store";
import { useFrame } from "@react-three/fiber";

export default function useBeatInFrame(
  callback,
  {
    metre = 1,
    freq = "high",
    threshold = 0.8,
    note = 0,
    barLength = 2
  }
) {
  const savedCallback = useRef();
  const timeAccumulator = useRef(0);
  const beatCounter = useRef(0);
  const noteCounter = useRef(0);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useFrame((state, delta) => {
    if (useMainStore.getState().player !== "playing") {
      return;
    }

    timeAccumulator.current += delta;

    if (timeAccumulator.current > 60 / metre / useMainStore.getState().bpm) {
      beatCounter.current++;

      if (beatCounter.current % barLength === 0) {
        beatCounter.current = 0;
        noteCounter.current = 0;
      } else {
        noteCounter.current++;
      }

      if (note === barLength || noteCounter.current === note) {
        if (useMainStore.getState().freq[freq] > threshold) {
          savedCallback.current(state, delta);
        }
      }

      timeAccumulator.current = 0;
    }
  });
}
