import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../../utils/requestAPI";
import "./CheckoutError.css";

const CheckoutError = () => {
  const navigate = useNavigate();
  const location = useLocation();
 

  const getQueryparams = () => {
    const query = new URLSearchParams(location.search);
    const status1 = query.get("status");
    const trancode = query.get("orderCode");
    return { status1,trancode  };
  };

  const [status1, setStatus1] = useState(null);
  const [trancode, settrancode] = useState(null);

  useEffect(() => {
    const { status1 } = getQueryparams();
    const {trancode} = getQueryparams();
    settrancode(trancode)
    setStatus1(status1);

    if (trancode && status1) {
      const fetchCancel = async () => {
       
        const url = `/create-payment-link/update-status?odercode=${trancode}&status=${status1}`;
        console.log('URL being called:', url);

        try {
         
          const response = await api.get(url);
          console.log("Status updated successfully:", response.data);
        } catch (error) {
          console.error("Error updating payment status:", error);
        }
      };

      fetchCancel();
    }
  }, [ location.search]);

  const handleRetry = () => {
    navigate("/checkout-fail");
  };

  return (
    <div id="checkserror" className="success-container">
      <div className="success-box">
            <div className="error-icon">
              <span>❌</span>
            </div>
            <h2>Payment Failed</h2>
            <p>There was an issue with your payment. Please try again or contact support.</p>
            <button className="back-to-home-btn" onClick={handleRetry}>
              Back to Home
            </button>
      </div>
    </div>
  );
};

export default CheckoutError;