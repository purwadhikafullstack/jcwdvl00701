import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Image,
  Flex,
  Container,
  Text,
  Button,
} from "@chakra-ui/react";
import turuIcon from "../Assets/image/turuIcon.png";
import { Link } from "react-router-dom";

function NavbarMobileTenant() {
  return (
    <Box
      bg="white"
      p="10px"
      pos="fixed"
      top="0"
      w="100%"
      zIndex={10}
      boxShadow="base"
    >
      <Container maxW="1140px">
        <Flex justifyContent="space-between">
          <Image src={turuIcon} mr="1em" width="50px" height="50px"></Image>
          <Menu>
            <MenuButton
              fontSize="20px"
              icon={<i className="fa-solid fa-bars"></i>}
              as={IconButton}
              aria-label="Options"
              border="none"
              variant="outline"
              bg="white"
              my="auto"
            />
            <MenuList borderRadius="0px" width="100vw" border="none">
              <Link to="/tenant">
                <MenuItem>
                  <Button
                    variant="primary"
                    w="100%"
                    leftIcon={<i class="fa-solid fa-table-list"></i>}
                  >
                    Dashboard
                  </Button>
                </MenuItem>
              </Link>
              <MenuItem>
                <Button
                  variant="primary"
                  w="100%"
                  leftIcon={<i class="fa-solid fa-circle-user"></i>}
                >
                  Profile
                </Button>
              </MenuItem>
              <Link to="/tenant/order">
                <MenuItem>
                  <Button
                    variant="primary"
                    w="100%"
                    leftIcon={<i class="fa-solid fa-clipboard-list"></i>}
                  >
                    Order
                  </Button>
                </MenuItem>
              </Link>
              <Link to="/tenant/property">
                <MenuItem>
                  <Button
                    variant="primary"
                    w="100%"
                    leftIcon={<i class="fa-solid fa-building"></i>}
                  >
                    Property
                  </Button>
                </MenuItem>
              </Link>
              <Link to="/tenant/room">
                <MenuItem>
                  <Button
                    variant="primary"
                    w="100%"
                    leftIcon={<i class="fa-solid fa-bed"></i>}
                  >
                    Room
                  </Button>
                </MenuItem>
              </Link>
              <Link to="/tenant/report">
                <MenuItem>
                  <Button
                    variant="primary"
                    w="100%"
                    leftIcon={<i class="fa-solid fa-chart-simple"></i>}
                  >
                    Report
                  </Button>
                </MenuItem>
              </Link>
              <Link to="/tenant/price">
                <MenuItem>
                  <Button
                    variant="primary"
                    w="100%"
                    leftIcon={<i class="fa-solid fa-cash-register"></i>}
                  >
                    Price
                  </Button>
                </MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Flex>
      </Container>
    </Box>
  );
}

export default NavbarMobileTenant;
