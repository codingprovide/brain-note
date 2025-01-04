import { useState, useRef } from "react";
import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "./utils";

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

export default function DrawingCanvas({
  canvasRef,
  strokeWidth,
  strokeColor,
  isEraser,
}) {
  const [strokes, setStrokes] = useState([]); // 儲存多個筆劃
  const [currentPoints, setCurrentPoints] = useState([]); // 當前筆劃的點

  const isDrawingRef = useRef(false);

  // 按下鼠標時開始繪製筆劃
  function handlePointerDown(e) {
    e.target.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const pressure = e.pressure;
    setCurrentPoints([[x, y, pressure]]);
  }

  // 鼠標移動時繼續繪製筆劃
  function handlePointerMove(e) {
    if (!isDrawingRef.current) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const pressure = e.pressure;

    const newPoint = [x, y, pressure];

    if (isEraser) {
      eraseStrokes(newPoint);
    }
    setCurrentPoints((prevPoints) => [...prevPoints, newPoint]);
  }

  // 鼠標鬆開時結束筆劃
  function handlePointerUp(e) {
    isDrawingRef.current = false;
    e.target.releasePointerCapture(e.pointerId);
    if (!isEraser) {
      setStrokes((prevStrokes) => [
        ...prevStrokes,
        { points: currentPoints, color: strokeColor, size: strokeWidth },
      ]);
      console.log("strokes", strokes);
      console.log("curr", currentPoints);
    }
    setCurrentPoints([]); // 清空當前筆劃
  }

  function eraseStrokes(eraserPoint) {
    const eraserRadius = 15; // 擦除的範圍半徑
    setStrokes((prevStrokes) =>
      prevStrokes.filter((stroke) => {
        return !stroke.points.some(
          ([x, y]) =>
            Math.sqrt((x - eraserPoint[0]) ** 2 + (y - eraserPoint[1]) ** 2) <
            eraserRadius
        );
      })
    );
  }

  return (
    <svg
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        touchAction: "none",
        width: "100vw",
        height: "100vh",
        border: "1px solid #ccc",
      }}
    >
      {strokes.map((stroke, i) => {
        const pathData = getSvgPathFromStroke(
          getStroke(stroke.points, { ...options, size: stroke.size })
        );
        return (
          <path
            key={i}
            d={pathData}
            stroke={stroke.color}
            fill={stroke.color}
          />
        );
      })}
      {currentPoints.length > 0 && (
        <path
          d={getSvgPathFromStroke(
            getStroke(currentPoints, { ...options, size: strokeWidth })
          )}
          stroke={isEraser ? "White" : strokeColor}
          fill={isEraser ? "White" : strokeColor}
        />
      )}
    </svg>
  );
}
