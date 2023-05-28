import { useMainStore } from "./store";
import { motion } from "framer-motion";
import { Play, Stop, SkipForward, SkipBack } from "@phosphor-icons/react";

export const Controls = () => {
  const prevTrack = useMainStore((state) => state.prevTrack);
  const nextTrack = useMainStore((state) => state.nextTrack);
  const play = useMainStore((state) => state.play);
  const stop = useMainStore((state) => state.stop);
  const player = useMainStore((state) => state.player);
  const soundRef = useMainStore((state) => state.soundRef);

  const handlePlay = () => {
    soundRef.play();
    play();
  };
  const handleStop = () => {
    soundRef.stop();
    stop();
  };

  return (
    <motion.div
      className={player === "playing" ? "controls playing" : "controls"}
      animate={{
        y: player === "playing" ? 320 : 0,
        background:
          player === "playing" ? "hsla(0,0%,0%,1)" : "hsla(0,0%,100%,0.1)"
      }}
      transition={{ type: "spring", duration: 2 }}
    >
      <div onClick={() => prevTrack()}>
        <SkipBack size={14} color="#f5f5f5" weight="regular" />
      </div>
      {player === "playing" ? (
        <div onClick={() => handleStop()}>
          IMMERSE YOURSELF
          <Stop size={14} color="#f5f5f5" weight="regular" />
        </div>
      ) : (
        <div onClick={() => handlePlay()}>
          IMMERSE YOURSELF
          <Play size={14} color="#f5f5f5" weight="regular" />
        </div>
      )}
      <div onClick={() => nextTrack()}>
        <SkipForward size={14} color="#f5f5f5" weight="regular" />
      </div>
    </motion.div>
  );
};
