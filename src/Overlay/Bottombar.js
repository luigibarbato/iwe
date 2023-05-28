import QrCode from "react-qrcode-svg";
import { useMainStore } from "../store";

export const BottomBar = () => {
  const data = useMainStore((state) => state.data);
  const currentItem = useMainStore((state) => state.currentItem);

  return (
    <div className="bottomBar">
      {/* <div className="soundBanner">
        <QrCode
          data={data[currentItem].url}
          height="40"
          width="40"
          fgColor="#fff"
          bgColor="#000"
          margin={0}
        />
        <div>
          <div>COLLECT ON SOUND.XYZ</div>
          <div style={{ opacity: 0.5 }}>
            {data[currentItem].price / Math.pow(10, 18)} ETH /
            {data[currentItem].quantity} Editions
          </div>
        </div>
      </div> */}
    </div>
  );
};
