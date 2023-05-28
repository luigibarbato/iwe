import { useMainStore } from "./store";

export const List = () => {
  const data = useMainStore((state) => state.data);
  const current = useMainStore((state) => state.current);
  const setTrack = useMainStore((state) => state.setCurrent);

  return (
    <div className="">
      {/* {data.map((release, i) => (
        <div
          key={release.title}
          onClick={() => {
            setTrack(i);
          }}
        >
          {release.title}
        </div>
      ))} */}
    </div>
  );
};
