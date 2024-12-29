import MainToolsBarLayout from "./MainToolsBar/MainToolsBarLayout"
import ThicknessLayout from "./DropDown/ThicknessLayout"
import Thickness from "./DropDown/Thickness"
import Button from "./MainToolsBar/Button";
import { useState, useEffect, useRef } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa";
import { PiEraserFill } from "react-icons/pi";

export default function PaintToolsBar({
  containerstyle,
  toolsbarstyle,
  buttonstyle,
  iconstyle,
  isShow,
}) {
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isThicknessOpen, setIsThicknessOpen] = useState(true);
  const [activeTool, setActiveTool] = useState("pencil");
  const [pencilColor, setPencilColor] = useState("bg-black");
  const [highlightColor, setHighlightColor] = useState("bg-yellow-500");
  const [selectedThickness, setSelectedThickness] = useState("3px");
  const dropdownRef = useRef(null);

  const dropdowncontainerstyle =
    containerstyle + " grid-cols-3 bg-white divide-gray-100 shadow-lg";
  const dropdownstyle =
    "flex items-center justify-around h-10 rounded-md cursor-pointer hover:bg-gray-100";
  const colorcirclestyle = "w-5 h-5 rounded-full cursor-pointer shadow-md";
  const thicknessstyle = "px-4 w-2 cursor-pointer bg-black rounded-md";

  const paintTools = [
      {
        tool: "pencil",
        icon: (
          <FaPencilAlt
            className={`text-2xl transform scale-x-[-1] ${iconstyle}`}
          />
        ),
        roundedStyle: "rounded-s-full",
      },
      {
        tool: "highlighter",
        icon: <FaHighlighter className={`text-2xl ${iconstyle}`} />,
        roundedStyle: "",
      },
      {
        tool: "earser",
        icon: <PiEraserFill className={`text-3xl ${iconstyle}`} />,
        roundedStyle: "rounded-e-full",
      },
    ];

  const dropDown = [
    {
      col: "col1",
      pencilColor: "bg-black",
      highlighterColor: "bg-yellow-500",
      style: "border-[3px] border-gray-500 ",
    },
    {
      col: "col2",
      pencilColor: "bg-red-500",
      highlighterColor: "bg-blue-500",
      style: "border-[3px] border-gray-500 ",
    },
    {
      col: "col3",
      pencilColor: "bg-blue-500",
      highlighterColor: "bg-green-500",
      style: "border-[3px] border-gray-500 ",
    },
  ];
  const thickness = [
    {width: "h-[3px]"},
    {width: "h-[5px]"},
    {width: "h-[7px]"},
  ]

  useEffect(() => {
    setIsToolbarOpen(isShow);
  }, [isShow]);

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
  }

  const handleThicknessSelect = (thickness) => {
    setSelectedThickness(thickness);
  };

  return (
    <div ref={dropdownRef}>
      {isToolbarOpen && (
        <div className={`top-5 ${toolsbarstyle}`}>
            <MainToolsBarLayout containerstyle={containerstyle} col="grid-cols-3">
                    {paintTools.map((paintTool) => (
                      <Button
                        key={paintTool.tool}
                        handleToolClick={handleToolClick}
                        buttonstyle={buttonstyle}
                        tool={paintTool.tool}
                        icon={paintTool.icon}
                        roundedStyle={paintTool.roundedStyle}
                        activeTool={activeTool}
                      />
                    ))}
                  </MainToolsBarLayout>
          
          {isDropdownOpen && (
            <div>
              <div className={`${dropdowncontainerstyle} mt-2 rounded-t-lg`}>
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
                <ThicknessLayout dropdowncontainerstyle={dropdowncontainerstyle}>
                  {thickness.map((thickNess) => (
                  <Thickness 
                    key={thickNess.width}
                    width={thickNess.width}
                    handleThicknessSelect={handleThicknessSelect}
                    dropdownstyle={dropdownstyle}
                    selectedThickness={selectedThickness}
                    thicknessstyle={thicknessstyle}
                  />
                  ))}
                </ThicknessLayout>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
