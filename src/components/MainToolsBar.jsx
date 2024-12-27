import { useState } from "react";
import PaintToolsBar from "./PaintToolsBar";
import { BsCursor, BsSquare } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { RxText } from "react-icons/rx";
import MainToolsBarLayout from "./MainToolsBar/MainToolsBarLayout";
import Button from "./MainToolsBar/Button";

export default function MainToolsBar() {
  const [activeTool, setActiveTool] = useState("cursor");
  const [isShow, setIsShow] = useState(false);

  const toolsbarstyle =
    "fixed z-50 w-42 h-14 -translate-x-1/2 left-1/2 bg-white border border-white rounded-full shadow-xl";
  const buttonstyle =
    "flex flex-col items-center justify-center px-5 hover:bg-gray-100 active:bg-gray-100 focus:bg-gray-100 group focus:outline-none";
  const iconstyle = "";

  const handleToolClick = (tool) => {
    setActiveTool(tool);
    tool === "pencil" ? setIsShow(true) : setIsShow(false);
  };
  const mainTools = [
    {
      tool: "cursor",
      icon: (
        <BsCursor
          className={`text-2xl transform scale-x-[-1] mb-1 group-hover:text-blue-600`}
        />
      ),
      roundedStyle: "rounded-s-full",
    },
    {
      tool: "square",
      icon: <BsSquare className={`text-2xl mb-1 group-hover:text-blue-600`} />,
      roundedStyle: "",
    },
    {
      tool: "pencil",
      icon: (
        <FaPencilAlt className={`text-2xl mb-1 group-hover:text-blue-600`} />
      ),
      roundedStyle: "",
    },
    {
      tool: "text",
      icon: <RxText className={`text-3xl mb-1 group-hover:text-blue-600`} />,
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
      <MainToolsBarLayout>
        {mainTools.map((mainTool) => (
          <Button
            key={mainTool.tool}
            handleToolClick={handleToolClick}
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
