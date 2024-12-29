import clsx from "clsx";

export default function Button({handleColorSelect, colorcirclestyle, dropdown, col, dropdownstyle, activeTool, pencilColor, highlightColor}) {
  return (
    <div
        onClick={() => handleColorSelect(col)}
        className={`${dropdownstyle}`}
    >
        <div 
            className={clsx(
                colorcirclestyle,
                {
                    [dropdown[col]["pencil"]]: activeTool === "pencil",
                    [dropdown[col]["highlighter"]]: activeTool === "highlighter",
                    "border-[3px] border-gray-500 ": pencilColor === dropdown[col][activeTool] || highlightColor === dropdown[col][activeTool],
                }
              )}></div>
    </div>
  );
}
