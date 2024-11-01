import { Fragment, memo, useEffect, useState } from "react";

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
  const [cartCount, setCartCount] = useState(0);

  const fetchCartData = async () => {
    try {
      // Get the cookie string
      const cookieString = document.cookie;

      // Find the 'cartList' cookie value
      const cartListCookie = cookieString
        .split("; ")
        .find((row) => row.startsWith("cartList="));

      if (cartListCookie) {
        // Extract the cookie value (JSON string)
        const cartListJson = cartListCookie.split("=")[1];

        // Parse the JSON string to get the cart data
        const cartList = JSON.parse(decodeURIComponent(cartListJson));

        // Update cart count based on the number of items
        setCartCount(Object.keys(cartList).length);
      } else {
        // If no cartList cookie found, set the cart count to 0
        setCartCount(0);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    // Fetch cart data when the component mounts
    fetchCartData();
  }, []);

  return (
    <Fragment>
      <main className="main-content">
        <HeaderStyle cartCount={cartCount} fetchCartData={fetchCartData} />
        <div className="conatiner-fluid content-inner">
          <Router fetchCartData={fetchCartData} />
        </div>
        <Footer />
      </main>
      <SettingOffCanvas />
    </Fragment>
  );
});

export default Container;
