import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const EditNode = ({ value, onChange, setIsEditing, nodeId, setNodes }) => {
  const confirmDeleteNode = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      // Delete logic
      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
      setIsEditing(false);
    } else {
      // Do nothing
      console.log("Deletion canceled");
    }
  };
  return (
    <>
      <Box
        w="100%"
        h="40px"
        borderBottom="1px solid lightgray"
        display="flex"
        alignItems="center"
        px={4}
      >
        <IoMdArrowBack
          size={20}
          onClick={() => setIsEditing(false)}
          cursor="pointer"
        />
        <Text margin="auto" fontWeight={500}>
          Message
        </Text>
      </Box>
      <Box
        w="100%"
        h="auto"
        borderBottom="1px solid lightgray"
        display="flex"
        alignItems="center"
        px={4}
      >
        <Flex flexDirection="column" w="100%" py={8} gap={2}>
          <div
            style={{
              width: "100%",
              float: "right",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Text color="gray" fontWeight={500}>
              Text
            </Text>
            <MdDelete size={25} cursor="pointer" onClick={confirmDeleteNode} />
          </div>

          <Textarea
            cols={40}
            paddingBottom={20}
            style={{ flex: 1, overflowY: "auto" }}
            value={value}
            onChange={onChange}
          />
        </Flex>
      </Box>
    </>
  );
};

export default EditNode;
