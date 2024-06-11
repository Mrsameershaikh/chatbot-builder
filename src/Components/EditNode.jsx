import { Box, Button, Flex, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import ToasterNotification from "../helpers/ToasterNotification";

const EditNode = ({ value, onChange, setIsEditing, nodeId, setNodes, nodes }) => {

  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const confirmDeleteNode = () => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");
    if (isConfirmed) {
      // Delete logic
      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
      setIsEditing(false);
    } else {
      setMessage("Deletion cancelled!!");
      setType('success');
      setShowToast(true);
    }
  };

  //when node selected the selecte value become true inside node object. need to set back to false if we exit edit mode because no nodes are selected.
  const handleClose = () => {
    const updatedItems = nodes.map(item => {
      if (item.id == nodeId) {
        return { ...item, selected: false }
        }
        return item;
        });
        setNodes(updatedItems);
        setIsEditing(false);
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
          onClick={()=>handleClose()}
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
      <ToasterNotification
        showToast={showToast}
        message={message}
        type={type}
        setShowToast={setShowToast}
      />
    </>
  );
};

export default EditNode;
