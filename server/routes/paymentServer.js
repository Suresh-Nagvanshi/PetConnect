// ===============================
// File: routes/generateOrderToken.js
// ===============================

const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const APP_ID = process.env.APP_ID;
const SECRET_KEY = process.env.SECRET_KEY;
const API_VERSION = "2025-01-01"; // latest Cashfree API version

// ===============================
// Generate Payment Link API
// ===============================
router.post("/generateOrderToken", async (req, res) => {
  try {
    const {
      orderId,
      orderAmount,
      customerName,
      customerPhone,
      customerEmail,
      address,
    } = req.body;

    // ✅ Prepare request body (required snake_case format)
    const cashfreeBody = {
      link_id: String(orderId),
      link_amount: Number(orderAmount),
      link_currency: "INR",
      link_purpose: "Pet product payment",
      customer_details: {
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
      },
      link_notes: {
        address,
      },
      link_meta: {
        return_url: "https://www.cashfree.com", // You can change this to your success page
      },
    };

    console.log("Sending to Cashfree:", JSON.stringify(cashfreeBody, null, 2));

    // ✅ Send request to Cashfree Sandbox
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/links",
      cashfreeBody,
      {
        headers: {
          "x-api-version": API_VERSION,
          "x-client-id": APP_ID,
          "x-client-secret": SECRET_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Cashfree Response:", response.data);

    // ✅ Return only the payment link to frontend
    res.json({ paymentLink: response.data.link_url });
  } catch (error) {
    console.error("Error generating payment link:", error.message);
    console.error("Cashfree Response:", error.response?.data);

    res.status(500).json({
      error: "Failed to generate payment link",
      details: error.response?.data || {},
    });
  }
});

module.exports = router;