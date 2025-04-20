import React, { useState } from "react";
import "./css/UPIPayment.css"; // Import the CSS file

const UPIpayment = () => {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    if (!upiId || !amount) {
      setMessage("Please enter UPI ID and amount.");
      return;
    }
    setMessage(`Payment of ₹${amount} initiated to ${upiId}`);
  };

  return (
    <div className="upi-payment-container">
      <h2>UPI Payment</h2>
      <form onSubmit={handlePayment}>
        <label>UPI ID:</label>
        <input
          type="text"
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          placeholder="Enter UPI ID"
          required
        />

        <label>Amount (₹):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />

        <button type="submit">Pay Now</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default UPIpayment;
