import { Box, Button } from "@chakra-ui/react";
import React from "react";

const EditEdge = ({ setIsEdgeDelete, edgeId, setEdges }) => {

    const confirmDeleteEdge = () => {
        const isConfirmed = window.confirm("Are you sure you want to delete?");
        if (isConfirmed) {
          // Delete logic
          setEdges((prevEdge) => prevEdge.filter((edge) => edge.id !== edgeId));
          setIsEdgeDelete(false);
        } else {
          console.log("deletion cancelled!")
        }
      };

  return (
    <Box
      w="100%"
      display="flex"
      alignItems="center"
      px={5}
      pt={4}  
    >
      <Button
        h={8}
        border="1px solid gray"
        onClick={confirmDeleteEdge}
      >
        Delete Edge
      </Button>
    </Box>
  );
};

export default EditEdge;
