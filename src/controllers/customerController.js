import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const registerCustomer = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      gender,
      dateOfBirth,
      address,
      password,
      latitude,
      longitude,
      deviceInfo,
    } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert customer data
    const result = await pool.query(
      `INSERT INTO customers 
            (full_name, email, phone_number, gender, date_of_birth, address, password, 
            latitude, longitude, browser, device_type, os, user_agent)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
            RETURNING id, full_name, email`,
      [
        fullName,
        email,
        phoneNumber,
        gender,
        dateOfBirth,
        address,
        hashedPassword,
        latitude,
        longitude,
        deviceInfo.browser,
        deviceInfo.device,
        deviceInfo.os,
        deviceInfo.userAgent,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Customer registered successfully",
      data: result.rows[0],
    });
  } catch (error) {
    if (error.constraint === "customers_email_key") {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    if (error.constraint === "customers_phone_number_key") {
      return res.status(400).json({
        success: false,
        message: "phone_number already exists",
      });
    }
    console.error("Error in customer registration:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customers ORDER BY created_at DESC"
    );

    res.status(200).json({
      success: true,
      message: "Customers fetched successfully",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
