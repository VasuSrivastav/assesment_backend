import express from "express";
import { registerCustomer, getAllCustomers } from "./controllers/customerController.js";
const router = express.Router();

router.post("/register", registerCustomer);
router.get("/allcustomer", getAllCustomers);


export default router;
