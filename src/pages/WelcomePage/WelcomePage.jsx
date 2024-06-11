import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import bg from "../../assets/bgvideo.mp4";

const WelcomePage = () => {
  return (
    <Box
      w="100%"
      h="100vh"
      overflow={"hidden"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
    >
      <video
        id="background-video"
        loop
        autoPlay
        muted
        style={{ width: "100%" }}
      >
        <source src={bg} type="video/mp4" />
      </video>

      <Box
        bg="rgba(0, 0, 0, 0.6)"
        backdropFilter="blur(3px)"
        maxW="400px"
        maxH="200px"
        w={"100%"}
        h={"100%"}
        borderRadius="md"
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        px={3}
      >
        {/* Button */}
        <Link to={"/chatbot-dashboard"}>
          <Button colorScheme="teal" size="lg">
            Create Flow
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default WelcomePage;
