import { useRef, useEffect } from "react";
import { useMainStore } from "../store";
import { useFrame } from "@react-three/fiber";

// Define the allowed values for the `freq` parameter
type Frequency = "low" | "high" | "avg";

// Define the configuration object for the hook
interface BeatInFrameConfig {
  metre?: number; // The time signature of the music (i.e. the number of beats per bar)
  freq?: Frequency; // Which frequency range to use
  threshold?: number; // Threshold for frequency range
  note?: number; // Which note to execute the callback on
  barLength?: number; // Length of the bar in notes
}

export default function useBeatInFrame(
  callback: (state: any, delta: number) => void, // The callback function to execute on each note
  {
    metre = 1, // The time signature of the music (i.e. the number of beats per bar)
    freq = "low", // Which frequency range to use
    threshold = 0.8, // Threshold for frequency range
    note = 0, // Which note to execute the callback on
    barLength = 2 // Length of the bar in notes
  }: BeatInFrameConfig = {}
) {
  const savedCallback = useRef<(state: any, delta: number) => void>();
  const timeAccumulator = useRef<number>(0);
  const beatCounter = useRef<number>(0);
  const noteCounter = useRef<number>(0);

  // Save the callback function to a ref to avoid re-rendering when it changes
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Execute the callback on each note
  useFrame((state, delta) => {
    // Check if the music is currently playing
    if (useMainStore.getState().player !== "playing") {
      return;
    }
    // Accumulate time to determine when the next note occurs
    timeAccumulator.current += delta;
    // Check if it's time for the next note
    if (timeAccumulator.current > 60 / metre / useMainStore.getState().bpm) {
      beatCounter.current++;
      // If it's the end of the bar, reset the beat and note counters
      if (beatCounter.current % barLength === 0) {
        beatCounter.current = 0;
        noteCounter.current = 0;
      } else {
        noteCounter.current++;
      }
      // If it's the desired note, execute the callback
      if (note === barLength || noteCounter.current === note) {
        if (useMainStore.getState().freq[freq] > threshold) {
          savedCallback.current!(state, delta);
        }
      }
      // Reset the time accumulator
      timeAccumulator.current = 0;
    }
  });
}
