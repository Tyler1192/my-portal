// @ts-nocheck
import React, { useCallback, useState, useEffect, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  applyNodeChanges,
  MiniMap,
  Controls,
  Background,
  Handle,
  Position,
} from 'reactflow';

import { ResizableBox } from 'react-resizable';
import 'reactflow/dist/style.css';


// ✅ カスタムノード

const handleSize = 1;
const hitBoxSize = 20;

const CustomNode = ({ id, data }) => {
  const [text, setText] = useState(data.label || '');
  const [size, setSize] = useState({ width: 120, height: 20 }); //初期サイズの変更点1/2

  const textRef = React.useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const scrollWidth = textRef.current.scrollWidth;
      const scrollHeight = textRef.current.scrollHeight;

      setSize({
        width: Math.max(120, scrollWidth + 20), //初期サイズの変更点2/2
        height: Math.max(20, scrollHeight + 20), //初期サイズの変更点2/2
      });
    }
  }, [text]);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    data.onChange(id, value);
  };

  return (
    <div
      style={{
        width: size.width,
        height: size.height,
        background: '#ffffff',
        border: '2px solid #444',
        borderRadius: '8px',
        padding: '10px',
        boxSizing: 'border-box',
        position: 'relative',
        textAlign: 'center',
      }}
    >

      {/* 上 */}
      <Handle
        id="top-in"
        type="target"
        position={Position.Top}
        isConnectable={true}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: handleSize,
          height: handleSize,
          backgroundColor: 'transparent',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
        }}
      />
      <Handle
        id="top-out"
        type="source"
        position={Position.Top}
        isConnectable={true}
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: handleSize,
          height: handleSize,
          backgroundColor: 'transparent',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
        }}
      />

      {/* 下 */}
      <Handle
        id="bottom-in"
        type="target"
        position={Position.Bottom}
        isConnectable={true}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: handleSize,
          height: handleSize,
          backgroundColor: 'transparent',
          transform: 'translate(-50%, 50%)',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
        }}
      />
      <Handle
        id="bottom-out"
        type="source"
        position={Position.Bottom}
        isConnectable={true}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: handleSize,
          height: handleSize,
          backgroundColor: 'transparent',
          transform: 'translate(-50%, 50%)',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
        }}
      />

      {/* 左 */}
      <Handle
        id="left-in"
        type="target"
        position={Position.Left}
        isConnectable={true}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          width: handleSize,
          height: handleSize,
          backgroundColor: 'transparent',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
        }}
      />
      <Handle
        id="left-out"
        type="source"
        position={Position.Left}
        isConnectable={true}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          width: handleSize,
          height: handleSize,
          backgroundColor: 'transparent',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
        }}
      />

      {/* 右 */}
      <Handle
        id="right-in"
        type="target"
        position={Position.Right}
        isConnectable={true}
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          width: handleSize,
          height: handleSize,
          backgroundColor: 'transparent',
          transform: 'translate(50%, -50%)',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
        }}
      />
      <Handle
        id="right-out"
        type="source"
        position={Position.Right}
        isConnectable={true}
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          width: handleSize,
          height: handleSize,
          backgroundColor: 'transparent',
          transform: 'translate(50%, -50%)',
          border: 'none',
          boxShadow: 'none',
          outline: 'none',
        }}
      />

      {/* テキストエリア */}
      <textarea
        ref={textRef}
        value={text}
        onChange={handleChange}
        style={{
          width: '100%',
          height: '100%',
          resize: 'none',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          textAlign: 'center', // 横方向中央
          display: 'flex',
          alignItems: 'center', // 縦方向中央
          justifyContent: 'center',
          padding: 0,           // 余白をなくす
          overflow: 'hidden',
          lineHeight: '1.4',
          paddingTop: '0px',
          paddingBottom: '1px',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
};


//ここからフォークノード
const ForkNode = ({ id, data }) => {
  const [expanded, setExpanded] = useState(true); // true: 大きく表示, false: 小さく表示

  const handleContextMenu = (e) => {
    e.preventDefault(); // デフォルトの右クリックメニューを抑制
    setExpanded((prev) => !prev); // サイズをトグル
  };

  const size = expanded ? 15 : 1; // 大きさを切り替え
  const border = expanded ? '2px solid #222' : '1px solid #555';

  return (
    <div
      onContextMenu={handleContextMenu}
      style={{
        width: size,
        height: size,
        background: 'black',
        border: border,
        borderRadius: '4px',
        position: 'relative',
        transform: `translate(-${size / 2}px, -${size / 2}px)`,
      }}
    >
      {['Top', 'Bottom', 'Left', 'Right'].map((dir) => (
        <React.Fragment key={dir}>
          <Handle
            id={`${dir.toLowerCase()}-in`}
            type="target"
            position={Position[dir]}
            isConnectable={true}
            style={{
              position: 'absolute',
              [dir.toLowerCase()]: 0,
              ...(dir === 'Top' || dir === 'Bottom' ? { left: '50%' } : { top: '50%' }),
              transform:
                dir === 'Top'
                  ? 'translate(-50%, -50%)'
                  : dir === 'Bottom'
                  ? 'translate(-50%, 50%)'
                  : dir === 'Left'
                  ? 'translate(-50%, -50%)'
                  : 'translate(50%, -50%)',
              width: 1,
              height: 1,
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Handle
            id={`${dir.toLowerCase()}-out`}
            type="source"
            position={Position[dir]}
            isConnectable={true}
            style={{
              position: 'absolute',
              [dir.toLowerCase()]: 0,
              ...(dir === 'Top' || dir === 'Bottom' ? { left: '50%' } : { top: '50%' }),
              transform:
                dir === 'Top'
                  ? 'translate(-50%, -50%)'
                  : dir === 'Bottom'
                  ? 'translate(-50%, 50%)'
                  : dir === 'Left'
                  ? 'translate(-50%, -50%)'
                  : 'translate(50%, -50%)',
              width: 1,
              height: 1,
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

//ここから楕円ノード
const EllipseNode = ({ id, data }) => {
  const [text, setText] = useState(data.label || '');
  const [size, setSize] = useState({ width: 130, height: 60 }); // 楕円らしい初期サイズ

  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const scrollWidth = textRef.current.scrollWidth;
      const scrollHeight = textRef.current.scrollHeight;

      setSize({
        width: Math.max(130, scrollWidth + 20),
        height: Math.max(60, scrollHeight + 20),
      });
    }
  }, [text]);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    data.onChange(id, value);
  };

  return (
    <div
      style={{
        width: size.width,
        height: size.height,
        background: '#ffffff',
        border: '2px solid #444',
        borderRadius: '50%', // 楕円形にする
        padding: '10px',
        boxSizing: 'border-box',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {['Top', 'Bottom', 'Left', 'Right'].map((dir) => (
        <React.Fragment key={dir}>
          <Handle
            id={`${dir.toLowerCase()}-in`}
            type="target"
            position={Position[dir]}
            isConnectable={true}
            style={{
              position: 'absolute',
              [dir.toLowerCase()]: 0,
              ...(dir === 'Top' || dir === 'Bottom' ? { left: '50%' } : { top: '50%' }),
              transform:
                dir === 'Top'
                  ? 'translate(-50%, -50%)'
                  : dir === 'Bottom'
                  ? 'translate(-50%, 50%)'
                  : dir === 'Left'
                  ? 'translate(-50%, -50%)'
                  : 'translate(50%, -50%)',
              width: 1,
              height: 1,
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Handle
            id={`${dir.toLowerCase()}-out`}
            type="source"
            position={Position[dir]}
            isConnectable={true}
            style={{
              position: 'absolute',
              [dir.toLowerCase()]: 0,
              ...(dir === 'Top' || dir === 'Bottom' ? { left: '50%' } : { top: '50%' }),
              transform:
                dir === 'Top'
                  ? 'translate(-50%, -50%)'
                  : dir === 'Bottom'
                  ? 'translate(-50%, 50%)'
                  : dir === 'Left'
                  ? 'translate(-50%, -50%)'
                  : 'translate(50%, -50%)',
              width: 1,
              height: 1,
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
        </React.Fragment>
      ))}

      <textarea
        ref={textRef}
        value={text}
        onChange={handleChange}
        style={{
          width: '100%',
          height: '100%',
          resize: 'none',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          overflow: 'hidden',
          lineHeight: '1.4',
          paddingTop: '7px',
          paddingBottom: '1px',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
};


// ✅ 1. 点線ノードコンポーネントを追加
const DashedNode = ({ id, data }) => {
  const [text, setText] = useState(data.label || '');
  const [size, setSize] = useState({ width: 120, height: 20 });
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const scrollWidth = textRef.current.scrollWidth;
      const scrollHeight = textRef.current.scrollHeight;

      setSize({
        width: Math.max(120, scrollWidth + 20),
        height: Math.max(20, scrollHeight + 20),
      });
    }
  }, [text]);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    data.onChange(id, value);
  };

  return (
    <div
      style={{
        width: size.width,
        height: size.height,
        background: '#ffffff',
        border: '2px dashed #888',
        borderRadius: '8px',
        padding: '10px',
        boxSizing: 'border-box',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {['Top', 'Bottom', 'Left', 'Right'].map((dir) => (
        <React.Fragment key={dir}>
          <Handle
            id={`${dir.toLowerCase()}-in`}
            type="target"
            position={Position[dir]}
            isConnectable={true}
            style={{
              position: 'absolute',
              [dir.toLowerCase()]: 0,
              ...(dir === 'Top' || dir === 'Bottom'
                ? { left: '50%' }
                : { top: '50%' }),
              transform:
                dir === 'Top'
                  ? 'translate(-50%, -50%)'
                  : dir === 'Bottom'
                  ? 'translate(-50%, 50%)'
                  : dir === 'Left'
                  ? 'translate(-50%, -50%)'
                  : 'translate(50%, -50%)',
              width: 1,
              height: 1,
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Handle
            id={`${dir.toLowerCase()}-out`}
            type="source"
            position={Position[dir]}
            isConnectable={true}
            style={{
              position: 'absolute',
              [dir.toLowerCase()]: 0,
              ...(dir === 'Top' || dir === 'Bottom'
                ? { left: '50%' }
                : { top: '50%' }),
              transform:
                dir === 'Top'
                  ? 'translate(-50%, -50%)'
                  : dir === 'Bottom'
                  ? 'translate(-50%, 50%)'
                  : dir === 'Left'
                  ? 'translate(-50%, -50%)'
                  : 'translate(50%, -50%)',
              width: 1,
              height: 1,
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
        </React.Fragment>
      ))}

      <textarea
        ref={textRef}
        value={text}
        onChange={handleChange}
        style={{
          width: '100%',
          height: '100%',
          resize: 'none',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          overflow: 'hidden',
          lineHeight: '1.4',
          paddingTop: '0px',
          paddingBottom: '1px',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
};

//ここから点線楕円のノード
const DashedEllipseNode = ({ id, data }) => {
  const [text, setText] = useState(data.label || '');
  const [size, setSize] = useState({ width: 130, height: 60 });

  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const scrollWidth = textRef.current.scrollWidth;
      const scrollHeight = textRef.current.scrollHeight;

      setSize({
        width: Math.max(130, scrollWidth + 20),
        height: Math.max(60, scrollHeight + 20),
      });
    }
  }, [text]);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    data.onChange(id, value);
  };

  return (
    <div
      style={{
        width: size.width,
        height: size.height,
        background: '#ffffff',
        border: '2px dashed #444', // 👈 点線に変更
        borderRadius: '50%',
        padding: '10px',
        boxSizing: 'border-box',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {['Top', 'Bottom', 'Left', 'Right'].map((dir) => (
        <React.Fragment key={dir}>
          <Handle
            id={`${dir.toLowerCase()}-in`}
            type="target"
            position={Position[dir]}
            isConnectable={true}
            style={{
              position: 'absolute',
              [dir.toLowerCase()]: 0,
              ...(dir === 'Top' || dir === 'Bottom' ? { left: '50%' } : { top: '50%' }),
              transform:
                dir === 'Top'
                  ? 'translate(-50%, -50%)'
                  : dir === 'Bottom'
                  ? 'translate(-50%, 50%)'
                  : dir === 'Left'
                  ? 'translate(-50%, -50%)'
                  : 'translate(50%, -50%)',
              width: 1,
              height: 1,
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
          <Handle
            id={`${dir.toLowerCase()}-out`}
            type="source"
            position={Position[dir]}
            isConnectable={true}
            style={{
              position: 'absolute',
              [dir.toLowerCase()]: 0,
              ...(dir === 'Top' || dir === 'Bottom' ? { left: '50%' } : { top: '50%' }),
              transform:
                dir === 'Top'
                  ? 'translate(-50%, -50%)'
                  : dir === 'Bottom'
                  ? 'translate(-50%, 50%)'
                  : dir === 'Left'
                  ? 'translate(-50%, -50%)'
                  : 'translate(50%, -50%)',
              width: 1,
              height: 1,
              backgroundColor: 'transparent',
              border: 'none',
            }}
          />
        </React.Fragment>
      ))}

      <textarea
        ref={textRef}
        value={text}
        onChange={handleChange}
        style={{
          width: '100%',
          height: '100%',
          resize: 'none',
          border: 'none',
          outline: 'none',
          background: 'transparent',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          overflow: 'hidden',
          lineHeight: '1.4',
          paddingTop: '7px',
          paddingBottom: '1px',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
};


const nodeTypes = {
  custom: CustomNode,
  fork: ForkNode,
  ellipse: EllipseNode, 
  dashed: DashedNode,
  dashedEllipse: DashedEllipseNode,
};

function FlowEditor() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeId, setNodeId] = useState(3);

  const handleLabelChange = (id, value) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label: value, onChange: handleLabelChange } } : node
      )
    );
  };

  const onNodeContextMenu = useCallback((event, node) => {
    event.preventDefault();
    const confirmDelete = window.confirm(`「${node.data.label}」を削除しますか？`);
    if (confirmDelete) {
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setEdges((eds) => eds.filter((e) => e.source !== node.id && e.target !== node.id));
    }
  }, []);

  useEffect(() => {
    setNodes([
      {
        id: '1',
        type: 'custom',
        data: { label: 'ノード1', onChange: handleLabelChange },
        position: { x: 100, y: 100 },
      },
      {
        id: '2',
        type: 'custom',
        data: { label: 'ノード2', onChange: handleLabelChange },
        position: { x: 400, y: 200 },
      },
    ]);
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);
  
      // どちらかが fork ノードなら直線、それ以外は直角
      const isForkInvolved =
        sourceNode?.type === 'fork' || targetNode?.type === 'fork';
  
      const newEdge = {
        ...params,
        type: isForkInvolved ? 'straight' : 'step',
        style: { stroke: 'black', strokeWidth: 2, strokeLinecap: 'round', },
      };
  
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [nodes]
  );

  //線のクリック
  const onEdgeContextMenu = useCallback((event, edge) => {
    event.preventDefault();
  
    setEdges((eds) =>
      eds.map((e) => {
        if (e.id !== edge.id) return e;
  
        // 現在の markerEnd の有無と style から状態を判断してトグル
        const hasArrow = !!e.markerEnd;
        const isDashed = e.style?.strokeDasharray === '4';
  
        if (!hasArrow) {
          // 状態1 → 状態2：矢印付き線
          return {
            ...e,
            markerEnd: { type: 'arrowclosed', color: 'black' },
            style: {
              ...e.style,
              stroke: 'black',
              strokeWidth: 2,
              strokeDasharray: undefined,
            },
          };
        } else if (!isDashed) {
          // 状態2 → 状態3：点線矢印
          return {
            ...e,
            markerEnd: { type: 'arrowclosed', color: 'black' },
            style: {
              ...e.style,
              stroke: 'black',
              strokeWidth: 2,
              strokeDasharray: '4',
            },
          };
        } else {
          // 状態3 → 削除
          return [];
        }
      })
    );
  }, []);


  const addNode = () => {
    const newId = nodeId.toString();
    const newNode = {
      id: newId,
      type: 'custom',
      data: { label: ``, onChange: handleLabelChange },
      position: { x: Math.random() * 600, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId((id) => id + 1);
  };

  const addForkNode = () => {
    const newId = `fork-${nodeId}`;
    const newNode = {
      id: newId,
      type: 'fork',
      data: { label: `分岐${newId}`, onChange: handleLabelChange },
      position: { x: Math.random() * 600, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId((id) => id + 1);
  };
  
  const addEllipseNode = () => {
    const newId = `ellipse-${nodeId}`;
    const newNode = {
      id: newId,
      type: 'ellipse',
      data: { label: ``, onChange: handleLabelChange },
      position: { x: Math.random() * 600, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId((id) => id + 1);
  };
  
    const addDashedNode = () => {
      const newId = `dashed-${nodeId}`;
      const newNode = {
        id: newId,
        type: 'dashed',
        data: { label: ``, onChange: handleLabelChange },
        position: { x: Math.random() * 600, y: Math.random() * 400 },
      };
      setNodes((nds) => [...nds, newNode]);
      setNodeId((id) => id + 1);
    };
  
  const addDashedEllipseNode = () => {
    const newId = `dashedEllipse-${nodeId}`;
    const newNode = {
      id: newId,
      type: 'dashedEllipse',
      data: { label: ``, onChange: handleLabelChange },
      position: { x: Math.random() * 600, y: Math.random() * 400 },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeId((id) => id + 1);
  };
  

  return (
    <>
      <button
        onClick={addNode}
        style={{
          position: 'absolute',
          zIndex: 10,
          left: 10,
          top: 10,
          padding: '8px 16px',
          fontSize: '16px',
          borderRadius: '6px',
          border: 'none',
          background: '#4CAF50',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        ノードを追加
      </button>

      <button
        onClick={addForkNode}
        style={{
          position: 'absolute',
          zIndex: 10,
          left: 695,
          top: 10,
          padding: '8px 16px',
          fontSize: '16px',
          borderRadius: '6px',
          border: 'none',
          background: '#9C27B0',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        分岐点を追加
      </button>

      <button
        onClick={addEllipseNode}
        style={{
          position: 'absolute',
          zIndex: 10,
          left: 320,
          top: 10,
          padding: '8px 16px',
          fontSize: '16px',
          borderRadius: '6px',
          border: 'none',
          background: '#FF9800',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        楕円ノードを追加
      </button>

      <button
        onClick={addDashedNode}
        style={{
          position: 'absolute',
          zIndex: 10,
          left: 150,
          top: 10,
          padding: '8px 16px',
          fontSize: '16px',
          borderRadius: '6px',
          border: 'none',
          background: '#E91E63',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        点線ノードを追加
      </button>
      
      <button
        onClick={addDashedEllipseNode}
        style={{
          position: 'absolute',
          zIndex: 10,
          left: 490,
          top: 10,
          padding: '8px 16px',
          fontSize: '16px',
          borderRadius: '6px',
          border: 'none',
          background: '#2196F3',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        点線楕円ノードを追加
      </button>
      


      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeContextMenu={onNodeContextMenu}
            fitView
            snapToGrid={true}
            snapGrid={[20, 20]} //この数値を変えるとグリッドの動きの幅が変わる
            onEdgeContextMenu={onEdgeContextMenu}
            selectionOnDrag={true}
            multiSelectionKeyCode="Shift"
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </>
  );
}

export default FlowEditor;
