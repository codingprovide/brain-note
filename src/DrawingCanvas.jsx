import React, { useState } from "react";
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

export default function DrawingCanvas({ canvasRef, strokeWidth, strokeColor, isEraser }) {
    const [strokes, setStrokes] = useState([]); // 儲存多個筆劃
    const [currentPoints, setCurrentPoints] = useState([]); // 當前筆劃的點

    let animationFrameId; // 用於優化更新頻率

    // 按下鼠標時開始繪製筆劃
    function handlePointerDown(e) {
        const rect = e.target.getBoundingClientRect();
        e.target.setPointerCapture(e.pointerId);
        setCurrentPoints([[e.clientX - rect.left, e.clientY - rect.top, e.pressure]]);
    }

    // 鼠標移動時繼續繪製筆劃
    function handlePointerMove(e) {
        if (e.buttons !== 1) return;

        const rect = e.target.getBoundingClientRect();
        const newPoint = [e.clientX - rect.left, e.clientY - rect.top, e.pressure];

        if (!animationFrameId) {
            animationFrameId = requestAnimationFrame(() => {
                setCurrentPoints((prevPoints) => [
                    ...prevPoints,
                    newPoint
                ]);
                animationFrameId = null;
            });
        }
    }

    // 鼠標鬆開時結束筆劃
    function handlePointerUp() {
        const finalColor = isEraser ? "white" : strokeColor;     
        setStrokes((prevStrokes) => [
            ...prevStrokes,
            { points: currentPoints, color: finalColor, size: strokeWidth },
        ]);
        console.log("strokes",strokes)
        console.log("curr",currentPoints)
        setCurrentPoints([]); // 清空當前筆劃
        
    }

    return (
        <svg
            ref={canvasRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            style={{ touchAction: "none", width: "100vw", height: "100vh", border: "1px solid #ccc" }}
        >
            {strokes.map((stroke, i) => {
                const pathData = getSvgPathFromStroke(getStroke(stroke.points, { ...options, size: stroke.size }));
                return <path key={i} d={pathData} stroke={stroke.color} fill={stroke.color} />;
            })}
            {currentPoints.length > 0 && (
                <path
                    d={getSvgPathFromStroke(getStroke(currentPoints, { ...options, size: strokeWidth }))}
                    stroke={isEraser ? "White" : strokeColor}
                    fill={isEraser ? "White" : strokeColor}
                />
            )}
        </svg>
    );
}
