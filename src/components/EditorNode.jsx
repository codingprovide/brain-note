import { useState, useRef, useEffect, memo } from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { Handle, Position, NodeResizer } from "@xyflow/react";
import clsx from "clsx";

function EditorNode({ isConnectable, selected }) {
  const BlockNoteViewRef = useRef(null);
  const BlockNoteContentRef = useRef(null);

  // 拖曳時要禁用 drag？
  const [noDrag, setNoDrag] = useState("");
  const [editable, setEditable] = useState(true);

  const [width, setWidth] = useState(350);
  const [height, setHeight] = useState(40);

  // 建立 BlockNote 編輯器，並指定一些 DOM class
  const editor = useCreateBlockNote({
    domAttributes: {
      editor: {
        className: "w-full h-full",
      },
      block: {
        className: "border border-gray-300 rounded-sm p-1 m-0",
      },
    },
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        BlockNoteViewRef.current &&
        !BlockNoteViewRef.current.contains(event.target)
      ) {
        setNoDrag("");
        setEditable(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [noDrag, editable]);

  const handleDoubleClick = () => {
    setNoDrag("nodrag");
    setEditable(true);
  };

  const onContentChange = () => {
    if (!BlockNoteContentRef.current) return;
    const contentHeight = BlockNoteContentRef.current.scrollHeight;

    setHeight(() => contentHeight + 10);
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div
        ref={BlockNoteViewRef}
        style={{ width, height }}
        className={clsx(
          "border border-gray-300 rounded-sm bg-white p-1 m-0",
          "hover:border rounded-lg hover:border-gray-500 hover:shadow-lg",
          "active:border-solid active:border-gray-950",
          "focus-within:border-solid focus-within:border-gray-950 focus-within:shadow-lg"
        )}
        onDoubleClick={handleDoubleClick}
      >
        <div ref={BlockNoteContentRef}>
          <BlockNoteView
            editor={editor}
            theme="light"
            className={clsx(noDrag)}
            editable={editable}
            onChange={onContentChange}
          />
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  );
}

export default memo(EditorNode);
