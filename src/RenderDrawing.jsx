import { ViewportPortal } from "@xyflow/react";
import { useStrokeStore } from "./useStrokesStore";
import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "./utils";
export default function RenderDrawing() {
  const { strokes } = useStrokeStore();
  const strokeWidth = 15;

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

  function getStrokeBounds(points) {
    if (!Array.isArray(points) || points.length === 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    return {
      minX: Math.min(...xs),
      minY: Math.min(...ys),
      maxX: Math.max(...xs),
      maxY: Math.max(...ys),
    };
  }
  function adjustPointsToOrigin(points, offsetX, offsetY) {
    if (!Array.isArray(points)) {
      return [];
    }
    return points.map((item) => {
      // 确认 item 是对象且包含 x, y 属性
      if (item && typeof item === "object" && "x" in item && "y" in item) {
        const { x, y, pressure } = item;
        return { x: x - offsetX, y: y - offsetY, pressure };
      }
      return item;
    });
  }

  function convertPointsToArray(points) {
    return points.map(({ x, y, pressure }) => [x, y, pressure]);
  }

  return (
    <ViewportPortal>
      <h1
        style={{
          height: "100px",
          width: "100px",
          transform: "translate(100px, 100px)",
          position: "absolute",
          border: "1px solid red",
        }}
      >
        ViewPort
      </h1>
      {/* Render existing strokes */}
      {strokes?.map((stroke, i) => {
        const { minX, minY } = getStrokeBounds(stroke.points);
        // 调整点数据（对象形式）
        const adjustedPointsObj = adjustPointsToOrigin(
          stroke.points,
          minX,
          minY
        );
        // 将调整后的对象数组转换为 [x, y] 数组形式
        const adjustedPointsArray = convertPointsToArray(adjustedPointsObj);

        const pathData = getSvgPathFromStroke(
          getStroke(adjustedPointsArray, { ...options, size: strokeWidth })
        );
        // const pathData = getSvgPathFromStroke(
        //   getStroke(stroke.points, { ...options, size: stroke.size })
        // );
        return (
          <svg
            key={i}
            style={{
              padding: "2px",
              height: "100%",
              width: "100%",
              transform: `translate(${minX}px, ${minY}px)`,
              position: "absolute",
              border: "1px solid red",
            }}
          >
            <path d={pathData} stroke={stroke.color} fill={stroke.color} />
          </svg>
        );
      })}
    </ViewportPortal>
  );
}
