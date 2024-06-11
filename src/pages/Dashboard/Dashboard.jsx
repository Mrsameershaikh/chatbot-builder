import { Box, Button } from "@chakra-ui/react";
import React, { useState, useCallback, useEffect } from "react";
import styles from "./Dashboard.module.css";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { initialNodes, initialEdges } from "./NodesEdges";
import TextNode from "../../components/TextNode";
import ImageNode from "../../components/ImageNode";
import Sidebar from "../../components/Sidebar";
import EditNode from "../../components/EditNode";
import ToasterNotification from "../../helpers/ToasterNotification";
import EditEdge from "../../components/EditEdge";
import { ImHome } from "react-icons/im";
import { Link } from "react-router-dom";

//here we can declare the types of nodes"text/video/image etc
const nodeType = {
  textNode: TextNode,
  imageNode: ImageNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`; //genrating new ID for maintain uniquness

const Dashboard = () => {
  //below hooks are provided by Reactflow to move the nodes around, connect the nodes from source to target.
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); //this hook is used for nodes
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); // this hook is used for edges/handles
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  //below states are for notification/toaster
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  //edit/update node states
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(nodes.data);
  const [id, setId] = useState(null);

  //delete edge states
  const [edgeId, setEdgeId] = useState(null);
  const [isEdgeDelete, setIsEdgeDelete] = useState(false);

  //function for edit the node text
  const onNodeClick = (e, val) => {
    setEditValue(val?.data?.text);
    setId(val.id);
    if (val.type !== "imageNode") {
      setIsEditing(true);
    }
  };

  //handle change function
  const handleChange = (e) => {
    e.preventDefault();
    setEditValue(e.target.value);
  };

  //Onclick save this function will add the text inside Node by targeting its Id
  const handleEdit = () => {
    if (validateNodeConnections(nodes, edges)) {
      const res = nodes.map((item) => {
        if (item.id === id) {
          item.data = {
            ...item.data,
            text: editValue,
          };
        }
        return item;
      });
      setNodes(res); //updated response is added to node state.
      setEditValue(""); //after update task empty the edit value
      setIsEditing(false); // setting value to false in order to close the edit panel.
      setMessage("Flow changes updated successfully");
      setType("success");
      setShowToast(true);
    } else {
      setMessage("Cannot save flow: Node must have a non-empty handler");
      setType("error");
      setShowToast(true);
    }
  };

  //function for delete the Edge
  const onEdgeClick = (e, val) => {
    setEdgeId(val?.id);
    setIsEdgeDelete(true);
  };

  //when there is change in edges select/unslect this will show hid the delete edge button
  useEffect(() => {
    edges.map((edge) => {
      if (edge?.id === edgeId && !edge?.selected) {
        setIsEdgeDelete(false);
      }
    });
  }, [edges]);

  /*useCallback is a React hook that memoizes a function, 
  preventing it from being recreated on each render unless its dependencies change.
   It takes a single argument, params, representing the parameters of the connection being made.*/

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)), //calling setEdges function with callback function that add the new edge to current edge.
    [setEdges] //if the setEdges changes then only function will be recreated.
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
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
    [reactFlowInstance]
  );

  function validateNodeConnections(nodes, edges) {
    // Create sets to keep track of sources and targets in edges
    const sources = new Set(edges.map((edge) => edge.source));
    const targets = new Set(edges.map((edge) => edge.target));
    // Check if every node appears as a source or target
    return nodes.every((node) => sources.has(node.id) || targets.has(node.id));
  }
  // Note: a fix width and height container or area is mandatory to display the reactflow
  return (
    <ReactFlowProvider>
      <Box bg="white" w="100%" h="100vh" overflow={"hidden"}>
        <Box as="nav" w="100%" h={12} className={styles.navbarContainer}>
          <Link to="/">
            <ImHome size={25} color="#EDF2F7" />
          </Link>
          <Button
            float="right"
            h={8}
            border="1px solid gray"
            onClick={handleEdit}
          >
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
              onNodeClick={(e, val) => onNodeClick(e, val)}
              onEdgeClick={(e, val) => onEdgeClick(e, val)}
            />
          </Box>

          {/* right section which has node setting */}
          <Box w="25%" h="100%" p={isEditing ? 0 : 4}>
            {isEditing ? (
              <EditNode
                value={editValue}
                onChange={handleChange}
                setIsEditing={setIsEditing}
                nodeId={id}
                setNodes={setNodes}
                nodes={nodes}
              />
            ) : (
              <Sidebar />
            )}
            {isEdgeDelete && (
              <EditEdge
                setIsEdgeDelete={setIsEdgeDelete}
                edgeId={edgeId}
                setEdges={setEdges}
              />
            )}
          </Box>
        </Box>
      </Box>

      <ToasterNotification
        showToast={showToast}
        message={message}
        type={type}
        setShowToast={setShowToast}
      />
    </ReactFlowProvider>
  );
};

export default Dashboard;
