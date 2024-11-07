import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import Card from "../../components/Card";
import { useOutletContext } from "react-router-dom";

const Billing = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [price, setPrice] = useState(0);
  const [userInfo, setUserInfo] = useState({ displayName: "", role: "" });
  const { fetchCartData } = useOutletContext();

  useEffect(() => {
    fetchCartItems();

    const userData = getUserInfo();
    if (userData) {
      setUserInfo(userData);
    }
  }, []);

  useEffect(() => {
    const totalPrice = calculateTotal();
    setPrice(totalPrice);
  }, [cartItems]);

  const getUserInfo = () => {
    const userDataString = localStorage.getItem("user");
    if (!userDataString) {
      return null;
    }
    const userData = JSON.parse(userDataString);
    const roleMapping = {
      0: "Admin",
      1: "Teacher",
      2: "Student",
    };
    return {
      id: userData.id,
      username: userData.username ? userData.username.trim() : "Unknown",
      displayName: userData.displayName
        ? userData.displayName.trim()
        : "No display name",
      email: userData.email ? userData.email : "No email provided",
      role: roleMapping[userData.role] || "Unknown role",
    };
  };

  const fetchCartItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const cookieString = document.cookie;
      const cartListCookie = cookieString
        .split("; ")
        .find((row) => row.startsWith("cartList="));

      if (cartListCookie) {
        const cartListJson = cartListCookie.split("=")[1];
        const cartList = JSON.parse(decodeURIComponent(cartListJson));

        if (typeof cartList === "object" && !Array.isArray(cartList)) {
          const courseIds = Object.values(cartList).map(
            (item) => item.courseId
          );

          const fetchCourses = async (courseId) => {
            const response = await fetch(
              `http://localhost:5038/api/course/getCourseById?id=${courseId}`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch course with ID ${courseId}`);
            }
            const text = await response.text(); // Ensure you read the response text
            try {
              return JSON.parse(text);
            } catch (error) {
              throw new Error("Response is not valid JSON");
            }
          };

          const courseDetails = await Promise.all(
            courseIds.map((courseId) => fetchCourses(courseId))
          );

          setCartItems(courseDetails);
        } else {
          throw new Error("Unexpected cartList format");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = (id) => {
    try {
      const cookieString = document.cookie;
      const cartListCookie = cookieString
        .split("; ")
        .find((row) => row.startsWith("cartList="));

      let cartList = {};
      if (cartListCookie) {
        const cartListJson = cartListCookie.split("=")[1];
        cartList = JSON.parse(decodeURIComponent(cartListJson));
      }

      // Check if the item exists in the cart
      if (cartList[id]) {
        delete cartList[id]; // Remove item from the cart

        // Update the cookie without the HttpOnly flag
        document.cookie = `cartList=${encodeURIComponent(
          JSON.stringify(cartList)
        )}; path=/; max-age=${7 * 24 * 60 * 60}; Secure`;

        // Update state (if you have a state for cart items)
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        fetchCartData();

        alert("Course deleted from cart!");
      } else {
        console.log("Item not found in cart.");
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price || 0; // Ensure price defaults to 0 if it's null/undefined
      const quantity = item.quantity || 1; // Ensure quantity defaults to 1 if missing
      return total + price * quantity;
    }, 0);
  };

  const checkout = async () => {
    const apiUrl = "http://localhost:5038/api/Cart/CreatePaymentUrl";

    const body = {
      orderType: "VnPay",
      amount: price,
      orderDescription: "Thanh toan",
      name: userInfo.displayName,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const paymentUrl = await response.text();
      console.log("Order created successfully:", response);

      window.open(paymentUrl, "_blank");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <>
      <Row>
        <Col lg="12">
          <Card className="rounded">
            <Card.Body>
              <Row>
                <Col sm="12">
                  <h5 className="mb-3">Hello, {userInfo.displayName}</h5>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col sm="12" className="mt-4">
                  <div className="table-responsive-lg">
                    {cartItems.length === 0 ? (
                      <p>Your cart is empty.</p>
                    ) : (
                      <Table>
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
                            <tr key={item.id}>
                              <td>
                                <h6 className="mb-0">{item.courseName}</h6>
                                <p className="mb-0">{item.description}</p>
                              </td>
                              <td className="text-center">{item.price} VND</td>
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
                    <p className="text-xl font-bold">Total: {price} VND</p>
                  </div>
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => {
                        checkout();
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
