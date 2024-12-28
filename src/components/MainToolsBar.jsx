import MainToolsBarLayout from "./MainToolsBar/MainToolsBarLayout";
import Button from "./MainToolsBar/Button";
import PaintToolsBar from "./PaintToolsBar";
import { useState } from "react";
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
  const mainTools = [
    {
      tool: "cursor",
      icon: (
        <BsCursor
          className={`text-2xl transform scale-x-[-1] ${iconstyle}`}
        />
      ),
      roundedStyle: "rounded-s-full",
    },
    {
      tool: "square",
      icon: <BsSquare className={`text-2xl ${iconstyle}`} />,
      roundedStyle: "",
    },
    {
      tool: "pencil",
      icon: (
        <FaPencilAlt className={`text-2xl ${iconstyle}`} />
      ),
      roundedStyle: "",
    },
    {
      tool: "text",
      icon: <RxText className={`text-3xl ${iconstyle}`} />,
      roundedStyle: "rounded-e-full",
    },
  ];

  return (
    <>
      <PaintToolsBar
        toolsbarstyle={toolsbarstyle}
        buttonstyle={buttonstyle}
        iconstyle={iconstyle}
        isShow={isShow}
      />
      <MainToolsBarLayout toolsbarstyle={toolsbarstyle}>
        {mainTools.map((mainTool) => (
          <Button
            key={mainTool.tool}
            handleToolClick={handleToolClick}
            buttonstyle={buttonstyle}
            tool={mainTool.tool}
            icon={mainTool.icon}
            roundedStyle={mainTool.roundedStyle}
            activeTool={activeTool}
          />
        ))}
      </MainToolsBarLayout>
    </>
  );
}
