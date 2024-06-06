import { Box, Container, Flex, Heading, IconButton, Image, Input, VStack, Text, HStack, Spacer, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { FaHome, FaUser, FaUpload } from "react-icons/fa";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [feedPhotos, setFeedPhotos] = useState([]);
  const toast = useToast();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected.",
        description: "Please select a photo to upload.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFeedPhotos([...feedPhotos, { src: reader.result, description: "Newly uploaded photo" }]);
      setSelectedFile(null);
      toast({
        title: "Upload successful.",
        description: "Your photo has been uploaded.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <Container maxW="container.xl" p={0}>
      {/* Navigation Bar */}
      <Flex as="nav" bg="blue.500" color="white" p={4} align="center">
        <Heading size="md">PhotoShare</Heading>
        <Spacer />
        <HStack spacing={4}>
          <IconButton aria-label="Home" icon={<FaHome />} />
          <IconButton aria-label="Profile" icon={<FaUser />} />
          <IconButton aria-label="Upload" icon={<FaUpload />} />
        </HStack>
      </Flex>

      {/* Main Content */}
      <Flex direction={{ base: "column", md: "row" }} mt={4}>
        {/* Feed Area */}
        <Box flex="3" p={4}>
          <Heading size="lg" mb={4}>Feed</Heading>
          <VStack spacing={4}>
            {feedPhotos.map((photo, index) => (
              <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" w="100%">
                <Image src={photo.src} alt={`Uploaded Photo ${index + 1}`} />
                <Box p={4}>
                  <Text>{photo.description}</Text>
                </Box>
              </Box>
            ))}
          </VStack>
        </Box>

        {/* Profile Section */}
        <Box flex="1" p={4} bg="gray.100">
          <Heading size="lg" mb={4}>Profile</Heading>
          <VStack spacing={4}>
            {/* Example Profile Info */}
            <Box w="100%" textAlign="center">
              <Image borderRadius="full" boxSize="100px" src="https://via.placeholder.com/100" alt="Profile Photo" />
              <Text mt={2}>Username</Text>
              <Text fontSize="sm" color="gray.500">user@example.com</Text>
            </Box>
            {/* Example User Photos */}
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" w="100%">
              <Image src="https://via.placeholder.com/600" alt="User Photo" />
              <Box p={4}>
                <Text>User Photo Description</Text>
              </Box>
            </Box>
          </VStack>
        </Box>
      </Flex>

      {/* Upload Section */}
      <Box p={4} mt={4} bg="gray.50" borderRadius="lg">
        <Heading size="lg" mb={4}>Upload Photo</Heading>
        <VStack spacing={4}>
          <Input type="file" onChange={handleFileChange} />
          <Button colorScheme="blue" onClick={handleUpload}>Upload</Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Index;