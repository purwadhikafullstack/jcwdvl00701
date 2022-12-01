import Footer from "./Footer";
import NavbarTuru from "./NavbarTuru";

function Layout({ children }) {
  return (
    <>
      <NavbarTuru />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
