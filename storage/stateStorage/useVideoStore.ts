import { create } from 'zustand'

interface VideoState {
  currentVideoIndex: number
  playbackProgress: { [key: string]: number }
  setCurrentVideoIndex: (index: number) => void
  updatePlaybackProgress: (videoId: string, progress: number) => void
  setPlaybackProgress: (progress: { [key: string]: number }) => void
}

const useVideoStore = create<VideoState>((set) => ({
  currentVideoIndex: 0,
  playbackProgress: {},
  setCurrentVideoIndex: (index) => set({ currentVideoIndex: index }),
  updatePlaybackProgress: (videoId, progress) =>
    set((state) => ({
      playbackProgress: { ...state.playbackProgress, [videoId]: progress },
    })),
  setPlaybackProgress: (progress) => set({ playbackProgress: progress }),
}))

export default useVideoStore
