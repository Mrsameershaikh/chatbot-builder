//in data we can add any type of data object,array etc
//type is very important here. When we add type in main component where we are imported React flow there these type will
//denote which component or which node is to render.

export const initialNodes = [
    {
        id:"1",
        position:{x:100, y:100},
        data:{text: ''},
        type:"textNode"
    },
    {
      id:"2",
      position:{x:200, y:200},
      data:{text: ''},
      type:"textNode"
  }
  ];

export const initialEdges = [];
