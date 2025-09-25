const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    console.log("Received seller registration request:", req.body);
    const { password, houseNo, city, district, pincode, state, ...rest } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Compose full address
    const fullAddress = `${houseNo}, ${city}, ${district}, ${state}, ${pincode}`;
    console.log("Fetching geocode for address:", fullAddress);

    // Default to null
    let latitude = null;
    let longitude = null;

    if (process.env.LOCATIONIQ_API_KEY) {
      try {
        // Call internal geocode API
        const geocodeResponse = await fetch(
          `http://localhost:${process.env.PORT || 5000}/api/geocode?address=${encodeURIComponent(fullAddress)}`
        );
        console.log("Geocode fetch done. Status:", geocodeResponse.status);

        if (geocodeResponse.ok) {
          const data = await geocodeResponse.json();
          console.log("Geocode data received:", data);
          latitude = data.latitude ? parseFloat(data.latitude) : null;
          longitude = data.longitude ? parseFloat(data.longitude) : null;
        } else {
          console.warn("Failed to fetch geocode data, status:", geocodeResponse.status);
        }
      } catch (err) {
        console.error("Error fetching geocode data:", err);
      }
    } else {
      console.warn("LOCATIONIQ_API_KEY not set, skipping geocoding");
    }

    // Prepare seller data with lat/lon
    const sellerData = {
      ...rest,
      password: hashedPassword,
      houseNo,
      city,
      district,
      pincode,
      state,
      latitude,
      longitude,
    };

    // Save seller
    const seller = new Seller(sellerData);
    await seller.save();

    res.status(201).json({ message: "Seller registered successfully", seller });
  } catch (error) {
    console.error("Error registering seller:", error);
    res.status(500).json({ error: "Failed to register seller", details: error.message });
  }
});

module.exports = router;
