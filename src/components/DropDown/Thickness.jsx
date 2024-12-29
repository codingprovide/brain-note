import clsx from "clsx";

export default function Button({width, handleThicknessSelect, dropdownstyle, selectedThickness, thicknessstyle})
{
  return (
    <div
      onClick={() => handleThicknessSelect(width)}
      className={clsx(
        dropdownstyle,
        {
          "px-4": true,
          "bg-gray-100": selectedThickness === width,
          "": selectedThickness !== width
        }
      )}
    >
      <div className={`h-[${width}] ${thicknessstyle}`} />
    </div>
  );
}
