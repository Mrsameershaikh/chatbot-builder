//in data we can add any type of data object,array etc
//type is very important here. When we add type in main component where we are imported React flow there these type will
//denote which component or which node is to render.

export const initialNodes = [
  {
    id: "1",
    position: { x: 50, y: 100 },
    data: { text: 'text message 1' },
    type: "textNode"
  },
  {
    id: "2",
    position: { x: 400, y: 50 },
    data: { text: 'text message 2' },
    type: "textNode"
  }
];

export const initialEdges = [
  {
    id: "reactflow__edge-2a-1",
    source: "2",
    sourceHandle: "a",
    target: "1",
    targetHandle: null
  }
];
