import { useRef, useState } from "react";
import DrawingCanvas from './DrawingCanvas.jsx';  

function ToolsBar() {
    const canvasRef = useRef(null);
    const [eraseMode, setEraseMode] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(15); 
    const [strokeColor, setStrokeColor] = useState("#000000");
    const [isEraser, setIsEraser] = useState(false);

    const handleEraserClick = () => {
        setIsEraser(true);
    };

    const handlePenClick = () => {
        setIsEraser(false);
    };

    const handleStrokeWidthChange = (event) => {
        setStrokeWidth(+event.target.value);
    };

    const handleStrokeColorChange = (event) => {
        setStrokeColor(event.target.value);
    };

    return (
        <div className="Canvas">
            <div className="Tools">
                <h1>Canvas</h1>
                <button onClick={handlePenClick}>筆</button>
                <button onClick={handleEraserClick}>橡皮擦</button>
                <label>筆刷大小</label>
                <input
                    type="range"
                    min="5"
                    max="50"
                    value={strokeWidth}
                    onChange={handleStrokeWidthChange}
                />
                <label>顏色</label>
                <input
                    type="color"
                    value={strokeColor}
                    onChange={handleStrokeColorChange}
                    disabled={isEraser} 
                />
            </div>

            <div className="Board">
                <DrawingCanvas
                    canvasRef={canvasRef}
                    strokeWidth={strokeWidth}
                    strokeColor={isEraser ? "white" : strokeColor}
                    isEraser={isEraser}
                />
            </div>
        </div>
    );
}

export default ToolsBar;
