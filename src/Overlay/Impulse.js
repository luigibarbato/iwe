import { useMainStore } from "../store";
import { AnimatePresence, motion } from "framer-motion";

export const Inpulse = () => {
  const signalLowCounter = useMainStore((state) => state.signalLowCounter);
  const signalHighCounter = useMainStore((state) => state.signalHighCounter);

  return (
    <div className="impulses">
      {/* <AnimatePresence>
        {signalLowCounter === 1 && <Circle />}
        {signalHighCounter === 2 && <Circle />}
        {signalLowCounter === 3 && <Circle />}
        {signalHighCounter === 4 && <Circle />}
      </AnimatePresence> */}
    </div>
  );
};

const Circle = () => {
  return (
    <motion.div
      className="releaseTitle"
      animate={{
        opacity: [1, 0],
        scale: 1
      }}
      initial={{
        opacity: 0,
        scale: 0.35
      }}
      exit={{
        opacity: 0,
        scale: 0
      }}
      transition={{ type: "spring", delay: 0, duration: 1 }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="100"
          cy="100"
          r="100"
          stroke="#D9D9D9"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </motion.div>
  );
};
