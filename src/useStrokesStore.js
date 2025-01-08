import { create } from "zustand";
export const useStrokeStore = create((set) => ({
  strokes: [],
  currentPoints: [],
  addStroke: (stroke) => {
    set((state) => ({ strokes: [...state.strokes, stroke] }));
  },
  setStrokes: (newStrokes) => {
    set({ strokes: newStrokes });
  },
  setCurrentStrokes: (point) => {
    set((state) => ({ currentPoints: [...state.currentPoints, point] }));
  },
  clearCurrentStrokes: () => {
    set({ currentPoints: [] });
  },
}));

export const useDrawingStore = create((set) => ({
  isDrawing: false,
  isEraser: false,
  toggleDrawing: () => {
    set((state) => ({ isDrawing: !state.isDrawing }));
  },
  toggleEraser: () => {
    set((state) => ({ isEraser: !state.isEraser }));
  },
}));

export const usePositionStore = create((set) => ({
  position: { x: 0, y: 0 },
  setPosition: (x, y) => {
    set({ position: { x, y } });
  },
}));
