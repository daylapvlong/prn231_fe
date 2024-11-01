import React, { memo, Fragment, useEffect } from "react";
import { useAuth } from "../../../../components/auth";
import { ShoppingCart } from "lucide-react";
import { Navbar, Dropdown, Container, Nav } from "react-bootstrap";
// Container,Dropdown,Button
import { Link } from "react-router-dom";
import CustomToggle from "../../../dropdowns";

//Horizontal-nav
import HorizontalNav from "../HeaderStyle/horizontal-nav";

//img
import avatars1 from "../../../../assets/images/avatars/01.png";

// logo
import Logo from "../../components/logo";
// mobile-offcanvas

const HeaderStyle = memo(({ cartCount, fetchCartData }) => {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    // Polling - Fetch cart data every 10 seconds
    const intervalId = setInterval(() => {
      fetchCartData();
    }, 10000);

    // Cleanup on component unmount
    return () => clearInterval(intervalId);
  }, [fetchCartData]);

  return (
    <Fragment>
      <Navbar expand="xl" className="nav  iq-navbar">
        <Container fluid className="navbar-inner">
          <Navbar.Brand as="div" className="col-lg-3">
            <Link to="/home" className="d-flex">
              <Logo color={true} />
              <h4 className="logo-title">Hope UI</h4>
            </Link>
          </Navbar.Brand>

          <HorizontalNav />

          <Navbar.Brand
            className="col-lg-3 justify-end"
            id="navbarSupportedContent"
          >
            {isAuthenticated ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 items-center space-x-2">
                <li className="nav-item">
                  <div
                    className="relative hover:cursor-pointer"
                    onClick={() => {
                      window.location.href = "/billing";
                    }}
                  >
                    <ShoppingCart className="w-6 h-6 text-gray-600" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </li>
                <Dropdown as="li" className="nav-item">
                  <Dropdown.Toggle
                    as={CustomToggle}
                    variant=" nav-link py-0 d-flex align-items-center"
                    href="#"
                    id="navbarDropdown"
                  >
                    <img
                      src={avatars1}
                      alt="User-Profile"
                      className="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded"
                    />
                    <div className="caption ms-3 ">
                      <p className="mb-0 caption-title text-lg">
                        Austin Robertson
                      </p>
                      <p className="mb-0 caption-sub-title text-xs">
                        Marketing Administrator
                      </p>
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu as="ul" className="dropdown-menu-end">
                    <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/dashboard/app/user-profile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/dashboard/app/user-privacy-setting">
                      Privacy Setting
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ul>
            ) : (
              <div className="flex align-middle items-end">
                <Nav.Item as="li">
                  <Link className={`nav-link`} to="/auth/sign-in">
                    {" "}
                    Login{" "}
                  </Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Link className={`nav-link`} to="/auth/sign-up">
                    {" "}
                    Register{" "}
                  </Link>
                </Nav.Item>
              </div>
            )}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </Fragment>
  );
});

export default HeaderStyle;
