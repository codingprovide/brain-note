import { useDrawingStore } from "./useStrokesStore";

export default function MainButton() {
  const { toggleDrawing, toggleEraser, isDrawing, isEraser } = useDrawingStore(
    (state) => ({
      toggleDrawing: state.toggleDrawing,
      toggleEraser: state.toggleEraser,
      isDrawing: state.isDrawing,
      isEraser: state.isEraser,
    })
  );

  return (
    <div className=" absolute bottom-3 flex justify-center justify-items-center w-full z-30">
      <button className=" bg-red-300 p-2" onClick={toggleDrawing}>
        {isDrawing ? "Drawing is open" : "Drawing is close"}
      </button>
      <button className=" bg-green-300 p-2" onClick={toggleEraser}>
        {isEraser ? "Eraser is open" : "Eraser is close"}
      </button>
    </div>
  );
}
