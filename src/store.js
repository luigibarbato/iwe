import { create } from "zustand";
import { getNewReleases, getPlaylist } from "./queries";
import { request } from "graphql-request";
import { findLargestDelta } from "./Helpers/math";

export const useMainStore = create((set) => ({
  currentItem: 0,
  data: [],
  loading: true,
  hasErrors: false,
  cameras: [
    [0, 0, 0],
    [0, 1, 0]
  ],
  bpm: 0,
  setBpm: (bpm) =>
    set((state) => ({
      bpm: bpm
    })),
  freq: {
    average: 0,
    low: 0,
    mid: 0,
    high: 0
  },

  signalLow: false,
  signalHigh: false,
  signalLowCounter: 0,
  signalHighCounter: 0,
  player: "",
  setSignalLow: () => {
    set((state) => ({
      signalLow: true,
      signalLowCounter:
        state.signalLowCounter + 1 > 4 ? 1 : state.signalLowCounter + 1
    }));
  },
  setSignalHigh: () => {
    set((state) => ({
      signalHigh: true,
      signalHighCounter:
        state.signalHighCounter + 1 > 4 ? 1 : state.signalHighCounter + 1
    }));
  },
  soundRef: null,
  setSoundRef: (ref) =>
    set((state) => ({
      soundRef: ref
    })),
  play: () =>
    set((state) => ({
      player: "playing",
      signalLowCounter: 0,
      signalHighCounter: 0
    })),
  stop: () =>
    set((state) => ({
      player: "stop",
      signalLowCounter: 0,
      signalHighCounter: 0
    })),
  setFreq: (average, low, mid, high) =>
    set((state) => ({
      freq: { average: average, low: low, mid: mid, high: high }
    })),
  nextTrack: () =>
    set((state) => ({
      currentItem:
        state.currentItem + 1 > state.data.length - 1
          ? 0
          : state.currentItem + 1,
      signalLowCounter: 0,
      signalHighCounter: 0
    })),
  prevTrack: () =>
    set((state) => ({
      currentItem:
        state.currentItem - 1 < 0
          ? state.data.length - 1
          : state.currentItem - 1,
      signalLowCounter: 0,
      signalHighCounter: 0
    })),
  setCurrent: (index) =>
    set((state) => ({
      currentItem: index
    })),
  fetch: () => {
    request({
      url: "https://api.sound.xyz/graphql",
      document: getPlaylist,
      requestHeaders: {
        "X-Sound-Client-Key": "91f01600-9b59-4dbb-a55d-e391a9f5f7c4"
      }
    })
      .then((data) => {
        set((state) => ({
          data: data.shelf.orderedReleases.edges.map((release) => {
            return {
              title: release.node.release.title,
              artist: release.node.release.artist.name,
              cover:
                release.node.release.staticCoverImage?.url ||
                release.node.release.coverImage.url,
              audio: release.node.release.track.revealedAudio.url,
              peaks: release.node.release.track.normalizedPeaks,
              maxPeak: findLargestDelta(
                release.node.release.track.normalizedPeaks
              ),
              url: release.node.release.webappUri,
              quantity: release.node.release.quantity,
              price: release.node.release.price,
              comments: Object.keys(release.node.release.topNftsWithComment)
                .length
            };
          }),
          loading: false
        }));
      })
      .catch((error) => set(() => ({ hasErrors: true, loading: false })));
  }
}));
