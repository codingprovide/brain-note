import React, { useState, useEffect, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa";
import { PiEraserFill } from "react-icons/pi";

export default function PaintToolsBar() {
  const [show, setShow] = useState(true);
  const [activeTool, setActiveTool] = useState("pencil");
  const buttonRef = useRef(null);

  const handleToolClick = (tool) => {
    setActiveTool(tool);
    console.log("Tool:", activeTool);
  };

  return (
    <div className="fixed z-50 w-full h-14 max-w-40 -translate-x-1/2 left-1/2 top-5 bg-[#374151] border border-[#374151] rounded-full dark:bg-gray-700 dark:border-gray-600">
      {show && (
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
          <button
            onClick={() => handleToolClick("pencil")}
            ref={buttonRef}
            className={`inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 active:bg-gray-50 focus:bg-gray-50 dark:hover:bg-gray-800 group focus:outline-none ${
              activeTool === "pencil" ? "text-blue-600" : "text-[#CBCBCB]"
            }`}
          >
            <FaPencilAlt className="text-2xl mb-1 dark:text-gray-400 group-hover:text-blue-600" />
          </button>
          <button
            onClick={() => handleToolClick("highlighter")}
            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 active:bg-gray-50 focus:bg-gray-50 dark:hover:bg-gray-800 group focus:outline-none ${
              activeTool === "highlighter" ? "text-blue-600" : "text-[#CBCBCB]"
            }`}
          >
            <FaHighlighter className="text-2xl mb-1 dark:text-gray-400 group-hover:text-blue-600" />
          </button>
          <button
            onClick={() => handleToolClick("eraser")}
            className={`inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 active:bg-gray-50 focus:bg-gray-50 dark:hover:bg-gray-800 group focus:outline-none ${
              activeTool === "eraser" ? "text-blue-600" : "text-[#CBCBCB]"
            }`}
          >
            <PiEraserFill className="text-3xl mb-1 dark:text-gray-400 group-hover:text-blue-600" />
          </button>
        </div>
      )}
    </div>
  );
}
