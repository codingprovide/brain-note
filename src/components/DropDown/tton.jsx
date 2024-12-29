import { useState, useEffect, useRef } from "react";
import clsx from "clsx";

export default function PaintToolsBarLayout({
  dropdownstyle, 
  colorcirclestyle, 
  activeTool, 
  pencilcolor, 
  highlightcolor
}) {
  const [pencilColor, setPencilColor] = useState("bg-black");
  const [highlightColor, setHighlightColor] = useState("bg-yellow-500");
  const [test, setTest] = useState(false);

  const handleColorSelect = (color) => {
    if (color === "bg-black") {
      activeTool === "highlighter"
        ? setHighlightColor("bg-yellow-500")
        : setPencilColor(color);
    } else if (color === "bg-red-500") {
      activeTool === "highlighter"
        ? setHighlightColor("bg-blue-500")
        : setPencilColor(color);
    } else if (color === "bg-blue-500") {
      activeTool === "highlighter"
        ? setHighlightColor("bg-green-500")
        : setPencilColor(color);
    }

    if((activeTool === "pencil" && pencilColor === pencilcolor) || 
    (activeTool === "highlighter" && highlightColor === highlightcolor)){
        setTest(true)
    }else{
        setTest(false)
    }
  };

  return (
    <div onClick={() => handleColorSelect(pencilcolor)} className={`${dropdownstyle}`}>
      <div
        className={clsx(
          colorcirclestyle,
          {
            [pencilcolor]: activeTool === "pencil", 
            [highlightcolor]: activeTool !== "pencil",
            "border-[3px] border-gray-500": 
              (activeTool === "pencil" && pencilColor === pencilcolor) || 
              (activeTool === "highlighter" && highlightColor === highlightcolor)
          }
        )}
      />
    </div>
  );
}
