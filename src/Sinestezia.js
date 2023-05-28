import "./styles.css";
import { Topbar } from "./Topbar";

import { useEffect, useCallback } from "react";

import { useMainStore } from "./store";
import { Controls } from "./Controls";
import { SceneContainer } from "./SceneContainer";

export const Sinestezia = () => {
  const loading = useMainStore((state) => state.loading);
  const hasErrors = useMainStore((state) => state.hasErrors);
  const fetchData = useCallback(() => useMainStore.getState().fetch(), []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (hasErrors) {
    return <p>cannot read data</p>;
  }

  if (loading) {
    return <p>loading data</p>;
  }

  return (
    <div className="wrapper">
      <Topbar />
      <Controls />
      <SceneContainer />
    </div>
  );
};
