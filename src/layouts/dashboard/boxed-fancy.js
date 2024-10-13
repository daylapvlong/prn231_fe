import { Fragment, memo, useEffect } from "react";

import { Button } from "react-bootstrap";

//BoxedRouter
import Router from "../../router/route";

//header
import HeaderStyle from "../../components/partials/dashboard/HeaderStyle/header-style";

//footer
import Footer from "../../components/partials/dashboard/FooterStyle/footer";

// store
import SettingOffCanvas from "../../components/setting/SettingOffCanvas";

const Container = memo((props) => {
  return (
    <Fragment>
      <main className="main-content">
        <HeaderStyle />
        <div className="conatiner-fluid content-inner">
          <Router />
        </div>
        <Footer />
      </main>
      <SettingOffCanvas />
    </Fragment>
  );
});

export default Container;
