import React, { useEffect, useState } from "react";
import "./CheckoutError.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const CheckoutError = () => {
  const [transactionId, setTransactionId] = useState("");
  const [transactionTime, setTransactionTime] = useState("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch user from localStorage
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem('userId'));
//     if (storedUser) {
//       setUser(storedUser);
//     } else {
//       console.error("User ID not found in localStorage");
//     }
//   }, []);

  // Handle payment response from URL params
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('orderId');
    const status = queryParams.get('status');
    const cancel = queryParams.get('cancel');
    const code = queryParams.get('code');
    const orderCode = queryParams.get('orderCode');
    const id = queryParams.get('id');

//     if (status === "00") {
//       setIsPaymentSuccess(true);
//       setTransactionId(transactionId);
//       setAmount(amount);

//       if (payDate) {
//         const formattedDate = `${payDate.slice(6, 8)}-${payDate.slice(4, 6)}-${payDate.slice(0, 4)} ${payDate.slice(8, 10)}:${payDate.slice(10, 12)}:${payDate.slice(12, 14)}`;
//         setTransactionTime(formattedDate);
//       }
//     } else {
//       setIsPaymentSuccess(false);
//     }
  }, []);

  // Update order info and redirect to home on success
//   const updateOrderInfo = async () => {
//     try {
//       if (!user || !user.id) {
//         console.error("User ID not found");
//         return;
//       }

//       const userId = user.id;

//       // Fetch current user data
//       const userResponse = await fetch(`http://localhost:5000/users/${userId}`);
//       if (!userResponse.ok) {
//         console.error("Failed to fetch user data:", userResponse.statusText);
//         return;
//       }
//       const userData = await userResponse.json();

//       // Create new order with payment details
//       const newOrder = {
//         orderId: transactionId,
//         date: transactionTime,
//         status: "Processing",
//         total: (Number(amount) / 100).toFixed(0),
//         items: userData.cart || [],
//       };

//       // Append new order to user's orders and clear cart
//       userData.orders = userData.orders ? [...userData.orders, newOrder] : [newOrder];
//       userData.cart = [];

//       // Update user data on the server
//       const updateResponse = await fetch(`http://localhost:5000/users/${userId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });

//       if (updateResponse.ok) {
//         console.log("Order added successfully");
//         // const updatedUser = await updateResponse.json();
//         //     // setCartItems(updatedUser.cart);  // Update local state with the new cart
//             // updateUserOrders(updatedUser.orders);
//         navigate("/home"); // Navigate to home if update is successful
//       } else {
//         console.error("Failed to update user order:", updateResponse.statusText);
//       }
//     } catch (error) {
//       console.error("Error updating order info:", error);
//     }
//   };

const Back = () => {
    navigate("/home")
}



  return (
    <div id="checkserror" className="success-container">
      <div className="success-box">
            <div className="error-icon">
              <span>❌</span>
            </div>
            <h2>Payment Failed</h2>
            <p>There was an issue with your payment. Please try again or contact support.</p>
            <button className="back-to-home-btn" onClick={Back}>
              Back to Home
            </button>
      </div>
    </div>
  );
};

export default CheckoutError;
