import { Box, Button } from "@chakra-ui/react";
import React, { useState, useRef, useCallback } from "react";
import styles from "./Dashboard.module.css";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { initialNodes, initialEdges } from "./NodesEdges";
import TextNode from "../../Components/TextNode";
import Sidebar from "../../Components/Sidebar";
import EditNode from "../../Components/EditNode";


//here we can declare the types of nodes"text/video/imgetc
const nodeType = {
  textNode: TextNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const Dashboard = () => {
  //below hooks are provided by Reactflow to move the nodes around, connect the nodes from source to target.
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); //this hook is used for nodes
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); // this hook is used for edges/handles
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  //edit/update hooks
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(nodes.data);
  const [id, setId] = useState();

  //function for edit the node text
  const onNodeClick = (e, val) =>{
    setEditValue(val?.data?.text);
    setId(val.id);
    setIsEditing(true);
  }

  //handle change function
  const handleChange = (e) =>{
    e.preventDefault();
    setEditValue(e.target.value);
    }

  const handleEdit = () =>{
    const res = nodes.map((item)=>{
      if(item.id === id){
        item.data={
          ...item.data,
          text:editValue
        }
      }
      return item
    })
    setNodes(res);
    setEditValue('');
    setIsEditing(false);
  }

  /*useCallback is a React hook that memoizes a function, 
  preventing it from being recreated on each render unless its dependencies change.
   It takes a single argument, params, representing the parameters of the connection being made.*/

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)), //calling setEdges function with callback function that add the new edge to current edge.
    [setEdges] //if the setEdges changes then only function will be recreated.
  );


  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
       // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: {},
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );


  
  {
    /*Note: a fix width and height container or area is mandatory to display the reactflow*/
  }

  return (
    <ReactFlowProvider>
    <Box bg="white" w="100%" h="100vh" overflow={"hidden"}>
      <Box as="nav" w="100%" h={12} className={styles.navbarContainer}>
        <Button float="right" h={8} border="1px solid gray" onClick={handleEdit}>
          Save Changes
        </Button>
      </Box>
      <Box w="100%" h="100%" className={styles.taskSection}>
        {/* left section which shows the nodes */}
        <Box w="75%" h="100%" borderRight="1px solid gray" p={4}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeType}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={(e, val)=> onNodeClick(e, val)}
          />
        </Box>

        {/* right section which has node setting */}
        <Box w="25%" h="100%" p={isEditing ? 0 : 4}>
          {isEditing ? <EditNode value={editValue} onChange={handleChange} setIsEditing={setIsEditing} nodeId={id} setNodes={setNodes}/> :  <Sidebar />}
        </Box>
      </Box>
    </Box>
    </ReactFlowProvider>
  );
};

export default Dashboard;
