import clsx from "clsx";

export default function Button({width, handleThicknessSelect, dropdownstyle, selectedThickness, thicknessstyle})
{
  return (
    <div
      onClick={() => handleThicknessSelect(width)}
      className={clsx(
        dropdownstyle,
        {
          "bg-gray-100": selectedThickness === width,
          "": selectedThickness !== width
        }
      )}
    >
      <div className={`${width} ${thicknessstyle}`} />
    </div>
  );
}
