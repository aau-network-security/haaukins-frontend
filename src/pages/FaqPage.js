import { Box, Center, Flex, Icon, Spinner, Text } from "@chakra-ui/react";
import { FaQuestion } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { faQ } from "@fortawesome/free-solid-svg-icons";
import LoadingSpin from "react-loading-spin";

export default function FaqPage() {
  const [faqMd, setFaqMd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const url = "https://api.github.com/gists/baf85e1faa3847597c405f2a00209d52";
    setIsLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFaqMd(data.files["FAQ.md"].content);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

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
          <Icon as={FaQuestion} />
          <Text marginLeft="20px">FAQ</Text>
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
                <h2 id={generateSlug(props.children[0])} {...props}></h2>
              ),
              h3: ({ node, ...props }) => (
                <h3 id={generateSlug(props.children[0])} {...props}></h3>
              ),
              a: ({ node, ...props }) => (
                <a style={{ color: "#54616e" }} {...props}></a>
              ),
            }}
          >
            {faqMd}
          </ReactMarkdown>
        )}
      </Box>
    </Flex>
  );
}
