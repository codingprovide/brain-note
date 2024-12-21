import React, { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa";
import { PiEraserFill } from "react-icons/pi";

export default function PaintToolsBar() {
  const [show, setShow] = useState(true);

  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
      {show && (
        <div className="w-[150px] h-[50px] bg-[#E0DBDB] border-black border text-center mt-5 rounded-[10px] shadow-lg flex place-items-center justify-between px-5">
          <button className="">
            <FaPencilAlt className="text-gray-700 text-2xl" />
          </button>
          <button className="">
            <FaHighlighter className="text-gray-700 text-2xl" />
          </button>
          <button className="">
            <PiEraserFill className="text-gray-700 text-3xl" />
          </button>
        </div>
      )}
    </div>
  );
}
