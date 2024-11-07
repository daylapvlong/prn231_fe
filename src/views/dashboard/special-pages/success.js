import React, { useEffect, useState } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";

export default function PaymentSuccess() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});

  useEffect(() => {
    // Get the URL parameters
    const params = new URLSearchParams(window.location.search);

    // Extract data from URL parameters
    const details = {
      vnp_Amount: params.get("vnp_Amount"),
      vnp_BankCode: params.get("vnp_BankCode"),
      vnp_BankTranNo: params.get("vnp_BankTranNo"),
      vnp_CardType: params.get("vnp_CardType"),
      vnp_OrderInfo: params.get("vnp_OrderInfo"),
      vnp_PayDate: params.get("vnp_PayDate"),
      vnp_ResponseCode: params.get("vnp_ResponseCode"),
      vnp_TmnCode: params.get("vnp_TmnCode"),
      vnp_TransactionNo: params.get("vnp_TransactionNo"),
      vnp_TransactionStatus: params.get("vnp_TransactionStatus"),
      vnp_TxnRef: params.get("vnp_TxnRef"),
      vnp_SecureHash: params.get("vnp_SecureHash"),
    };

    setPaymentDetails(details);

    const callApi = async () => {
      const userId = getUserInfo();
      const cartList = getCartList();

      try {
        const response = await fetch(
          "http://localhost:5038/api/Cart/FinishPayment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              cartListJson: cartList,
              userId: userId,
            },
            body: JSON.stringify(details),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to confirm payment");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    callApi();
  }, []);

  const getUserInfo = () => {
    const userDataString = localStorage.getItem("user");
    if (!userDataString) return null;
    const userData = JSON.parse(userDataString);
    return userData.id;
  };

  const getCartList = () => {
    const cookieString = document.cookie;
    const cartListCookie = cookieString
      .split("; ")
      .find((row) => row.startsWith("cartList="));
    return cartListCookie ? cartListCookie.split("=")[1] : null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-center text-red-600 mb-4">
            Payment Error
          </h2>
          <p className="text-center text-gray-600 mb-6">{error}</p>
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">
          Payment Successful!
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Your transaction has been completed successfully.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="col-span-full">
            <h3 className="font-semibold">Order Information</h3>
            <p className="text-gray-600">{paymentDetails.vnp_OrderInfo}</p>
          </div>
          <div>
            <h3 className="font-semibold">Amount</h3>
            <p className="text-gray-600">
              {Number(paymentDetails.vnp_Amount) / 100} VND
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Bank</h3>
            <p className="text-gray-600">{paymentDetails.vnp_BankCode}</p>
          </div>
          <div>
            <h3 className="font-semibold">Transaction No.</h3>
            <p className="text-gray-600">{paymentDetails.vnp_TransactionNo}</p>
          </div>
          <div>
            <h3 className="font-semibold">Payment Date</h3>
            <p className="text-gray-600">{paymentDetails.vnp_PayDate}</p>
          </div>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          onClick={() => (window.location.href = "/home")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
