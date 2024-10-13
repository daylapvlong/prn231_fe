import React, { memo, Fragment } from "react";
import { Navbar, Dropdown, Container, Nav } from "react-bootstrap";
// Container,Dropdown,Button
import { Link } from "react-router-dom";
import CustomToggle from "../../../dropdowns";

//Horizontal-nav
import HorizontalNav from "../HeaderStyle/horizontal-nav";

//img
import avatars1 from "../../../../assets/images/avatars/01.png";
import avatars2 from "../../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../../assets/images/avatars/avtar_5.png";
import shapes1 from "../../../../assets/images/shapes/01.png";
import shapes2 from "../../../../assets/images/shapes/02.png";
import shapes3 from "../../../../assets/images/shapes/03.png";
import shapes4 from "../../../../assets/images/shapes/04.png";
import shapes5 from "../../../../assets/images/shapes/05.png";
// logo
import Logo from "../../components/logo";
// mobile-offcanvas
import MobildeOffcanvas from "../../components/mobile-offcanvas";

const HeaderStyle = memo(() => {
  // const[show, setShow] = useState(true)

  return (
    <Fragment>
      <Navbar expand="xl" className="nav  iq-navbar">
        <Container fluid className="navbar-inner">
          <MobildeOffcanvas />
          <Navbar.Brand as="div" className="col-lg-4">
            <Link to="/dashboard" className="d-flex">
              <Logo color={true} />
              <h4 className="logo-title">Hope UI</h4>
            </Link>
          </Navbar.Brand>

          <HorizontalNav />

          <Navbar.Brand
            className="col-lg-3 justify-end"
            id="navbarSupportedContent"
          >
            {/* Below is avatar */}
            {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
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
                  <img
                    src={avatars2}
                    alt="User-Profile"
                    className="theme-color-purple-img img-fluid avatar avatar-50 avatar-rounded"
                  />
                  <img
                    src={avatars3}
                    alt="User-Profile"
                    className="theme-color-blue-img img-fluid avatar avatar-50 avatar-rounded"
                  />
                  <img
                    src={avatars5}
                    alt="User-Profile"
                    className="theme-color-green-img img-fluid avatar avatar-50 avatar-rounded"
                  />
                  <img
                    src={avatars6}
                    alt="User-Profile"
                    className="theme-color-yellow-img img-fluid avatar avatar-50 avatar-rounded"
                  />
                  <img
                    src={avatars4}
                    alt="User-Profile"
                    className="theme-color-pink-img img-fluid avatar avatar-50 avatar-rounded"
                  />
                  <div className="caption ms-3 ">
                    <h6 className="mb-0 caption-title">Austin Robertson</h6>
                    <p className="mb-0 caption-sub-title">
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
                  <Dropdown.Item href="https://templates.iqonic.design/hope-ui/react/build/auth/sign-in">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul> */}
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
          </Navbar.Brand>
        </Container>
      </Navbar>
    </Fragment>
  );
});

export default HeaderStyle;
