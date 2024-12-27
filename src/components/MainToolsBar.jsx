import React, { useState, useEffect, useRef } from "react";
import PaintToolsBar from "./PaintToolsBar";
import { BsCursor, BsSquare } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { RxText } from "react-icons/rx";

export default function MainToolsBar() {
  const [activeTool, setActiveTool] = useState("cursor");
  const [isShow, setIsShow] = useState(false);

  const toolsbarstyle =
    "fixed z-50 w-42 h-14 -translate-x-1/2 left-1/2 bg-white border border-white rounded-full shadow-xl";
  const buttonstyle =
    "flex flex-col items-center justify-center px-5 hover:bg-gray-100 active:bg-gray-100 focus:bg-gray-100 group focus:outline-none";
  const iconstyle = "mb-1 group-hover:text-blue-600";

  const handleToolClick = (tool) => {
    setActiveTool(tool);
    tool === "pencil" ? setIsShow(true) : setIsShow(false);
  };

  return (
    <div>
      <PaintToolsBar
        toolsbarstyle={toolsbarstyle}
        buttonstyle={buttonstyle}
        iconstyle={iconstyle}
        isShow={isShow}
      />
      <div className={`bottom-5 ${toolsbarstyle}`}>
        <div className="h-full grid max-w-lg grid-cols-4 mx-auto">
          <button
            onClick={() => handleToolClick("cursor")}
            className={`rounded-s-full ${buttonstyle} ${
              activeTool === "cursor" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <BsCursor
              className={`text-2xl transform scale-x-[-1] ${iconstyle}`}
            />
          </button>
          <button
            onClick={() => handleToolClick("square")}
            className={`${buttonstyle} ${
              activeTool === "square" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <BsSquare className={`text-2xl ${iconstyle}`} />
          </button>
          <button
            onClick={() => handleToolClick("pencil")}
            className={`${buttonstyle} ${
              activeTool === "pencil" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <FaPencilAlt className={`text-2xl ${iconstyle}`} />
          </button>
          <button
            onClick={() => handleToolClick("text")}
            className={`rounded-e-full ${buttonstyle} ${
              activeTool === "text" ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <RxText className={`text-3xl ${iconstyle}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
