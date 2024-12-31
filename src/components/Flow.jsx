import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  SelectionMode,
  useReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import EditorNode from "./EditorNode";
export default function Flow() {
  const nodeTypes = useMemo(() => ({ editor: EditorNode }), []);
  //初始化節點
  const initialNodes = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      type: "editor",
      data: { label: "1" },
    },
    {
      id: "2",
      position: { x: 0, y: 100 },
      data: { label: "2" },
    },
  ];

  //初始化節點的邊
  const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

  const proOptions = { hideAttribution: true };

  //使用screenToFlowPosition來轉換滑鼠點擊的座標
  const { screenToFlowPosition } = useReactFlow();
  //使用useNodesState來管理節點
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  //使用useEdgesState來管理節點的邊
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  //初始化滑鼠雙擊的時間
  //節點的邊連結
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  //當滑鼠連續點擊兩次新增節點
  const handleAddNode = (event) => {
    if (event.target.classList[0] === "react-flow__pane") {
      const { clientX, clientY } =
        "changedTouches" in event ? event.changedTouches[0] : event;

      const newNode = {
        id: `${nodes.length + 1}`,
        position: screenToFlowPosition({ x: clientX, y: clientY }),
        type: "editor",
      };

      setNodes((nds) => [...nds, newNode]);
      console.log("New node added!");
    }
  };

  return (
    <ReactFlow
      fitView
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      //設定滑鼠滾輪中鍵垂直滾動來移動畫布
      panOnScroll
      //用戶可以一次選擇多個節點
      selectionOnDrag
      //設定滑鼠的鍵位來拖曳1:左鍵 2:中鍵
      panOnDrag={[1, 2]}
      //設定部分位於選區內的節點也會被選取
      selectionMode={SelectionMode.Partial}
      //停用雙擊畫布進行縮放的功能
      zoomOnDoubleClick={false}
      proOptions={proOptions}
      nodeTypes={nodeTypes}
      //當使用者點選畫布空白區域時，觸發addNode function，可用來新增節點
      onDoubleClick={(event) => {
        handleAddNode(event);
      }}
      maxZoom={5}
    >
      <Controls />
      <MiniMap />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
}
