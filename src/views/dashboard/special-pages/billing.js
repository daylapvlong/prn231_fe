import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import Card from "../../../components/Card";
import { useOutletContext } from "react-router-dom";

const Billing = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const { fetchUserData } = useOutletContext();

  useEffect(() => {
    fetchCartItems();
    fetchUserData();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    setError(null);
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

        // Update your cart items state based on the parsed cookie data
        setCartItems(Object.values(cartList)); // Convert object to array
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = (id) => {
    try {
      // Get the current cookie string
      const cookieString = document.cookie;

      // Find the 'cartList' cookie value
      const cartListCookie = cookieString
        .split("; ")
        .find((row) => row.startsWith("cartList="));

      let cartList = {};

      if (cartListCookie) {
        // Extract and parse the cart list JSON from the cookie
        const cartListJson = cartListCookie.split("=")[1];
        cartList = JSON.parse(decodeURIComponent(cartListJson));
      }

      // Check if the item exists in the cart
      if (cartList[id]) {
        // Remove the item from the cart list
        delete cartList[id];

        // Update the cookie with the new cart list
        document.cookie = `cartList=${encodeURIComponent(
          JSON.stringify(cartList)
        )}; path=/; max-age=${7 * 24 * 60 * 60}; Secure; HttpOnly`;

        // Update state to reflect the change
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } else {
        console.log("Item not found in cart.");
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
      <Row className="">
        <Col lg="12" className="">
          <Card className="rounded">
            <Card.Body className="">
              <Row className="">
                <Col sm="12" className="">
                  <h5 className="mb-3">Hello , Devon Lane </h5>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English.
                  </p>
                </Col>
              </Row>
              <Row className="">
                <Col sm="12" className=" mt-4">
                  <div className="table-responsive-lg">
                    {cartItems.length === 0 ? (
                      <p>Your cart is empty.</p>
                    ) : (
                      <Table className="">
                        <thead>
                          <tr>
                            <th scope="col">Item</th>
                            <th className="text-center" scope="col">
                              Price
                            </th>
                            <th className="text-center" scope="col">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item) => (
                            <tr>
                              <td>
                                <h6 className="mb-0">Item 1</h6>
                                <p className="mb-0">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit.
                                </p>
                              </td>
                              <td className="text-center">$120.00</td>
                              <td className="text-center">
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="12">
                  <div className="mt-4 text-right">
                    <p className="text-xl font-bold">
                      Total: ${calculateTotal().toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => {
                        alert("Proceeding to checkout...");
                        console.log("Cart items:", cartItems);
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Billing;
