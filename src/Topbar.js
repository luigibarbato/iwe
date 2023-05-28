import { Logo } from "./Logo";
import { motion } from "framer-motion";
import { useMainStore } from "./store";
export const Topbar = () => {
  const playerState = useMainStore((state) => state.player);

  return (
    <motion.div
      className="topbar"
      animate={{
        scale: playerState === "playing" ? 0.95 : 1,
        opacity: playerState === "playing" ? 0.25 : 1,
        y: playerState === "playing" ? -8 : 0
      }}
      transition={{ type: "spring", duration: 1.4 }}
    >
      <div className="topbarItem ">By Wojciech Dobry</div>
      <Logo size={1.2} color={"white"} />
      <div className="topbarItem right">POWERED BY SOUND.XYZ</div>
    </motion.div>
  );
};
