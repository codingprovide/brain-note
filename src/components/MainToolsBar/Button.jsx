import clsx from "clsx";

export default function Button({
  handleToolClick,
  tool,
  icon,
  roundedStyle,
  activeTool,
}) {
  return (
    <button
      onClick={() => handleToolClick(tool)}
      className={clsx(
        roundedStyle,
        "flex flex-col items-center justify-center px-5 group focus:outline-none",
        {
          "hover:bg-gray-100 active:bg-gray-100 focus:bg-gray-100": true,
          "text-blue-600": activeTool === tool,
          "text-gray-500": activeTool !== tool,
        }
      )}
    >
      {icon}
    </button>
  );
}
