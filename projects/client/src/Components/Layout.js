import Footer from "./Footer";
import NavbarTuru from "./NavbarTuru";
import NavbarDestop from "./NavbarDestop";

function Layout({ children }) {
  return (
    <>
      {/* <NavbarDestop/> */}
      <NavbarTuru />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
