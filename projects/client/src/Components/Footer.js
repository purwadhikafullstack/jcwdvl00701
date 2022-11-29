import React from "react";
import { Text, Image, Flex, Box } from "@chakra-ui/react";
import vectorFb from "../Assets/image/vectorFb.png";
import vectorIg from "../Assets/image/vectorIg.png";
import turuIcon from "../Assets/image/turuIcon.png";

function Footer(props) {
  // props utk ukuran margin top footer agar dinamis
  const { ss, sm, sl } = props;
  // console.log(props);
  return (
    <Box
      mt={{ ss: ss, sm: sm, sl: sl, md: "0" }}
      bg="white"
      borderTop="1px"
      borderColor="gray.200"
      position="relative"
    >
      <Flex
        direction={["column", "column", "column", "row"]}
        justifyContent="space-around"
      >
        <Flex
          flexDirection="column"
          ml={{ ss: "1em", sm: "1em", sl: "1em", md: "0" }}
        >
          <Text fontSize="22px" fontWeight="700" mt="19px">
            Contact Us
          </Text>
          <Flex direction={["column", "column", "row", "row"]}>
            <Flex>
              <Image
                src={vectorIg}
                mr="20px"
                mt="10px"
                widht="36px"
                height="36px"
              ></Image>
              <Image
                src={vectorFb}
                mt="10px"
                mr="10px"
                widht="36px"
                height="36px"
              ></Image>
            </Flex>
            <Text fontSize="18px" fontWeight="700" mt="19px" lineHeights="26px">
              +62 82 288 2288 22
            </Text>
          </Flex>
        </Flex>
        <Flex mt="2em" ml={{ ss: "1em", sm: "1em", sl: "1em", md: "0" }}>
          <Image src={turuIcon} mr="1em" width="59px" height="58px"></Image>
          <Box width="251px" height="70px">
            <Text fontSize="16px">
              Lebak Bulus, Jl.RS.Fatmawati Raya No.10, Kota Jakarta Selatan,DKI
              Jakarta
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Box bg="primary" mt="10px">
        <Flex justifyContent="center">
          <Text pt="25px" pb="26px" fontWeight="600" fontSize="14px">
            2022, PT.Turu Jaya Abadi
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;
