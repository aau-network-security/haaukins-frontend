import { Box, Center, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { FaQuestion, FaToolbox } from "react-icons/fa";
import LoadingSpin from "react-loading-spin";

export default function HintsPage() {
  const [toolMd, setToolMd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const url = "https://api.github.com/gists/21205ae9ec5cc8fda55abdc2b2a527fc";
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setToolMd(data.files["tools-english.md"].content);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);
  console.log(toolMd)
  const generateSlug = (string) => {
    let str = string.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    str = str
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    return str;
  };

  return (
    <Flex maxW={"1140px"} w="100%" m={"auto"} flexDir="column" color="#211a52">
      <Box w="100%" marginTop="50px" marginBottom="50px">
        <Center w="100%" fontSize="50px">
          <Icon as={FaToolbox} />
          <Text marginLeft="20px">Toolbox</Text>
        </Center>
      </Box>
      <Box
        className="markdown-body"
        backgroundColor="transparent"
        marginBottom="100px"
        minH="70vh"
      >
        {isLoading ? (
          <Center
            position="relative"
            top="200px"
          >
            <LoadingSpin 
              size={200}
              primaryColor="#211a52"
            />
          </Center>
          
        ) : (
          <ReactMarkdown 
            components={{
              h2: ({ node, ...props }) => (
                <h2 {...props}>
                  <a id={generateSlug(props.children[0])} href={"#" + generateSlug(props.children[0])} className="anchor" aria-hidden="true"></a>
                  {props.children[0]}
                </h2>
              ),
              h3: ({ node, ...props }) => (
                <h3 id={generateSlug(props.children[0])} {...props}>
                  <a id={generateSlug(props.children[0])} href={"#" + generateSlug(props.children[0])} className="anchor" aria-hidden="true"></a>
                  {props.children[0]}
                </h3>
              ),
              a: ({ node, ...props }) => (
                <a style={{ color: "#54616e" }} {...props}></a>
              ),
              
            }}
            
          >
            {toolMd}
          </ReactMarkdown>
        )}
      </Box>
    </Flex>
  );
}
