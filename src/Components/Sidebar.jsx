import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { BiMessageRoundedDetail } from "react-icons/bi";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Box
      maxW={200}
      w="100%"
      maxH={100}
      h="100%"
      border="1px solid #7677B0"
      borderRadius={5}
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      cursor="pointer"
      onDragStart={(event) => onDragStart(event, "textNode")}   //the second argument is custom node type.
      draggable
    >
      <BiMessageRoundedDetail size={40} color="#7677B0" />
      <Text color="#7677B0" fontWeight={500}>
        Message
      </Text>
    </Box>
  );
};

export default Sidebar;
