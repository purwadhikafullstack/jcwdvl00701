import { Box, Container, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import Layout from "../../Components/Layout";
import { useSelector } from "react-redux";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { authFirebase } from "../../Config/firebase";
import { onAuthStateChanged } from "firebase/auth";

function ButtonDashboard(props) {
  return (
    <Flex
      boxShadow="base"
      as="button"
      fontSize="30px"
      p="15px"
      w={{ ss: "150px", sl: "250px" }}
      h={{ ss: "150px", sl: "250px" }}
      backgroundImage={props.bg}
      backgroundSize="cover"
      flexDirection="column"
      justifyContent="space-between"
      pb="10px"
      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
      _hover={{
        bg: "black",
        color: "white",
      }}
    >
      <Text
        textAlign="start"
        w={{ ss: "100px", sl: "150px" }}
        fontWeight="500"
        fontSize={{ ss: "28px", sl: "45px" }}
      >
        {props.icon}
      </Text>
      <Text
        textAlign="start"
        w={{ ss: "100px", sl: "150px" }}
        fontWeight="500"
        fontSize={{ ss: "16px", sl: "22px" }}
      >
        {props.menu}
      </Text>
    </Flex>
  );
}

function Dashboard() {
  const history = useHistory();
  const [userId, setUserId] = useState("");
  const { TenantId, UserRoles } = useSelector((state) => state.user);
  //console.log(UserRoles);

  return (
    <Layout>
      <Box mt="110px" mb={{ ss: "20px", sl: "110px" }}>
        <Container maxW="1140px" justifyContent="space-between">
          <SimpleGrid
            columns={[2, null, 3]}
            spacing={{ ss: "20px", sl: "130px" }}
          >
            <Link to="/tenant/profile">
              <ButtonDashboard
                icon={<i className="fa-solid fa-circle-user"></i>}
                menu=" Edit your Profile"
                bg="/Assets/profile.png"
              />
            </Link>
            <Link to="/tenant/order">
              <ButtonDashboard
                icon={<i className="fa-solid fa-clipboard-list"></i>}
                menu="See your order"
                bg="/Assets/order.png"
              />
            </Link>
            <Link to="/tenant/property">
              <ButtonDashboard
                icon={<i className="fa-solid fa-building"></i>}
                menu="Manage your property"
                bg="/Assets/property.png"
              />
            </Link>
            <Link to="/tenant/room">
              <ButtonDashboard
                icon={<i className="fa-solid fa-bed"></i>}
                menu="Manage your room"
                bg="/Assets/room.png"
              />
            </Link>
            <Link to="/tenant/report">
              <ButtonDashboard
                icon={<i className="fa-solid fa-chart-simple"></i>}
                menu="Report"
                bg="/Assets/report.png"
              />
            </Link>
            <Link to="/tenant/price">
              <ButtonDashboard
                icon={<i className="fa-solid fa-cash-register"></i>}
                menu=" Set a special price"
                bg="/Assets/price.png"
              />
            </Link>
          </SimpleGrid>
        </Container>
      </Box>
    </Layout>
  );
}

export default Dashboard;