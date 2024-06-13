import React, { useState } from "react";
import { Box, Heading, Image, Input, border } from "@chakra-ui/react";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { PiWhatsappLogoDuotone } from "react-icons/pi";
import { Handle, Position } from "reactflow";

const handleStyle = {
    width: "13px",
    height: "13px",
    background: "gray",
    border: "2px solid white",
    zindex: 100,
};

//this is custom component

const VideoNode = () => {
    const [file, setFile] = useState();
    const [videoSrc, setVideoSrc] = useState(null);
    function handleChange(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('video/')) {
            const videoURL = URL.createObjectURL(file);
            setVideoSrc(videoURL);
        } else {
            alert('Please upload a valid video file.');
        }
    }
    return (
        <>
            <Handle
                type="target"
                position={Position.Right}
                style={{ ...handleStyle, right: -8 }}
            />{" "}
            {/*handler or source or destination will be added with the help of Handler*/}
            <Box
                maxW={{ base: "330px", md: "100%" }}
                minW={{ base: "250px", md: "250px" }}
                boxShadow="0 0 20px rgba(0, 0, 0, 0.2)"
            >
                <Box d="flex" flexDirection="column">
                    {/* Header Section */}
                    <Box>
                        <Heading
                            px={2}
                            py={1}
                            size="sm"
                            bg="#B2F0E3"
                            display="flex"
                            justifyContent="space-between"
                        >
                            <Box style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                <BiMessageRoundedDetail />
                                Send Message
                            </Box>
                            <Box
                                w={6}
                                h={6}
                                borderRadius="50%"
                                bg="white"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <PiWhatsappLogoDuotone size={18} color="green" />
                            </Box>
                        </Heading>
                    </Box>
                    {/* Input Section */}
                    <Box>
                        <Input
                            type="file"
                            borderRadius="unset"
                            focusBorderColor="transparent"
                            focusborderwidth={0}
                            border="none"
                            placeholder="upload video..."
                            h="50px"
                            p={4}
                            onChange={handleChange}
                        />
                        <video
                            id="background-video"
                            loop
                            autoPlay
                            muted
                            controls
                            style={{ maxWidth: '200px', width: '100%', margin: 'auto' }}
                        >
                            <source src={videoSrc} type="video/mp4" />
                        </video>
                    </Box>
                </Box>
            </Box>
            <Handle
                type="source"
                position={Position.Left}
                id="b"
                style={{ ...handleStyle, left: -8 }}
            />
        </>
    );
};

export default VideoNode;
