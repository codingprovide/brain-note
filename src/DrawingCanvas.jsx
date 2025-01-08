import { useRef, useEffect } from "react";
import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "./utils";
import {
  useDrawingStore,
  useStrokeStore,
  usePositionStore,
} from "./useStrokesStore";
import { useReactFlow } from "@xyflow/react";

const options = {
  size: 15,
  thinning: 0.5,
  smoothing: 0.6,
  streamline: 0.5,
  easing: (t) => t,
  start: {
    taper: 0,
    easing: (t) => t,
    cap: true,
  },
  end: {
    taper: 100,
    easing: (t) => t,
    cap: true,
  },
};

export default function DrawingCanvas() {
  const { screenToFlowPosition } = useReactFlow();
  const { isDrawing, isEraser } = useDrawingStore((state) => ({
    isDrawing: state.isDrawing,
    isEraser: state.isEraser,
  }));
  const { position, setPosition } = usePositionStore();
  const svgRef = useRef(null);
  // if isDrawing is true , then use screenToFlowPosition to convert x,y to position hook
  // and render the stroke with the position in one svg
  // so stroke add a positoin property

  useEffect(() => {
    if (svgRef.current && isDrawing) {
      const rect = svgRef.current.getBoundingClientRect();
      let x = rect.left + window.scrollX;
      let y = rect.top + window.scrollY;
      let FlowPosition = screenToFlowPosition({ x, y });
      setPosition(FlowPosition.x, FlowPosition.y);
      console.log("position", position);
    }
  }, [isDrawing]);

  const {
    strokes,
    addStroke,
    setCurrentStrokes,
    currentPoints,
    clearCurrentStrokes,
    setStrokes,
  } = useStrokeStore((state) => ({
    strokes: state.strokes,
    addStroke: state.addStroke,
    setCurrentStrokes: state.setCurrentStrokes,
    currentPoints: state.currentPoints,
    clearCurrentStrokes: state.clearCurrentStrokes,
    setStrokes: state.setStrokes,
  }));

  const strokeWidth = 15;
  const strokeColor = "#000000";
  const isDrawingRef = useRef(false);

  // 按下鼠標時開始繪製筆劃
  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const pressure = e.pressure;
    setCurrentStrokes({ x, y, pressure });
  }

  // 鼠標移動時繼續繪製筆劃
  function handlePointerMove(e) {
    if (!isDrawingRef.current) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const pressure = e.pressure;

    const newPoint = { x, y, pressure };

    if (isEraser) {
      eraseStrokes(newPoint, strokes, setStrokes);
      // 注意這裡多傳了 setStrokes
    } else {
      setCurrentStrokes(newPoint);
    }
  }

  // 鼠標鬆開時結束筆劃
  function handlePointerUp(e) {
    isDrawingRef.current = false;
    e.target.releasePointerCapture(e.pointerId);
    if (!isEraser) {
      addStroke({
        x: position.x,
        y: position.y,
        paths: [
          { points: currentPoints, color: strokeColor, size: strokeWidth },
        ],
      });
      console.log("strokes", strokes);
      console.log("curr", currentPoints);
    }
    clearCurrentStrokes(); // 清空當前筆劃
  }
  // function translatePointToFlowPosition(point) {
  //   let newStorke = [];
  //   point.map((pt) => {
  //     const { x, y } = pt;
  //     const flowPosition = screenToFlowPosition({ x, y });
  //     return newStorke.push({
  //       x: flowPosition.x,
  //       y: flowPosition.y,
  //       pressure: pt.pressure,
  //     });
  //   });
  //   console.log("newStorke", newStorke);
  //   return newStorke;
  // }

  function eraseStrokes(eraserPoint, strokes, setStrokes) {
    const eraserRadius = 15;
    // 注意：stroke.points 與 eraserPoint 都是 {x, y, pressure} 的格式
    const filteredStrokes = strokes.filter((stroke) => {
      // 如果該筆畫中，有任何一個點落在橡皮擦範圍內，就要把這整筆畫移除
      const isErased = stroke.points.some((pt) => {
        const dx = pt.x - eraserPoint.x;
        const dy = pt.y - eraserPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < eraserRadius;
      });
      return !isErased; // 要保留沒有被橡皮擦擦到的筆畫
    });

    // 這裡需要「取代」原本的 strokes，而不是再「新增」到原本的 strokes 裏
    setStrokes(filteredStrokes);
  }

  return (
    isDrawing && (
      <svg
        ref={svgRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          touchAction: "none",
          width: "100vw",
          height: "100vh",
          border: "1px solid red",
        }}
        className="absolute top-0"
      >
        {/* Render the stroke currently being drawn */}
        {currentPoints.length > 0 && (
          <path
            d={getSvgPathFromStroke(
              getStroke(currentPoints, { ...options, size: strokeWidth })
            )}
            stroke={isEraser ? "white" : strokeColor}
            fill={isEraser ? "white" : strokeColor}
          />
        )}
      </svg>
    )
  );
}
