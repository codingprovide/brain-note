import React, { useState, useEffect, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa";
import { PiEraserFill } from "react-icons/pi";

export default function PaintToolsBar() {
  const [isToolbarOpen, setIsToolbarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTool, setActiveTool] = useState("pencil");
  const [pencilColor, setPencilColor] = useState("black");
  const [highlightColor, setHighlightColor] = useState("yellow");
  const [selectedThickness, setSelectedThickness] = useState("2px");
  const dropdownRef = useRef(null);

  const handleToolClick = (tool) => {
    setActiveTool(tool);
    if (tool === "pencil" || tool === "highlighter") {
      setIsDropdownOpen(true);
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
    console.log("activeTool", activeTool);
    console.log("pencilColor", pencilColor);
    console.log("highlightColor", highlightColor);
    console.log("Thickness", selectedThickness);
  }, [pencilColor, highlightColor, selectedThickness]);

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
        <div className="fixed z-50 w-full h-14 max-w-40 -translate-x-1/2 left-1/2 top-5 bg-[#374151] border border-[#374151] rounded-full dark:bg-gray-700 dark:border-gray-600">
          <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
            <button
              onClick={() => handleToolClick("pencil")}
              className={`inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 active:bg-gray-50 focus:bg-gray-50 dark:hover:bg-gray-800 group focus:outline-none ${
                activeTool === "pencil" ? "text-blue-600" : "text-[#CBCBCB]"
              }`}
            >
              <FaPencilAlt className="text-2xl mb-1 dark:text-gray-400 group-hover:text-blue-600" />
            </button>
            <button
              onClick={() => handleToolClick("highlighter")}
              className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 active:bg-gray-50 focus:bg-gray-50 dark:hover:bg-gray-800 group focus:outline-none ${
                activeTool === "highlighter"
                  ? "text-blue-600"
                  : "text-[#CBCBCB]"
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
          {isDropdownOpen && (
            <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-32 dark:bg-gray-700 dark:divide-gray-600 mt-2">
              <div className="flex">
                <ul className="text-sm text-gray-700 dark:text-gray-200 w-1/2">
                  <li
                    onClick={() => handleColorSelect("black")}
                    className="flex items-center py-2 px-5 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 "
                  >
                    <div
                      className={`w-5 h-5 rounded-full cursor-pointer shadow-md ${
                        activeTool === "pencil" ? "bg-black" : "bg-yellow-500"
                      } ${
                        (activeTool === "pencil" && pencilColor === "black") ||
                        (activeTool === "highlighter" &&
                          highlightColor === "yellow")
                          ? "border-2 border-gray-400 "
                          : ""
                      }`}
                    />
                  </li>
                  <li
                    onClick={() => handleColorSelect("red")}
                    className="flex items-center py-2 px-5 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 "
                  >
                    <div
                      className={`w-5 h-5 rounded-full cursor-pointer shadow-md ${
                        activeTool === "pencil" ? "bg-red-500" : "bg-blue-500"
                      } ${
                        (activeTool === "pencil" && pencilColor === "red") ||
                        (activeTool === "highlighter" &&
                          highlightColor === "blue")
                          ? "border-2 border-gray-400 "
                          : ""
                      }`}
                    />
                  </li>
                  <li
                    onClick={() => handleColorSelect("blue")}
                    className="flex items-center py-2 px-5 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 "
                  >
                    <div
                      className={`w-5 h-5 rounded-full cursor-pointer shadow-md ${
                        activeTool === "pencil" ? "bg-blue-500" : "bg-green-500"
                      } ${
                        (activeTool === "pencil" && pencilColor === "blue") ||
                        (activeTool === "highlighter" &&
                          highlightColor === "green")
                          ? "border-2 border-gray-400 "
                          : ""
                      }`}
                    />
                  </li>
                </ul>
                <ul className="text-sm text-gray-700 dark:text-gray-200 w-1/2">
                  <li
                    onClick={() => handleThicknessSelect("2px")}
                    className={`flex items-center py-[17px] px-4 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600  ${
                      selectedThickness === "2px" ? "bg-gray-200" : ""
                    }`}
                  >
                    <div className="h-[2px] w-20 cursor-pointer bg-black rounded-md" />
                  </li>
                  <li
                    onClick={() => handleThicknessSelect("5px")}
                    className={`flex items-center py-[16px] px-4 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600  ${
                      selectedThickness === "5px" ? "bg-gray-200" : ""
                    }`}
                  >
                    <div className="h-[4px] w-20 cursor-pointer bg-black rounded-md" />
                  </li>
                  <li
                    onClick={() => handleThicknessSelect("10px")}
                    className={`flex items-center py-[15px] px-4 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600  ${
                      selectedThickness === "10px" ? "bg-gray-200" : ""
                    }`}
                  >
                    <div className="h-[6px] w-20 cursor-pointer bg-black rounded-md" />
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
