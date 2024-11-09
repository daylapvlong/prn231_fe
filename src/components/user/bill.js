import React, { useState, useEffect } from "react";
import axios from "axios";

const UserBills = ({ userId }) => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5038/api/Bill/GetUserBill?userID=${userId}`
        );
        setBills(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch bills. Please try again later.");
        setLoading(false);
      }
    };

    fetchBills();
  }, [userId]);

  if (loading) {
    return <div className="text-center p-4">Loading bills...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Bills</h1>
      {bills.length === 0 ? (
        <p>No bills found for this user.</p>
      ) : (
        bills
          .slice() // Create a copy of the bills array
          .reverse() // Reverse the order of the bills
          .map((bill) => (
            <div
              key={bill.id}
              className="bg-white shadow-md rounded-lg p-6 mb-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Bill #{bill.id}</h2>
                <span className="text-lg font-bold text-green-600">
                  Total:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(bill.totalPayment)}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Courses:</h3>
              <ul className="list-disc pl-5">
                {bill.billDetail.map((detail, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-medium">{detail.courseName}</span> -{" "}
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(detail.price)}
                  </li>
                ))}
              </ul>
            </div>
          ))
      )}
    </div>
  );
};

export default UserBills;
