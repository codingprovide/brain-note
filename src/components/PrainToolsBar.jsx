import React, { useState, useEffect, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa";
import { PiEraserFill } from "react-icons/pi";

export default function PaintToolsBar() {
  const [isToolbarOpen, setIsToolbarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isThicknessOpen, setIsThicknessOpen] = useState(true);
  const [activeTool, setActiveTool] = useState("pencil");
  const [pencilColor, setPencilColor] = useState("black");
  const [highlightColor, setHighlightColor] = useState("yellow");
  const [selectedThickness, setSelectedThickness] = useState("2px");
  const dropdownRef = useRef(null);

  const containerstyle = "grid max-w-lg grid-cols-3 mx-auto";
  const dropdowncontainerstyle = containerstyle + " bg-white divide-gray-100 shadow-lg"
  const buttonstyle =
    "flex flex-col items-center justify-center px-5 hover:bg-gray-100 active:bg-gray-100 focus:bg-gray-100 group focus:outline-none";
  const dropdownstyle =
    "flex items-center justify-around h-10 rounded-md cursor-pointer hover:bg-gray-100";
  const colorcirclestyle = "w-5 h-5 rounded-full cursor-pointer shadow-md";
  const thicknessstyle = "w-20 cursor-pointer bg-black rounded-md";

  const handleToolClick = (tool) => {
    setActiveTool(tool);
    if (tool === "pencil" || tool === "highlighter") {
      setIsDropdownOpen(true);
      tool === "pencil" ? setIsThicknessOpen(true) : setIsThicknessOpen(false);
      activeTool === "pencil" ? console.log("false") : console.log("true");
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleColorSelect = (color) => {
    if (color === "black") {
      activeTool === "highlighter"
        ? setHighlightColor("yellow")
        : setPencilColor(color);
    } else if (color === "red") {
      activeTool === "highlighter"
        ? setHighlightColor("blue")
        : setPencilColor(color);
    } else if (color === "blue") {
      activeTool === "highlighter"
        ? setHighlightColor("green")
        : setPencilColor(color);
    }
  };

  const handleThicknessSelect = (thickness) => {
    setSelectedThickness(thickness);
  };

  return (
    <div ref={dropdownRef}>
      {isToolbarOpen && (
        <div className="fixed z-50 w-40 h-14 -translate-x-1/2 left-1/2 top-5 bg-white border border-white rounded-full shadow-xl">
          <div className={`h-full ${containerstyle}`}>
            <button
              onClick={() => handleToolClick("pencil")}
              className={`rounded-s-full ${buttonstyle} ${
                activeTool === "pencil" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <FaPencilAlt className="text-2xl mb-1 group-hover:text-blue-600" />
            </button>
            <button
              onClick={() => handleToolClick("highlighter")}
              className={`${buttonstyle} ${
                activeTool === "highlighter" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <FaHighlighter className="text-2xl mb-1 group-hover:text-blue-600" />
            </button>
            <button
              onClick={() => handleToolClick("eraser")}
              className={`rounded-e-full ${buttonstyle} ${
                activeTool === "eraser" ? "text-blue-600" : "text-gray-500"
              }`}
            >
              <PiEraserFill className="text-3xl mb-1 group-hover:text-blue-600" />
            </button>
          </div>

          {isDropdownOpen && (
            <div>
              <div
                className={`${dropdowncontainerstyle} mt-2 rounded-t-lg`}
              >
                <div
                  onClick={() => handleColorSelect("black")}
                  className={`${dropdownstyle}`}
                >
                  <div
                    className={`${colorcirclestyle} ${
                      activeTool === "pencil" ? "bg-black" : "bg-yellow-500"
                    } ${
                      (activeTool === "pencil" && pencilColor === "black") ||
                      (activeTool === "highlighter" &&
                        highlightColor === "yellow")
                        ? "border-[3px] border-gray-500 "
                        : ""
                    }`}
                  />
                </div>
                <div
                  onClick={() => handleColorSelect("red")}
                  className={`${dropdownstyle}`}
                >
                  <div
                    className={`${colorcirclestyle} ${
                      activeTool === "pencil" ? "bg-red-500" : "bg-blue-500"
                    } ${
                      (activeTool === "pencil" && pencilColor === "red") ||
                      (activeTool === "highlighter" &&
                        highlightColor === "blue")
                        ? "border-[3px] border-gray-500 "
                        : ""
                    }`}
                  />
                </div>
                <div
                  onClick={() => handleColorSelect("blue")}
                  className={`${dropdownstyle}`}
                >
                  <div
                    className={`${colorcirclestyle} ${
                      activeTool === "pencil" ? "bg-blue-500" : "bg-green-500"
                    } ${
                      (activeTool === "pencil" && pencilColor === "blue") ||
                      (activeTool === "highlighter" &&
                        highlightColor === "green")
                        ? "border-[3px] border-gray-500 "
                        : ""
                    }`}
                  />
                </div>
              </div>

              {isThicknessOpen && (
                <div
                  className={`${dropdowncontainerstyle} rounded-b-lg`}
                >
                  <div
                    onClick={() => handleThicknessSelect("2px")}
                    className={`px-4 ${dropdownstyle} ${
                      selectedThickness === "2px" ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className={`h-[2px] ${thicknessstyle}`} />
                  </div>
                  <div
                    onClick={() => handleThicknessSelect("5px")}
                    className={`px-4 ${dropdownstyle} ${
                      selectedThickness === "5px" ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className={`h-[4px] ${thicknessstyle}`} />
                  </div>
                  <div
                    onClick={() => handleThicknessSelect("10px")}
                    className={`px-4 ${dropdownstyle} ${
                      selectedThickness === "10px" ? "bg-gray-100" : ""
                    }`}
                  >
                    <div className={`h-[6px] ${thicknessstyle}`} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
