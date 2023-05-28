import { motion, AnimatePresence } from "framer-motion";
import { useMainStore } from "../store";

const variants = {
  initial: {
    opacity: 0,
    y: "100%"
  },
  visible: {
    opacity: 1,
    y: "0%"
  },
  hidden: {
    opacity: 0,
    y: "-75%"
  }
};

const transition = {
  duration: 0.35
};

export const Title = () => {
  const data = useMainStore((state) => state.data);
  const currentItem = useMainStore((state) => state.currentItem);
  const playerState = useMainStore((state) => state.player);

  return (
    <motion.div
      animate={{
        scale: playerState === "playing" ? 0.85 : 1,
        opacity: playerState === "playing" ? 0.85 : 1,
        y: playerState === "playing" ? -64 : 64
      }}
      transition={{ type: "spring", duration: 6 }}
    >
      <div className="releaseWrapper titleWrapper">
        <AnimatePresence initial={false}>
          <motion.h2
            key={`title${currentItem}`}
            className="releaseTitle"
            variants={variants}
            animate="visible"
            initial="initial"
            exit="hidden"
            transition={transition}
          >
            {data[currentItem].title}
          </motion.h2>
        </AnimatePresence>
      </div>
      <div className="releaseWrapper artistWrapper">
        <AnimatePresence initial={false}>
          <motion.h3
            key={`artist${currentItem}`}
            className="releaseArtist"
            variants={variants}
            animate="visible"
            initial="initial"
            exit="hidden"
            transition={transition}
          >
            {data[currentItem].artist}
          </motion.h3>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
