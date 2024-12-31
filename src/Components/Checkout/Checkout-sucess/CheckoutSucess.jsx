import React, { useEffect, useState } from "react";
import "./CheckoutSucess.css";
import { useNavigate } from "react-router-dom";

const CheckoutSucess = () => {
  const [transactionId, setTransactionId] = useState("");
  const [transactionTime, setTransactionTime] = useState("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('userId'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      console.error("User ID not found in localStorage");
    }
  }, []);

  // Handle payment response from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const responseCode = urlParams.get("vnp_ResponseCode");
    const transactionId = urlParams.get("vnp_TransactionNo");
    const payDate = urlParams.get("vnp_PayDate");
    const amount = urlParams.get("vnp_Amount");

    if (responseCode === "00") {
      setIsPaymentSuccess(true);
      setTransactionId(transactionId);
      setAmount(amount);

      if (payDate) {
        const formattedDate = `${payDate.slice(6, 8)}-${payDate.slice(4, 6)}-${payDate.slice(0, 4)} ${payDate.slice(8, 10)}:${payDate.slice(10, 12)}:${payDate.slice(12, 14)}`;
        setTransactionTime(formattedDate);
      }
    } else {
      setIsPaymentSuccess(false);
    }
  }, []);

  // Update order info and redirect to home on success
  const updateOrderInfo = async () => {
    try {
      if (!user || !user.id) {
        console.error("User ID not found");
        return;
      }

      const userId = user.id;

      // Fetch current user data
      const userResponse = await fetch(`http://localhost:5000/users/${userId}`);
      if (!userResponse.ok) {
        console.error("Failed to fetch user data:", userResponse.statusText);
        return;
      }
      const userData = await userResponse.json();

      // Create new order with payment details
      const newOrder = {
        orderId: transactionId,
        date: transactionTime,
        status: "Processing",
        total: (Number(amount) / 100).toFixed(0),
        items: userData.cart || [],
      };

      // Append new order to user's orders and clear cart
      userData.orders = userData.orders ? [...userData.orders, newOrder] : [newOrder];
      userData.cart = [];

      // Update user data on the server
      const updateResponse = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (updateResponse.ok) {
        console.log("Order added successfully");
        // const updatedUser = await updateResponse.json();
        //     // setCartItems(updatedUser.cart);  // Update local state with the new cart
            // updateUserOrders(updatedUser.orders);
        navigate("/home"); // Navigate to home if update is successful
      } else {
        console.error("Failed to update user order:", updateResponse.statusText);
      }
    } catch (error) {
      console.error("Error updating order info:", error);
    }
  };

  return (
    <div id="checksuccess" className="success-container">
      <div className="success-box">
        {isPaymentSuccess ? (
          <>
            <div className="check-icon">
              <span>✔️</span>
            </div>
            <h2>Payment Successful!</h2>
            <div className="transaction-info">
              <p><strong>Transaction ID:</strong> {transactionId}</p>
              <p><strong>Transaction Time:</strong> {transactionTime}</p>
            </div>
            {/* Back to Home Button */}
            <button className="back-to-home-btn" onClick={updateOrderInfo}>
              Back to Home
            </button>
          </>
        ) : (
          <>
            <div className="error-icon">
              <span>❌</span>
            </div>
            <h2>Payment Failed</h2>
            <p>There was an issue with your payment. Please try again or contact support.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutSucess;
