import MainToolsBarLayout from "./MainToolsBar/MainToolsBarLayout"
import ThicknessLayout from "./DropDown/ThicknessLayout"
import BrushColor from "./PaintToolsBar/BrushColor"
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
      col: 0,
      pencil: "bg-black",
      highlighter: "bg-yellow-500",
    },
    {
      col: 1,
      pencil: "bg-red-500",
      highlighter: "bg-orange-500",
    },
    {
      col: 2,
      pencil: "bg-blue-500",
      highlighter: "bg-green-500",
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

  const handleColorSelect = (col) => {
    if(activeTool === "pencil"){
      setPencilColor(dropDown[col]["pencil"])
    }else if(activeTool === "highlighter"){
      setHighlightColor(dropDown[col]["highlighter"])
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
                roundedStyle={paintTool.roundedStyle}
                buttonstyle={buttonstyle}
                tool={paintTool.tool}
                icon={paintTool.icon}
                activeTool={activeTool}
              />
          ))}
          </MainToolsBarLayout>
          
          {isDropdownOpen && (
            <div>
              <div className={`${dropdowncontainerstyle} mt-2 rounded-t-lg`}>
                  {dropDown.map((dropdown) => (
                    <BrushColor
                      key={dropdown.col}
                      handleColorSelect={handleColorSelect} 
                      colorcirclestyle={colorcirclestyle}
                      dropdown={dropDown}
                      col={dropdown.col} 
                      dropdownstyle={dropdownstyle} 
                      activeTool={activeTool}
                      pencilColor={pencilColor}
                      highlightColor={highlightColor}
                    />
                  ))} 
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


